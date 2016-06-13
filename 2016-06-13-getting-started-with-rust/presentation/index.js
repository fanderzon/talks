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
              Getting started with Rust
            </Heading>
            <Link href="https://twitter.com/fredrikanderzon">
              <Text bold textSize="1em" textColor="tertiary">by @fredrikanderzon</Text>
            </Link>
            <Image margin="0px auto" height="500px" src={images.ruststhlm.replace("/", "")} />
          </Slide>

          <Slide>
            <Headline fit>Rust language goals</Headline>
            <Bullet text={["Safe", "Fast"]} />
            <Bullet text={["Concurrent", "Practical"]} />
          </Slide>

          <Slide>
            <Headline>Safe</Headline>
            <List items={[
              "Memory safe",
              "Data race free",
              "Very few runtime errors"
            ]} />
          </Slide>

          <Slide>
            <Headline>Fast</Headline>
            <List items={[
              "No garbage collector",
              "Minimal runtime",
              "LLVM backend",
              "Zero-cost abstractions",
              <Link href="http://bit.ly/1rhTQNH"><Text textColor="white">Benchmarks http://bit.ly/1rhTQNH</Text></Link>
            ]} />
          </Slide>

          <Slide>
            <Headline>Concurrent</Headline>
            <List items={[
              "Threads",
              "Channels"
            ]} />
          </Slide>

          <Slide>
            <Headline>Practical</Headline>
            <List items={[
              "Prioritizes practicality over strong principles",
              "General purpose",
              "Multi paradigm"
            ]} />
          </Slide>

          <Slide>
            <Headline size={2}>Safe and fast?</Headline>
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

          <Slide>
            <Image height="500px" margin="auto auto" src={images.constraints.replace("/", "")} />
          </Slide>

          <Slide>
            <Headline fit>Constraints</Headline>
            <Bullet text={["Ownership", "Borrowing"]} />
            <Bullet text={["Lifetimes"]} />
          </Slide>

          <CodeSlide
            transition={[]}
            lang="rust"
            code={require("raw!../assets/code/ownership.rs")}
            ranges={[
              { loc: [12, 100], title: "A peek at ownership" },
              { loc: [0, 10], note: "Some setup first" },
              { loc: [0, 5], note: "Structs are a great data type" },
              { loc: [5, 10], note: "We can add methods to them" },
              { loc: [12, 14], note: "Any resource in memory can be owned by exactly one thing..." },
              { loc: [13, 14], note: "...so here the resource is moved from 'a' to 'b'" },
              { loc: [14, 15], note: "If we tried to use 'a' here we would get an error" },
              { loc: [14, 15], note: "error: use of moved value: `a.x`", background: "#ff0033", color: "white" },
              { loc: [16, 18], title: "Borrowing to the rescue" },
              { loc: [16, 17], note: "'&b' gives a borrowed IMMUTABLE reference..." },
              { loc: [17, 18], note: "...which you can have an unlimited amount of" },
              { loc: [20, 26], title: "Mutable unique borrows" },
              { loc: [20, 21], note: "'mut' is needed to create a mutable binding" },
              { loc: [22, 23], note: "'&mut' gives you an EXCLUSIVE mutable borrowed reference" },
              { loc: [24, 25], note: "If we try to create another one here we get an error" },
              { loc: [24, 25], note: "error: cannot borrow `e` as mutable more than once at a time", background: "#ff0033", color: "white" },
              { loc: [25, 27], note: "Rust is block scoped so here the 'f' borrow is no longer active and this is OK" },
              { loc: [27, 29], note: "We can mutate and print 'h' here" },
              { loc: [29, 30], note: "While a resource is borrowed the original owner can not modify the resource" },
              { loc: [29, 30], note: "error: cannot assign to `e.x` because it is borrowed", background: "#ff0033", color: "white" },
            ]}/>

          <CodeSlide
            transition={[]}
            lang="rust"
            code={require("raw!../assets/code/lifetimes-and-scope.rs")}
            ranges={[
              { loc: [0, 10], title: "Lifetimes and scope" },
              { loc: [0, 1], note: "main function's scope begins" },
              { loc: [1, 2], note: "x's lifetime begins" },
              { loc: [2, 3], note: "New block scope begins" },
              { loc: [3, 4], note: "y's lifetime begins" },
              { loc: [4, 5], note: "x borrows y (the compiler won't allow this)" },
              { loc: [5, 6], note: "block scope ends, y's lifetime ends" },
              { loc: [5, 6], note: "x would now point to memory that has already been freed if the compiler allowed this" },
              { loc: [6, 7], note: "main function's scope ends, x's lifetime ends" },
            ]}/>

          <CodeSlide
            transition={[]}
            lang="rust"
            code={require("raw!../assets/code/lifetimes-1.rs")}
            ranges={[
              { loc: [11, 100], title: "Lifetime basics" },
              { loc: [0, 10], note: "Same struct as last time, moving on..." },
              { loc: [11, 12], note: "Most of the time the correct lifetimes will be inferred, what the compiler sees here is:" },
              { loc: [11, 12], note: "fn print_point<'a>(point: &'a Point) {" },
              { loc: [11, 12], note: "This specifies that `print_point` must have a shorter lifetime than `point`" },
              { loc: [11, 12], note: "In fact every borrow is assigned a lifetime, either inferred or explicitly specified" },
              { loc: [15, 18], note: "One situation where you have to be explicit about lifetimes is when you have multiple borrows and return a borrowed value" },
              { loc: [16, 17], note: "The 'a' here is a return. Unclosed expressions are implicitly returned from Rust functions" },
              { loc: [15, 18], note: "error: missing lifetime specifier", background: "#ff0033", color: "white" },
              { loc: [15, 16], note: "The compiler see that we borrow values, and that we return a borrowed value. But it's unsure if just one, or both of the arguments's lifetimes are important" },
              { loc: [19, 22], note: "Here we specify that there is a lifetime <'a>, and that the argument a has this lifetime, and that the 'a lifetime has to outlive anything using the returned reference" },
              { loc: [19, 22], note: "A single quote and any name defines a lifetime, starting with a lower case 'a is a Rust convention" },
              { loc: [24, 28], note: "Our code is valid and behaves as expected, yay!" },
            ]}/>

          <CodeSlide
            transition={[]}
            lang="rust"
            code={require("raw!../assets/code/tic-tac-toe.rs")}
            ranges={[
              { loc: [11, 100], title: "Lifetimes continued" },
              { loc: [45, 58], note: "Let's play tic tac toe!" },
              { loc: [46, 48], note: "We want our game to borrow the board, this will require explicit lifetimes" },
              { loc: [0, 3], note: "Not on the Board struct" },
              { loc: [5, 8] },
              { loc: [9, 25] },
              { loc: [27, 30], note: "But on the game struct. Game's lifetime has to be shorter than what it's borrowing." },
              { loc: [31, 32], note: "Game<'a> is the full type of our Game struct, so a lifetime also has to be specified for the implementation" },
              { loc: [32, 33], note: "We need to specify the lifetime when taking in our borrowed board" },
              { loc: [36, 39], note: "But not when using it from our Game struct" },
              { loc: [0, 10] },
              { loc: [10, 20] },
              { loc: [20, 30] },
              { loc: [30, 40] },
              { loc: [40, 50] },
              { loc: [50, 60] },
            ]}/>

          <Slide bgImage={images.goodies.replace("/", "")} bgDarken={0.75}>
            <Headline fit>Some rust goodies</Headline>
          </Slide>

          <Slide>
            <Headline>Cargo</Headline>
            <Bullet text={["Scaffolds projects"]} />
            <Bullet text={["Handles dependencies"]} />
            <Bullet text={["Builds and runs code"]} />
            <Bullet text={["Runs tests"]} />
            <Bullet text={["Publishes crates"]} />
          </Slide>

          <Slide>
            <CodePane
              textSize={20}
              lang="bash"
              source={require("raw!../assets/code/cargo.bash")}
              margin="20px auto"
            />
            <CodePane
              textSize={20}
              lang="bash"
              source={require("raw!../assets/code/cargo.toml")}
              margin="20px auto"
            />
          </Slide>

          <Slide>
            <Headline>Enums</Headline>
            <Bullet text={["User defined variant type"]} />
            <Bullet text={["Can hold data"]} />
            <Bullet text={["Can be composed"]} />
            <Bullet text={["Can be used as constructors"]} />
          </Slide>

          <Slide>
            <CodePane
              textSize={20}
              lang="rust"
              source={require("raw!../assets/code/enums.rs")}
              margin="20px auto"
            />
          </Slide>

          <Slide>
            <Headline>Iterators</Headline>
          </Slide>

          <Slide>
            <CodePane
              textSize={20}
              lang="rust"
              source={require("raw!../assets/code/iterators.rs")}
              margin="20px auto"
            />
          </Slide>

          <Slide>
            <Headline>Option and Result</Headline>
            <Bullet text={["Special types of enums"]} />
            <Bullet text={["Option can be None or Some(_)"]} />
            <Bullet text={["Result Can be Ok(_) or Err(_)"]} />
          </Slide>

          <Slide>
            <CodePane
              textSize={20}
              lang="rust"
              source={require("raw!../assets/code/option.rs")}
              margin="20px auto"
            />
          </Slide>

          <Slide>
            <CodePane
              textSize={20}
              lang="rust"
              source={require("raw!../assets/code/result.rs")}
              margin="20px auto"
            />
          </Slide>

          <CodeSlide
            transition={[]}
            lang="rust"
            code={require("raw!../assets/code/traits.rs")}
            ranges={[
              { loc: [0, 9], title: "Traits" },
              { loc: [0, 3], note: "Traits let you define an interface" },
              { loc: [4, 9], note: "That you can implement for any data type" },
              { loc: [10, 21] },
              { loc: [22, 31], note: "Even collections" },
              { loc: [37, 40], note: "Our pretty_format is available on i32 and Person" },
              { loc: [41, 45], note: "As well as Vec<Person>" },
              { loc: [32, 35], note: "Traits bounds can be applied to generic functions..." },
              { loc: [33, 34], note: "...so we can be sure any input here has a pretty_format() method that returns a string" },
            ]}/>

          <Slide>
            <Headline>A tale of three todo lists</Headline>
          </Slide>
           
          <CodeSlide
            transition={[]}
            lang="rust"
            code={require("raw!../assets/code/todo.rs")}
            ranges={[
              { loc: [0, 1], title: "Rust" },
              { loc: [2, 8], note: "We need a todo item" },
              { loc: [9, 19], note: "And a way to add todos" },
              { loc: [20, 25], note: "Remove todos" },
              { loc: [26, 31], note: "Toggle todos" },
              { loc: [32, 41], note: "Print todos" },
              { loc: [51, 53], note: "Let's create an empty todo list and tell the user what to do" },
              { loc: [54, 59], note: "We need a way to continually get user input" },
              { loc: [60, 61], note: "And match the first word to a keyword" },
              { loc: [65, 67] },
              { loc: [66, 67], note: "And call the appropriate todo helper functions" },
              { loc: [67, 70] },
              { loc: [70, 73] },
              { loc: [73, 76] },
              { loc: [78, 80], note: "And print the new todo list" },
            ]}/>

          <CodeSlide
            transition={[]}
            lang="javascript"
            code={require("raw!../assets/code/todo.cpp")}
            ranges={[
              { loc: [0, 4], title: "C++" },
              { loc: [8, 14] },
              { loc: [15, 20] },
              { loc: [21, 28] },
              { loc: [29, 36] },
              { loc: [37, 47] },
              { loc: [59, 61] },
              { loc: [69, 73] },
              { loc: [62, 68] },
              { loc: [75, 78] },
              { loc: [78, 81] },
              { loc: [81, 85] },
            ]}/>

          <CodeSlide
            transition={[]}
            lang="javascript"
            code={require("raw!../assets/code/todo.js")}
            ranges={[
              { loc: [0, 2], title: "JavaScript" },
              { loc: [3, 6] },
              { loc: [7, 16] },
              { loc: [17, 24] },
              { loc: [25, 33] },
              { loc: [34, 43] },
              { loc: [72, 73] },
              { loc: [74, 81] },
              { loc: [51, 54] },
              { loc: [54, 57] },
              { loc: [57, 60] },
              { loc: [60, 63] },
              { loc: [66, 68] },
            ]}/>
        </Deck>
      </Spectacle>
    );
  }
}
