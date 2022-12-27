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
import { useEffect, useMemo, useState } from "react";
import Button from "@components/Button";
import useDeleteJobPostMutation from "@hooks/useDeleteJobPostMutation";
import useCreateApplyMutation from "@hooks/useCraeteApplyMutation";
import useGetApplyQuery from "@hooks/useGetApplyQuery";
import DeveloperItem from "@components/DeveloperItem";
import useGetOfferQuery from "@hooks/useGetOfferQuery";
import useDeleteApplyMutation from "@hooks/useDeleteApplyMutation";
import useAuthUser from "@hooks/useAuthUser";
const cx = classNames.bind(style);

function JobPostDetail() {
  const { user } = useAuthUser();
  const nav = useNavigate();

  const { id: JobPostID } = useParams();
  const deleteJobPostMutation = useDeleteJobPostMutation();
  const createApplyMutation = useCreateApplyMutation();
  const deleteApplyMutation = useDeleteApplyMutation();

  const { data: jobPostData, isLoading: jobPostDataLoading } =
    useGetJobPostDetailQuery(JobPostID as string, {
      staleTime: 0,
      refetchOnMount: true,
      enabled: !!JobPostID,
    });

  const [isMine, setIsMine] = useState(false);

  const { data: applyData, isLoading: applyDataLoading } = useGetApplyQuery(
    {
      job_post_id: JobPostID,
    },
    { refetchOnMount: true, enabled: !!JobPostID }
  );

  const { data: offerData, isLoading: offerDataLoading } = useGetOfferQuery(
    {
      job_post_id: JobPostID,
    },
    { refetchOnMount: true, enabled: !!JobPostID }
  );

  useEffect(() => {
    if (jobPostData && user) {
      if (jobPostData.author.id === user.id) {
        setIsMine(true);
      }
    }
  }, [jobPostData]);

  const onClickDelete = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      deleteJobPostMutation.mutate(JobPostID, {
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
        { jobPostId: JobPostID },
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

  const onClickCancleApply = () => {
    if (window.confirm("정말 지원 취소하시겠습니까?")) {
      deleteApplyMutation.mutate(myApplyID, {
        onSuccess: () => {
          alert("지원이 취소되었습니다");
          nav(`/profile/${user?.id}`);
        },
        onError: () => {
          alert("오류가 발생했습니다. 잠시 후 다시 시도해보세요");
        },
      });
    }
  };

  const myApplyID = useMemo(() => {
    if (!isMine) {
      const myApply = applyData?.find((it) => it.apply_user.id === user?.id);
      if (myApply) {
        return myApply.id;
      }
    }
    return false;
  }, [applyData]);

  const receivedOffer = useMemo(() => {
    if (!isMine) {
      const offer = offerData?.find(
        (it) => it.offer_received_user.id === user.id
      );
      return offer;
    }
  }, [offerData]);

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
              nav(`/jobpost/edit/${JobPostID}`);
            }}
          />
        ),
      }}
      isLoading={jobPostDataLoading || deleteJobPostMutation.isLoading}
    >
      <div className={cx("container")}>
        {jobPostData && (
          <>
            {jobPostData?.thumbnail_url && (
              <section className={cx("section-thumbnail")}>
                <img
                  src={jobPostData?.thumbnail_url}
                  alt={"job post thumbnail"}
                />
              </section>
            )}
            <section className={cx("section-head")}>
              <JobPostItem disabled {...jobPostData} />
            </section>
            <section className={cx("section-summary")}>
              <div className={cx("summary-item")}>
                <div className={cx("label")}>연봉</div>
                <div className={cx("value")}>{jobPostData.salary} 만원</div>
              </div>
              <div className={cx("summary-item")}>
                <div className={cx("label")}>방식</div>
                <div className={cx("value")}>
                  {jobPostData.work_type === "full-time"
                    ? "풀타임"
                    : "파트타임"}
                </div>
              </div>
              <div className={cx("summary-item")}>
                <div className={cx("label")}>지역</div>
                <div className={cx("value")}>{jobPostData.location}</div>
              </div>
            </section>
            <section className={cx("section-requirements")}>
              <div className={cx("header")}>이런 분을 원해요</div>
              <div className={cx("requirement_list")}>
                {jobPostData.requirements.map((require, idx) => (
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
            {user.user_type === "individual" && receivedOffer && (
              <section className={cx("section_received_offer")}>
                <div className={cx("header")}>내가 받은 제안</div>
                <div className={cx("body")}>
                  <div className={cx("offer_updatedAt")}>
                    {new Date(receivedOffer.updatedAt).toLocaleDateString()}일
                  </div>
                  <div className={cx("offer_message")}>
                    {receivedOffer?.offer_message}
                  </div>
                </div>
              </section>
            )}
            {isMine && (
              <section className={cx("section_offer")}>
                <div className={cx("header")}>내가 보낸 제안</div>
                {offerData && offerData.length > 0 ? (
                  <div className={cx("apply_list")}>
                    {offerData?.map((it) => (
                      <div className={cx("apply_item")} key={it.id}>
                        <div className={cx("label")}>
                          {new Date(it.updatedAt).toLocaleDateString()} 제안
                        </div>
                        <DeveloperItem
                          isContactAble
                          onClick={() => {}}
                          id={it.offer_received_user.id}
                          avatar_url={it.offer_received_user.avatar_url}
                          name={it.offer_received_user.username}
                          bio={
                            it.offer_received_user.user_detail_individual
                              ?.bio as string
                          }
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div>아직 보낸 제안이 없습니다</div>
                )}
              </section>
            )}
            {isMine && (
              <section className={cx("section_apply")}>
                <div className={cx("header")}>지원자</div>
                {applyData && applyData?.length > 0 ? (
                  <div className={cx("apply_list")}>
                    {applyData?.map((it) => (
                      <div className={cx("apply_item")} key={it.id}>
                        <div className={cx("label")}>
                          {new Date(it.updatedAt).toLocaleDateString()} 지원
                        </div>
                        <DeveloperItem
                          onClick={() => {}}
                          isContactAble
                          id={it.apply_user.id}
                          avatar_url={it.apply_user.avatar_url}
                          name={it.apply_user.username}
                          bio={
                            it.apply_user.user_detail_individual?.bio as string
                          }
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div>아직 지원자가 없습니다</div>
                )}
              </section>
            )}
            <section className={cx("section-submit")}>
              {isMine ? (
                <Button variant={"outlined"} onClick={onClickDelete}>
                  공고 삭제하기
                </Button>
              ) : myApplyID ? (
                <Button variant={"outlined"} onClick={onClickCancleApply}>
                  지원 취소하기
                </Button>
              ) : (
                <Button variant={"contained"} onClick={onClickApply}>
                  지원하기
                </Button>
              )}
            </section>
          </>
        )}
      </div>
    </Layout>
  );
}
export default JobPostDetail;
