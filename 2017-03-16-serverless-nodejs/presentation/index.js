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
  lambda: require("../assets/lambda.png"),
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
              ⚡️ Serverless Node.js ⚡️
            </Heading>
            <Heading size={5} textColor="secondary" caps>on AWS Lambda</Heading>
            <Link href="https://twitter.com/fredrikanderzon">
              <Text bold textSize="1em" textColor="tertiary">by @fredrikanderzon</Text>
            </Link>
            <Image margin="0px auto" height="500px" src={images.lambda.replace("/", "")} />
          </Slide>

          <Slide>
            <Headline>A first look</Headline>
            <CodePane
              textSize={20}
              lang="javascript"
              source={require("raw!../assets/code/hello-world.js")}
              margin="20px auto"
            />
          </Slide>

        </Deck>
      </Spectacle>
    );
  }
}
