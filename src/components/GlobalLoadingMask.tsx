import style from "./GlobalLoadingMask.module.scss";
import classNames from "classnames/bind";
import { Modal } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

const cx = classNames.bind(style);

function GlobalLoadingMask(props: { isOpen?: boolean }) {
  return (
    <Modal open={props.isOpen || false}>
      <div className={cx("container")}>
        <CircularProgress size={40} thickness={4} value={100} />
      </div>
    </Modal>
  );
}
export default GlobalLoadingMask;
