interface obj {
  email: string;
  password: string;
}

export const validation = ({ email, password }: obj) => {
  const errors: any = {};

  if (email.length === 0) {
    errors.email = "Required";
  }

  if (!/^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/.test(email)) {
    errors.email = "Invalid Email";
  }

  if (password.length < 6) {
    errors.password = "Must be 6 characters";
  }

  if (password.length === 0) {
    errors.password = "Required";
  }

  return errors;
};
