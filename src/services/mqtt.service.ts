import mqtt from 'mqtt'
import { Server } from 'socket.io'
import { Topic } from '~/constants/enums'
import { SensorFactory } from '~/models/factory'

const mqttClient = mqtt.connect(`${process.env.MQTT_URL}`, {
  username: `${process.env.ADAFRUIT_IO_USERNAME}`,
  password: `${process.env.ADAFRUIT_IO_KEY}`
})
const topics = Object.values(Topic).map((topic) => `${process.env.ADAFRUIT_IO_USERNAME}/feeds/${topic}`)

mqttClient.on('error', (error) => {
  console.error('❌ MQTT connection error:', error)
})

export const initMQTT = (io: Server) => {
  io.on('connection', (socket) => {
    console.log('🔌 New client connected:', socket.id)
  })

  mqttClient.on('connect', () => {
    try {
      console.log('✅ Connected to Adafruit IO MQTT')
      mqttClient.subscribe(topics, (err) => {
        if (err) {
          console.error('❌ Failed to subscribe:', err)
        } else {
          console.log('📡 Subscribed to topics:', topics)
        }
      })
    } catch (error) {
      console.error('❌ Error during MQTT connection:', error)
    }
  })

  mqttClient.on('message', async (topic, message) => {
    try {
      const payload = JSON.parse(message.toString())
      const topicKey = Object.keys(Topic).find((key) => topic.includes(Topic[key as keyof typeof Topic]))
      const type = topicKey ? Topic[topicKey as keyof typeof Topic] : ''

      if (type) {
        // Call models to save data into database
        try {
          SensorFactory.createSensorData(type, payload)
        } catch (error) {
          console.error('❌ Error saving data to database:', error)
        }

        // Send to clients via Socket.IO
        io.emit(type, { topic: type, value: payload })
        console.log(`📤 Sent ${type} data to clients:`, { topic: type, value: payload })
      }
    } catch (error) {
      console.error('❌ Error processing MQTT message:', error)
    }
  })
}
