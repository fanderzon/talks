import { BaseBridge } from 'wisper-rpc';

class WorkerBridge extends BaseBridge {
  constructor(target) {
    super();
    this.target = target;

    this.onMessage = this.onMessage.bind(this);
    this.target.addEventListener(
      'message', this.onmessage
    );
  }

  onMessage(e) {
    this.receiveJSON(e.data);
  }

  sendJSON(json) {
    this.target.postMessage(json);
  }

  close() {
    super.close();
    this.target.removeEventListener(
      'message', this.onMessage
    );
  }
}

export default WorkerBridge;
