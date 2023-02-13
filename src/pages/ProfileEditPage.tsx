import Button from "@components/Button";
import withOnlyAuthUser from "@hoc/withOnlyAuthUser";
import Layout from "@layout/Layout";
import { RootState, useAppDispatch } from "@store/createStore";
import { toggleIsProfileCreated } from "@store/slice/authSlice";
import { common_types } from "@types";
import { SyntheticEvent, useEffect, useRef, useState } from "react";
import {
  Controller,
  FieldValues,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";

import style from "./ProfileEditPage.module.scss";
import classNames from "classnames/bind";
import useGetProfileQuery from "@hooks/useGetProfileQuery";
import { useSelector } from "react-redux";
import PersonIcon from "@mui/icons-material/Person";
import BusinessIcon from "@mui/icons-material/Business";
import {
  BaseInput,
  LabeledInputContainer,
  MultilineInput,
} from "@components/Input";
import IconButton from "@components/IconButton";
import uploadFile from "@api/uploadFile";
import EditIcon from "@mui/icons-material/Edit";
import useUpdateProfileMutation from "@hooks/useUpdateProfileMutation";
import useCreateProfileMutation from "@hooks/useCreateProfileMutation";
import useUploadFileMutation from "@hooks/useUploadFileMutation";
import useAuthUser from "@hooks/useAuthUser";
const cx = classNames.bind(style);

function TypeSceletScene({
  type,
  onSelectType,
}: {
  type: common_types.UserType;
  onSelectType: (type: common_types.UserType) => void;
}) {
  const onClick = (e: SyntheticEvent, type: common_types.UserType) => {
    e.preventDefault();
    onSelectType(type);
  };
  return (
    <div className={cx("scene-type-select")}>
      <div
        onClick={(e) => onClick(e, "individual")}
        className={[
          cx("type-item"),
          type === "individual" && cx("type-item-selected"),
        ].join(" ")}
      >
        <div className={cx("icon-box")}>
          <PersonIcon />
        </div>
        <div className={cx("info-box")}>
          <div className={cx("title")}>개인 회원</div>
          <div className={cx("descript")}>직장을 찾고 있습니다.</div>
        </div>
      </div>
      <div
        onClick={(e) => onClick(e, "business")}
        className={[
          cx("type-item"),
          type === "business" && cx("type-item-selected"),
        ].join(" ")}
      >
        <div className={cx("icon-box")}>
          <BusinessIcon />
        </div>
        <div className={cx("info-box")}>
          <div className={cx("title")}>기업 회원</div>
          <div className={cx("descript")}>개발자를 찾고 있습니다.</div>
        </div>
      </div>
    </div>
  );
}

function IndividualUserScene({
  form,
}: {
  form: UseFormReturn<FieldValues, any>;
}) {
  return (
    <div className={cx("scene-individual")}>
      <AvatarSelectScene form={form} />
      <LabeledInputContainer label="이름">
        <Controller
          defaultValue=""
          name="name"
          control={form.control}
          rules={{ required: true }}
          render={(props: any) => (
            <BaseInput
              placeholder="이름"
              type="text"
              value={props.field.value}
              onChange={props.field.onChange}
            />
          )}
        />
      </LabeledInputContainer>
      <LabeledInputContainer label="생일">
        <Controller
          defaultValue=""
          name="birth"
          control={form.control}
          rules={{ required: true }}
          render={(props: any) => (
            <BaseInput
              placeholder="생일"
              type="date"
              value={props.field.value}
              onChange={props.field.onChange}
            />
          )}
        />
      </LabeledInputContainer>
      <LabeledInputContainer label="지역">
        <Controller
          defaultValue=""
          name="location"
          control={form.control}
          rules={{ required: true }}
          render={(props: any) => (
            <BaseInput
              placeholder="지역"
              type="location"
              value={props.field.value}
              onChange={props.field.onChange}
            />
          )}
        />
      </LabeledInputContainer>
      <LabeledInputContainer label="상세 프로필 아이디">
        <Controller
          defaultValue=""
          name="detail_profile_id"
          control={form.control}
          rules={{ required: true }}
          render={(props: any) => (
            <BaseInput
              placeholder="상세프로필 페이지 아이디"
              type="text"
              value={props.field.value}
              onChange={props.field.onChange}
            />
          )}
        />
      </LabeledInputContainer>
      <LabeledInputContainer label="연차">
        <Controller
          defaultValue=""
          name="annual"
          control={form.control}
          rules={{ required: true }}
          render={(props: any) => (
            <BaseInput
              placeholder="연차"
              type="number"
              value={props.field.value}
              onChange={props.field.onChange}
            />
          )}
        />
      </LabeledInputContainer>
      <LabeledInputContainer label="소개">
        <Controller
          defaultValue=""
          name="bio"
          control={form.control}
          rules={{ required: true }}
          render={(props: any) => (
            <MultilineInput
              placeholder="소개"
              type="text"
              value={props.field.value}
              onChange={props.field.onChange}
            />
          )}
        />
      </LabeledInputContainer>
    </div>
  );
}

function BusinessUserScene({
  form,
}: {
  form: UseFormReturn<FieldValues, any>;
}) {
  return (
    <div className={cx("scene-business")}>
      <AvatarSelectScene form={form} />
      <LabeledInputContainer label="기업이름">
        <Controller
          defaultValue=""
          name="name"
          control={form.control}
          rules={{ required: true }}
          render={(props: any) => (
            <BaseInput
              placeholder="기업이름"
              type="text"
              value={props.field.value}
              onChange={props.field.onChange}
            />
          )}
        />
      </LabeledInputContainer>
      <LabeledInputContainer label="상세 프로필 아이디">
        <Controller
          defaultValue=""
          name="detail_profile_id"
          control={form.control}
          rules={{ required: true }}
          render={(props: any) => (
            <BaseInput
              placeholder="상세 프로필 아이디"
              type="text"
              value={props.field.value}
              onChange={props.field.onChange}
            />
          )}
        />
      </LabeledInputContainer>
      <LabeledInputContainer label="설립일">
        <Controller
          defaultValue=""
          name="establishment_date"
          control={form.control}
          rules={{ required: true }}
          render={(props: any) => (
            <BaseInput
              placeholder="설립일"
              type="date"
              value={props.field.value}
              onChange={props.field.onChange}
            />
          )}
        />
      </LabeledInputContainer>
      <LabeledInputContainer label="자본금 규모(만원)">
        <Controller
          defaultValue=""
          name="capital"
          control={form.control}
          rules={{ required: true }}
          render={(props: any) => (
            <BaseInput
              placeholder="자본금 규모(만원)"
              type="number"
              value={props.field.value}
              onChange={props.field.onChange}
            />
          )}
        />
      </LabeledInputContainer>
      <LabeledInputContainer label="직원 수">
        <Controller
          defaultValue=""
          name="employees"
          control={form.control}
          rules={{ required: true }}
          render={(props: any) => (
            <BaseInput
              placeholder="직원 수"
              type="number"
              value={props.field.value}
              onChange={props.field.onChange}
            />
          )}
        />
      </LabeledInputContainer>
    </div>
  );
}

function AvatarSelectScene({
  form,
}: {
  form: UseFormReturn<FieldValues, any>;
}) {
  const [localFilePath, setLocalFilePath] = useState<string | null>(null);

  const avatarUrl = form.watch("avatar_url");
  useEffect(() => {
    if (avatarUrl) {
      setLocalFilePath(avatarUrl);
    }
  }, [avatarUrl]);

  const imageRef = useRef(null);
  const onChangeImage = (e: any) => {
    const file = e.target.files[0];
    form.setValue("avatar", file);
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setLocalFilePath(fileReader.result as string);
    };
    fileReader.readAsDataURL(file);
  };
  return (
    <div className={cx("scene-avatar")}>
      <LabeledInputContainer label="프로필 사진 (권장 : 25 x 25px)">
        <div className={cx("hidden")}>
          <input
            ref={imageRef}
            type="file"
            accept="image/*"
            onChange={onChangeImage}
          />
        </div>
        <div
          onClick={() => {
            if (imageRef.current) {
              //@ts-ignore
              imageRef.current.click();
            }
          }}
          className={cx("image-input-box")}
        >
          <img
            src={
              localFilePath
                ? localFilePath
                : `${process.env.PUBLIC_URL}/assets/image/default.png`
            }
          />
          <div className={cx("image-edit-icon-box")}>
            <EditIcon />
          </div>
        </div>
      </LabeledInputContainer>
    </div>
  );
}

function ProfileEditPage() {
  const nav = useNavigate();
  const form = useForm();
  const location = useLocation();

  const createProfileMutation = useCreateProfileMutation();
  const updateProfileMutation = useUpdateProfileMutation();
  const uploadFileMutation = useUploadFileMutation();

  const dispatch = useAppDispatch();

  const auth = useAuthUser();
  const [mode, setMode] = useState<"create" | "edit">("edit");
  const [step, setStep] = useState(1);
  const [type, setType] = useState<common_types.UserType>("individual");
  const submitRef = useRef(null);
  const { data } = useGetProfileQuery(auth?.user.id as string, {
    refetchOnMount: true,
    enabled: mode !== "create" && auth?.user.id ? true : false,
  });
  useEffect(() => {
    const pathName = location.pathname;
    if (pathName === "/profile/edit") {
      setMode("edit");
      setStep(2);
    } else {
      setMode("create");
    }
  }, [location]);

  useEffect(() => {
    if (mode === "edit" && data) {
      const userType = data.user_detail_business ? "business" : "individual";
      setType(userType);

      form.setValue("avatar_url", data.avatar_url);
      form.setValue("name", data.name);
      let detailDataObject =
        data.user_detail_business ?? (data.user_detail_individual as Object);
      Object.keys(detailDataObject).forEach((key) => {
        console.log(key);
        //@ts-ignore
        const value = detailDataObject[key];
        form.setValue(key, value);
      });
    }
  }, [data]);

  const onSelectType = (type: common_types.UserType) => {
    setType(type);
  };

  const onClickSubmit = async () => {
    let isValid = true;
    if (type === "individual") {
      const individualValues = ["birth", "location", "annual", "bio"];
      if (
        individualValues.filter((value) => form.getValues(value) === "")
          .length !== 0
      ) {
        isValid = false;
      }
    } else if (type === "business") {
      const businessValues = ["establishment_date", "capital", "employees"];
      if (
        businessValues.filter((value) => form.getValues(value) === "")
          .length !== 0
      ) {
        isValid = false;
      }
    }
    if (!isValid) {
      alert("입력란을 모두 채워주세요");
      return;
    }

    const file = form.getValues("avatar");
    if (file) {
      uploadFileMutation.mutate(file, {
        onSuccess: (data) => {
          form.setValue("avatar_url", data.path);
          if (submitRef.current) {
            // @ts-ignore
            submitRef.current.click();
          }
        },
        onError: (err) => {
          alert("이미지 업로드에 실패했습니다");
        },
      });
    } else {
      form.setValue("avatar_url", undefined);
      if (submitRef.current) {
        // @ts-ignore
        submitRef.current.click();
      }
    }
  };

  const createProfile = () => {
    const mutateParam = {
      type,
      ...form.getValues(),
    };

    console.log(mutateParam);

    if (mode === "create") {
      createProfileMutation.mutate(mutateParam, {
        onSuccess: (data) => {
          dispatch(toggleIsProfileCreated({ user_type: type }));
          nav("/profile", { replace: true });
        },
        onError: (err) => {
          alert("오류가 발생했습니다!");
        },
      });
    } else {
      updateProfileMutation.mutate(mutateParam, {
        onSuccess: () => {
          nav("/profile", { replace: true });
        },
        onError: (err) => {
          alert("오류가 발생했습니다!");
        },
      });
    }
  };

  const moveStep = (direct: "next" | "prev") => {
    if (direct === "prev") {
      if (step >= 1) {
        setStep(step - 1);
      }
    } else if (direct === "next") {
      setStep(step + 1);
    }
  };

  const renderSceneByStep = () => {
    switch (step) {
      case 1:
        return <TypeSceletScene type={type} onSelectType={onSelectType} />;
      case 2:
        return type === "business" ? (
          <BusinessUserScene form={form} />
        ) : (
          <IndividualUserScene form={form} />
        );
      case 3:
        return <AvatarSelectScene form={form} />;
    }
  };

  const renderButtonByStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <Button
              variant="contained"
              onClick={() => {
                moveStep("next");
              }}
            >
              다음
            </Button>
          </>
        );
      case 2:
        return (
          <>
            {mode === "create" && (
              <Button
                onClick={() => {
                  moveStep("prev");
                }}
              >
                이전
              </Button>
            )}
            <Button variant="contained" onClick={onClickSubmit}>
              {mode === "create" ? "프로필 생성하기" : "프로필 수정하기"}
            </Button>
          </>
        );
    }
  };

  return (
    <Layout
      header={{
        leftButton:
          mode === "edit" ? (
            <IconButton
              type={"light"}
              icon={"goback"}
              onClick={() => {
                nav(-1);
              }}
            />
          ) : null,

        pageName: mode === "create" ? "프로필 생성" : "프로필 수정",
      }}
      isLoading={
        createProfileMutation.isLoading ||
        updateProfileMutation.isLoading ||
        uploadFileMutation.isLoading
      }
    >
      <main className={cx("container")}>
        <section className={cx("section-header")}></section>
        <section className={cx("section-body")}>
          <form onSubmit={form.handleSubmit(createProfile)}>
            {renderSceneByStep()}
            <section className={cx("hidden")}>
              <input ref={submitRef} type={"submit"} />
            </section>
          </form>
        </section>
        <section className={cx("section-footer")}>
          {renderButtonByStep()}
        </section>
      </main>
    </Layout>
  );
}
export default withOnlyAuthUser(ProfileEditPage);
