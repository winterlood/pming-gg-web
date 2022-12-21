import style from "./JobPostItem.module.scss";
import classNames from "classnames/bind";
import { api_types } from "@types";
import { useNavigate } from "react-router-dom";
const cx = classNames.bind(style);

interface Props extends api_types.JobPost {
  disabled?: boolean;
}
function JobPostItem(props: Props) {
  const nav = useNavigate();
  return (
    <div
      className={cx("container")}
      onClick={() => {
        if (!props.disabled) {
          nav(`/jobpost/${props.id}`);
        }
      }}
    >
      <div className={cx("img-col")}>
        <img src={props.author.avatar_url} />
      </div>
      <div className={cx("info-col")}>
        <div className={cx("duty")}>{props.duty}</div>
        <div className={cx("company")}>{props.author.username}</div>
        <div className={cx("work-type")}>
          {props["work_type"] === "full-time" ? "풀타임" : "파트타임"}
        </div>
      </div>
    </div>
  );
}
export default JobPostItem;
