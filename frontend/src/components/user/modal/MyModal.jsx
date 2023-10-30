import React, { useState } from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";

const MyModal = ({ title, description, ButtonText, body }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div onClick={handleOpen}>{ButtonText}</div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "20px",
            width: "97%",
            maxWidth: "500px",
          }}
        >
          <h2 id="modal-title">{title}</h2>
          <div
            style={{
              height: "20px",
            }}
          ></div>
          <p id="modal-description">{description}</p>
          <div
            style={{
              height: "20px",
            }}
          ></div>
          {body}
          <div
            style={{
              height: "20px",
            }}
          ></div>
          <Button variant="contained" color="primary" onClick={handleClose}>
            Close Modal
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default MyModal;