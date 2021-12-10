const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.json())

// Import the appropriate service and chosen wrappers
const {
  actionssdk,
  smarthome,
} = require('actions-on-google')

const {
  conversation,
  Image,
} = require('@assistant/conversation')
const { getSlTimeHandler } = require('./getSlTimeHandler')

// Create an app instance
const actionsApp = conversation()

// Create an app instance
// const actionsApp = actionssdk()

// actionsApp.intent('actions.intent.MAIN', conv => {
//   conv.ask('How are you?')
// })

actionsApp.handle('getSLTime', getSlTimeHandler)



app.get('/ping', (req, res) => {
  res.send({
    sucess: true,
    data: 'pong'
  })
})

app.post('/intent', actionsApp)


app.listen(port, () => {
  console.log(`Example app listening at port ${port}`)
})