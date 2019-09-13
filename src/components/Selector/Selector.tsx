import React from "react";
import { Form } from "react-bootstrap";

interface State {
  catBreedOptions: [];
}

export default class Selector extends React.Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      catBreedOptions: []
    };
  }

  componentWillMount = () => {
    this.renderAllCatBreedOptions();
  };

  renderAllCatBreedOptions = () => {
    fetch("https://api.thecatapi.com/v1/breeds")
      .then(results => {
        return results.json();
      })
      .then(data => {
        const catBreedOptions = data.map((breed: any) => (
          <option key={`${breed.id}`} value={breed.id}>
            {breed.name}
          </option>
        ));
        this.setState({ catBreedOptions });
      })
      .catch(function(err) {
        console.log("Fetch error: ", err);
      });
  };

  render() {
    return (
      <Form>
        <Form.Group>
          <Form.Control onChange={this.props.onChange} as="select">
            <option></option>
            {this.state.catBreedOptions}
          </Form.Control>
        </Form.Group>
      </Form>
    );
  }
}
