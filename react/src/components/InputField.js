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
      <input type='text' value={props.value} onChange={props.onChange} placeholder={props.placeholder} />
      <p>{errorMessage}</p>
    </div>
  )
};

export default InputField;
