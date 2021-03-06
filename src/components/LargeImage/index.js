import {React} from 'react'
import {
    Box,
    Grid,
    Modal
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  maxWidth: 800,
  bgcolor: '#0075e2',
  border: '4px solid #F3F4F5',
  boxShadow: 24,
  p:1,
  m: 'auto',
  my: 2
};



export default function LargeImage(props) {
    return (
      <Modal
        open={props.open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        onBlur={props.closeImage}
      >
      <Grid item xs={12} >
           <Box 
            sx={style} 
            component="img"
            src={props.url} 
            alt={props.alt}
           />
        <CloseIcon 
            sx={{
                position: 'absolute',
                top: 0,
                right: 0,
                backgroundColor: '#0075e2',
                border: '4px solid #F3F4F5',
                p: 1,
                color: '#F3F4F5',
            }}
            onClick={props.closeImage}
        />
      </Grid>
      </Modal>
  );
}