import React from 'react';
import { CodePane } from 'spectacle';

export default function DoubleCodePane({ left, right, ...props}) {
  return (
    <div style={{display: 'flex', width: '100%', minHeight: '40vh', maxHeight: '40vh', margin: '20px 0px'}}>
      <div style={{flexGrow: 1, marginRight: '1%', maxWidth: '49%'}}>
        <CodePane
          textSize={20}
          margin="0px"
          style={{minHeight: '40vh', maxHeight: '40vh'}}
          {...left}
        />
      </div>
      <div style={{flexGrow: 1, minHeight: '40vh', maxHeight: '40vh', marginLeft: '1%', maxWidth: '49%'}}>
        <CodePane
          textSize={20}
          margin="0px"
          style={{minHeight: '40vh', maxHeight: '40vh'}}
          {...right}
        />
      </div>
    </div>
  );
}
