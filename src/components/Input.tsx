import { styled } from "@mui/material/styles";
import InputBase, { InputBaseProps } from "@mui/material/InputBase";
import {
  createTheme,
  IconButton,
  Input,
  InputAdornment,
  MenuItem,
  Select,
  SelectProps,
} from "@mui/material";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import MuiOutlinedInput, {
  OutlinedInputProps,
} from "@mui/material/OutlinedInput";

import style from "./Input.module.scss";
import classNames from "classnames/bind";
import { ReactElement, ReactNode, useState } from "react";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
const cx = classNames.bind(style);

const theme = createTheme({});

export function BaseInput(props: TextFieldProps): ReactElement {
  return (
    <TextField
      fullWidth
      sx={{
        [`& fieldset`]: {
          borderRadius: 50,
        },
      }}
      {...props}
    />
  );
}

export function SelectInput(
  props: SelectProps & { options: { value: string; label: string }[] }
): ReactElement {
  return (
    <Select
      fullWidth
      sx={{
        [`& fieldset`]: {
          borderRadius: 50,
        },
      }}
      {...props}
    >
      {props.options.map((option: { value: string; label: string }) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  );
}

export function MultilineInput(props: TextFieldProps): ReactElement {
  return (
    <TextField
      fullWidth
      multiline
      minRows={5}
      sx={{
        [`& fieldset`]: {
          borderRadius: 3,
        },
      }}
      {...props}
    />
  );
}
export function OutlinedInput(props: OutlinedInputProps): ReactElement {
  return (
    <MuiOutlinedInput
      fullWidth
      sx={{
        [`& fieldset`]: {
          borderRadius: 50,
        },
      }}
      {...props}
    />
  );
}

export function PasswordInput(props: OutlinedInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  return (
    <MuiOutlinedInput
      fullWidth
      sx={{
        [`& fieldset`]: {
          borderRadius: 50,
        },
      }}
      {...props}
      type={showPassword ? "text" : "password"}
      endAdornment={
        <InputAdornment position="end">
          <IconButton
            aria-label="toggle password visibility"
            onClick={handleClickShowPassword}
            onMouseDown={handleMouseDownPassword}
            edge="end"
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </InputAdornment>
      }
    />
  );
}

export function LabeledInputContainer({
  label,
  children,
}: {
  label?: string;
  children: ReactNode;
}) {
  return (
    <div className={cx("labeled-input-container")}>
      {label && <div className={cx("label")}>{label}</div>}
      {children}
    </div>
  );
}

export function TestInput(props: InputBaseProps) {
  return <InputBase />;
}
