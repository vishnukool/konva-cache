import React, { Component, useEffect, useState } from "react";
import { render } from "react-dom";
import { Stage, Layer, Image } from "react-konva";
import useImage from "use-image";

const drawHitFromCache = (img) => {
  console.log("in drawhit");
  if (img) {
    console.log("caching also");
    console.log(img);
    img.cache();
    img.drawHitFromCache(0.5);
  }
};

// the first very simple and recommended way:
const LionImage = (props) => {
  const [image] = useImage("/lion.png");
  const imageRef = React.useRef();

  useEffect(() => {
    setTimeout(() => {
      drawHitFromCache(imageRef.current);
    }, 2000);
  });

  return (
    <Image
      image={image}
      onMouseOver={() => props.setHoverStatus("Mouse over")}
      onMouseLeave={() => props.setHoverStatus("")}
      ref={imageRef}
    />
  );
};

class App extends Component {
  state = {
    hoverStatus: ""
  };

  setHoverStatus = (status) => {
    this.setState({ hoverStatus: status });
  };

  render() {
    return (
      <div>
        Hover Status: {this.state.hoverStatus}
        <Stage width={window.innerWidth} height={window.innerHeight}>
          <Layer>
            <LionImage setHoverStatus={this.setHoverStatus} />
          </Layer>
        </Stage>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
