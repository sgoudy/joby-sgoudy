import {useState} from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function BasicPagination(props) {
    
    return (
        <Stack sx={{
            mx: 'auto', 
            marginBottom: 2
            }}>
        <Pagination 
            count={10} 
            onChange={(e, val)=> {
                props.setPage(val)
            }}

            />
        </Stack>
    );
}