import React from 'react';

const InputField = props => {
  let errorArray = []
  if(props.errors.length > 0) {
    for (let error of props.errors) {
      if(error.includes(props.label)) {
        errorArray.push(error);
      }
    }
  }

  let errorMessage = ''
  if(errorArray.length > 0) {
      errorMessage = errorArray.join(', ');
  }

  return (
    <div className='input'>
      {props.label}: <input type='text' value={props.value} onChange={props.onChange} />
      <p>{errorMessage}</p>
    </div>
  )
};

export default InputField;
