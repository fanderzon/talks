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
  ListItem,
  List,
  Markdown,
  Quote,
  Slide,
  Spectacle,
  Text
} from "spectacle";
import CodeSlide from 'spectacle-code-slide';

import { Bullet } from './bullet.js';

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
              Getting started with Rust
            </Heading>
            <Link href="https://twitter.com/fredrikanderzon">
              <Text bold textSize="1em" textColor="tertiary">by @fredrikanderzon</Text>
            </Link>
            <Image margin="0px auto" height="500px" src={images.ruststhlm.replace("/", "")} />
          </Slide>

          <Slide>
            <Heading size={1} fit caps lineHeight={1}>
              Rust language goals
            </Heading>
            <Bullet text={["Safe", "Fast"]} />
            <Bullet text={["Concurrent", "Practical"]} />
          </Slide>

          <Slide>
            <Heading size={2} fit caps lineHeight={1}>
              Safe and fast?
            </Heading>
            <Image margin="20px auto" height="400px" src={images.safeandfast.replace("/", "")} />
          </Slide>

          <Slide>
            <Heading size={2} fit caps lineHeight={1}>
              How do
            </Heading>
            <Heading size={1} fit caps>
              they do it?
            </Heading>
          </Slide>

        </Deck>
      </Spectacle>
    );
  }
}
