export function get_jwt_secret() {
  const value = process.env.JWT_SECRET;

  if (value) {
    return value
  }
  else {
    throw new Error
  }
};

export const JWT_SECRET_NAME = "JWT_SECRET"
