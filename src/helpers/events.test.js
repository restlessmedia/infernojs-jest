import { listenToOnceAsync, listenToOnce } from './events';

describe('events', () => {
  describe('listenToOnceAsync', () => {
    // custom event
    const event = new Event('build');
    const node = document.createElement('div');

    it('should only trigger once', () => {
      // get the promise
      const prom = listenToOnceAsync(node, 'build');

      // mock multiple calls
      node.dispatchEvent(event);
      node.dispatchEvent(event);

      expect(prom).resolves.toHaveBeenCalledTimes(1);
    })
  })

  describe('listenToOnce', () => {
    it('should only trigger once', () => {
      const callback = jest.fn();

      // add the callback
      listenToOnce(node, 'build', callback);

      // mock multiple calls
      node.dispatchEvent(event);
      node.dispatchEvent(event);

      expect(callback).toHaveBeenCalledTimes(1);
    })
  })
})
