import {compose, withState} from 'recompose';

const Person = ({ name, image, active, setActive }) => (
  <div
    className={active ? 'ActivePerson' : 'Person'}
    onClick={setActive}>
    <h1>{name}</h1>
    <img src={image} />
  </div>
);

const WrappedPerson = compose(
  withState('active', 'setActive', false),
)(Person);
