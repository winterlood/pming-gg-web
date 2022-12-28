import Button from "@components/Button";
import IconButton from "@components/IconButton";
import useGetProfileQuery from "@hooks/useGetProfileQuery";
import Layout from "@layout/Layout";

import classNames from "classnames/bind";
import { useNavigate, useParams } from "react-router-dom";
import style from "./ContactPage.module.scss";

const cx = classNames.bind(style);

/*

[연락하기 페이지]
- url params(id)로 개인 회원의 id 받음
- 개인 회원 정보 표시
- 연락하기 버튼 클릭시 mailto 링크에 기본 정보 담아서 열기

*/

const makeMailtoLink = (email?: string) => {
  const subject = `(프밍) 채용 제안 메일입니다`;
  const body = `프밍을 통해 연락드립니다`;
  const mailtoLink = `mailto:${email}?subject=${subject}&body=${body}`;
  return mailtoLink;
};

function ContactPage() {
  const { id: developerID } = useParams();
  const nav = useNavigate();

  const { data: profileData, isLoading: profileDataLoading } =
    useGetProfileQuery(developerID as string, {
      refetchOnMount: true,
      enabled: !!developerID,
    });

  const mailtoLink = makeMailtoLink(profileData?.email);

  return (
    <Layout
      header={{
        pageName: "연락하기",
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
      isLoading={profileDataLoading}
    >
      <div className={cx("container")}>
        <section className={cx("section_developer")}>
          <div className={cx("avatar_row")}>
            <img alt="developer avatar" src={profileData?.avatar_url} />
          </div>
          <div className={cx("info_row")}>
            <div className={cx("name")}>{profileData?.name}</div>
            <div className={cx("bio")}>
              {profileData?.user_detail_individual?.bio}
            </div>
          </div>
        </section>
        <section className={cx("section_notice")}></section>
        <section className={cx("section_submit")}>
          <Button
            variant={"contained"}
            onClick={() => {
              window.open(mailtoLink);
            }}
          >
            메일로 연락하기
          </Button>
        </section>
      </div>
    </Layout>
  );
}

export default ContactPage;
