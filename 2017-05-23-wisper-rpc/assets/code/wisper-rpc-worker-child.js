import {
  Remote,
  interfaceName,
  properties,
  types
} from 'wisper-rpc';
import WorkerBridge from './WorkerBridge';

const bridge = new WorkerBridge(self);

const console = {
  log: (...args) => bridge.invoke('console.log', [args])
};
let colorDiv;

@interfaceName( bridge, 'DomNode' )
@properties({
	color: types.string,
})
class DomNode extends Remote {
	style(obj) {
		return this.bridge.invokeAsync(
      this.interfaceName + ':style', [ this.id, obj ]
    );
	}
}

bridge.exposeFunction('pickColor', () => {
  colorDiv = colorDiv || new DomNode('#colorMe');
  const randomColor = `#${Math.round(Math.random() * 255).toString(16)}${Math.round(Math.random() * 255).toString(16)}${Math.round(Math.random() * 255).toString(16)}`;
  colorDiv.style({background: randomColor});
  colorDiv.on('color', (color) => {
    colorDiv.style({background: color});
  });
});
