import React, { Component } from 'react';
import '../../assets/css/meal_card.css';
import MyModal from '../Modal/MyModal';
import DeleteModal from '../Modal/DeleteModal';
export default class productCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      showDeleteModal: false,
    };
  }
  openModel = () => {
    this.setState({ showModal: true });
  };
  openDeleteModal = () => {
    this.setState({ showDeleteModal: true });
  };

  render() {
    console.log('Product props ', this.props);
    return (
      <div className='col-md-6 mt-4'>
        <MyModal
          show={this.state.showModal}
          text='Update Meal'
          operation='UPDATE_MEAL'
          mealName={this.props.mealName}
          description={this.props.description}
          calorie={this.props.calorie}
          _id={this.props._id}
        />
        <DeleteModal
          show={this.state.showDeleteModal}
          _id={this.props._id}
          text='Delete Meal'
        />
        <div class='card'>
          <div class='card-header d-flex justify-content-between'>
            <span className='text-capitalize'>
              Name: {this.props.name}&nbsp;
            </span>

            <span>Price :{this.props.price} </span>
            {/* <span>{this.props.modifiedOn.split('T')[0]}</span> */}
          </div>
          <div class='card-body'>
            <h5 class='card-title text-success'>Discount</h5>
            <p class='card-text'>{this.props.discount}%</p>
            {/* <div>
              <a
                href='#'
                class='btn btn-primary mt-4 mr-2 '
                onClick={this.openModel}>
                Update Meal
              </a>
              <a
                href='#'
                onClick={this.openDeleteModal}
                class='btn btn-primary mt-4 ml-2'>
                Delete Meal
              </a>
            </div> */}
          </div>
        </div>
      </div>
    );
  }
}
