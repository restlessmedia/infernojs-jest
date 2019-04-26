import HttpRequest from './HttpRequest';

const httpMethod = {
  get: 'get',
  post: 'post',
  put: 'put',
}

const httpStatus = {
  ok: 200,
}

const send = (url, method, options = {}, body = null) => {
  const request = new HttpRequest();

  // add headers
  if (options.headers) {
    for (let key in options.headers) {
      try {
        request.setRequestHeader(key, options.headers[key]);
      } catch (e) {
        console.warn(`Failed to set request header ${key}. ${e}`);
      }
    }
  }

  // build the promise
  const promise = new Promise((resolve, reject) => {
    request.open(method, url, true);
    request.onreadystatechange = () => {
      if (request.readyState === 4 && request.status === httpStatus.ok) {
        resolve(request.responseText, request);
      }
    }
    request.onerror = (e) => reject(e, request);
  });

  request.send(body);

  return promise;
}

export const httpGet = (url, options = {}) => {
  return send(url, httpMethod.get, options);
}

export const httpPost = (url, body, options = {}) => {
  return send(url, httpMethod.post, options, body);
}

export const httpPut = (url, body, options = {}) => {
  return send(url, httpMethod.put, options, body);
}
