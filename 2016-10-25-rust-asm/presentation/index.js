// Import React
import React from "react";

// Import Spectacle Core tags
import {
  Appear,
  BlockQuote,
  Cite,
  CodePane,
  Deck,
  Fill,
  Fit,
  Heading,
  Image,
  Layout,
  Link,
  Markdown,
  Quote,
  Slide,
  Spectacle,
  Text
} from "spectacle";
import CodeSlide from 'spectacle-code-slide';

import { Bullet, Headline, List } from './talk.js';

// Import image preloader util
import preloader from "spectacle/lib/utils/preloader";

// Import theme
import createTheme from "spectacle/lib/themes/default";

// Require CSS
require("normalize.css");
require("spectacle/lib/themes/default/index.css");

const images = {
  ruststhlm: require("../assets/rust-sthlm.png"),
  how: require("../assets/how-do-they-do-it.gif"),
  constraints: require("../assets/constraints.jpg"),
  goodies: require("../assets/goodies.jpg"),
  safeandfast: require("../assets/safe-and-fast.png"),
};
preloader(images);

const theme = createTheme({
  primary: "#01346B",
  secondary: "#F74C00",
  tertiary: "#F49600",
  quartenary: "white"
}, {
  primary: "Open Sans Condensed",
  secondary: "Lobster Two",
  tertiary: "monospace"
});

export default class Presentation extends React.Component {
  render() {
    return (
      <Spectacle theme={theme}>
        <Deck transition={["zoom", "slide"]} transitionDuration={500}>

          <Slide>
            <Heading size={1} fit caps lineHeight={1} textColor="quartenary">
              Rust to ASM.JS
            </Heading>
            <Link href="https://twitter.com/fredrikanderzon">
              <Text bold textSize="1em" textColor="tertiary">by @fredrikanderzon</Text>
            </Link>
            <Image margin="0px auto" height="500px" src={images.ruststhlm.replace("/", "")} />
          </Slide>

          <Slide>
            <Headline fit>Install nightly</Headline>
            <CodePane
              textSize={20}
              lang="bash"
              source={require("raw!../assets/code/nightly.bash")}
              margin="20px auto"
            />
          </Slide>

          <Slide>
            <Headline>Requirements</Headline>
            <List items={[
              "Node.JS",
              "CMake",
              "Emscripten"
            ]} />
          </Slide>

          <Slide>
            <Headline fit>Install Emscripten</Headline>
            <CodePane
              textSize={20}
              lang="bash"
              source={require("raw!../assets/code/emscripten.bash")}
              margin="20px auto"
            />
          </Slide>

          <Slide>
            <Headline fit>Compile</Headline>
            <CodePane
              textSize={20}
              lang="bash"
              source={require("raw!../assets/code/compile.bash")}
              margin="20px auto"
            />
          </Slide>

          <Slide>
            <Headline fit>Run</Headline>
            <CodePane
              textSize={20}
              lang="bash"
              source={require("raw!../assets/code/run.bash")}
              margin="20px auto"
            />
          </Slide>

          <Slide>
            <Heading size={1} fit caps lineHeight={1} textColor="quartenary">
              Thank you!
            </Heading>
            <Link href="https://twitter.com/fredrikanderzon">
              <Text bold textSize="1em" textColor="tertiary">@fredrikanderzon</Text>
            </Link>
            <Image margin="0px auto" height="500px" src={images.ruststhlm.replace("/", "")} />
          </Slide>

        </Deck>
      </Spectacle>
    );
  }
}
