import style from "./Button.module.scss";
import classNames from "classnames/bind";

import MuiButton from "@mui/material/Button";
import { ReactNode } from "react";

const cx = classNames.bind(style);

interface Props {
  type?: string;
  variant?: "text" | "contained" | "outlined" | undefined;
  onClick: any;
  children: ReactNode;
}

function Button({ variant, onClick, children }: Props) {
  const defaultVariant = variant || "outlined";

  return (
    <MuiButton
      fullWidth
      sx={{
        borderRadius: "100px",
        height: "55px",
        fontSize: "var(--font-h5)",
        fontWeight: "bold",
      }}
      variant={defaultVariant}
      onClick={onClick}
    >
      {children}
    </MuiButton>
  );
}
export default Button;
