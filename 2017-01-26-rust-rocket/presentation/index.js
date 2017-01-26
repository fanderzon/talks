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
              REST in Rust
            </Heading>
            <Heading size={5} textColor="secondary" caps>using the Rocket framework 🚀</Heading>
            <Link href="https://twitter.com/fredrikanderzon">
              <Text bold textSize="1em" textColor="tertiary">by @fredrikanderzon</Text>
            </Link>
            <Image margin="0px auto" height="500px" src={images.ruststhlm.replace("/", "")} />
          </Slide>

          <Slide>
            <Headline fit>Why Rocket?</Headline>
            <List items={[
              "Validates incoming and outgoing types",
              "Beautiful and minimal boilerplate routing",
              "Easy to use, well designed support for:",
              "- JSON",
              "- Form data",
              "- Streaming",
            ]} />
          </Slide>

          <Slide>
            <Headline>First look</Headline>
            <CodePane
              textSize={20}
              lang="rust"
              source={require("raw!../assets/code/rocket-first-look.rs")}
              margin="20px auto"
            />
          </Slide>

          <Slide>
            <Headline fit>A more useful handler</Headline>
            <CodePane
              textSize={20}
              lang="rust"
              source={require("raw!../assets/code/rocket-json.rs")}
              margin="20px auto"
            />
          </Slide>

          <Slide>
            <Headline fit>How does it work?</Headline>
            <List items={[
              "Rocket checks the `route attribute` and the function signature and ensures that the specified types can be derived from the request",
              "If that fails the route is not matched and Rocket continues to look for other matching routes until it falls back to returning 404",
              "Rocket runs the handler and outputs the response",
              "The return value must implement a `Responder` trait. This is already set for primitives like String, Option, Result, etc. as well as on Rocket supplied types like JSON"
            ]} />
          </Slide>

          <Slide>
            <Headline fit>Note taker API</Headline>
            <List items={[
              "GET `/notes` - Should return a JSON array of all notes",
              "GET `/notes/<id>` - Should return a single note",
              "POST `/notes` - Should add a new note from raw JSON data",
              "PATCH `/notes/<id>` - Should update an existing note from raw JSON data",
              "DELETE `/notes/<id>` - Should delete an existing note"
            ]} />
          </Slide>

          <CodeSlide
            transition={[]}
            lang="rust"
            code={require("raw!../assets/code/note-model.rs")}
            ranges={[
              { loc: [9, 100], title: "Note data model" },
              { loc: [8, 9], note: "Derive `Queryable` trait from Diesel, Serialize/Deserialize for working with JSON" },
              { loc: [9, 15], note: "This is the full representation of a Note, will be used for output" },
              { loc: [17, 22], note: "This is the id-less Note we will use for input when creating/editing note data" },
              { loc: [16, 17], note: "It derives 2 other Diesel traits, `Insertable` and `AsChangeset` which will let us use it in insert and update statements" },
              { loc: [24, 25], note: "Since I want to use `NoteData` as a direct input to my POST/PATCH handlers i need to implement the `FromData` trait from Rocket" },
              { loc: [28, 29], note: "A `from_data` implementation get's access to the Request and Data structs from the Rocket request, and should return an Outcome" },
              { loc: [30, 36], note: "This will be either a `Failure` if the JSON data cannot be parsed to a `NoteData` struct" },
              { loc: [30, 36], note: "Or `Success` if it succeeds" },
            ]}/>

          <CodeSlide
            transition={[]}
            lang="rust"
            code={require("raw!../assets/code/rocket-new-note.rs")}
            ranges={[
              { loc: [12, 100], title: "Adding notes" },
              { loc: [9, 18], note: "Function to establish a connection to a PostgreSQL database using Diesel, the `DATABASE_URL` is in an .env file" },
              { loc: [19, 26], note: "`create_note` inserts a `NoteData` struct into the notes table, or fails and panics horribly🔥🔥🔥🔥" },
              { loc: [26, 28], note: "Because we implemented `FromData` on `NoteData` we can just tell rocket that the incoming data is a note, which is of type `NoteData`" },
              { loc: [28, 32], note: "Which makes this function very short and sweet" },
              { loc: [30, 31], note: "We use Rocket's built in JSON type to return our created `Note` as JSON" },
              { loc: [33, 37], note: "All that is left is mounting our handler to the Rocket and igniting it 🚀" },
            ]}/>

          <Slide>
            <Headline fit>Great! But what's missing?</Headline>
            <List items={[
              "A more efficient database strategy, connection pooling",
              "Error handling, this approach will panic on any DB error",
              "GET, PATCH and DELETE routes, maybe?",
            ]} />
          </Slide>

          <CodeSlide
            transition={[]}
            lang="rust"
            code={require("raw!../assets/code/db-pool.rs")}
            ranges={[
              { loc: [12, 100], title: "Connection Pooling" },
              { loc: [10, 11], note: "This requires a little more ceremony, and new crates. `lazy_static!` is a macro that lets statics execute code at runtime" },
              { loc: [11, 12], note: "`r2d2` is a connection pool manager, and `r2d2-diesel` adds simple Diesel support" },
              { loc: [15, 22], note: "Set up and return a pool using the r2d2-diesel ConnectionManager and the r2d2::Config" },
              { loc: [24, 25], note: "Create a public DB struct that holds the connection pool" },
              { loc: [32, 38], note: "Implement Rocket's `FromRequest` so that DB, which uses our lazy_static to produce a pool can be an argument to our route handlers" },
              { loc: [26, 31], note: "Finally, add a `conn()` method to DB that returns a connection from the pool" },
            ]}/>

          <CodeSlide
            transition={[]}
            lang="rust"
            code={require("raw!../assets/code/error-handling.rs")}
            ranges={[
              { loc: [12, 100], title: "Error handling" },
              { loc: [8, 10], note: "New imports, Error from Diesel, and the DB struct we just created" },
              { loc: [12, 13], note: "Change the `create_note` function to return a Result, with either a Note or diesel::Error" },
              { loc: [13, 16], note: "Which is what `get_result` will return here" },
              { loc: [18, 19], note: "Next change the `note_create` function to return a `Result` as well" },
              { loc: [18, 19], note: "Returning the Diesel Error on error here is not perfect as Rocket will just log it to console while responding with a status 500" },
              { loc: [18, 19], note: "A more production ready approach would be to create your own Error type, implementing Rocket's Responder trait" },
              { loc: [20, 25], note: "But for this presentation we just match the result and return a JSON reponse, or Diesel Error" },
            ]}/>

          <CodeSlide
            transition={[]}
            lang="rust"
            code={require("raw!../assets/code/full-example.rs")}
            ranges={[
              { loc: [12, 200], title: "All the codez 😎" },
              { loc: [0, 15], note: "Crates and imports" },
              { loc: [15, 27] },
              { loc: [29, 34], note: "Database functions" },
              { loc: [35, 39] },
              { loc: [40, 45] },
              { loc: [47, 51] },
              { loc: [52, 58] },
              { loc: [59, 67], note: "Rocket route handlers" },
              { loc: [68, 76] },
              { loc: [77, 85] },
              { loc: [86, 94] },
              { loc: [95, 102] },
              { loc: [103, 106], note: "Lift off! 🔥🚀" },
            ]}/>

          <Slide>
            <Headline fit>Presentation links</Headline>
            <Link href="https://github.com/fanderzon/rocket-api">
              <Text margin="40px auto 0" bold textSize="1em" textColor="quartenary">
                <Text textColor="secondary">SOURCE</Text>
                <Text textColor="quartenary">https://github.com/fanderzon/rocket-api</Text>
              </Text>
            </Link>
            <Link href="http://rest-in-rust.surge.sh/">
              <Text margin="40px auto 0" bold textSize="1em" textColor="quartenary">
                <Text textColor="secondary">SLIDES</Text>
                <Text textColor="quartenary">http://rest-in-rust.surge.sh</Text>
              </Text>
            </Link>
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
