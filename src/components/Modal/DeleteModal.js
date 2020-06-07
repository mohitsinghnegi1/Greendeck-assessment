import React, { Component, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { DeleteMeal } from '../../services/util';

export default function DeleteModal(props) {
  const [state, setState] = useState({
    _id: props._id,
    error: '',
  });

  const handleClose = () => {
    // props.closeModel();
    window.location.href = '/';
  };

  const changeState = (stateInfo) => {
    setState(stateInfo);
  };

  const deleteMeal = () => {
    // api call to delete meal from database
    DeleteMeal(state, changeState);
  };

  return (
    <>
      {/* <Button variant='primary' onClick={handleShow}>
        Launch demo modal
      </Button> */}

      <Modal show={props.show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.text}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='error text-center mb-3'>{state.error}</div>
          <div>Are you Sure you want to delete this meal?</div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={deleteMeal} variant='primary'>
            {props.text}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
