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
  code: require("../assets/code.png"),
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

          <Slide bgImage={images.code.replace("/", "")} bgDarken={0.5}>
            <Heading size={1} fit caps lineHeight={1} textColor="quartenary">
              Stateless Components
            </Heading>
            <Link href="https://twitter.com/fredrikanderzon">
              <Text bold textSize="1em" textColor="tertiary">by @fredrikanderzon</Text>
            </Link>
          </Slide>
          <Slide>
            <Headline fit>Stateless components</Headline>
            <CodePane
              textSize={20}
              lang="javascript"
              source={require("raw!../assets/code/stateless.js")}
              margin="20px auto"
            />
            <CodePane
              textSize={20}
              lang="javascript"
              source={require("raw!../assets/code/class.js")}
              margin="20px auto"
            />
          </Slide>
          <Slide>
            <Headline>Perks</Headline>
            <Bullet text={["Less code, more readable"]} />
            <Bullet text={["No state, only props"]} />
            <Bullet text={["Encourages small, dumb components"]} />
            <Bullet text={["Just a function, easy to test"]} />
            <Bullet text={["No class, super or `this`"]} />
          </Slide>
          <Slide>
            <Headline>Cons</Headline>
            <Bullet text={["No lifecycle hooks"]} />
            <Bullet text={["No state, only props"]} />
          </Slide>
          <Slide>
            <Headline>Recompose state</Headline>
            <CodePane
              textSize={20}
              lang="javascript"
              source={require("raw!../assets/code/with-state.js")}
              margin="20px auto"
            />
          </Slide>
          <Slide>
            <Headline>Lifecycle hooks</Headline>
            <CodePane
              textSize={20}
              lang="javascript"
              source={require("raw!../assets/code/fetch-person.js")}
              margin="20px auto"
            />
          </Slide>
          <Slide>
            <Headline>Another way</Headline>
            <CodePane
              textSize={20}
              lang="javascript"
              source={require("raw!../assets/code/lifecycle.js")}
              margin="20px auto"
            />
          </Slide>
          <Slide>
            <Headline textColor="quartenary">Thanks!</Headline>
            <Link href="https://twitter.com/fredrikanderzon">
              <Text bold textSize="1em" textColor="tertiary">@fredrikanderzon</Text>
            </Link>
          </Slide>
        </Deck>
      </Spectacle>
    );
  }
}
