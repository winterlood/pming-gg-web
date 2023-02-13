import style from "./AdBanner.module.scss";
import classNames from "classnames/bind";
import banner from "@img/banner.png";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(style);

export default function AdBanner() {
  const nav = useNavigate();
  return (
    <div className={cx("container")}>
      <img onClick={() => nav(`/ad`)} src={banner} alt={"banner"} />
    </div>
  );
}
