import React from "react";

import {
  Appear,
  Fill,
  Layout,
  Heading,
  List as SpecList,
  ListItem,
} from "spectacle";

export function Bullet( { text } = { text: [] }) {
  var texts = text.map( (t, i) => {
    return (
      <Appear key={i}>
        <Fill>
          <Heading size={4} caps textColor="white" bgColor="tertiary" margin={10}>
            {t}
          </Heading>
        </Fill>
      </Appear>
    );
  })

  return (
    <Layout>
      {texts}
    </Layout>
  );
}

export function Headline(props) {
  return (
    <Heading size={1} caps lineHeight={1} textColor="tertiary" {...props}>
      {props.children}
    </Heading>
  );
}

export function List(props) {
  var items = props.items.map( (item, i) => {
      return (
        <Appear key={i}><ListItem>{item}</ListItem></Appear>
      );
  })
  return (
    <SpecList textColor="quartenary" {...props}>
      {items}
    </SpecList>
  );
}
