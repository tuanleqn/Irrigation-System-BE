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
