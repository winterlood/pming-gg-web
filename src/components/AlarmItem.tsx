import readAlarm from "@api/readAlarm";
import useAuthUser from "@hooks/useAuthUser";
import { api_types } from "@types";
import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";
import style from "./AlarmItem.module.scss";

/*
 1. 비즈니스 유저에게 보이는 알람 문구
 
 새로운 지원자
 {send_user}님이 {job_post}에 지원했어요.

 이정환 님이 "프론트엔드 개발자"에 지원했어요
 
 (클릭시 채용 공고로 이동)
*/

/*
 2. 개인 유저에게 보이는 알람 문구

 새로운 제안 도착
 {send_user}이 {job_post}를 제안했어요.

 "당근마켓"이 "프론트엔드 개발자"를 제안했어요

 (클릭시 채용 공고로 이동)

 */

const cx = classNames.bind(style);

interface Props extends api_types.Alarm {}

export default function AlarmItem(props: Props) {
  const nav = useNavigate();
  const { user } = useAuthUser();

  const msg = {
    title: user.user_type === "business" ? "새로운 지원" : "새로운 제안",
    body:
      user.user_type === "business"
        ? `${props.send_user.username}님이 ${props.job_post.duty}에 지원했어요`
        : `${props.send_user.username}이 ${props.job_post.duty}를 제안했어요`,
  };

  const containerClassName = !props.is_checked
    ? [cx("container"), cx("new")].join(" ")
    : cx("container");

  const onClickAlarm = () => {
    if (!props.is_checked) {
      readAlarm(props.id);
    }
    nav(`/jobpost/${props.job_post.id}`);
  };

  return (
    <div className={containerClassName} onClick={onClickAlarm}>
      <div className={cx("img_col")}>
        <img alt={"alarm image"} src={props.send_user.avatar_url} />
      </div>
      <div className={cx("info_col")}>
        <div className={cx("title_row")}>
          <div className={cx("title")}>
            {msg.title}
            {/* {!props.is_checked && <div className={cx("new_ellipse")}></div>} */}
          </div>
          <div className={cx("createdAt")}>
            {new Date(props.createdAt).toLocaleDateString()}
          </div>
        </div>
        <div className={cx("info_row")}>
          {user.user_type === "business" && (
            <>
              <span className={cx("link")}>{props.send_user.username}</span>
              님이&nbsp;
              <span className={cx("link")}>{props.job_post.duty}</span>
              에&nbsp; 지원했어요
            </>
          )}
          {user.user_type === "individual" && (
            <>
              <span className={cx("link")}>{props.send_user.username}</span>
              이&nbsp;
              <span className={cx("link")}>{props.job_post.duty}</span>를&nbsp;
              제안했어요
            </>
          )}
        </div>
      </div>
    </div>
  );
}
