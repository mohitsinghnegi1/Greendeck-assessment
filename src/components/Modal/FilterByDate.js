import React, { Component, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { AddMeal, UpdateMeal } from '../../services/util';

export default function FilterByDate(props) {
  const [state, setState] = useState({
    error: '',
  });

  const handleClose = () => {
    // props.closeModel();
    window.location.href = '/';
  };

  const handleChange = (e) => {
    e.persist();

    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const changeState = (stateInfo) => {
    setState(stateInfo);
  };

  const isValid = () => {
    if (state.meal && state.description) {
      setState({ ...state, error: '' });
      return true;
    }
    setState({ ...state, error: 'Please fill out the required fields' });
    return false;
  };

  const updateMeal = () => {
    // api call to add/update meal in database
    if (isValid()) {
      const user = JSON.parse(localStorage.getItem('user'));
      const userId = user.userInfo._id;
      const mealInfo = {
        mealName: state.meal,
        description: state.description,
        calorie: state.calories,
        userId: userId,
      };

      if (props.operation == 'ADD_MEAL') {
        AddMeal(mealInfo, state, changeState);
      } else if (props.operation == 'UPDATE_MEAL') {
        const payload = [
          { propName: 'mealName', value: `${state.meal}` },
          { propName: 'description', value: `${state.description}` },
          { propName: 'calorie', value: `${state.calories}` },
        ];
        console.log('payload ', payload);
        UpdateMeal(payload, state, changeState);

        console.log('update meal');
        //TODO call update meal api here
      } else {
        console.log('Error : invalid operation');
      }
    }
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
          <form>
            <div className='error text-center mb-3'>{state.error}</div>
            <div class='form-group'>
              <input
                type='Text'
                class='form-control'
                name='meal'
                value={state.meal}
                onChange={handleChange}
                placeholder='Enter Meal Name *'
              />
            </div>
            <div class='form-group'>
              <textarea
                class='form-control'
                placeholder='Enter Meal Description *'
                name='description'
                onChange={handleChange}
                value={state.description}
                minLength='10'
                rows='3'></textarea>
            </div>
            <div class='form-group'>
              <input
                type='number'
                class='form-control'
                onChange={handleChange}
                value={state.calories}
                name='calories'
                placeholder='Enter Calories'
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={updateMeal} variant='primary'>
            {props.text}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
