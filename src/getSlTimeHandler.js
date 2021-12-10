

const axios = require('axios')

const SL_APP_URL = 'https://fathomless-plains-65743.herokuapp.com/api/sl?originSiteId=9248'

const getSlTimeHandler = async (conv) => {
  try {
    const resp = await axios.get(SL_APP_URL)

    if (!resp.data.length) {
      conv.add('There is no upcoping departures in the next minutes.')
      return
    }

    const [firstDeparture, secondDeparture, ...others]  = resp.data
    conv.add(`The first departure is in ${firstDeparture.time.displayTime} from ${firstDeparture.stopAreaName} towards ${firstDeparture.destination}.
    The second departure is in ${secondDeparture.time.displayTime} from ${secondDeparture.stopAreaName} towards ${secondDeparture.destination}
    Do you want me to set an alarm when you should leave the house?
    `)
  } catch(e) {
    console.error('Error', e)
    conv.add('Oops, there were an error!')
  }
}

module.exports = {
  getSlTimeHandler
}