import React, { useEffect, useState } from "react";

import style from "./BottomNavi.module.scss";
import classNames from "classnames/bind";

import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

import HomeIcon from "@mui/icons-material/Home";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@store/createStore";
import useGetNewAlarmCountQuery from "@hooks/useGetNewAlarmCountQuery";
import { Badge } from "@mui/material";
const cx = classNames.bind(style);

function BottomNavi(props: any) {
  const loc = useLocation();
  const nav = useNavigate();
  const [value, setValue] = useState("recents");
  const [userType, setUserType] = useState<"empty" | "individual" | "business">(
    "empty"
  );
  const auth = useSelector((v: RootState) => v.auth);
  const { data: newAlarmCount } = useGetNewAlarmCountQuery({
    refetchOnMount: true,
  });
  console.log(newAlarmCount);

  useEffect(() => {
    if (loc.pathname) {
      const pathName = loc.pathname;
      const firstDepth = pathName.split("/")[1].replace("/", "");
      console.log(pathName);
      setValue(firstDepth);
    }
  }, [loc.pathname]);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    if (newValue === "profile") {
      if (auth) {
        nav(`/profile/${auth.user.id}`);
      }
    } else {
      nav(`/${newValue}`);
    }
  };

  useEffect(() => {
    if (auth?.user) {
      setUserType(auth.user.user_type);
    }
  }, [auth]);

  return (
    <div className={cx("container")}>
      <BottomNavigation
        sx={{
          width: 480,
        }}
        value={value}
        onChange={handleChange}
      >
        <BottomNavigationAction
          value=""
          icon={<HomeIcon fontSize={"large"} />}
        />
        <BottomNavigationAction
          value={userType === "individual" ? "jobs" : "developers"}
          icon={<FormatListBulletedIcon fontSize={"large"} />}
        />
        <BottomNavigationAction
          value="alarm"
          icon={
            <Badge
              badgeContent={value === "alarm" ? 0 : newAlarmCount}
              color="primary"
            >
              <NotificationsIcon fontSize={"large"} />
            </Badge>
          }
        />
        <BottomNavigationAction
          value="profile"
          icon={<PersonIcon fontSize={"large"} />}
        />
      </BottomNavigation>
    </div>
  );
}
export default BottomNavi;
