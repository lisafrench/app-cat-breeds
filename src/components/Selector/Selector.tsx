import React, { ChangeEvent } from "react";
import { Form } from "react-bootstrap";

interface Props {
  onChange: (event: ChangeEvent) => void;
}

interface State {
  catBreedOptions: [];
  loading: boolean;
}

export default class Selector extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      catBreedOptions: [],
      loading: false
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.renderCatBreedOptions();
  }

  renderCatBreedOptions = () => {
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
        this.setState({ catBreedOptions, loading: false });
      })
      .catch(function(error) {
        console.log("Fetch error: ", error);
      });
  };

  render() {
    if (this.state.loading === true) {
      return null;
    }

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
