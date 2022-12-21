import style from "./JobPostDetail.module.scss";
import classNames from "classnames/bind";
import Layout from "@layout/Layout";
import { useNavigate, useParams } from "react-router-dom";
import IconButton from "@components/IconButton";
import useGetJobPostDetailQuery from "@hooks/useGetJobPostDetailQuery";
import JobPostItem from "@components/JobPostItem";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { useSelector } from "react-redux";
import { RootState } from "@store/createStore";
import { useEffect, useState } from "react";
import Button from "@components/Button";
import useDeleteJobPostMutation from "@hooks/useDeleteJobPostMutation";
import useCreateApplyMutation from "@hooks/useCraeteApplyMutation";
const cx = classNames.bind(style);

function JobPostDetail() {
  const nav = useNavigate();
  const auth = useSelector((v: RootState) => v.auth?.user);
  const { id } = useParams();
  const deleteJobPostMutation = useDeleteJobPostMutation();
  const createApplyMutation = useCreateApplyMutation();
  const { data, isLoading } = useGetJobPostDetailQuery(id as string, {
    staleTime: 0,
    refetchOnMount: true,
    enabled: !!id,
  });
  const [isMine, setIsMine] = useState(false);

  useEffect(() => {
    if (data && auth) {
      if (data.author.id === auth.id) {
        setIsMine(true);
      }
    }
  }, [data]);

  const onClickDelete = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      deleteJobPostMutation.mutate(id, {
        onSuccess: () => {
          alert("공고가 삭제되었습니다!");
          nav("/");
        },
        onError: () => {
          alert("오류가 발생했습니다");
        },
      });
    }
  };

  const onClickApply = () => {
    if (window.confirm("정말 지원하시겠습니까?")) {
      createApplyMutation.mutate(
        { jobPostId: id },
        {
          onSuccess: () => {
            alert("지원되었습니다");
          },
          onError: (err) => {
            alert(err);
          },
        }
      );
    }
  };

  return (
    <Layout
      header={{
        pageName: "공고 자세히보기",
        leftButton: (
          <IconButton
            type={"light"}
            icon={"goback"}
            onClick={() => {
              nav(-1);
            }}
          />
        ),
        rightButton: isMine && (
          <IconButton
            type={"light"}
            icon={"edit"}
            onClick={() => {
              nav(`/jobpost/edit/${id}`);
            }}
          />
        ),
      }}
      isLoading={isLoading || deleteJobPostMutation.isLoading}
    >
      <div className={cx("container")}>
        {data && (
          <>
            <section className={cx("section-thumbnail")}>
              <img src={data?.thumbnail_url} />
            </section>
            <section className={cx("section-head")}>
              <JobPostItem disabled {...data} />
            </section>
            <section className={cx("section-summary")}>
              <div className={cx("summary-item")}>
                <div className={cx("label")}>연봉</div>
                <div className={cx("value")}>{data.salary} 만원</div>
              </div>
              <div className={cx("summary-item")}>
                <div className={cx("label")}>방식</div>
                <div className={cx("value")}>
                  {data.work_type === "full-time" ? "풀타임" : "파트타임"}
                </div>
              </div>
              <div className={cx("summary-item")}>
                <div className={cx("label")}>지역</div>
                <div className={cx("value")}>{data.location}</div>
              </div>
            </section>
            <section className={cx("section-requirements")}>
              <div className={cx("header")}>이런 분을 원해요</div>
              <div className={cx("requirement_list")}>
                {data.requirements.map((require, idx) => (
                  <div
                    key={`require-${idx}`}
                    className={cx("requirement-item")}
                  >
                    <TaskAltIcon />
                    {require}
                  </div>
                ))}
              </div>
            </section>
            <section className={cx("section-submit")}>
              {isMine ? (
                <>
                  <Button variant={"outlined"} onClick={onClickDelete}>
                    공고 삭제하기
                  </Button>
                </>
              ) : (
                <>
                  <Button variant={"contained"} onClick={onClickApply}>
                    지원하기
                  </Button>
                </>
              )}
            </section>
          </>
        )}
      </div>
    </Layout>
  );
}
export default JobPostDetail;
