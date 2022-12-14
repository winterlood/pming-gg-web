import IconButton from "@components/IconButton";
import useGetJobPostByUserIdQuery from "@hooks/useGetJobPostByUserIdQuery";
import useGetProfileQuery from "@hooks/useGetProfileQuery";
import Layout from "@layout/Layout";
import { RootState } from "@store/createStore";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

import style from "./DirectOfferPage.module.scss";
import classNames from "classnames/bind";
import { Alert, InputBase } from "@mui/material";
import { LabeledInputContainer, MultilineInput } from "@components/Input";
import { Controller, useForm } from "react-hook-form";
import JobPostItem from "@components/JobPostItem";
import { useMemo, useRef, useState } from "react";
import Button from "@components/Button";
import useCreateOfferMutation from "@hooks/useCreateOfferMutation";
import useGetOfferQuery from "@hooks/useGetOfferQuery";

const cx = classNames.bind(style);

function DirectOfferPage() {
  const [recoPost, setRecoPost] = useState<string>();
  const { handleSubmit, control } = useForm();
  const nav = useNavigate();
  const { id: developerID } = useParams();
  const submitRef = useRef(null);

  const user = useSelector((v: RootState) => v.auth?.user);
  const myID = user?.id;

  const { data: developerProfile, isLoading: profileDataQueryLoading } =
    useGetProfileQuery(developerID as string, {
      refetchOnMount: true,
      enabled: !!developerID,
    });

  const { data: offeredJobPost, isLoading: offeredJobPostLoading } =
    useGetOfferQuery(
      {
        offer_send_user_id: myID,
        offer_received_user_id: developerID,
      },
      { refetchOnMount: true }
    );

  const { data: myJobPosts, isLoading: jobPostQueryLoading } =
    useGetJobPostByUserIdQuery(myID as string, {
      refetchOnMount: true,
      enabled: !!user?.id && user?.user_type === "business",
    });

  const { mutate, isLoading: isOfferMutationLoading } =
    useCreateOfferMutation();

  const offerAvailableJobPost = useMemo(() => {
    if (offeredJobPost && myJobPosts) {
      const offeredJobPostIDs = offeredJobPost?.map((it) => it.job_post.id);
      const offerAvailableJobPost = myJobPosts.filter(
        (it) => !offeredJobPostIDs.includes(it.id)
      );
      return offerAvailableJobPost;
    } else {
      return [];
    }
  }, [offeredJobPost, myJobPosts]);

  const onSubmit = (data: any) => {
    const { message } = data;

    if (!recoPost) {
      alert("????????? ?????? ????????? ???????????????");
      return;
    }

    mutate(
      {
        offer_job_post_id: recoPost,
        offer_message: message,
        offer_received_user_id: developerID,
      },
      {
        onSuccess: () => {
          alert("??????????????? ????????? ??????????????? ????");
          nav(`/profile/${developerID}`);
        },
        onError: (err) => {
          // @ts-ignore
          alert(err);
        },
      }
    );
  };

  return (
    <Layout
      header={{
        pageName: "????????????",
        leftButton: (
          <IconButton
            type={"light"}
            icon={"goback"}
            onClick={() => {
              nav(-1);
            }}
          />
        ),
      }}
      isLoading={
        profileDataQueryLoading ||
        offeredJobPostLoading ||
        jobPostQueryLoading ||
        isOfferMutationLoading
      }
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={cx("container")}>
          <section className={cx("section_developer")}>
            <div className={cx("avatar_row")}>
              <img alt="developer avatar" src={developerProfile?.avatar_url} />
            </div>
            <div className={cx("info_row")}>
              <div className={cx("name")}>{developerProfile?.name}</div>
              <div className={cx("bio")}>
                {developerProfile?.user_detail_individual?.bio}
              </div>
            </div>
          </section>
          <section className={cx("section_letter")}>
            <LabeledInputContainer label="?????? ?????????">
              <Controller
                defaultValue=""
                name="message"
                control={control}
                rules={{ required: true }}
                render={(props: any) => (
                  <MultilineInput
                    placeholder="?????? ???????????? ????????? ?????????"
                    type="text"
                    value={props.field.value}
                    onChange={props.field.onChange}
                  />
                )}
              />
            </LabeledInputContainer>
          </section>
          {offeredJobPost && offeredJobPost?.length > 0 && (
            <section className={cx("section_mypost")}>
              <div className={cx("label")}>?????? ????????? ?????? ??????</div>
              <div className={cx("post_list")}>
                {offeredJobPost?.map(({ job_post }) => (
                  <JobPostItem
                    key={`offered_job_post_${job_post.id}`}
                    {...job_post}
                  />
                ))}
              </div>
            </section>
          )}
          <section className={cx("section_mypost")}>
            <div className={cx("label")}>????????? ?????? ????????? ???????????????</div>
            <div className={cx("post_list")}>
              {offerAvailableJobPost && offerAvailableJobPost.length > 0 ? (
                offerAvailableJobPost.map((it) => (
                  <JobPostItem
                    key={it.id}
                    isHighlight={recoPost === it.id}
                    {...it}
                    onClick={() => {
                      setRecoPost(it.id);
                    }}
                  />
                ))
              ) : (
                <Alert severity={"error"}>
                  ?????? ????????? ????????? ????????????
                  <br />
                  ?????? ????????? ?????? ?????? 1??? ????????? ????????? ????????? ???????????????
                  <br />
                  <Link to={`/jobpost/new`}>????????? ?????? ????????????</Link>
                </Alert>
              )}
            </div>
          </section>
          <section className={cx("section_submit")}>
            <Button
              variant={"contained"}
              onClick={() => {
                if (submitRef.current) {
                  // @ts-ignore
                  submitRef.current.click();
                }
              }}
            >
              ????????????
            </Button>
          </section>
        </div>
        <div className={cx("hidden")}>
          <input ref={submitRef} type={"submit"} />
        </div>
      </form>
    </Layout>
  );
}

export default DirectOfferPage;
