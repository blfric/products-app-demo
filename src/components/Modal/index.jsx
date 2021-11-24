import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 12,
  borderRadius: 1,
  p: 2,
};

export default function ModalComponent({ handleClose, open, children }) {
  return (
    <Modal open={open} onClose={handleClose}
      aria-labelledby='modal-modal-title'  aria-describedby='modal-modal-description' >
      <Box sx={style} className='custom-modal'>
        <span className='modal-close-icon' onClick={handleClose}><HighlightOffIcon /></span>
        {children}
      </Box>
    </Modal>
  );
}