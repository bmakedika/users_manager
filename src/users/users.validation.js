function isNotEmptyString(value) {
  return typeof value === "string" && value.length > 0;
}

function isValidEmail(value) {
  return typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidPassword(value) {
  return typeof value === "string" && value.length >= 8;
}

export function validateUser(userData) {
  const errors = {};

  const email = userData.email;
  const password = userData.password;
  const name = userData.name;

  if (!isNotEmptyString(userData.name)) {
    errors.name = "Name is required";
  }

  if (!isValidEmail(email)) errors.email = "Invalid email format";

  if (!isValidPassword(password))
    errors.password = "Password must be at least 8 characters long";

  return {
    ok: Object.keys(errors).length === 0,
    errors,
    data: userData,
  };
}
