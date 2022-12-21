import style from "./Layout.module.scss";
import classNames from "classnames/bind";
import { ReactNode } from "react";
import BottomNavi from "@components/BottomNavi";
import GlobalLoadingMask from "@components/GlobalLoadingMask";
const cx = classNames.bind(style);

interface LayoutProps {
  children: ReactNode | ReactNode[];

  header?: {
    leftButton?: ReactNode;
    pageName: string;
    rightButton?: ReactNode;
  };
  footer?: boolean;
  isLoading?: boolean;
}

function Layout({ header, children, footer, isLoading }: LayoutProps) {
  return (
    <div className={cx("container")}>
      <GlobalLoadingMask isOpen={isLoading} />
      {header && (
        <div className={cx("header")}>
          <div className={cx("inner")}>
            {header.leftButton && (
              <div className={cx("left")}>{header.leftButton}</div>
            )}
            <div className={cx("middle")}>{header.pageName}</div>
            {header.rightButton && (
              <div className={cx("right")}>{header.rightButton}</div>
            )}
          </div>
        </div>
      )}
      <div className={cx("body")}>{children}</div>
      {footer && (
        <div className={cx("footer")}>
          <BottomNavi />
        </div>
      )}
    </div>
  );
}
export default Layout;
