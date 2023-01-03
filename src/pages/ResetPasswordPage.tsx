import Button from "@components/Button";
import { BaseInput, LabeledInputContainer } from "@components/Input";
import useResetPasswordMutation from "@hooks/useResetPasswordMutation";
import Layout from "@layout/Layout";
import { CircularProgress } from "@mui/material";
import { regexPattern } from "@utils/regex";
import classNames from "classnames/bind";
import { useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import style from "./ResetPasswordPage.module.scss";

const cx = classNames.bind(style);

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");

  const { handleSubmit, control } = useForm();
  const submitRef = useRef(null);
  const { mutate, isLoading } = useResetPasswordMutation();

  const onSubmit = (data: any) => {
    const { password, passwordConfirmation } = data;

    if (!password.match(regexPattern.password)) {
      alert("비밀번호는 영어소문자, 숫자를 포함해 최소 8자로 만들어야 합니다");
      return;
    }

    if (password !== passwordConfirmation) {
      alert("비밀번호 확인과 비밀번호가 일치하지 않습니다");
      return;
    }

    mutate({ code, password, passwordConfirmation });
  };
  return (
    <Layout
      header={{
        pageName: "비밀번호 재 설정",
      }}
    >
      <div className={cx("container")}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <section className={cx("section_form")}>
            <LabeledInputContainer label={"새로운 비밀번호"}>
              <Controller
                defaultValue=""
                name="password"
                control={control}
                rules={{ required: true }}
                render={(props: any) => (
                  <BaseInput
                    placeholder="새로운 비밀번호"
                    type="password"
                    value={props.field.value}
                    onChange={props.field.onChange}
                  />
                )}
              />
            </LabeledInputContainer>
            <LabeledInputContainer label={"새로운 비밀번호 확인"}>
              <Controller
                defaultValue=""
                name="passwordConfirmation"
                control={control}
                rules={{ required: true }}
                render={(props: any) => (
                  <BaseInput
                    placeholder="새로운 비밀번호 확인"
                    type="password"
                    value={props.field.value}
                    onChange={props.field.onChange}
                  />
                )}
              />
            </LabeledInputContainer>
            <div className={cx("hidden")}>
              <input ref={submitRef} type={"submit"} />
            </div>
          </section>
        </form>

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
              비밀번호 변경하기
            </Button>
          ) : (
            <CircularProgress />
          )}
        </section>
      </div>
    </Layout>
  );
}
