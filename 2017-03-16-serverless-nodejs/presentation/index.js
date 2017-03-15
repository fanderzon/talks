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

import { Bullet, Headline, List, ItemText } from './talk.js';

// Import image preloader util
import preloader from "spectacle/lib/utils/preloader";

// Import theme
import createTheme from "spectacle/lib/themes/default";

// Require CSS
require("normalize.css");
require("spectacle/lib/themes/default/index.css");

const images = {
  lambda: require("../assets/lambda.png"),
  me: require("../assets/me.jpg"),
  serverless: require("../assets/serverless.png"),
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
              💥 Serverless Node.js 💥
            </Heading>
            <Heading size={5} textColor="secondary" caps>on AWS Lambda</Heading>
            <Link href="https://twitter.com/fredrikanderzon">
              <Text bold textSize="1em" textColor="tertiary">by @fredrikanderzon</Text>
            </Link>
            <Image margin="0px auto" height="500px" src={images.lambda.replace("/", "")} />
          </Slide>

          <Slide>
            <Headline>Fredrik Andersson</Headline>
            <Layout>
              <Fill>
                <ItemText>Web dev for 17 years</ItemText>
                <ItemText>❤️ JavaScript, Node.js, Rust, React, React Native</ItemText>
                <ItemText>❤️ Not manually configuring servers</ItemText>
                <ItemText>Organizes the Rust Sthlm meetup</ItemText>
                <ItemText>Very soon a freelancer</ItemText>
              </Fill>
              <Fill>
                <Image width="360" src={images.me.replace("/", "")} />
                <Heading size={4} caps textColor="white" bgColor="tertiary" margin="10px 50px">
                  Hire me!
                </Heading>
              </Fill>
            </Layout>
          </Slide>

          <Slide>
            <Headline>What is serverless?</Headline>
            <Image margin="0px auto" height="500px" src={images.serverless.replace("/", "")} />
          </Slide>

          <Slide>
            <BlockQuote textSize="1.6em" textColor="tertiary">
              Lambda allows you to NOT think about servers. Which means you no
              longer have to deal with over/under capacity, deployments,
              scaling and fault tolerance, OS or language updates, metrics,
              and logging
            </BlockQuote>
            <Cite  textColor="secondary">http://cloudacademy.com/blog/aws-lambda-serverless-cloud/</Cite>
          </Slide>

          <Slide>
            <Layout>
              <Fill>
                <Bullet text={["Platform as a service"]} />
                <ItemText>Gives you a preconfigured environment to run your code in</ItemText>
                <ItemText>Not inherently serverless, but many PaaS products like Google App Engine and Zeit Now are</ItemText>
              </Fill>
              <Fill>
                <Bullet text={["Function as a service"]} />
                <ItemText>Lets you write a function that will be called for every request</ItemText>
                <ItemText>Serverless by default, cold starts processes as needed and runs your handler functions on request</ItemText>
              </Fill>
            </Layout>
          </Slide>

          <Slide>
            <Headline>FaaS</Headline>
            <CodePane
              textSize={20}
              lang="javascript"
              source={require("raw!../assets/code/first-look-faas.js")}
              margin="20px auto"
            />
            <Headline>PaaS</Headline>
            <CodePane
              textSize={20}
              lang="javascript"
              source={require("raw!../assets/code/first-look-paas.js")}
              margin="20px auto"
            />
          </Slide>

        </Deck>
      </Spectacle>
    );
  }
}
