import style from "./JobPostDetail.module.scss";
import classNames from "classnames/bind";
import Layout from "@layout/Layout";
import { useNavigate, useParams } from "react-router-dom";
import IconButton from "@components/IconButton";
import useGetJobPostDetailQuery from "@hooks/useGetJobPostDetailQuery";
import JobPostItem from "@components/JobPostItem";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { useEffect, useMemo, useState } from "react";
import Button from "@components/Button";
import useDeleteJobPostMutation from "@hooks/useDeleteJobPostMutation";
import useCreateApplyMutation from "@hooks/useCraeteApplyMutation";
import useGetApplyQuery from "@hooks/useGetApplyQuery";
import DeveloperItem from "@components/DeveloperItem";
import useGetOfferQuery from "@hooks/useGetOfferQuery";
import useDeleteApplyMutation from "@hooks/useDeleteApplyMutation";
import useAuthUser from "@hooks/useAuthUser";
import withOnlyProfiledUser from "@hoc/withOnlyProfiledUser";
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

  const {
    data: applyData,
    isLoading: applyDataLoading,
    refetch: refetchApplyData,
  } = useGetApplyQuery(
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
    if (window.confirm("?????? ?????????????????????????")) {
      deleteJobPostMutation.mutate(JobPostID, {
        onSuccess: () => {
          alert("????????? ?????????????????????!");
          nav("/");
        },
        onError: () => {
          alert("????????? ??????????????????");
        },
      });
    }
  };

  const onClickApply = () => {
    if (window.confirm("?????? ?????????????????????????")) {
      createApplyMutation.mutate(
        { jobPostId: JobPostID },
        {
          onSuccess: () => {
            alert("?????????????????????");
            refetchApplyData();
          },
          onError: (err) => {
            alert(err);
          },
        }
      );
    }
  };

  const onClickCancleApply = () => {
    if (window.confirm("?????? ?????? ?????????????????????????")) {
      deleteApplyMutation.mutate(myApplyID, {
        onSuccess: () => {
          alert("????????? ?????????????????????");
          refetchApplyData();
        },
        onError: () => {
          alert("????????? ??????????????????. ?????? ??? ?????? ??????????????????");
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
        pageName: "?????? ???????????????",
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
                <div className={cx("label")}>??????</div>
                <div className={cx("value")}>{jobPostData.salary} ??????</div>
              </div>
              <div className={cx("summary-item")}>
                <div className={cx("label")}>??????</div>
                <div className={cx("value")}>
                  {jobPostData.work_type === "full-time"
                    ? "?????????"
                    : "????????????"}
                </div>
              </div>
              <div className={cx("summary-item")}>
                <div className={cx("label")}>??????</div>
                <div className={cx("value")}>{jobPostData.location}</div>
              </div>
            </section>
            <section className={cx("section-requirements")}>
              <div className={cx("header")}>?????? ?????? ?????????</div>
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
                <div className={cx("header")}>?????? ?????? ??????</div>
                <div className={cx("body")}>
                  <div className={cx("offer_updatedAt")}>
                    {new Date(receivedOffer.updatedAt).toLocaleDateString()}???
                  </div>
                  <div className={cx("offer_message")}>
                    {receivedOffer?.offer_message}
                  </div>
                </div>
              </section>
            )}
            {isMine && (
              <section className={cx("section_offer")}>
                <div className={cx("header")}>?????? ?????? ??????</div>
                {offerData && offerData.length > 0 ? (
                  <div className={cx("apply_list")}>
                    {offerData?.map((it) => (
                      <div className={cx("apply_item")} key={it.id}>
                        <div className={cx("label")}>
                          {new Date(it.updatedAt).toLocaleDateString()} ??????
                        </div>
                        <DeveloperItem
                          isContactAble
                          onClick={() => {}}
                          id={it.offer_received_user.id}
                          avatar_url={it.offer_received_user.avatar_url}
                          name={it.offer_received_user.name}
                          bio={
                            it.offer_received_user.user_detail_individual
                              ?.bio as string
                          }
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div>?????? ?????? ????????? ????????????</div>
                )}
              </section>
            )}
            {isMine && (
              <section className={cx("section_apply")}>
                <div className={cx("header")}>?????????</div>
                {applyData && applyData?.length > 0 ? (
                  <div className={cx("apply_list")}>
                    {applyData?.map((it) => (
                      <div className={cx("apply_item")} key={it.id}>
                        <div className={cx("label")}>
                          {new Date(it.updatedAt).toLocaleDateString()} ??????
                        </div>
                        <DeveloperItem
                          onClick={() => {}}
                          isContactAble
                          id={it.apply_user.id}
                          avatar_url={it.apply_user.avatar_url}
                          name={it.apply_user.name}
                          bio={
                            it.apply_user.user_detail_individual?.bio as string
                          }
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div>?????? ???????????? ????????????</div>
                )}
              </section>
            )}
            <section className={cx("section-submit")}>
              {isMine ? (
                <Button variant={"outlined"} onClick={onClickDelete}>
                  ?????? ????????????
                </Button>
              ) : myApplyID ? (
                <Button variant={"outlined"} onClick={onClickCancleApply}>
                  ?????? ????????????
                </Button>
              ) : (
                <Button variant={"contained"} onClick={onClickApply}>
                  ????????????
                </Button>
              )}
            </section>
          </>
        )}
      </div>
    </Layout>
  );
}
export default withOnlyProfiledUser(JobPostDetail);
