module.exports.getErrorMessage = (err) => {
  let validationError = {};

  if (err.message == "Password salah") {
    validationError.message = "Password salah"
  } else if (err.message == "Username tidak ditemukan") {
    validationError.message = "Username tidak ditemukan"
  }

  if (err.code == 11000) {
    validationError[Object.keys(err.keyValue)[0]] = `Data dengan ${Object.keys(err.keyValue)[0]} yang sama telah tersimpan di database`;
  }

  if (err._message == "Project validation failed") {
    Object.values(err.errors).forEach((error) => {
      validationError[error.properties.path] = error.properties.message;
    });
  }

  return validationError;
};
