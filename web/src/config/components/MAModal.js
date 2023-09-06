import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Typography } from "@mui/material";
import MAIconbutton from "./MAIconButton";
import CloseIcon from "@mui/icons-material/Close";

export default function MAModal(props) {
  const { open, close, modalTitle, innerContent, width, modalFooter } = props;

  const handleClose = () => {
    close(false);
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: width ?? "50%",
    bgcolor: "background.paper",
    borderRadius: "8px",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: width ?? "60vw" }}>
          <Box className="d-flex justify-content-between border-bottom align-items-center">
            <Typography variant="h5" id="parent-modal-title">
              {modalTitle}
            </Typography>
            <MAIconbutton onClick={handleClose} icon={<CloseIcon />} />
          </Box>
          <Box className="py-3 modalBody">{innerContent}</Box>
          {modalFooter && <Box className="pt-2">{modalFooter}</Box>}
        </Box>
      </Modal>
    </div>
  );
}
