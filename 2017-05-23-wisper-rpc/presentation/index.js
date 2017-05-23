// Import React
import React from "react";

// Import Spectacle Core tags
import {
  BlockQuote,
  Cite,
  Deck,
  Heading,
  ListItem,
  List,
  Quote,
  Slide,
  Text,
  Image,
  Appear,
  CodePane,
  Layout,
  Fit,
  Fill,
  Link
} from "spectacle";
import CodeSlide from 'spectacle-code-slide';
import DoubleCodePane from './DoubleCodePane';

// Import image preloader util
import preloader from "spectacle/lib/utils/preloader";

// Import theme
import createTheme from "spectacle/lib/themes/default";

// Require CSS
require("normalize.css");
require("spectacle/lib/themes/default/index.css");

// Interactive slides
import Interactive from '../assets/interactive.js';

const images = {
  wisperLogo: require('../assets/img/wisper-logo.svg'),
  victorystick: require('../assets/img/github-victorystick.png'),
};

preloader(images);

const theme = createTheme({
  primary: "#01346B",
  secondary: "#6cd381",
  tertiary: "white",
  quartenary: "white"
}, {
  primary: "Open Sans Condensed",
  secondary: "Lobster Two",
  tertiary: "monospace"
});

export default class Presentation extends React.Component {
  render() {
    return (
      <Deck transition={["zoom", "slide"]} transitionDuration={500} theme={theme}>
        <Slide transition={["zoom"]} bgColor="primary"
          notes='
            <p>Welcome to everyone, thank organizer. Johnny</p>
            <p>Poll on how many knows about JSON RPC</p>
            <p>A little about me: web dev since forever, React developer, Rust and GraphQL nut</p>
          '
        >
          <Image margin="0px auto" width="300px" height="300px" src={images.wisperLogo} />
          <Heading size={1} caps lineHeight={1} textColor="secondary">
            Wisper RPC
          </Heading>
          <Text margin="10px 0 0" textColor="tertiary" size={1} fit bold>
            A delightful alternative to JSON RPC
          </Text>
        </Slide>
        <Slide transition={["zoom"]}
          notes='
            <p>Dont have to explain JSON but what is RPC?</p>
          '
        >
          <Heading size={1} fit caps textColor="tertiary">Remote Procedure Call</Heading>
        </Slide>
        <Slide transition={["fade"]}
          notes='
            <p>Old idea that dates back to the 60s but got its name in the 80s</p>
            <p>Unit of code can be a function, method, macro, subroutine depending on language and implementation</p>
            <p>Context can be different machines, threads, different languages in different runtimes</p>
          '
        >
          <Heading size={4} caps textColor="secondary">Run a unit of code in another context as if it was in your local context</Heading>
        </Slide>
        <Slide transition={["fade"]}
          notes='
            <p>Works for anything that can be serialized and deserialized to/from JSON</p>
          '
        >
          <Heading size={1} textColor="secondary" caps>JSON RPC</Heading>
          <List textColor="tertiary">
            <Appear><ListItem>Request-Response JSON protocol</ListItem></Appear>
            <Appear><ListItem>Transport agnostic (HTTP, Sockets, postMessage ...)</ListItem></Appear>
          </List>
        </Slide>
        <Slide transition={["fade"]}
          notes='
            <p>Must specify JSON RPC version</p>
            <p>Must specify id if expecting a response, otherwise notification</p>
            <p>If specified params must be an array or object</p>
            <p>Response must include a result or error, and the same id as the request</p>
            <p>If no id was sent in the request no response should be sent</p>
          '
        >
          <Heading size={1} fit textColor="secondary" caps>Request / Response</Heading>
          <DoubleCodePane
            left={{
              lang: 'javascript',
              source: require('raw-loader!../assets/code/json-rpc1-request.json'),
            }}
            right={{
              lang: 'javascript',
              source: require("raw-loader!../assets/code/json-rpc1-response.json"),
            }}
          />
        </Slide>
        <Slide transition={["fade"]}
          notes='
            <p>Say something clever</p>
          '
        >
          <Heading size={1} textColor="secondary" caps>Wisper RPC adds</Heading>
          <List textColor="tertiary">
            <Appear><ListItem>Constructor and destructor calls</ListItem></Appear>
            <Appear><ListItem>Instance method and static method calls</ListItem></Appear>
            <Appear><ListItem>Event messages (remote property listeners)</ListItem></Appear>
          </List>
        </Slide>
        <Slide transition={["fade"]}
          notes='
            <p>~ is used both to construct and destruct</p>
            <p>result includes id of created instance</p>
            <p>and any default instance properties</p>
          '
        >
          <Heading size={1} textColor="secondary" caps>Constructor Calls</Heading>
          <DoubleCodePane
            left={{
              lang: 'javascript',
              source: require('raw-loader!../assets/code/wisper-rpc-construct-request.json'),
            }}
            right={{
              lang: 'javascript',
              source: require("raw-loader!../assets/code/wisper-rpc-construct-response.json"),
            }}
          />
        </Slide>
        <Slide transition={["fade"]}
          notes='
            <p>~ is used as a method name on the instance to destroy</p>
            <p>id can be ommited in the request if you dont want a "receipt" of destruction</p>
          '
        >
          <Heading size={1} textColor="secondary" caps>Destructor Calls</Heading>
          <DoubleCodePane
            left={{
              lang: 'javascript',
              source: require('raw-loader!../assets/code/wisper-rpc-destruct-request.json'),
            }}
            right={{
              lang: 'javascript',
              source: require("raw-loader!../assets/code/wisper-rpc-destruct-response.json"),
            }}
          />
        </Slide>
        <Slide transition={["fade"]}
          notes='
            <p>Static methods are mapped with .</p>
            <p>Again, id could be ommitted here if you dont want a response, it is then a Notification request in JSON RPC/Wisper terms</p>
          '
        >
          <Heading size={1} fit textColor="secondary" caps>Static method calls</Heading>
          <DoubleCodePane
            left={{
              lang: 'javascript',
              source: require('raw-loader!../assets/code/wisper-rpc-static-request.json'),
            }}
            right={{
              lang: 'javascript',
              source: require("raw-loader!../assets/code/wisper-rpc-static-response.json"),
            }}
          />
        </Slide>
        <Slide transition={["fade"]}
          notes='
            <p>Instance methods are mapped with :</p>
            <p>The first argument should be the instance id you got from the constructor call</p>
          '
        >
          <Heading size={1} fit textColor="secondary" caps>Instance method calls</Heading>
          <DoubleCodePane
            left={{
              lang: 'javascript',
              source: require('raw-loader!../assets/code/wisper-rpc-instance-request.json'),
            }}
            right={{
              lang: 'javascript',
              source: require("raw-loader!../assets/code/wisper-rpc-instance-response.json"),
            }}
          />
        </Slide>
        <Slide transition={["fade"]}
          notes='
            <p>Event messages are marked by !</p>
            <p>They are notifications expecting no response</p>
            <p>:! signifies that its a instance event, containing the id of the instance as the first param</p>
          '
        >
          <Heading size={1} textColor="secondary" caps>Event message</Heading>
          <CodePane
            lang='javascript'
            source={require('raw-loader!../assets/code/wisper-rpc-events-notification.json')}
            textSize={20}
            margin="20px 0px"
            style={{minHeight: '40vh', maxHeight: '40vh'}}
          />
        </Slide>
        <Slide>
          <Heading size={1} textColor="secondary" caps>Motivation</Heading>
        </Slide>
        <Slide
          notes='
            <p>Ad SDK for native apps, allows app owners to fetch and control ads in their app</p>
            <p>Ads are all web tech running in a webview</p>
            <p>Want to access native functionality like media players, save to gallery, add to calendar</p>
          '
        >
          <Heading size={1} fit textColor="secondary" caps>Use case - Ad bridge</Heading>
          <List textColor="tertiary">
            <Appear><ListItem>Ad SDK for native apps</ListItem></Appear>
            <Appear><ListItem>Ads are running HTML/CSS/JavaScript in a webview</ListItem></Appear>
            <Appear><ListItem>Ads want to use native functionality</ListItem></Appear>
            <Appear><ListItem>MRAID (Mobile Rich Media Ad Interface Definitions)</ListItem></Appear>
            <Appear><ListItem>Wisper! 🙌</ListItem></Appear>
          </List>
        </Slide>
        <Slide
          notes='
            <p>What if we used JavaScript for the internal SDK logic?</p>
            <p>Isolated secure webview that downloads SDK updates as they happen</p>
            <p>Same benefits of React native/Code push</p>
          '
        >
          <Heading size={1} fit textColor="secondary" caps>Use case - SDK logic bridge</Heading>
          <List textColor="tertiary">
            <Appear><ListItem>Bug fixes to the SDK takes months or years to replace the previous version</ListItem></Appear>
            <Appear><ListItem>Publishers (app owners) have to update their app with a new SDK</ListItem></Appear>
            <Appear><ListItem>Users have to update the publishers' app</ListItem></Appear>
            <Appear><ListItem>Wisper! 🎉</ListItem></Appear>
          </List>
        </Slide>
        <Slide bgImage={images.victorystick} bgDarken={0.8}>
          <Heading size={1} textColor="secondary" caps>Whodunit?</Heading>
          <List textColor="tertiary">
            <ListItem>Oskar Segersvärd (Mastermind)</ListItem>
            <ListItem>Patrik Nyblad (iOS)</ListItem>
            <ListItem>Ehssan Hoorvash (Android)</ListItem>
            <ListItem>Rana Hamid (Android)</ListItem>
            <ListItem>Fredrik Andersson (Fanboy)</ListItem>
          </List>
        </Slide>
        <Slide transition={["fade"]}
          notes='
            <p>That was the protocol, but how do you actually use it?</p>
          '
        >
          <Heading size={1} textColor="secondary" caps>Install</Heading>
          <CodePane
            lang='bash'
            source={require('raw-loader!../assets/code/wisper-install.bash')}
            textSize={20}
            margin="20px 0px"
            style={{minHeight: '40vh', maxHeight: '40vh'}}
          />
        </Slide>
        <Slide>
          <Heading size={1} textColor="secondary" caps>Bridging iframes</Heading>
        </Slide>
        <Slide transition={["fade"]}
          notes='
            <p>One of the few built in bridges is for iframes</p>
            <p>On the parent side create a bridge with the iframe window as target</p>
            <p>Call functions with bridge invoke, get a promise back</p>
          '
        >
          <Heading size={1} fit textColor="secondary" caps>Parent code</Heading>
          <CodePane
            lang='javascript'
            source={require('raw-loader!../assets/code/wisper-usage-iframe-parent.js')}
            textSize={20}
            margin="20px 0px"
            style={{minHeight: '40vh', maxHeight: '40vh'}}
          />
        </Slide>
        <Slide transition={["fade"]}
          notes='
            <p>On the iframe side create a bridge with the parent as target</p>
            <p>Expose function</p>
          '
        >
          <Heading size={1} fit textColor="secondary" caps>Iframe code</Heading>
          <CodePane
            lang='javascript'
            source={require('raw-loader!../assets/code/wisper-usage-iframe-child.js')}
            textSize={20}
            margin="20px 0px"
            style={{minHeight: '40vh', maxHeight: '40vh'}}
          />
        </Slide>
        <Slide>
          <Heading size={1} fit textColor="secondary" caps>Bridging web workers</Heading>
          <List textColor="tertiary">
            <Appear><ListItem>Web workers are a way to run code in a separate thread</ListItem></Appear>
            <Appear><ListItem>The worker has no access to the DOM (or anything from the owners context)</ListItem></Appear>
            <Appear><ListItem>It does have `onmessage` and `postMessage` methods similar to iframes</ListItem></Appear>
            <Appear><ListItem>Wisper! 🤓</ListItem></Appear>
          </List>
        </Slide>
        <CodeSlide
          notes='
            <p>On close I would remove my `message` listener if </p>
            <p>Expose function</p>
          '
          transition={[]}
          lang="js"
          code={require("raw-loader!../assets/code/wisper-user-worker-bridge.js")}
          ranges={[
            { loc: [0, 270], title: "Custom WebWorkerBridge" },
            { loc: [2, 3], note: "The worker bridge extends the Wisper BaseBridge" },
            { loc: [3, 6], note: "and takes the target as it's only argument" },
            { loc: [7, 12], note: "A bridge needs to listen for data somehow..." },
            { loc: [13, 16], note: "...and pass it to receiveJSON from BaseBridge" },
            { loc: [17, 20], note: "A bridge also needs to implement sendJSON (in this case sending data with `postMessage`)" },
            { loc: [21, 27], note: "close is optional to implement, for cleanup like removing the `message` listener" },
            { loc: [29, 30], image: images.wisperLogo },
          ]}
        />
        <CodeSlide
          notes='
            <p>On close I would remove my `message` listener if </p>
            <p>Expose function</p>
          '
          transition={[]}
          lang="js"
          code={require("raw-loader!../assets/code/wisper-rpc-worker-parent.js")}
          ranges={[
            { loc: [0, 270], title: "PARENT CODE" },
            { loc: [0, 6], note: "We need to import some more stuff from Wisper this time..." },
            { loc: [6, 7], note: "...and the bridge we just created" },
            { loc: [8, 10], note: "Start a new worker and initialize the bridge" },
            { loc: [11, 14], note: "The worker context doesn't have console.log(), so let's make one" },
            { loc: [15, 16], note: "interfaceName is a decorator that tells the bridge which route to connect our class to" },
            { loc: [16, 19], note: "properties is a decorator that makes changes to specified properties emit event messages across the bridge" },
            { loc: [19, 20], note: "The new class extends Local" },
            { loc: [20, 23], note: "DomNode takes a CSS style selector as it's argument and tries to find an element" },
            { loc: [23, 27], note: "To test the properties decorator we set the color to green every 5 seconds" },
            { loc: [28, 35], note: "The implementation of style tries to apply every supplied style property to the element as is" },
            { loc: [37, 40], note: "We listen to clicks on a button to tell the worker to pick a color" },
          ]}
        />
        <CodeSlide
          notes='
            <p>On close I would remove my `message` listener if </p>
            <p>Expose function</p>
          '
          transition={[]}
          lang="js"
          code={require("raw-loader!../assets/code/wisper-rpc-worker-child.js")}
          ranges={[
            { loc: [0, 270], title: "WORKER CODE" },
            { loc: [2, 3], note: "The worker imports Remote instead of Local" },
            { loc: [8, 9], note: "Sets up the bridge the same way, but with a reference to self" },
            { loc: [10, 13], note: "console.log() passes along the args across the bridge" },
            { loc: [15, 19], note: "Same decorator setup as before" },
            { loc: [19, 20], note: "This DomNode extends Remote" },
            { loc: [20, 25], note: "And the style implementation just passes on the info to the other side" },
            { loc: [27, 29], note: "Listen for calls to pickColor and create a new node the first time" },
            { loc: [29, 30], note: "Apply 🚀 science to generate a random color" },
            { loc: [30, 31], note: "Call style() on your class and it will magically apply the styles in the DOM of the parent context" },
            { loc: [31, 34], note: "Whenever the color changes on the other side this code runs" },
          ]}
        />
        <Slide>
          <Heading size={1} textColor="secondary" caps>Demo</Heading>
        </Slide>

        <Slide>
          <Heading size={1} fit caps lineHeight={1} textColor="secondary">
            Thank you!
          </Heading>
          <Link href="https://twitter.com/fredrikanderzon">
            <Text bold textSize="1em" textColor="tertiary">@fredrikanderzon</Text>
          </Link>
        </Slide>

      </Deck>
    );
  }
}
