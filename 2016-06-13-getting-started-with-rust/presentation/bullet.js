import React from "react";

import {
  Appear,
  Fill,
  Layout,
  Heading,
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
