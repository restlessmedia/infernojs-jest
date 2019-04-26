import { httpGet, httpPost } from './httpClient';

const mockHttpRequest = {
  open: jest.fn(),
  send: jest.fn(),
  readyState: 4,
  responseText: '{}',
  setRequestHeader: jest.fn(),
};

jest.mock('./HttpRequest', () => {
  return jest.fn().mockImplementation(() => mockHttpRequest);
});

describe('httpClient', () => {
  describe('httpGet', () => {
    it('onreadystatechange', () => {
      const promise = httpGet('some-test-url');
      mockHttpRequest.onreadystatechange();

      // TODO: assert something?
      promise.then(() => { });
    });

    it('onerror', () => {
      const promise = httpGet('some-test-url');
      mockHttpRequest.onerror();

      // TODO: assert something?
      promise.then(() => { });
    });

    it('adds headers', () => {
      httpGet('some-test-url', { headers: { accepts: '*', contentType: 'application/json' } });
      
      expect(mockHttpRequest.setRequestHeader).toHaveBeenCalledWith('accepts', '*');
      expect(mockHttpRequest.setRequestHeader).toHaveBeenCalledWith('contentType', 'application/json');
    });
  });

  describe('httpPost', () => {
    it('sends body', async () => {
      httpPost('some-test-url', 'test-body');
      
      expect(mockHttpRequest.send).toHaveBeenCalledWith('test-body');
    });
  });
});
