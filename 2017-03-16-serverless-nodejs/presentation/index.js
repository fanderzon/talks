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
  emptyRack: require("../assets/empty-rack.jpg"),
  typing: require("../assets/typing.gif"),
  lambdasync: require("../assets/lambdasync.png"),
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
                <ItemText>❤️ Not configuring servers</ItemText>
                <ItemText>Organizes the Rust Sthlm meetup</ItemText>
                <ItemText>Freelancing full stack dev (soon)</ItemText>
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
            <Heading size={2} caps lineHeight={1} textColor="tertiary" margin="0px 0px 30px">
              ???
            </Heading>
            <Image margin="0px auto" height="500px" src={images.emptyRack.replace("/", "")} />
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
            <Heading size={2} caps lineHeight={1} textColor="tertiary">
              Function as a Service
            </Heading>
            <CodePane
              textSize={20}
              lang="javascript"
              source={require("raw!../assets/code/first-look-faas.js")}
              margin="20px auto"
            />
          </Slide>

          <Slide>
            <Heading size={2} caps lineHeight={1} textColor="tertiary">
              Platform as a Service
            </Heading>
            <CodePane
              textSize={20}
              lang="javascript"
              source={require("raw!../assets/code/first-look-paas.js")}
              margin="20px auto"
            />
          </Slide>

          <Slide>
            <Heading size={2} caps lineHeight={1} textColor="tertiary">
              Why Lambda?
            </Heading>
            <ItemText textColor="quartenary" shouldAppear>No administration</ItemText>
            <ItemText textColor="quartenary" shouldAppear>Pay for usage, not capacity*</ItemText>
            <ItemText textColor="quartenary" shouldAppear>Perfect for microservices</ItemText>
            <ItemText textColor="quartenary" shouldAppear>Logging provided out of the box</ItemText>
            <ItemText textColor="quartenary" shouldAppear>Focus on application architecture, not scaling and monitoring</ItemText>

          </Slide>

          <Slide>
            <Heading size={2} caps lineHeight={1} textColor="tertiary">
              AWS Lambda serverless stack
            </Heading>
            <List padding="0px 90px 0px 140px" shouldAppear={true} items={[
              "API Gateway - Request/Response mapping",
              "Lambda - Application Logic",
              "DynamoDB - Data storage"
            ]} />
          </Slide>

          <Slide>
            <Heading size={2} caps lineHeight={1} textColor="tertiary">
              Manual deploy process
            </Heading>
            <List padding="0px 50px 0px 140px" shouldAppear={true} items={[
              "1. Write handler function",
              "2. Zip contents of folder",
              "3. Upload to Lambda (CLI tool/Web interface)",
              "4. Create an API Gateway",
              "5. Configure Integration as Lambda Proxy",
              "6. Create DynamoDB table",
              "7. Create IAM policy with DynamoDB access",
              "8. Attach to your Lamda execution role",
              "9. Deploy API Gateway"
            ]} />
          </Slide>

          <Slide>
            <Image margin="0px auto" height="500px" src={images.typing.replace("/", "")} />
          </Slide>

          <Slide>
            <Heading size={2} caps lineHeight={1} textColor="tertiary">
              Better ways
            </Heading>
            <List padding="0px 50px 0px 120px" shouldAppear={true} items={[
              "CloudFormation (Serverless Application Model)",
              "Serverless Framework (uses CloudFormation)",
              "AWS Console Templates",
              "⭐️ Lambdasync ⭐️"
            ]} />
          </Slide>

          <Slide>
            <Image margin="0px auto" width="200px" src={images.lambdasync.replace("/", "")} />
            <Heading size={2} caps lineHeight={1} textColor="tertiary">
              Lambdasync
            </Heading>
            <ItemText textColor="quartenary">A "configless" deploy and development <br />tool for AWS Lambda</ItemText>
            <ItemText textColor="quartenary" shouldAppear>Scaffolds, deploys and updates Lambda functions</ItemText>
            <ItemText textColor="quartenary" shouldAppear>Local dev server</ItemText>
            <ItemText textColor="quartenary" shouldAppear>View CloudWatch Logs in console</ItemText>
          </Slide>

          <Slide>
            <Heading size={2} caps lineHeight={1} textColor="tertiary">
              Scaffold
            </Heading>
            <ItemText textColor="quartenary">
              Creates a project folder with a ready to deploy Lambda function that responds to requests with:<br />
              "Everything is awesome"
            </ItemText>
            <CodePane
              textSize={20}
              lang="bash"
              source={require("raw!../assets/code/lambdasync-new.bash")}
              margin="20px auto"
            />
          </Slide>

          <Slide>
            <Heading size={2} caps lineHeight={1} textColor="tertiary">
              Devserver
            </Heading>
            <ItemText textColor="quartenary">Starts a local devserver on port 3003 that maps inputs and outputs as a Lambda proxy integration</ItemText>
            <CodePane
              textSize={20}
              lang="bash"
              source={require("raw!../assets/code/lambdasync-devserver.bash")}
              margin="20px auto"
            />
          </Slide>

          <Slide>
            <Heading size={2} caps lineHeight={1} textColor="tertiary">
              Deploy
            </Heading>
            <ItemText textColor="quartenary">Zips project and updates your Lambda function. On first deploy creates execution roles and IAM policies for you</ItemText>
            <CodePane
              textSize={20}
              lang="bash"
              source={require("raw!../assets/code/lambdasync-deploy.bash")}
              margin="20px auto"
            />
          </Slide>

          <Slide>
            <Heading size={2} caps lineHeight={1} textColor="tertiary">
              Other features
            </Heading>
            <ItemText textColor="quartenary" shouldAppear>Set Lambda environment variables with the `secret` command (for storing credentials and other secrets)</ItemText>
            <ItemText textColor="quartenary" shouldAppear>Update memory and timeout limits with the `config` command</ItemText>
            <ItemText textColor="quartenary" shouldAppear>Output CloudWatch logs to the console with the `logs` command</ItemText>
          </Slide>

          <Slide>
            <Heading size={2} caps lineHeight={1} textColor="tertiary">
              What's next?
            </Heading>
            <ItemText textColor="quartenary">Create and link DynamoDB tables</ItemText>
            <CodePane
              textSize={20}
              lang="bash"
              source={require("raw!../assets/code/lambdasync-table.bash")}
              margin="20px auto"
            />
          </Slide>

          <CodeSlide
            transition={[]}
            lang="javascript"
            code={require("raw!../assets/code/generated.js")}
            ranges={[
              { loc: [9, 100], title: "Generated table file" },
              { loc: [4, 10], note: "Uses the DocumentClient from the AWS SDK" },
              { loc: [10, 25], note: "Wraps each method call in a promise wrapper" },
              { loc: [27, 32], note: "Straight-forward wrapping of most methods" },
              { loc: [31, 36] },
              { loc: [71, 76] },
              { loc: [35, 41], note: "Except for the update method that needs a simplified API" },
              { loc: [78, 82], note: "For each `lambdasync table x` one wrapped table is exported" },
            ]}/>

          <Slide>
            <Heading size={2} caps lineHeight={1} textColor="tertiary">
              Usage
            </Heading>
            <CodePane
              textSize={20}
              lang="javascript"
              source={require("raw!../assets/code/lambdasync-table.js")}
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
          </Slide>

        </Deck>
      </Spectacle>
    );
  }
}
