import GithubGeneralStatChart from "@components/GithubGeneralStatChart";
import GitHubLanaguageChart from "@components/GitHubLanaguageChart";
import IconButton from "@components/IconButton";
import withOnlyProfiledUser from "@hoc/withOnlyProfiledUser";
import useGithubHistoryMutation from "@hooks/useGithubHistoryMutation";
import useGithubLoginMutation from "@hooks/useGithubLoginMutation";
import useGithubUserInfoMutation from "@hooks/useGithubUserInfoMutation";
import Layout from "@layout/Layout";
import { Avatar, CircularProgress, LinearProgress } from "@mui/material";
import { api_types } from "@types";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import style from "./GitHubConnectPage.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(style);

function GitHubConnectPage() {
  const nav = useNavigate();

  const [ghProfile, setGhProfile] = useState<{
    avatar_url: string;
    bio: string;
    followers: number;
    following: number;
    login: string;
    name: string;
    location: string;
  } | null>(null);
  const [ghAccessInfo, setGhAccessInfo] = useState<{
    access_token: string;
    token_type: string;
  } | null>(null);

  const [ghHistory, setGhHistory] = useState<api_types.GitHubHistory | null>(
    null
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const { mutate: githubLoginMutate } = useGithubLoginMutation();
  const { mutate: githubUserInfoMutate } = useGithubUserInfoMutation();
  const {
    mutate: githubHistoryMutate,
    isLoading: isHistoryPending,
    status: historyStatus,
  } = useGithubHistoryMutation();
  const code = searchParams.get("code");

  const getGhProfile = () => {
    if (ghAccessInfo) {
      const { access_token, token_type } = ghAccessInfo;
      githubUserInfoMutate(
        { access_token, token_type },
        {
          onSuccess: (data) => {
            const {
              avatar_url,
              bio,
              followers,
              following,
              login,
              name,
              location,
            } = data.data;
            setGhProfile({
              avatar_url,
              bio,
              followers,
              following,
              login,
              name,
              location,
            });
          },
          onError: () => {},
        }
      );
    }
  };

  const getGhHistory = () => {
    if (ghAccessInfo && ghProfile) {
      githubHistoryMutate(
        {
          login: ghProfile.login,
          ...ghAccessInfo,
        },
        {
          onSuccess: (data) => {
            setGhHistory(data);
          },
        }
      );
    }
  };

  useEffect(() => {
    getGhProfile();
  }, [ghAccessInfo]);

  useEffect(() => {
    getGhHistory();
  }, [ghProfile]);

  useEffect(() => {
    if (ghHistory) {
      sessionStorage.setItem(
        "github-user-data",
        JSON.stringify({
          profile: ghProfile,
          history: ghHistory,
        })
      );
      nav("/profile/edit/github", { replace: true });
    }
  }, [ghHistory]);

  useEffect(() => {
    if (!ghAccessInfo) {
      githubLoginMutate(code, {
        onSuccess: (data) => {
          const { access_token, token_type } =
            data.data as api_types.GithubLoginResult;
          setGhAccessInfo({ access_token, token_type });
        },
        onError: () => {
          alert("깃허브 로그인 중 오류가 발생했습니다. 다시 시도하세요");
          nav("/profile", { replace: true });
        },
      });
    }
  }, []);

  return (
    <div>
      <Layout
        header={{
          leftButton: (
            <IconButton type={"light"} icon={"goback"} onClick={() => {}} />
          ),
          pageName: "깃허브 연동",
        }}
      >
        {!ghProfile && <CircularProgress />}
        {ghProfile && (
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <Avatar
              sx={{
                width: "100px",
                height: "100px",
              }}
              src={ghProfile.avatar_url}
            />
            <div>
              <div style={{ fontWeight: "bold", fontSize: "15px" }}>
                {ghProfile.login}
              </div>
              <div>{ghProfile.name}</div>
              <div>{ghProfile.followers} 팔로워</div>
              <div>{ghProfile.following} 팔로잉</div>
            </div>
          </div>
        )}

        {!historyStatus && <button onClick={getGhHistory}>GH HISTORY</button>}
        {isHistoryPending && <CircularProgress />}

        {ghHistory && (
          <div>
            <div
              style={{
                padding: "15px",
                background: "rgb(250,250,250)",
                borderRadius: "5px",
                marginTop: "15px",
              }}
            >
              <h2>종합</h2>
              <div style={{ width: "100%", height: "500px", margin: "0 auto" }}>
                <GithubGeneralStatChart
                  totalRepoCount={ghHistory.totalRepoCount}
                  totalCommitCount={ghHistory.totalCommitCount}
                  totalIssueCount={ghHistory.totalIssueCount}
                  totalPRCount={ghHistory.totalPRCount}
                  totalReviewCount={ghHistory.totalReviewCount}
                />
              </div>

              <div>
                총 <b>{ghHistory.totalRepoCount}</b>개의 레포지토리 생성
              </div>
              <div>
                총 <b>{ghHistory.totalCommitCount}</b>번의 커밋
              </div>
              <div>
                총 <b>{ghHistory.totalIssueCount}</b>개의 이슈
              </div>
              <div>
                총 <b>{ghHistory.totalPRCount}</b>번의 PR
              </div>
              <div>
                총 <b>{ghHistory.totalReviewCount}</b>번의 리뷰
              </div>
            </div>

            <div
              style={{
                padding: "15px",
                background: "rgb(250,250,250)",
                borderRadius: "5px",
                marginTop: "15px",
              }}
            >
              <h2>기여</h2>
              <div>
                커밋한 레포지 수 : <b>{ghHistory.totalCommitRepoCount}</b>개
              </div>
              <div>
                이슈를 만든 레포지 수 : <b>{ghHistory.totalIssueRepoCount}</b>개
              </div>
              <div>
                PR을 만든 레포지 수 : <b>{ghHistory.totalPRRepoCount}</b>개
              </div>
              <div>
                PR을 리뷰한 레포지 수 : <b>{ghHistory.totalReviewRepoCount}</b>
                개
              </div>
            </div>

            <div
              style={{
                padding: "15px",
                background: "rgb(250,250,250)",
                borderRadius: "5px",
                marginTop: "15px",
              }}
            >
              <h2>언어 종합</h2>

              <div style={{ width: "100%", height: "500px", margin: "0 auto" }}>
                <GitHubLanaguageChart
                  type="pie"
                  languageData={ghHistory.totalLangList}
                />
              </div>

              <div style={{ width: "100%", height: "500px", margin: "0 auto" }}>
                <GitHubLanaguageChart
                  type="bar"
                  languageData={ghHistory.totalLangList}
                />
              </div>

              {ghHistory.totalLangList.map((lang) => (
                <div
                  key={lang.name}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <div
                    style={{
                      textAlign: "left",
                      marginBottom: "30px",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          borderLeft: `10px solid ${lang.color}`,
                          marginBottom: "10px",
                          paddingLeft: "10px",
                          display: "flex",
                          alignItems: "center",
                          fontSize: "15px",
                        }}
                      >
                        <b>{lang.name}</b>
                      </div>
                    </div>
                    <div>{lang.size} Bytes</div>
                    <div>이 언어를 사용하는 레포지 개수 : {lang.count}</div>
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                padding: "15px",
                background: "rgb(250,250,250)",
                borderRadius: "5px",
                marginTop: "15px",
              }}
            >
              <h2>토픽 종합</h2>
              <div
                style={{
                  marginBottom: "10px",
                  fontSize: "15px",
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "10px",
                }}
              >
                {ghHistory.topicList.map((topic) => (
                  <div key={topic.name}>
                    <div
                      style={{
                        backgroundColor: "#f0f5fa",
                        color: "#0078ff",
                        padding: "3px 10px",
                        fontSize: "12px",
                        fontWeight: "bold",
                        borderRadius: "5px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {topic.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              style={{
                padding: "15px",
                background: "rgb(250,250,250)",
                borderRadius: "5px",
                marginTop: "15px",
              }}
            >
              <h2>저장소 종합</h2>
              {ghHistory.repoList.map((repo) => (
                <div
                  style={{
                    marginBottom: "30px",
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "white",
                    padding: "10px 15px",
                    border: "1px solid rgb(235,235,235)",
                    borderRadius: "5px",
                  }}
                  key={repo.id}
                >
                  <div>
                    <div style={{ marginBottom: "10px" }}>
                      <img
                        style={{
                          width: "100%",
                          height: "210px",
                          objectFit: "cover",
                        }}
                        src={repo.openGraphImageUrl}
                      />
                    </div>
                    <div style={{ fontSize: "13px", color: "gray" }}>
                      {repo.owner.login}/{repo.name}
                    </div>
                    <h3 style={{ marginBottom: "5px", fontSize: "20px" }}>
                      {repo.name}
                    </h3>
                  </div>

                  <div
                    style={{
                      flex: 1,
                      display: "flex",
                      gap: "5px",
                      flexWrap: "wrap",
                    }}
                  >
                    {repo.topicList.map((topic: string) => (
                      <div
                        style={{
                          backgroundColor: "#f0f5fa",
                          color: "#0078ff",
                          padding: "3px 10px",
                          fontSize: "12px",
                          fontWeight: "bold",
                          borderRadius: "5px",
                          whiteSpace: "nowrap",
                        }}
                        key={`${repo.name}-${topic}`}
                      >
                        {topic}
                      </div>
                    ))}
                  </div>

                  <div
                    style={{
                      marginTop: "20px",
                      flex: 1,
                      display: "flex",
                      gap: "5px",
                      flexWrap: "wrap",
                    }}
                  >
                    <div>STAR : {repo.starCount}</div>
                    <div>FORK : {repo.forkCount}</div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "20px",
                    }}
                  >
                    <div
                      style={{
                        padding: "15px 10px",
                        border: "1px solid rgb(240,240,240)",
                        borderRadius: "5px",
                        backgroundColor: "rgb(250,250,250)",
                      }}
                    >
                      <div style={{ fontWeight: "bold" }}>기여도 : 커밋</div>
                      <div>
                        {Math.floor(
                          (repo.userCommitCount / repo.totalCommitCount) * 100
                        )}
                        %
                      </div>
                      <LinearProgress
                        sx={{
                          marginTop: "10px",
                          height: "25px",
                          borderRadius: "5px",
                        }}
                        variant="determinate"
                        value={
                          (repo.userCommitCount / repo.totalCommitCount) * 100
                        }
                      />
                    </div>
                  </div>

                  <div
                    style={{
                      marginTop: "20px",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    {repo.languageList.map((lang: any) => (
                      <div
                        key={lang.name}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "10px",
                        }}
                      >
                        <div
                          style={{
                            textAlign: "left",
                            marginBottom: "30px",
                          }}
                        >
                          <div>
                            <div
                              style={{
                                borderLeft: `10px solid ${lang.color}`,
                                marginBottom: "10px",
                                paddingLeft: "10px",
                                display: "flex",
                                alignItems: "center",
                                fontSize: "15px",
                              }}
                            >
                              <b>{lang.name}</b>
                            </div>
                          </div>
                          <div>{lang.size} Bytes</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Layout>
    </div>
  );
}
export default withOnlyProfiledUser(GitHubConnectPage);
