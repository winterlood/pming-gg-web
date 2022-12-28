import userRegisterMutation from "@hooks/useRegisterMutation";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Layout from "@layout/Layout";
import IconButton from "@components/IconButton";

import style from "./RegisterPage.module.scss";
import classNames from "classnames/bind";
import {
  BaseInput,
  LabeledInputContainer,
  PasswordInput,
} from "@components/Input";
import Button from "@components/Button";
import { useRef } from "react";
import { regexPattern } from "@utils/regex";
const cx = classNames.bind(style);

function RegisterPage() {
  const nav = useNavigate();
  const { mutate, isLoading } = userRegisterMutation();
  const submitRef = useRef(null);

  const { handleSubmit, control } = useForm();
  const onSubmit = (data: any) => {
    const { email, password, username } = data;

    if (!email.match(regexPattern.email)) {
      alert("이메일 형식에 맞게 입력해주세요");
      return;
    }

    if (!password.match(regexPattern.password)) {
      alert("비밀번호는 영어소문자, 숫자를 포함해 최소 8자로 만들어야 합니다");
      return;
    }

    if (username.length < 3) {
      alert("닉네임은 3자 이상이어야 합니다");
      return;
    }

    mutate(
      { email, password, username },
      {
        onSuccess: () => {
          alert(
            "이메일로 인증 링크가 발송되었습니다. 인증 이후 로그인 가능합니다."
          );
          nav("/login", { replace: true });
        },
      }
    );
  };
  return (
    <div>
      <Layout
        header={{
          leftButton: (
            <IconButton
              type={"light"}
              icon={"goback"}
              onClick={() => {
                nav("/login");
              }}
            />
          ),
          pageName: "회원가입",
        }}
        isLoading={isLoading}
      >
        <div className={cx("container")}>
          <section className={cx("section-header")}>
            <div className={cx("logo-box")}>
              <img
                src={`${process.env.PUBLIC_URL}/assets/image/logo_full.png`}
              />
            </div>
          </section>
          <section className={cx("section-form")}>
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
              <LabeledInputContainer label={"비밀번호"}>
                <Controller
                  defaultValue=""
                  name="password"
                  control={control}
                  rules={{ required: true }}
                  render={(props: any) => (
                    <PasswordInput
                      placeholder="비밀번호"
                      value={props.field.value}
                      onChange={props.field.onChange}
                    />
                  )}
                />
              </LabeledInputContainer>
              <LabeledInputContainer label={"닉네임(기업이라면 기업명)"}>
                <Controller
                  defaultValue=""
                  name="username"
                  control={control}
                  rules={{}}
                  render={(props: any) => (
                    <BaseInput
                      placeholder="닉네임(기업이라면 기업명)"
                      type="text"
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
          </section>
          <section className={cx("section-submit")}>
            <Button
              variant={"contained"}
              onClick={() => {
                if (submitRef.current) {
                  // @ts-ignore
                  submitRef.current.click();
                }
              }}
            >
              회원 가입
            </Button>
          </section>
        </div>
      </Layout>
    </div>
  );
}

export default RegisterPage;
