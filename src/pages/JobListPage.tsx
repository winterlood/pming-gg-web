import style from "./JobListPage.module.scss";
import classNames from "classnames/bind";
import Layout from "@layout/Layout";
import IconButton from "@components/IconButton";
import withOnlyProfiledUser from "@hoc/withOnlyProfiledUser";
import useGetRecommendedJobPost from "@hooks/useGetRecommendedJobPost";
import JobPostItem from "@components/JobPostItem";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { BaseInput } from "@components/Input";
import useDebounce from "@hooks/useDebounce";
import { Alert } from "@mui/material";
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
      </main>
    </Layout>
  );
}
export default withOnlyProfiledUser(JobListPage);
