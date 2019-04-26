export const listenToOnceAsync = (node, eventName) => {
  return new Promise(resolve => listenToOnce(node, eventName, resolve));
}

export const listenToOnce = (node, eventName, callback) => {
  node.addEventListener(eventName, function listener() {
    this.removeEventListener(eventName, listener);
    callback();
  });
}
