export const getErrorMessage = (err) => {
  let errors = [];
  if (err.response) {
    if (err.response.data) {
      if (err.response.data.errors) {
        errors = err.response.data.errors;
      } else if (err.response.data.error) {
        if (typeof err.response.data.error === 'string') {
          errors = [{msg: err.response.data.error}];
        }
      } else if (err.response.data.msg) {
        if (typeof err.response.data.msg === 'string') {
          errors = [{msg: err.response.data.msg}];
        }
      }
    }
  } else {
    errors = [err];
  }

  const errorMessage = errors.map((en) => en.msg).join('\n');
  return errorMessage;
};
