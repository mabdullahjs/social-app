import * as React from "react";

import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { Get } from "../apimethods/apimethods";

export default function MADatePicker(props) {
  const { label, value, onChange , width } = props;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
      sx={{width:`${width}`}}
        label={label}
        value={value}
        onChange={onChange}
        renderInput={(params) => (
          <TextField fullWidth={true} variant="standard" {...params} />
        )}
      />
    </LocalizationProvider>
  );
}