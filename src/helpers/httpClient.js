const httpMethod = {
  get: 'get',
  post: 'post',
}

const send = (url, method, options, data = null) => {
  return new Promise(resolve => {
    setTimeout(resolve, 2000);
  }, reject => {
    setTimeout(reject, 2000);
  })
}

export const httpGet = url => {
  return send(url, httpMethod.get);
}

export const httpPost = (url, data, options) => {
  return send(url, httpMethod.post, options, data);
}
