import React from 'react';

const InputField = props => {
  let error_array = []
  if(props.errors.length > 0) {
    for (let error of props.errors) {
      if(error.includes(props.label)) {
        error_array.push(error);
      }
    }
  }

  let error_message = ''
  if(error_array.length > 0) {
      error_message = error_array.join(', ');
  }

  return (
    <div className='input'>
      {props.label}: <input type='text' value={props.value} onChange={props.onChange} />
      <p>{error_message}</p>
    </div>
  )
};

export default InputField;
