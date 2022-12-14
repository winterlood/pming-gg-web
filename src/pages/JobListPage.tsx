import style from "./JobListPage.module.scss";
import classNames from "classnames/bind";
import Layout from "@layout/Layout";
import withOnlyProfiledUser from "@hoc/withOnlyProfiledUser";
import useGetRecommendedJobPost from "@hooks/useGetRecommendedJobPost";
import JobPostItem from "@components/JobPostItem";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useDebounce from "@hooks/useDebounce";
import { Alert } from "@mui/material";
import useGetOutJobPostQuery from "@hooks/useGetOutJobPostQuery";
import { api_types, common_types } from "@types";
const cx = classNames.bind(style);

function JobListPage() {
  const nav = useNavigate();
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const { data: jobPostList, isLoading } = useGetRecommendedJobPost(
    debouncedSearch,
    {
      refetchOnMount: true,
    }
  );

  const { data: outJobList } = useGetOutJobPostQuery();

  return (
    <Layout
      header={{
        pageName: "추천 채용 공고",
        // leftButton: (
        //   <IconButton
        //     type={"light"}
        //     icon={"goback"}
        //     onClick={() => {
        //       nav(-1);
        //     }}
        //   />
        // ),
      }}
      footer
      isLoading={isLoading}
    >
      <main className={cx("container")}>
        {/* <section className={cx("section-search")}>
          <BaseInput
            placeholder="검색"
            type="email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </section> */}
        {jobPostList && (
          <section className={cx("section-list")}>
            {jobPostList?.length > 0 ? (
              jobPostList?.map((jobPost) => (
                <JobPostItem key={jobPost.id} {...jobPost} />
              ))
            ) : (
              <Alert severity={"info"}>아직 등록된 공고가 없습니다</Alert>
            )}
          </section>
        )}

        {outJobList && (
          <section className={cx("section-list")}>
            <div className={cx("section_header")}>외부 채용 공고</div>
            {outJobList.map((it) => (
              <JobPostItem
                id={it.id}
                thumbnail_url={it.title_img.thumb}
                duty={it.position}
                salary={"???"}
                work_type={"full-time"}
                location={"???"}
                requirements={[]}
                author={
                  {
                    avatar_url: it.logo_img.origin,
                    name: it.company.name,
                  } as api_types.UserProfile & common_types.BusinessUserInfo
                }
                onClick={() => {
                  window.open(`https://www.wanted.co.kr/wd/${it.id}`);
                }}
              />
            ))}
          </section>
        )}
      </main>
    </Layout>
  );
}
export default withOnlyProfiledUser(JobListPage);
