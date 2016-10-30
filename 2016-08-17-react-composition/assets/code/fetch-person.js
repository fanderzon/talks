const fetchPerson = Component =>
  class extends React.Component {
    componentDidMount() {
      fetch(`${apiUrl}/persons/${this.props.id}`)
        .then(person => this.setState({person}));
    }

    render() {
      return <Person {...this.props} {...this.state.person}
    }
  }

  const PersonContainer = fetchPerson(Person);
