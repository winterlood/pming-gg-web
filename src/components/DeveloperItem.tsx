import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";
import style from "./DeveloperItem.module.scss";
/*
아바타
이름
자기소개
*/

interface Props {
  id: string;
  avatar_url: string;
  name: string;
  bio: string;
}

const cx = classNames.bind(style);

function DeveloperItem({ id, avatar_url, name, bio }: Props) {
  const nav = useNavigate();
  return (
    <div
      className={cx("container")}
      onClick={() => {
        nav(`/profile/${id}`);
      }}
    >
      <div className={cx("avatar_col")}>
        <img src={avatar_url} alt={`${name}의 아바타`} />
      </div>
      <div className={cx("info_col")}>
        <div className={cx("name_row")}>{name}</div>
        <div className={cx("intro_row")}>{bio}</div>
      </div>
    </div>
  );
}

export default DeveloperItem;
