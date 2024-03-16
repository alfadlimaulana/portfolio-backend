module.exports.getErrorMessage = (err) => {
  let errors = {
    validation: {},
    message: '',
  };

  if (err.message == "Password salah") {
    errors.message = "Password salah"
  } else if (err.message == "Username tidak ditemukan") {
    errors.message = "Username tidak ditemukan"
  } else if (err.code == 11000) {
    errors["validation"][Object.keys(err.keyValue)[0]] = `Data dengan ${Object.keys(err.keyValue)[0]} yang sama telah tersimpan di database`;
  } else if (err._message == "Project validation failed") {
    Object.values(err.errors).forEach((error) => {
      errors["validation"][error.properties.path] = error.properties.message;
    });
  } else {
    errors.message = err.message
  }


  return errors;
};
