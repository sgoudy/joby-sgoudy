import {useState} from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function BasicPagination(props) {
    
    return (
        <Stack sx={{
            m: 'auto', 
            position: 'absolute',
            bottom: 0
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