

const axios = require('axios')

const SL_APP_URL = 'https://fathomless-plains-65743.herokuapp.com/api/sl?transportType=Tram&direction=2&originId=9248'

const getText = (departure1, departure2) => {
  const resp = []
  if (departure1) {
    resp.push(`First in: ${departure1.time.displayTime} from ${departure1.stopAreaName} towards ${departure1.destination}.
    `)
  }
  if (departure2) {
    resp.push(`Second in: ${departure2.time.displayTime} from ${departure2.stopAreaName} towards ${departure2.destination}
    `)
  }
  return resp.join('')
}

const getSlTimeHandler = async (conv) => {
  try {
    const resp = await axios.get(SL_APP_URL)

    if (!resp.data.length) {
      conv.add('There is no upcoping departures in the next minutes.')
      return
    }

    const [firstDeparture, secondDeparture, ...others]  = resp.data
    const text = getText(firstDeparture, secondDeparture)
    conv.add(text)
  } catch(e) {
    console.error('Error', e)
    conv.add('Oops, there were an error!')
  }
}

module.exports = {
  getSlTimeHandler
}