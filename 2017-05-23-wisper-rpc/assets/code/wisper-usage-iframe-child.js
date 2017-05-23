import { IframeBridge } from 'wisper-rpc';

const bridge = new IframeBridge(window.parent);

bridge.exposeFunction('add', function add(x, y) {
  return x + y;
});
