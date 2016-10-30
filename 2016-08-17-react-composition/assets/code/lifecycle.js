import functional from 'react-functional-lifecycle';

const Person = ({ name, image }) => (
  <div className="Person">
    <h1>{name}</h1>
    <img src={image} />
  </div>
);


export default functional(Person, {
    componentWillMount: (props) => {
        // do something..
    },

    shouldComponentUpdate: (props, nextProps) => {
        // do something...
    }
});
