import React, { useState, lazy, Suspense } from "react";
import Button from "@mui/material/Button";

const Modal = lazy(() => import("@mui/material/Modal"));

const MyModal = ({
  title,
  description,
  ButtonText,
  body,
  customStyle,
  modalWidth = "1000px",
  openValue = false,
}) => {
  const [open, setOpen] = useState(openValue);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={customStyle}>
      <div style={{ cursor: "pointer" }} onClick={handleOpen}>
        {ButtonText}
      </div>
      <Suspense fallback={null}>
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
              maxWidth: modalWidth,
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
      </Suspense>
    </div>
  );
};

export default React.memo(MyModal);
