export function validateEmail(email: string) {
  const validities: Array<{ message: string; valid: boolean }> = [];
  validities.push({ message: "Email is required", valid: !!email });

  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  validities.push({
    message: "Email is valid",
    valid: regex.test(String(email).toLowerCase()),
  });

  return validities;
}

export function validatePassword(password: string) {
  const validities: Array<{ message: string; valid: boolean }> = [];
  validities.push({ message: "Password is required", valid: !!password });

  validities.push({
    message: "Password must be at least 6 characters",
    valid: password.length >= 6,
  });

  return validities;
}

export function validatePasswordConfirmation(
  passwordConfirmation: string,
  passwordMatch: string,
) {
  const validities: Array<{ message: string; valid: boolean }> = [];
  validities.push({
    message: "Password confirmation is required",
    valid: !!passwordConfirmation,
  });

  validities.push({
    message: "Passwords do not match",
    valid: !!passwordConfirmation && passwordConfirmation == passwordMatch,
  });

  return validities;
}

export function validateUsername(username: string) {
  const validities: Array<{ message: string; valid: boolean }> = [];
  validities.push({ message: "Username is required", valid: !!username });

  validities.push({
    message: "Username must be at least 3 characters",
    valid: username.length >= 3,
  });
  return validities;
}
