function isNotEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function isValidEmail(value) {
  return typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidPassword(value) {
  return typeof value === "string" && value.length >= 8;
}

export function normalizeEmail(email) {
  if (typeof email !== "string") {
    return email;
  }

  return email.trim().toLowerCase();
}

// create user validation
export function validateUser(userData) {
  const errors = {};

  const email = userData.email;
  const password = userData.password;
  const name = userData.name;

  if (!isNotEmptyString(name)) {
    errors.name = "Name is required";
  }

  if (!isValidEmail(email)) {
    errors.email = "Invalid email format";
  }

  if (!isValidPassword(password)) {
    errors.password = "Password must be at least 8 characters long";
  }

  return {
    ok: Object.keys(errors).length === 0,
    errors,
    data: userData,
  };
}

// update user validation
export function validateUpdateUser(userData) {
  const errors = {};
  const data = {};
  const allowedFields = ["email", "password", "name"];

  const hasAtLeastOneField = allowedFields.some(
    (field) => userData[field] !== undefined,
  );

  if (!hasAtLeastOneField) {
    errors.body = "Provide at least one field to update";
  }

  if (userData.email !== undefined) {
    if (!isValidEmail(userData.email)) {
      errors.email = "Invalid email format";
    } else {
      data.email = userData.email;
    }
  }

  if (userData.password !== undefined) {
    if (!isValidPassword(userData.password)) {
      errors.password = "Password must be at least 8 characters long";
    } else {
      data.password = userData.password;
    }
  }

  if (userData.name !== undefined) {
    if (!isNotEmptyString(userData.name)) {
      errors.name = "Name is required";
    } else {
      data.name = userData.name;
    }
  }

  return {
    ok: Object.keys(errors).length === 0,
    errors,
    data,
  };
}

export function validatePasswordUpdate(userData) {
  const errors = {};

  if (!isValidPassword(userData.password)) {
    errors.password = "Password must be at least 8 characters long";
  }

  return {
    ok: Object.keys(errors).length === 0,
    errors,
  };
}
