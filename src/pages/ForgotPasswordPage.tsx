import Button from "@components/Button";
import IconButton from "@components/IconButton";
import { BaseInput, LabeledInputContainer } from "@components/Input";
import useForgotPasswordMutation from "@hooks/useForgotPasswordMutation";
import Layout from "@layout/Layout";
import { CircularProgress } from "@mui/material";
import { regexPattern } from "@utils/regex";
import classNames from "classnames/bind";
import { useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import style from "./ForgotPasswordPage.module.scss";

const cx = classNames.bind(style);

export default function ForgotPasswordPage() {
  const nav = useNavigate();
  const { handleSubmit, control } = useForm();
  const { mutate, isLoading } = useForgotPasswordMutation();
  const submitRef = useRef(null);
  const onSubmit = (data: any) => {
    const { email } = data;
    console.log("btn clicked");

    if (!email.match(regexPattern.email)) {
      alert("이메일 형식에 맞게 입력해주세요");
      return;
    }

    mutate({ email });
  };
  return (
    <Layout
      header={{
        pageName: "비밀번호 재 설정",
        leftButton: (
          <IconButton
            type={"light"}
            icon={"goback"}
            onClick={() => {
              nav(-1);
            }}
          />
        ),
      }}
    >
      <div className={cx("container")}>
        <section className={cx("section_form")}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <LabeledInputContainer label={"이메일"}>
              <Controller
                defaultValue=""
                name="email"
                control={control}
                rules={{ required: true }}
                render={(props: any) => (
                  <BaseInput
                    placeholder="이메일"
                    type="email"
                    value={props.field.value}
                    onChange={props.field.onChange}
                  />
                )}
              />
            </LabeledInputContainer>
            <div className={cx("hidden")}>
              <input ref={submitRef} type={"submit"} />
            </div>
          </form>
          <div className={cx("descript")}>
            입력한 이메일로 비밀번호를 다시 설정할 수 있는 링크가 전송됩니다
          </div>
        </section>

        <section className={cx("section-submit")}>
          {!isLoading ? (
            <Button
              variant={"contained"}
              onClick={() => {
                if (submitRef.current) {
                  // @ts-ignore
                  submitRef.current.click();
                }
              }}
            >
              비밀번호 재 설정 링크 받기
            </Button>
          ) : (
            <CircularProgress />
          )}
        </section>
      </div>
    </Layout>
  );
}
