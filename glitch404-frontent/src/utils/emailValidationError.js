const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const emailValidationError = (value) => {
  let err = "";
  if (!value) {
    err = "Email address is required";
  } else if (!EMAIL_REGEX.test(value)) {
    err = "Enter a valid email address";
  }
  console.log(err);
  return err;
};
export { emailValidationError };
