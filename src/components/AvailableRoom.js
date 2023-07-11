import React from 'react'
import { Modal } from "react-bootstrap";

export default function AvailableRoom(props) {

    const {onShow, onHide} = props;
  return (
    <>
        <Modal show={onShow} onHide={onHide}>
            <Modal.Body>
                Hello
            </Modal.Body>
        </Modal>
    </>
  )
}
