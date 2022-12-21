import style from "./IconButton.module.scss";
import classNames from "classnames/bind";
// icons
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import NotificationsIcon from "@mui/icons-material/Notifications";
import EditIcon from "@mui/icons-material/Edit";

const cx = classNames.bind(style);

type Icon = "share" | "goback" | "alarm" | "edit" | "filter";

interface IconButtonProps {
  type: "deep" | "light";
  icon: Icon;
  onClick: any;
}

function IconButton({ type, icon, onClick }: IconButtonProps) {
  function renderIcon() {
    switch (icon) {
      case "goback":
        return <ArrowBackIosNewIcon color={"primary"} fontSize={"medium"} />;
      case "alarm":
        return <NotificationsIcon color={"primary"} fontSize={"medium"} />;
      case "edit":
        return <EditIcon color={"primary"} fontSize={"medium"} />;

      default:
        return null;
    }
  }
  return (
    <div
      onClick={onClick}
      className={[cx(`container`), cx(`container-${type}`)].join(" ")}
    >
      {renderIcon()}
    </div>
  );
}
export default IconButton;
