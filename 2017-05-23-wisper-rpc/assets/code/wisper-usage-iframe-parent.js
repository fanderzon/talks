import { IframeBridge } from 'wisper-rpc';

// Get the iframe, and create the bridge.
const iframe = document.querySelector('iframe');
const bridge = new IframeBridge(iframe.contentWindow);

bridge.invoke( 'add', [ 1, 2 ] )
  .then( result => alert(result) );
