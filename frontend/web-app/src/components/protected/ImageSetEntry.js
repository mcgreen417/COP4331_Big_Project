import React from "react";
import { Image } from "react-bootstrap";

import sunOn from "../../images/sun-on.png";
import sunOff from "../../images/sun-off.png";
import cloudOn from "../../images/cloud-on.png";
import cloudOff from "../../images/cloud-off.png";

class ImageSetEntry extends React.Component {
  constructor(props) {
    super(props);
  }

  changeSunlight() {
    return (
      <>
        {this.props.sunlight === 0 && (
          <>
            <Image
              src={sunOff}
              onClick={() => this.props.updateSunlight(1)}
              alt="sun"
              width={59}
              height={59}
            />
            <Image
              src={sunOff}
              onClick={() => this.props.updateSunlight(2)}
              alt="sun"
              width={59}
              height={59}
            />
            <Image
              src={sunOff}
              onClick={() => this.props.updateSunlight(3)}
              alt="sun"
              width={59}
              height={59}
            />
          </>
        )}
        {this.props.sunlight === 1 && (
          <>
            <Image
              src={sunOn}
              onClick={() => this.props.updateSunlight(1)}
              alt="sun"
              width={59}
              height={59}
            />
            <Image
              src={sunOff}
              onClick={() => this.props.updateSunlight(2)}
              alt="sun"
              width={59}
              height={59}
            />
            <Image
              src={sunOff}
              onClick={() => this.props.updateSunlight(3)}
              alt="sun"
              width={59}
              height={59}
            />
          </>
        )}
        {this.props.sunlight === 2 && (
          <>
            <Image
              src={sunOn}
              onClick={() => this.props.updateSunlight(1)}
              alt="sun"
              width={59}
              height={59}
            />
            <Image
              src={sunOn}
              onClick={() => this.props.updateSunlight(2)}
              alt="sun"
              width={59}
              height={59}
            />
            <Image
              src={sunOff}
              onClick={() => this.props.updateSunlight(3)}
              alt="sun"
              width={59}
              height={59}
            />
          </>
        )}
        {this.props.sunlight === 3 && (
          <>
            <Image
              src={sunOn}
              onClick={() => this.props.updateSunlight(1)}
              alt="sun"
              width={59}
              height={59}
            />
            <Image
              src={sunOn}
              onClick={() => this.props.updateSunlight(2)}
              alt="sun"
              width={59}
              height={59}
            />
            <Image
              src={sunOn}
              onClick={() => this.props.updateSunlight(3)}
              alt="sun"
              width={59}
              height={59}
            />
          </>
        )}
      </>
    );
  }

  changeWater() {
    return (
      <>
        {this.props.water === 0 && (
          <>
            <Image
              src={cloudOff}
              onClick={() => this.props.updateWater(1)}
              alt="sun"
              width={59}
              height={59}
            />
            <Image
              src={cloudOff}
              onClick={() => this.props.updateWater(2)}
              alt="sun"
              width={59}
              height={59}
            />
            <Image
              src={cloudOff}
              onClick={() => this.props.updateWater(3)}
              alt="sun"
              width={59}
              height={59}
            />
          </>
        )}
        {this.props.water === 1 && (
          <>
            <Image
              src={cloudOn}
              onClick={() => this.props.updateWater(1)}
              alt="sun"
              width={59}
              height={59}
            />
            <Image
              src={cloudOff}
              onClick={() => this.props.updateWater(2)}
              alt="sun"
              width={59}
              height={59}
            />
            <Image
              src={cloudOff}
              onClick={() => this.props.updateWater(3)}
              alt="sun"
              width={59}
              height={59}
            />
          </>
        )}
        {this.props.water === 2 && (
          <>
            <Image
              src={cloudOn}
              onClick={() => this.props.updateWater(1)}
              alt="sun"
              width={59}
              height={59}
            />
            <Image
              src={cloudOn}
              onClick={() => this.props.updateWater(2)}
              alt="sun"
              width={59}
              height={59}
            />
            <Image
              src={cloudOff}
              onClick={() => this.props.updateWater(3)}
              alt="sun"
              width={59}
              height={59}
            />
          </>
        )}
        {this.props.water === 3 && (
          <>
            <Image
              src={cloudOn}
              onClick={() => this.props.updateWater(1)}
              alt="sun"
              width={59}
              height={59}
            />
            <Image
              src={cloudOn}
              onClick={() => this.props.updateWater(2)}
              alt="sun"
              width={59}
              height={59}
            />
            <Image
              src={cloudOn}
              onClick={() => this.props.updateWater(3)}
              alt="sun"
              width={59}
              height={59}
            />
          </>
        )}
      </>
    );
  }

  render() {
    return (
      <>
        <div className="image-set-sun">
          <h1 className="sun-label">Sunlight Needed</h1>
          {this.changeSunlight()}
        </div>
        <div className="image-set-cloud">
          <h1 className="water-label">Water Needed</h1>
          {this.changeWater()}
        </div>
      </>
    );
  }
}

export default ImageSetEntry;
