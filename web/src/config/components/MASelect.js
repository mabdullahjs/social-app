import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function MASelect(props) {
  const {value , onChange , option , label , className , width} = props


  return (
    <Box className={className} sx={{ minWidth: 220 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label="Age"
          onChange={onChange}
          sx={{width:`${width}`}}
          fullWidth
          
        >
          {/* <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem> */}
          {option ? option.map((item , index)=>{
            return <MenuItem key={index} value={item}>{item}</MenuItem>
          }) : null}
        </Select>
      </FormControl>
    </Box>
  );
}