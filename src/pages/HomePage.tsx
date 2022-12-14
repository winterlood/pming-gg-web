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
import { Link, useNavigate } from "react-router-dom";
import useGetProfileQuery from "@hooks/useGetProfileQuery";
import GitHubLanaguageChart from "@components/GitHubLanaguageChart";
import useGetRecommendedJobPost from "@hooks/useGetRecommendedJobPost";
import { Alert } from "@mui/material";
import { githubOAuthLink } from "@utils/github";
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
        title="??? ??????"
        bodyClassName={cx("list_section")}
        viewMore={{
          text: "?????????",
          onClick: () => nav(`/profile/${id}`),
        }}
      >
        {profileQueryData && profileQueryData.github_user ? (
          <div>
            <GitHubLanaguageChart
              type="pie"
              languageData={profileQueryData.github_user.totalLangList}
            />
          </div>
        ) : (
          <div>
            <Alert severity="info">
              ????????? ????????? ???????????????. <br />
              <a href={githubOAuthLink}>????????? ????????? ????????????</a>
            </Alert>
          </div>
        )}
      </HomeSection>
      <HomeSection
        title="?????? ?????? ??????"
        bodyClassName={cx("list_section")}
        viewMore={{
          text: "?????????",
          onClick: () => nav(`/jobs`),
        }}
      >
        {jobPostList && jobPostList.length > 0 ? (
          jobPostList
            .slice(0, 2)
            .map((jobPost) => <JobPostItem key={jobPost.id} {...jobPost} />)
        ) : (
          <div>
            <Alert severity="info">????????? ????????? ????????????</Alert>
          </div>
        )}
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
        title="??? ??????"
        bodyClassName={cx("list_section")}
        viewMore={{
          text: "?????????",
          onClick: () => nav(`/profile/${id}`),
        }}
      >
        {jobPostQueryData && jobPostQueryData.length > 0 ? (
          jobPostQueryData
            ?.slice(0, 2)
            .map((jobPost) => <JobPostItem key={jobPost.id} {...jobPost} />)
        ) : (
          <div>
            <Alert severity="info">
              ????????? ????????? ???????????? <br />
              <Link to={`/jobpost/new`}>????????? ?????? ?????????</Link>
            </Alert>
          </div>
        )}
      </HomeSection>
      <HomeSection
        title="?????? ??????"
        bodyClassName={cx("list_section")}
        viewMore={{
          text: "?????????",
          onClick: () => nav(`/developers`),
        }}
      >
        {developerList && developerList.length > 0 ? (
          developerList
            ?.slice(0, 2)
            .map((developer) => (
              <DeveloperItem
                key={developer.id}
                {...developer}
                name={developer.name}
                bio={developer.user_detail_individual?.bio as string}
              />
            ))
        ) : (
          <div>
            <Alert severity="info">????????? ????????? ????????????</Alert>
          </div>
        )}
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
        pageName: "???",
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
          title="?????????"
          viewMore={{
            text: "?????????",
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
