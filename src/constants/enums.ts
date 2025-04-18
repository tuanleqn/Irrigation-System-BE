export enum TokenType {
  AccessToken,
  RefreshToken,
  ForgotPasswordToken,
  EmailVerifyToken
}

export enum Topic {
  Temperature = 'temperature',
  SoilMoisture = 'soil-moisture',
  Humidity = 'humidity',
  MoistureThresholdHigh = 'moisture-threshold-high',
  MoistureThresholdLow = 'moisture-threshold-low',
  PumpMode = 'pump-mode',
  PumpState = 'pump-state',
  RelayToPump = 'relay-to-pump'
}

export enum SensorType {
  SOIL_MOISTURE = 'SOIL_MOISTURE',
  TEMPERATURE = 'TEMPERATURE',
  HUMIDITY = 'HUMIDITY'
}

export enum DeviceType {
  RELAY = 'RELAY',
  WATER_PUMP = 'WATER_PUMP',
  LCD = 'LCD'
}

export enum DefaultSensorId {
  SOIL_MOISTURE = 'Tr582g',
  TEMPERATURE = 'pFq5mg',
  HUMIDITY = 'YthNeG'
}
