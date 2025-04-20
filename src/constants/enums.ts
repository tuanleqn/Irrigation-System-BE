export enum TokenType {
  AccessToken,
  RefreshToken,
  ForgotPasswordToken,
  EmailVerifyToken
}

export enum Topic {
  Temperature = 'temperature',
  SoilMoisture = 'soil-moisture',
  Humidity = 'humidity'
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

export enum FeedKey {
  MoistureThresholdHigh = 'moisture-threshold-high',
  MoistureThresholdLow = 'moisture-threshold-low',
  PumpMode = 'pump-mode',
  PumpState = 'pump-state',
  RelayToPump = 'relay-to-pump'
}

export enum DefaultDeviceId {
  RELAY = 'fhoiFO',
  WATER_PUMP = 'vIvayZ'
}

export enum DefaultMemberId {
  USER = 'wvylky',
  ADMIN = 'mcWveu'
}

export enum DefaultConfigId {
  PUMP_MODE = '2GDR2I',
  MOISTURE_THRESHOLD_HIGH = 'eMnt3i',
  MOISTURE_THRESHOLD_LOW = 'N_Zyj5',
  RELAY_TO_PUMP = 'HMjZ9Q'
}
