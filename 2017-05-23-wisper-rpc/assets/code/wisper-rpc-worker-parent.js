import {
  Local,
  interfaceName,
  properties,
  types
} from 'wisper-rpc';
import WorkerBridge from './WorkerBridge';

const myWorker = new Worker('dist/worker.js');
const bridge = new WorkerBridge(myWorker);

bridge.exposeFunction('console.log', (...args) => {
  console.log(...args);
});

@interfaceName( bridge, 'DomNode' )
@properties({
	color: types.string,
})
class DomNode extends Local {
  constructor(query) {
    super();
    this.match = document.querySelector(query);
    this.color = null;
    setInterval(() => {
      this.color = '#00ff00';
    }, 5000);
  }
  style(obj) {
    if (this.match && this.match.style && obj && Object.keys(obj).length > 0) {
      Object.keys(obj).forEach(key => this.match.style[key] = obj[key]);
      return true;
    }
    return false;
  }
}

document.querySelector('#randomcolor').onclick = () => {
  bridge.invoke('pickColor');
}
