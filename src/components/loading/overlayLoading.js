import React from "react";
import { Modal, Spinner } from "react-bootstrap";
import "./loadingOverlay.css";
import loadingGif from "./loading.gif"

const LoadingOverlay = (props) => {
  const { show } = props;
  return (
    <Modal show={show} centered backdrop="static" keyboard={false} className="loading-overlay">
      <Modal.Body className="d-flex justify-content-center align-items-center">
        <img src={loadingGif} alt="Loading..." />
      </Modal.Body>
    </Modal>
  );
};

export default LoadingOverlay;
