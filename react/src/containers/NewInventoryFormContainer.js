import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import InputField from '../components/InputField';

class NewInventoryFormContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      item: '',
      quantity: '',
      measurement: '',
      messages: [],
      current_user: null
    };

    this.handleItemChange = this.handleItemChange.bind(this);
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
    this.handleMeasurementChange = this.handleMeasurementChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleItemChange(event) {
    let newItem = event.target.value
    this.setState({ item: newItem })
  }

  handleQuantityChange(event) {
    let newQuantity = event.target.value
    this.setState({ quantity: newQuantity })
  }

  handleMeasurementChange(event) {
    let newMeasurement = event.target.value
    this.setState({ measurement: newMeasurement })
  }

  handleSubmit(event) {
    event.preventDefault()
    let requestBody = {
      item: this.state.item,
      quantity: this.state.quantity,
      measurement: this.state.measurement
    }
    fetch('/api/v1/inventories', { method: 'POST', body: JSON.stringify(requestBody), credentials: 'same-origin' })
    .then(response => {
      let parsed = response.json()
      return parsed
    }).then(message => {
      this.setState({
        messages: message.messages,
        current_user: message.current_user
      })
      if(message.messages == 'Success') {
        browserHistory.push(`/users/${message.current_user.id}/inventories`);
      }
    })
  }

  render () {
    return(
      <form onSubmit={this.handleSubmit}>
        <InputField
          label='Item'
          value={this.state.item}
          onChange={this.handleItemChange}
          errors={this.state.messages}
        />
        <InputField
          label='Quantity'
          value={this.state.quantity}
          onChange={this.handleQuantityChange}
          errors={this.state.messages}
        />
        <InputField
          label='Measurement (optional)'
          value={this.state.measurement}
          onChange={this.handleMeasurementChange}
          errors={this.state.messages}
        />
        <input type='submit' />
      </form>
    )
  }
}

export default NewInventoryFormContainer;
