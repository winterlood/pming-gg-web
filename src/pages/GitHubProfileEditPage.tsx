import style from "./GitHubProfileEditPage.module.scss";
import classNames from "classnames/bind";
import { Suspense, useEffect, useState } from "react";
import { api_types } from "@types";
import { useNavigate } from "react-router-dom";
import Layout from "@layout/Layout";
import IconButton from "@components/IconButton";
import GithubGeneralStatChart from "@components/GithubGeneralStatChart";
import GitHubLanaguageChart from "@components/GitHubLanaguageChart";
import Button from "@components/Button";
import useCreategithubProfileMutation from "@hooks/useCreateGithubProfileMutation";
import { useSelector } from "react-redux";
import { RootState } from "@store/createStore";
import RepoItem from "@components/RepoItem";
const cx = classNames.bind(style);

type State = {
  profile: api_types.GitHubProfile;
  history: api_types.GitHubHistory;
};

function GitHubProfileEditPage() {
  const user = useSelector((v: RootState) => v.auth?.user);
  const nav = useNavigate();
  const [data, setData] = useState<State | null>(null);
  const [selectedRepo, setSelectedRepo] = useState<string[]>([]);
  const { mutate } = useCreategithubProfileMutation();

  useEffect(() => {
    try {
      const githubData = JSON.parse(
        sessionStorage.getItem("github-user-data") as string
      );
      if (!githubData) {
        throw new Error();
      }
      setData(githubData);
    } catch (err) {
      console.log(err);
      nav("/profile", { replace: true });
    }

    return () => {
      // sessionStorage.removeItem("github-user-data");
    };
  }, []);

  const onClickRepo = (id: string) => {
    if (selectedRepo.includes(id)) {
      setSelectedRepo(selectedRepo.filter((repoId) => repoId !== id));
    } else {
      setSelectedRepo([...selectedRepo, id]);
    }
  };

  const onClickSubmit = () => {
    if (data?.history && data.profile) {
      const selectedRepoData: api_types.GitHubHistory["repoList"] =
        data.history.repoList.filter((repo) => selectedRepo.includes(repo.id));
      console.log(selectedRepoData);
      if (window.confirm("????????? ????????? ????????? ?????????????????????????")) {
        mutate(
          {
            ...data.history,
            repoList: selectedRepoData,
            user: user?.id,
          },
          {
            onSuccess: (data) => {
              nav("/profile", { replace: true });
            },
            onError: (err) => {
              alert("????????? ?????????????????? ?????? ??????????????????");
            },
          }
        );
      }
    }
  };

  if (data) {
    const { profile, history } = data;
    return (
      <Layout
        header={{
          leftButton: (
            <IconButton type={"light"} icon={"goback"} onClick={() => {}} />
          ),
          pageName: "????????? ??????",
        }}
      >
        <div className={cx("container")}>
          <div className={cx("inner")}>
            <section className={cx("section-profile")}>
              <div className={cx("avatar-box")}>
                <img src={profile.avatar_url} />
              </div>
              <div className={cx("name-box")}>{profile.login}</div>
              <div className={cx("stat-box")}>
                <div>
                  <b>{profile.followers}</b>&nbsp;follower
                </div>
                <div>
                  <b>{profile.following}</b>&nbsp;following
                </div>
              </div>
              <div className={cx("stat-box")}>
                <div>
                  <b>{history.totalCommitCount}</b>&nbsp;commit
                </div>
                <div>
                  <b>{history.totalIssueCount}</b>&nbsp;issue
                </div>
                <div>
                  <b>{history.totalPRCount}</b>&nbsp;pull request
                </div>
              </div>
              <div className={cx("top-language-list")}>
                {history.firstLangName && (
                  <div className={cx("top-lanaguage")}>
                    {history.firstLangName}
                  </div>
                )}
                {history.secondLangName && (
                  <div className={cx("top-lanaguage")}>
                    {history.secondLangName}
                  </div>
                )}
                {history.thirdLangName && (
                  <div className={cx("top-lanaguage")}>
                    {history.thirdLangName}
                  </div>
                )}
              </div>
            </section>
            <section className={cx("section-general-stat")}>
              <div className={cx("section-header")}>??????</div>
              <div className={cx("section-body")}>
                <div
                  style={{ width: "100%", height: "400px", margin: "0 auto" }}
                >
                  <GithubGeneralStatChart
                    totalRepoCount={history.totalRepoCount}
                    totalCommitCount={history.totalCommitCount}
                    totalIssueCount={history.totalIssueCount}
                    totalPRCount={history.totalPRCount}
                    totalReviewCount={history.totalReviewCount}
                  />
                </div>
              </div>
            </section>
            <section className={cx("section-general-stat")}>
              <div className={cx("section-header")}>??????????????? ??????</div>
              <div className={cx("section-body")}>
                <div
                  style={{ width: "100%", height: "400px", margin: "0 auto" }}
                >
                  <GitHubLanaguageChart
                    type="pie"
                    languageData={history.totalLangList}
                  />
                </div>
                <div
                  style={{ width: "100%", height: "500px", margin: "0 auto" }}
                >
                  <GitHubLanaguageChart
                    type="bar"
                    languageData={history.totalLangList}
                  />
                </div>
              </div>
            </section>
            <section className={cx("section-repos")}>
              <div className={cx("section-header")}>
                ????????? ??????
                <div className={cx("header-descript")}>
                  ???????????? ????????? ???????????? 3??? ?????? ???????????????
                </div>
              </div>

              <div className={cx("repo-list-box")}>
                {history.repoList.map((repo) => (
                  <RepoItem
                    key={repo.id}
                    repo={repo}
                    className={[
                      cx("repo-item"),
                      selectedRepo.includes(repo.id) &&
                        cx("repo-item-selected"),
                    ].join(" ")}
                    onClick={() => onClickRepo(repo.id)}
                  />
                ))}
              </div>
            </section>

            <section className={cx("section-submit")}>
              <Button onClick={() => {}} variant={"outlined"}>
                ????????? ??????
              </Button>
              <Button onClick={onClickSubmit} variant={"contained"}>
                ????????????
              </Button>
            </section>
          </div>
        </div>
      </Layout>
    );
  } else {
    return (
      <Layout
        header={{
          leftButton: (
            <IconButton type={"light"} icon={"goback"} onClick={() => {}} />
          ),
          pageName: "????????? ??????",
        }}
      >
        <div>??????</div>
      </Layout>
    );
  }
}
export default GitHubProfileEditPage;
