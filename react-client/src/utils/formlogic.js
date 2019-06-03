export const validate = (element, formdata=[]) => {
  let error = [true, ''];

  if(element.validation.email) {
    const valid = /\S+@\S+\.\S+/.test(element.value)
    const message = `${!valid ? 'Favor de ingresar dirección de correo válida' : ''}`;
    error = !valid ? [valid, message] : error;
  }

  if(element.validation.confirm){
    const valid = element.value.trim() === formdata[element.validation.confirm].value;
    const message = `${!valid ? 'Contraseñas no coinciden':''}`;
    error = !valid ? [valid,message] : error;
}

  if(element.validation.required){
    const valid = element.value.trim() !='';
    const message = `${!valid ? 'Favor de ingresar datos requeridos' : ''}`;
    error = !valid ? [valid, message] : error;
  }
  return error
}

export const deepObjectCopy = function(obj) {
  var copy = {};
  for (let x in obj) {
    if (typeof obj[x] === 'object') {
      copy[x] = deepObjectCopy(obj[x])
    } else {
      copy[x] = obj[x]
    }
  }
  return copy
}
// we are making a deep object copy of formdata because it comes from the state
// we do not want to manipulate the state directly, so a copy is necessary
// it needs to be a deep copy since the formdata has nested objects

export const update = (element, formdata, formName) => {
  const newFormData = deepObjectCopy(formdata)

  const newElement = newFormData[element.id]
    //element refers to the name of the specific input you are using this on

  newElement.value = element.event.target.value;

  if(element.blur) {
    let validData = validate(newElement, formdata);
    //referencing array returned by validate function at the top of this document
    newElement.valid = validData[0];
    newElement.validationMessage = validData[1];
  }

  newElement.touched = element.blur;
  newFormData[element.id] = newElement;

  return newFormData
}

export const generateData = (formdata, formName) => {
  let dataToSubmit = {};
  for (let key in formdata) {
    if(key !== 'confirmPassword'){
     dataToSubmit[key] = formdata[key].value;
    }
  }
  return dataToSubmit;
}

export const isFormValid = (formdata, formName) => {
  let formIsValid = true;
  for (let key in formdata) {
    formIsValid = formdata[key].valid && formIsValid
  }
  return formIsValid;
}