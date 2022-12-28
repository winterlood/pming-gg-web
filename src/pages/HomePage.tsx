import IconButton from "@components/IconButton";
import MagazineCraousel from "@components/MagazineCarousel";
import withOnlyProfiledUser from "@hoc/withOnlyProfiledUser";
import useAuthUser from "@hooks/useAuthUser";
import Layout from "@layout/Layout";
import { ReactElement, useEffect } from "react";

import classNames from "classnames/bind";
import style from "./HomePage.module.scss";
import { common_types } from "@types";
import useGetJobPostByUserIdQuery from "@hooks/useGetJobPostByUserIdQuery";
import JobPostItem from "@components/JobPostItem";
import useGetRecommendDevlopers from "@hooks/useGetRecommendDevlopers";
import DeveloperItem from "@components/DeveloperItem";
import { useNavigate } from "react-router-dom";
import useGetProfileQuery from "@hooks/useGetProfileQuery";
import GitHubLanaguageChart from "@components/GitHubLanaguageChart";
import useGetRecommendedJobPost from "@hooks/useGetRecommendedJobPost";
import { useAppDispatch } from "@store/createStore";
import { logout } from "@store/slice/authSlice";
const cx = classNames.bind(style);

function HomeSection(props: {
  title: string;
  viewMore?: {
    text: string;
    onClick: React.MouseEventHandler<HTMLSpanElement>;
  };
  children: ReactElement | ReactElement[] | undefined;
  bodyClassName?: string;
}) {
  return (
    <div className={cx("HomeSection")}>
      <div className={cx("header")}>
        <div className={cx("title")}>{props.title}</div>
        {props.viewMore && (
          <div className={cx("viewmore")}>
            <span onClick={props.viewMore.onClick}>{props.viewMore.text}</span>
          </div>
        )}
      </div>
      <div className={[cx("body"), props.bodyClassName].join(" ")}>
        {props.children}
      </div>
    </div>
  );
}

function IndividualHome({ user }: { user: common_types.AuthUser["user"] }) {
  const nav = useNavigate();
  const id = user.id;

  const { data: profileQueryData, isLoading: profileQueryLoading } =
    useGetProfileQuery(id as string, {
      refetchOnMount: true,
      enabled: !!id,
    });

  const { data: jobPostList, isLoading } = useGetRecommendedJobPost("", {
    refetchOnMount: true,
  });

  console.log(profileQueryData);

  return (
    <>
      <HomeSection
        title="내 코드"
        bodyClassName={cx("list_section")}
        viewMore={{
          text: "더보기",
          onClick: () => nav(`/profile/${id}`),
        }}
      >
        {profileQueryData && (
          <div>
            <GitHubLanaguageChart
              type="pie"
              languageData={profileQueryData.github_user.totalLangList}
            />
          </div>
        )}
      </HomeSection>
      <HomeSection
        title="추천 채용 공고"
        bodyClassName={cx("list_section")}
        viewMore={{
          text: "더보기",
          onClick: () => nav(`/jobs`),
        }}
      >
        {jobPostList &&
          jobPostList
            .slice(0, 2)
            .map((jobPost) => <JobPostItem key={jobPost.id} {...jobPost} />)}
      </HomeSection>
    </>
  );
}

function BusinessHome({ user }: { user: common_types.AuthUser["user"] }) {
  const nav = useNavigate();
  const id = user.id;

  const { data: jobPostQueryData, isLoading: jobPostQueryLoading } =
    useGetJobPostByUserIdQuery(id as string, {
      refetchOnMount: true,
      enabled: !!id,
    });

  const { data: developerList, isLoading } = useGetRecommendDevlopers({
    refetchOnMount: true,
  });

  return (
    <>
      <HomeSection
        title="내 공고"
        bodyClassName={cx("list_section")}
        viewMore={{
          text: "더보기",
          onClick: () => nav(`/profile/${id}`),
        }}
      >
        {jobPostQueryData &&
          jobPostQueryData
            ?.slice(0, 2)
            .map((jobPost) => <JobPostItem key={jobPost.id} {...jobPost} />)}
      </HomeSection>
      <HomeSection
        title="인재 추천"
        bodyClassName={cx("list_section")}
        viewMore={{
          text: "더보기",
          onClick: () => nav(`/developers`),
        }}
      >
        {developerList &&
          developerList
            ?.slice(0, 2)
            .map((developer) => (
              <DeveloperItem
                key={developer.id}
                {...developer}
                name={developer.username}
                bio={developer.user_detail_individual?.bio as string}
              />
            ))}
      </HomeSection>
    </>
  );
}

function HomePage() {
  const nav = useNavigate();
  const { user } = useAuthUser();
  return (
    <Layout
      header={{
        pageName: "홈",
        rightButton: (
          <IconButton
            type={"light"}
            icon={"alarm"}
            onClick={() => nav(`/alarm`)}
          />
        ),
      }}
      footer
    >
      <div className={cx("container")}>
        <HomeSection
          title="매거진"
          viewMore={{
            text: "더보기",
            onClick: () => nav(`/magazine`),
          }}
        >
          <MagazineCraousel />
        </HomeSection>
        {user.user_type === "individual" && <IndividualHome user={user} />}
        {user.user_type === "business" && <BusinessHome user={user} />}
      </div>
    </Layout>
  );
}

export default withOnlyProfiledUser(HomePage);
