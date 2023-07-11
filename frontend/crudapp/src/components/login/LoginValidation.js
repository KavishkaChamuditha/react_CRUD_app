function Validation(values) {
    let error = {}
    const email_pattern = /^([A-Za-z0-9_.-])+@[A-Za-z]+\.[A-Za-z]{2,}$/;
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
  
    if (values.email === "") {
      error.email = "Email should not be empty";
    } else if (!email_pattern.test(values.email)) {
      error.email = "Invalid email format";
    } else {
      error.email = "";
    }
  
    if (values.password === "") {
      error.password = "Password should not be empty";
    } else if (!password_pattern.test(values.password)) {
      error.password = "Password must contain at least 8 characters, including uppercase, lowercase, and a number";
    } else {
      error.password = "";
    }
  
    return error;
  }

  export default Validation;
  