import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
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
  onClick?: Function;
  isContactAble?: boolean;
}

const cx = classNames.bind(style);

function DeveloperItem({
  id,
  avatar_url,
  name,
  bio,
  onClick,
  isContactAble,
}: Props) {
  const nav = useNavigate();
  const onClickItem = () => {
    onClick ? onClick() : nav(`/profile/${id}`);
  };
  return (
    <div className={cx("container")} onClick={onClickItem}>
      <div className={cx("avatar_col")}>
        <img src={avatar_url} alt={`${name}의 아바타`} />
      </div>
      <div className={cx("info_col")}>
        <div className={cx("name_row")}>{name}</div>
        <div className={cx("intro_row")}>{bio}</div>
      </div>
      {isContactAble && (
        <div className={cx("contact_col")}>
          <Button
            onClick={() => {
              nav(`/profile/${id}`);
            }}
          >
            프로필
          </Button>
          <Button
            onClick={() => {
              alert("TODO");
            }}
          >
            연락하기
          </Button>
        </div>
      )}
    </div>
  );
}

export default DeveloperItem;
