import style from "./JobPostEditPage.module.scss";
import classNames from "classnames/bind";
import Layout from "@layout/Layout";
import IconButton from "@components/IconButton";
import {
  BaseInput,
  LabeledInputContainer,
  SelectInput,
} from "@components/Input";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { Button as MuiButton, InputAdornment } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import Button from "@components/Button";
import useCreateJobPostMutation from "@hooks/useCreateJobPostMutation";
import useUploadFileMutation from "@hooks/useUploadFileMutation";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useGetJobPostDetailQuery from "@hooks/useGetJobPostDetailQuery";
import useUpdateJobPostMutation from "@hooks/useUpdateJobPostMutation";
const cx = classNames.bind(style);

function JobPostEditPage() {
  const { id } = useParams();
  const nav = useNavigate();
  const location = useLocation();

  const [mode, setMode] = useState<"create" | "edit">("create");
  const { data: originData, isLoading: originDataQueryLoading } =
    useGetJobPostDetailQuery(id as string, {
      staleTime: 0,
      refetchOnMount: true,
      enabled: !!id,
    });
  const uploadFileMutation = useUploadFileMutation();
  const createJobPostMutation = useCreateJobPostMutation();
  const updateJobPostMutation = useUpdateJobPostMutation();
  const form = useForm();
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "requirements",
  });
  const idRef = useRef(0);
  const inputRef = useRef(null);
  const submitBtnRef = useRef(null);
  useEffect(() => {
    const pathName = location.pathname;
    if (pathName === "/jobpost/new") {
      setMode("create");
    } else {
      setMode("edit");
    }
  }, [location]);
  useEffect(() => {
    if (mode === "edit" && originData) {
      Object.keys(originData).forEach((key) => {
        //@ts-ignore
        const data = originData[key];
        if (key === "requirements") {
          const requirementList = data as string[];
          if (requirementList.length >= 1) {
            requirementList.forEach((require, idx) => {
              append({ value: require });
            });
          }
        } else if (key === "thumbnail_url") {
          setLocalFilePath(data);
        } else {
          form.setValue(key, data);
        }
      });
    } else {
      append({ value: "" });
    }
  }, [originData, mode]);

  const [localFilePath, setLocalFilePath] = useState<string>();
  const onChangeImage = (e: any) => {
    const file = e.target.files[0];
    form.setValue("thumbnail", file);
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setLocalFilePath(fileReader.result as string);
    };
    fileReader.readAsDataURL(file);
  };

  const onClickSubmitButton = () => {
    let flag = true;
    const conditions = ["duty", "salary", "location", "work_type"];
    conditions.forEach((it) => {
      if (!form.getValues(it)) {
        flag = false;
      }
    });

    if (!flag) {
      alert("모든 입력을 완료하세요");
      return;
    }

    const file = form.getValues("thumbnail");
    if (file) {
      uploadFileMutation.mutate(file, {
        onSuccess: (data) => {
          form.setValue("thumbnail_url", data.path);
          if (submitBtnRef.current) {
            // @ts-ignore
            submitBtnRef.current.click();
          }
        },
        onError: (err) => {
          alert("이미지 업로드에 실패했습니다");
        },
      });
    } else {
      if (submitBtnRef.current) {
        // @ts-ignore
        submitBtnRef.current.click();
      }
    }
  };

  const onSubmit = (data: any) => {
    const { requirements: localRequirements } = data;
    const requirements = localRequirements
      .map((it: any) => it.value)
      .filter((it: string) => it !== "");

    if (mode === "create") {
      createJobPostMutation.mutate(
        { ...form.getValues(), requirements },
        {
          onSuccess(data, variables, context) {
            alert("채용 공고가 등록되었습니다.");
            nav("/");
          },
          onError(error, variables, context) {
            alert("오류가 발생했습니다. 다시 시도해주세요");
          },
        }
      );
    } else {
      updateJobPostMutation.mutate(
        { id, ...form.getValues(), requirements },
        {
          onSuccess(data, variables, context) {
            alert("채용 공고가 수정되었습니다.");
            nav("/");
          },
          onError(error, variables, context) {
            alert("오류가 발생했습니다. 다시 시도해주세요");
          },
        }
      );
    }
  };

  return (
    <Layout
      header={{
        leftButton: (
          <IconButton
            type={"light"}
            icon={"goback"}
            onClick={() => {
              nav(-1);
            }}
          />
        ),
        pageName: mode === "create" ? "새로운 채용 공고" : "채용 공고 수정하기",
      }}
      isLoading={
        (mode === "edit" && originDataQueryLoading) ||
        createJobPostMutation.isLoading ||
        uploadFileMutation.isLoading ||
        updateJobPostMutation.isLoading
      }
    >
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <main className={cx("container")}>
          <div className={cx("hidden")}>
            <input ref={submitBtnRef} type={"submit"} />
            <input ref={inputRef} type="file" onChange={onChangeImage} />
          </div>
          <section className={cx("section-thumbnail")}>
            <div className={cx("section-header")}>
              <div>공고 이미지</div>
            </div>
            <LabeledInputContainer
              label={"클릭하여 새로운 이미지를 첨부하거나 교체하세요"}
            >
              <div
                className={cx("thumbnail-box")}
                onClick={() => {
                  if (inputRef.current) {
                    //@ts-ignore
                    inputRef.current.click();
                  }
                }}
              >
                <img
                  src={
                    localFilePath
                      ? localFilePath
                      : `${process.env.PUBLIC_URL}/assets/image/default.png`
                  }
                />
              </div>
            </LabeledInputContainer>
          </section>
          <section className={cx("section-summary")}>
            <div className={cx("section-header")}>
              <div>공고 정보</div>
            </div>
            <div className={cx("input-list")}>
              <LabeledInputContainer label={"직무"}>
                <Controller
                  defaultValue=""
                  name="duty"
                  control={form.control}
                  rules={{ required: true }}
                  render={(props: any) => (
                    <BaseInput
                      placeholder="직무"
                      type="text"
                      value={props.field.value}
                      onChange={props.field.onChange}
                    />
                  )}
                />
              </LabeledInputContainer>
              <LabeledInputContainer label={"연봉"}>
                <Controller
                  defaultValue=""
                  name="salary"
                  control={form.control}
                  rules={{ required: true }}
                  render={(props: any) => (
                    <BaseInput
                      placeholder="연봉"
                      type="number"
                      value={props.field.value}
                      onChange={props.field.onChange}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">만원</InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
              </LabeledInputContainer>
              <LabeledInputContainer label={"회사 위치"}>
                <Controller
                  defaultValue=""
                  name="location"
                  control={form.control}
                  rules={{ required: true }}
                  render={(props: any) => (
                    <BaseInput
                      placeholder="회사 위치"
                      type="text"
                      value={props.field.value}
                      onChange={props.field.onChange}
                    />
                  )}
                />
              </LabeledInputContainer>
              <LabeledInputContainer label={"근무 유형"}>
                <Controller
                  defaultValue="full-time"
                  name="work_type"
                  control={form.control}
                  rules={{ required: true }}
                  render={(props: any) => (
                    <SelectInput
                      placeholder="근무 유형"
                      options={[
                        { value: "full-time", label: "풀타임" },
                        { value: "part-time", label: "파트타임" },
                      ]}
                      value={props.field.value}
                      onChange={props.field.onChange}
                    />
                  )}
                />
              </LabeledInputContainer>
            </div>
          </section>
          <section className={cx("section-requirement")}>
            <div className={cx("section-header")}>
              <div>자격요건 및 우대사항</div>
              <div>
                <MuiButton onClick={() => append({ value: "" })}>
                  + 추가하기
                </MuiButton>
              </div>
            </div>
            <div className={cx("requirement-item-list")}>
              {fields.map((item, idx) => (
                <div
                  key={String(++idRef.current)}
                  className={cx("requirement-item")}
                >
                  <Controller
                    defaultValue=""
                    name={`requirements[${idx}].value`}
                    control={form.control}
                    rules={{ required: false }}
                    render={(props: any) => (
                      <BaseInput
                        placeholder="자격요건 및 우대사항"
                        type="text"
                        value={props.field.value}
                        onChange={props.field.onChange}
                      />
                    )}
                  />
                  <MuiButton color={"error"} onClick={() => remove(idx)}>
                    삭제
                  </MuiButton>
                </div>
              ))}
            </div>
          </section>
          <section className={cx("section-submit")}>
            <Button
              type="submit"
              variant="contained"
              onClick={onClickSubmitButton}
            >
              {mode === "create" ? "작성하기" : "수정하기"}
            </Button>
          </section>
        </main>
      </form>
    </Layout>
  );
}
export default JobPostEditPage;
