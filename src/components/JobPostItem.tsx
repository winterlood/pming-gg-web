import style from "./JobPostItem.module.scss";
import classNames from "classnames/bind";
import { api_types } from "@types";
import { useNavigate } from "react-router-dom";
const cx = classNames.bind(style);

interface Props extends api_types.JobPost {
  disabled?: boolean;
  onClick?: Function;
  isHighlight?: boolean;
}
function JobPostItem(props: Props) {
  const nav = useNavigate();

  const goDetailPage = () => {
    if (!props.disabled) {
      nav(`/jobpost/${props.id}`);
    }
  };

  const onClickItem = () => {
    props.onClick ? props.onClick() : goDetailPage();
  };

  return (
    <div
      className={
        props.isHighlight
          ? cx("container", "container_highligth")
          : cx("container")
      }
      onClick={onClickItem}
    >
      <div className={cx("img-col")}>
        <img src={props.author.avatar_url} alt={"jp"} />
      </div>
      <div className={cx("info-col")}>
        <div className={cx("duty")}>{props.duty}</div>
        <div className={cx("company")}>{props.author.name}</div>
        <div className={cx("work-type")}>
          {props["work_type"] === "full-time" ? "풀타임" : "파트타임"}
        </div>
      </div>
    </div>
  );
}
export default JobPostItem;
