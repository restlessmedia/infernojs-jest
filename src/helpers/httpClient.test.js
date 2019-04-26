import { httpGet } from './httpClient';

describe('httpClient', () => {
  describe('httpGet', () => {
    it('does something', async () => {
      const response = await httpGet('https://www.blakestanley.co.uk/api/property/sales/latest/?maxPerPage=4');
    })
  });
})
