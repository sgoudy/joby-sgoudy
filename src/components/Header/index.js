import React from 'react'
import {Box, TextField } from '@mui/material'

import hs from '../../images/logo96x96.png'

export default function Header(props) {

    return (
        <>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                mx: 'auto',
                my: 4,
                }}>
            <Box
                component="img"
                src={hs} 
                sx={{
                    maxHeight: 96,
                    maxWidth: 96,
                    p: 1
                    }}/>
            <Box
                component="form" 
                onSubmit={props.handleSubmit} 
                sx={{ 
                    maxWidth: 1000,
                    p: 1,
                    color: '#353a42'
                    }}>
                <TextField
                    margin="normal"
                    fullWidth
                    id="search"
                    name="search"
                    label="Customize your results"
                    value={props.value} 
                    onChange={(e)=>props.setValue(e.target.value)}
                />
            </Box>
        </Box>
    </>
    )
}
