

const axios = require('axios')

const SL_APP_URL = 'https://fathomless-plains-65743.herokuapp.com/api/sl?transportType=Tram&direction=2&originId=9248'

const getSlTimeHandler = async (conv) => {
  try {
    const resp = await axios.get(SL_APP_URL)

    if (!resp.data.length) {
      conv.add('There is no upcoping departures in the next minutes.')
      return
    }

    const [firstDeparture, secondDeparture, ...others]  = resp.data
    conv.add(`First in: ${firstDeparture.time.displayTime} from ${firstDeparture.stopAreaName} towards ${firstDeparture.destination}.
    Second in: ${secondDeparture.time.displayTime} from ${secondDeparture.stopAreaName} towards ${secondDeparture.destination}
    `)
  } catch(e) {
    console.error('Error', e)
    conv.add('Oops, there were an error!')
  }
}

module.exports = {
  getSlTimeHandler
}