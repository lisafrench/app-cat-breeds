import React, { ChangeEvent } from "react";
import Selector from "../../components/Selector";

interface State {
  imageName: string;
  imageSource: string;
  renderImage: boolean;
}

export default class App extends React.Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      imageName: "",
      imageSource: "",
      renderImage: false
    };
  }

  handleChangeSelection = (event: ChangeEvent) => {
    event.preventDefault();
    const breedId = (event.target as HTMLInputElement).value;
    const url = `https://api.thecatapi.com/v1/images/search?breed_id=${breedId}`;
    fetch(url)
      .then(response => response.json())
      .then(data =>
        this.setState({
          imageName: data[0].breeds[0].name,
          imageSource: data[0].url,
          renderImage: true
        })
      )
      .catch(eventError => console.log("error", eventError));
  };

  renderImage = () => {
    const { renderImage, imageSource, imageName } = this.state;
    if (renderImage) {
      return <img src={imageSource} alt={imageName} />;
    }
  };

  render() {
    return (
      <div className="container-app">
        <div className="row-padding">
          <h1>Pick a Cat Breed</h1>
        </div>
        <div className="row-padding container-image">{this.renderImage()}</div>
        <div className="row-padding container-selector">
          <Selector onChange={this.handleChangeSelection} />
        </div>
      </div>
    );
  }
}
