import { TextField } from '@mui/material'
import React from 'react'

function MAInput(props) {
    const {
        label,
        type,
        variant,
        onChange,
        required,
        disabled,
        value,
        rows,
        multiline,
        width,
        className,
        fullWidth,
        ref
    } = props
    return (
        <TextField
            className={className}
            type={type}
            label={label}
            onChange={onChange}
            required={required}
            value={value ? value : ""}
            disabled={disabled}
            sx={{ width: `${width}` }}
            variant={variant ? variant : "outlined"}
            multiline={multiline}
            rows={rows}
            fullWidth={fullWidth ? fullWidth : false}
            ref={ref}
        />
    )
}

export default MAInput