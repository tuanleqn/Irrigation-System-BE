export const USERS_MESSAGES = {
  VALIDATION_ERROR: 'Validation error',
  USER_NOT_FOUND: 'User not found',
  INVALID_PASSWORD: 'Invalid password',
  USER_EXISTS: 'User already',
  EMAIL_IS_INVALID: 'Email is invalid',
  EMAIL_OR_PASSWORD_IS_INCORRECT: 'Email or password is incorrect',
  PASSWORD_IS_REQUIRED: 'Password is required',
  PASSWORD_MUST_BE_A_STRING: 'Password must be a string',
  PASSWORD_LENGTH_MUST_BE_FROM_6_TO_50: 'Password length must be from 6 to 50',
  PASSWORD_MUST_BE_STRONG: 'Password must be strong',
  LOGIN_SUCCESS: 'Login success',
  REGISTER_SUCCESS: 'Register success',
  ACCESS_TOKEN_IS_REQUIRED: 'Access token is required',
  ACCESS_TOKEN_IS_INVALID: 'Access token is invalid'
} as const

export const SENSOR_MESSAGES = {
  GET_TEMPERATURE_SUCCESS: 'Get temperature success',
  GET_HUMIDITY_SUCCESS: 'Get humidity success',
  GET_SOIL_MOISTURE_SUCCESS: 'Get soil moisture success',
  GET_STATISTICS_SUCCESS: 'Get statistics success',
  GET_LOGS_SUCCESS: 'Get logs success'
} as const

export const DEVICE_MESSAGES = {
  SET_PUMP_MODE_SUCCESS: 'Set pump mode success',
  GET_PUMP_STATE_SUCCESS: 'Get pump state success',
  GET_PUMP_MODE_SUCCESS: 'Get pump mode success',
  GET_RELAY_TO_PUMP_SUCCESS: 'Get relay to pump success',
  UPDATE_RELAY_TO_PUMP_SUCCESS: 'Update relay to pump success',
  GET_SOIL_MOISTURE_THRESHOLD_HIGH_SUCCESS: 'Get soil moisture threshold high success',
  GET_SOIL_MOISTURE_THRESHOLD_LOW_SUCCESS: 'Get soil moisture threshold low success',
  UPDATE_SOIL_MOISTURE_THRESHOLD_HIGH_SUCCESS: 'Update soil moisture threshold high success',
  UPDATE_SOIL_MOISTURE_THRESHOLD_LOW_SUCCESS: 'Update soil moisture threshold low success'
} as const
