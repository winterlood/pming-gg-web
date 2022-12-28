import IconButton from "@components/IconButton";
import withOnlyProfiledUser from "@hoc/withOnlyProfiledUser";
import Layout from "@layout/Layout";
import { RootState, useAppDispatch } from "@store/createStore";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import useGetProfileQuery from "@hooks/useGetProfileQuery";

import style from "./ProfilePage.module.scss";
import classNames from "classnames/bind";
import { api_types } from "@types";
import GithubGeneralStatChart from "@components/GithubGeneralStatChart";
import GitHubLanaguageChart from "@components/GitHubLanaguageChart";
import RepoItem from "@components/RepoItem";
import useGetJobPostQuery from "@hooks/useGetJobPostByUserIdQuery";
import JobPostItem from "@components/JobPostItem";
import useGetApplyQuery from "@hooks/useGetApplyQuery";
import useGetJobPostByUserIdQuery from "@hooks/useGetJobPostByUserIdQuery";
import Button from "@components/Button";
import { logout } from "@store/slice/authSlice";
import { githubOAuthLink } from "@utils/github";
import { Alert } from "@mui/material";
const cx = classNames.bind(style);

function ProfilePage() {
  const nav = useNavigate();

  const [userType, setUserType] = useState<"empty" | "individual" | "business">(
    "empty"
  );

  const [isMe, setIsMe] = useState(false);
  const user = useSelector((v: RootState) => v.auth?.user);
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const { data: jobPostQueryData, isLoading: jobPostQueryLoading } =
    useGetJobPostByUserIdQuery(id as string, {
      refetchOnMount: true,
      enabled: !!id && userType === "business",
    });
  const { data: applyQueryData, isLoading: applyQueryLoading } =
    useGetApplyQuery(
      { apply_user_id: id as string },
      {
        refetchOnMount: true,
        enabled: !!id && userType === "individual",
      }
    );
  const { data: profileQueryData, isLoading: profileQueryLoading } =
    useGetProfileQuery(id as string, {
      refetchOnMount: true,
      enabled: !!id,
    });

  useEffect(() => {
    if (profileQueryData) {
      if (!profileQueryData.is_profile_created) setUserType("empty");
      if (profileQueryData.user_detail_business) setUserType("business");
      if (profileQueryData.user_detail_individual) setUserType("individual");
    } else {
      setUserType("empty");
    }
  }, [profileQueryData]);

  useEffect(() => {
    if (id) {
      if (user) {
        if (Number(id) === Number(user?.id)) {
          setIsMe(true);
        } else {
          setIsMe(false);
        }
      }
    } else {
      nav(`/profile/${user?.id}`, { replace: true });
    }
  }, [id]);

  const profileData = profileQueryData as api_types.UserProfile;

  return (
    <Layout
      header={{
        pageName: isMe ? "내 프로필" : `${profileQueryData?.username}의 프로필`,
        leftButton: !isMe && (
          <IconButton type={"light"} icon={"goback"} onClick={() => nav(-1)} />
        ),
        rightButton: isMe && (
          <IconButton
            type={"light"}
            icon={"edit"}
            onClick={() => {
              nav("/profile/edit");
            }}
          />
        ),
      }}
      footer
      isLoading={
        profileQueryLoading ||
        (userType === "business" && jobPostQueryLoading) ||
        (userType === "individual" && applyQueryLoading)
      }
    >
      <main className={cx("container")}>
        {profileData && (
          <>
            <section className={cx("section-profile")}>
              <div className={cx("profile-image-box")}>
                <img src={profileData.avatar_url} />
              </div>
              <div className={cx("username-box")}>{profileData.username}</div>
              <div className={cx("user-info-list")}>
                {userType === "individual" && (
                  <>
                    <div className={cx("info-item")}>
                      #<b>{profileData.user_detail_individual?.location}</b>거주
                    </div>
                    <div className={cx("info-item")}>
                      #<b>{profileData.user_detail_individual?.annual}</b>년차
                    </div>
                  </>
                )}
                {userType === "business" && (
                  <>
                    <div className={cx("info-item")}>
                      #<b>{profileData.user_detail_business?.capital}</b>원 보유
                    </div>
                    <div className={cx("info-item")}>
                      #<b>{profileData.user_detail_business?.employees}</b>명
                      재직중
                    </div>
                    <div className={cx("info-item")}>
                      #
                      <b>
                        {profileData.user_detail_business?.establishment_date}
                      </b>
                      설립
                    </div>
                  </>
                )}
              </div>
              {userType === "individual" && (
                <>
                  <div className={cx("bio-box")}>
                    {profileData.user_detail_individual?.bio}
                  </div>
                  {user?.user_type === "business" && (
                    <Button
                      variant="contained"
                      onClick={() => {
                        nav(`/direct-offer/${profileData.id}`);
                      }}
                    >
                      제안하기
                    </Button>
                  )}
                </>
              )}
            </section>
            {userType === "business" && (
              <section className={cx("section-jobpost")}>
                <div className={cx("section-header")}>
                  <div className={cx("header-text")}>채용 공고</div>
                  {isMe && (
                    <div
                      className={cx("header-button")}
                      onClick={() => {
                        nav("/jobpost/new");
                      }}
                    >
                      공고 올리기
                    </div>
                  )}
                </div>

                {jobPostQueryData && (
                  <div className={cx("jobpost-list")}>
                    {jobPostQueryData.length > 0 ? (
                      <div className={cx("jobpost-list")}>
                        {jobPostQueryData.map((jobPost) => (
                          <JobPostItem key={jobPost.id} {...jobPost} />
                        ))}
                      </div>
                    ) : (
                      <div>
                        <Alert severity={"info"}>
                          아직 등록한 공고가 없습니다
                        </Alert>
                      </div>
                    )}
                  </div>
                )}
              </section>
            )}
            {userType === "individual" && isMe ? (
              <section className={cx("section-apply")}>
                <div className={cx("section-header")}>
                  <div className={cx("header-text")}>내가 지원한 공고</div>
                </div>
                {applyQueryData && (
                  <div className={cx("apply-list")}>
                    {applyQueryData.length > 0 ? (
                      applyQueryData.map((apply) => (
                        <JobPostItem
                          key={`myapply-${apply.id}`}
                          {...apply.job_post}
                        />
                      ))
                    ) : (
                      <Alert severity={"info"}>
                        아직 지원한 공고가 없습니다
                        <br />
                        <Link to={`/jobs`}>추천 채용 공고 보러가기</Link>
                      </Alert>
                    )}
                  </div>
                )}
              </section>
            ) : null}

            <section className={cx("section-github")}>
              <div className={cx("section-header")}>
                <div className={cx("header-text")}>깃허브 데이터</div>
                {isMe && (
                  <div
                    className={cx("header-button")}
                    onClick={() => {
                      window.location.href = githubOAuthLink;
                    }}
                  >
                    갱신
                  </div>
                )}
              </div>
              <div className={cx("github-data-list")}>
                {profileData.github_user ? (
                  <>
                    <div className={cx("github-item-box")}>
                      <div className={cx("header")}>종합</div>
                      <GithubGeneralStatChart
                        totalRepoCount={
                          profileData.github_user.totalCommitCount
                        }
                        totalCommitCount={
                          profileData.github_user.totalCommitCount
                        }
                        totalIssueCount={
                          profileData.github_user.totalIssueCount
                        }
                        totalPRCount={profileData.github_user.totalPRCount}
                        totalReviewCount={
                          profileData.github_user.totalReviewCount
                        }
                      />
                    </div>
                    <div className={cx("github-item-box")}>
                      <div className={cx("header")}>언어</div>
                      <GitHubLanaguageChart
                        type="pie"
                        languageData={profileData.github_user.totalLangList}
                      />
                    </div>
                    <div className={cx("github-item-box")}>
                      <div className={cx("header")}>프로젝트</div>
                      <div className={cx("github-repo-list")}>
                        {profileData.github_user.repoList.map((repo) => (
                          <RepoItem
                            key={repo.id}
                            repo={repo}
                            onClick={() => {
                              window.open(
                                `https://github.com/${repo.owner.login}/${repo.name}`,
                                "_blank"
                              );
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Alert severity={"info"}>
                    깃허브 데이터 연동이 필요합니다
                  </Alert>
                )}
              </div>
            </section>

            {isMe && (
              <section>
                <Button
                  onClick={() => {
                    dispatch(logout());
                  }}
                >
                  로그아웃
                </Button>
              </section>
            )}
          </>
        )}
      </main>
    </Layout>
  );
}
export default withOnlyProfiledUser(ProfilePage);
