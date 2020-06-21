const axios = require('axios')
const Fs = require('fs')
const Path = require('path')

const downloadToFile = async (url, path) => {
  const writer = Fs.createWriteStream(path)

  const response = await axios({
    url,
    method: 'GET',
    responseType: 'stream'
  })

  response.data.pipe(writer)

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve)
    writer.on('error', reject)
  })
}

const mainDish = (raw) => {
  if (!raw || !raw.length) {
    return 'not_defined'
  }
  const items = raw[0].items
  const head = items.sort(it => -it.score)[0]
  return {
    name: head.name,
    calories: head.nutrition.calories
  }
}

const processFromFile = (path) => {
  const FormData = require('form-data')
  const data = new FormData()
  data.append('media', Fs.createReadStream(path))

  const config = {
    method: 'post',
    url: 'http://caloriemama.ai/api/food_recognition_proxy',
    headers: {
      'Referer': 'http://caloriemama.ai/api',
      ...data.getHeaders()
    },
    data
  }

  return axios(config)
    .then(response => {
      // console.log(response.data)
      return mainDish(response.data.results);
    })
    .catch(error => {
      console.error(error);
    })
}

module.exports = {
  recogniseUrl: (url) => {
    const path = Path.resolve('/tmp', `${Date.now()}.jpg`)
    return downloadToFile(url, path)
      .then(() => processFromFile(path))
  },

  download: (url, path) => downloadToFile(url, path),
  processImage: (path) => processFromFile(path),
  getMainDish: (raw) => mainDish(raw)
}