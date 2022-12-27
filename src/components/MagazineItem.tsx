import classNames from "classnames/bind";
import style from "./MagazineItem.module.scss";
import { api_types } from "@types";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(style);

const MAGIC_IMAGE =
  "https://user-images.githubusercontent.com/46296754/163120856-ceaf0083-3ef4-4401-9755-129ea493ee7d.png";

function MagazineItem(props: api_types.Magazine) {
  const cover = props.cover;
  const nav = useNavigate();

  const goDetailPage = () => {
    nav(`/magazine/${props.id}`);
  };

  return (
    <div className={cx("container")} onClick={goDetailPage}>
      <div className={cx("cover")}>
        <img src={cover ?? MAGIC_IMAGE} alt={"magazine cover"} />
      </div>
      <div className={cx("info_row")}>
        <div className={cx("title")}>{props.title}</div>
        <div className={cx("createdAt")}>
          {new Date(props.createdAt).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}

export default MagazineItem;
