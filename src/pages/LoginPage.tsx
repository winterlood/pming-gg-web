import useLoginMutation from "@hooks/useLoginMutation";
import { common_types } from "@types";
import { Controller, useForm } from "react-hook-form";
import { useAppDispatch } from "@store/createStore";
import { login } from "@store/slice/authSlice";
import withOnlyGuest from "@hoc/withOnlyGuest";
import Layout from "@layout/Layout";

import style from "./LoginPage.module.scss";
import classNames from "classnames/bind";
import {
  BaseInput,
  LabeledInputContainer,
  PasswordInput,
} from "@components/Input";
import Button from "@components/Button";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(style);

function LoginPage() {
  const nav = useNavigate();
  const { handleSubmit, control, trigger } = useForm();
  const { mutate, isLoading } = useLoginMutation();
  const submitRef = useRef(null);

  const dispatch = useAppDispatch();

  const onSubmit = (data: any) => {
    mutate(data, {
      onSuccess: (data) => {
        console.log(data);
        dispatch(login(data.data as common_types.AuthUser));
      },
    });
  };

  return (
    <Layout
      header={{
        pageName: "",
      }}
      isLoading={isLoading}
    >
      <div className={cx("container")}>
        <section className={cx("section-header")}>
          <div className={cx("logo-box")}>
            <img src={`${process.env.PUBLIC_URL}/assets/image/logo_full.png`} />
          </div>
          <div className={cx("header-text")}>로그인 정보를 입력하세요</div>
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
            로그인
          </Button>
          <div
            className={cx("reset-password")}
            onClick={() => {
              nav("/reset-password");
            }}
          >
            비밀번호를 잊으셨나요?
          </div>
          <div
            className={cx("register")}
            onClick={() => {
              nav("/register");
            }}
          >
            가입하기
          </div>
        </section>
      </div>
    </Layout>
  );
}
export default withOnlyGuest(LoginPage);
