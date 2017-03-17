import React from "react";

import {
  Appear,
  Fill,
  Layout,
  Heading,
  List as SpecList,
  ListItem,
  Text,
} from "spectacle";

export function Bullet( { text, shouldAppear = false } = { text: [] }) {
  var texts = text.map( (t, i) => {
    const content = (
      <Fill key={i}>
        <Heading size={4} caps textColor="white" bgColor="tertiary" margin={10}>
          {t}
        </Heading>
      </Fill>
    );
    return shouldAppear ? (
      <Appear key={i}>
        {content}
      </Appear>
    ) : content;
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
      return props.shouldAppear ? (
        <Appear key={i}><ListItem margin="0">{item}</ListItem></Appear>
      ) : <ListItem margin="0">{item}</ListItem>;
  })
  return (
    <SpecList textColor="quartenary" {...props}>
      {items}
    </SpecList>
  );
}

export const ItemText = props => props.shouldAppear ? (
  <Appear>
    <Text textSize="1.2em" caps padding="15px 25px" textColor="tertiary" {...props}>
      {props.children}
    </Text>
  </Appear>
) : (
  <Text textSize="1.2em" caps padding="15px 25px" textColor="tertiary" {...props}>
    {props.children}
  </Text>
);
