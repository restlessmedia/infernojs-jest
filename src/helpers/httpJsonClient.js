import { httpGet, httpPost } from './httpClient';

const addHeader = (options, name, value) => {
  if (!options.headers) {
    options.headers = {};
  }
  options.headers[name] = value;
}

const addAcceptsHeader = options => addHeader(options, 'accepts', 'application/json');

const httpJsonGet = (url, options = {}) => {
  addAcceptsHeader(options);
  return httpGet(url);
}

const httpJsonPost = (url, data, options = {}) => {
  const body = data ? JSON.stringify(data) : null;
  addAcceptsHeader(options);
  return httpPost(url, body);
}

export {
  httpJsonGet as httpGet,
  httpJsonPost as httpPost,
};
