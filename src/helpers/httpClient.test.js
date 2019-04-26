import { httpGet } from './httpClient';

const mockXHR = {
  open: jest.fn(),
  send: jest.fn(),
  readyState: 4,
  responseText: '{}'
};

jest.mock('./HttpRequest', () => {
  return jest.fn().mockImplementation(() => mockXHR);
});

describe('httpClient', () => {
  describe('httpGet', () => {
    it('does something', async () => {
      const promise = httpGet('some-test-url');
      mockXHR.onreadystatechange();
      promise.then(() => {
        
      });
    })
  });
})
