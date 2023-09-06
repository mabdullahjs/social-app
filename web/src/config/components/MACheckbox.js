import React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

function MACheckbox(props) {
  const { label, onChange, required, value, color } = props;
  return (
    <FormGroup>
      <FormControlLabel
        required={required}
        onChange={onChange}
        checked={value}
        control={<Checkbox color={color ? color : "success"} />}
        label={label}
      />
    </FormGroup>
  );
}
export default MACheckbox;
