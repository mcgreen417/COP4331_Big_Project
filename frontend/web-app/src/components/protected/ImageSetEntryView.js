import React from "react";
import { Image } from "react-bootstrap";

import sunOn from "../../images/sun-on.png";
import sunOff from "../../images/sun-off.png";
import cloudOn from "../../images/cloud-on.png";
import cloudOff from "../../images/cloud-off.png";

class ImageSetEntryView extends React.Component {
  constructor(props) {
    super(props);
  }

  changeSunlight() {
    return (
      <>
        {this.props.sunlight === 0 && (
          <>
            <Image src={sunOff} alt="sun" width={59} height={59} />
            <Image src={sunOff} alt="sun" width={59} height={59} />
            <Image src={sunOff} alt="sun" width={59} height={59} />
          </>
        )}
        {this.props.sunlight === 1 && (
          <>
            <Image src={sunOn} alt="sun" width={59} height={59} />
            <Image src={sunOff} alt="sun" width={59} height={59} />
            <Image src={sunOff} alt="sun" width={59} height={59} />
          </>
        )}
        {this.props.sunlight === 2 && (
          <>
            <Image src={sunOn} alt="sun" width={59} height={59} />
            <Image src={sunOn} alt="sun" width={59} height={59} />
            <Image src={sunOff} alt="sun" width={59} height={59} />
          </>
        )}
        {this.props.sunlight === 3 && (
          <>
            <Image src={sunOn} alt="sun" width={59} height={59} />
            <Image src={sunOn} alt="sun" width={59} height={59} />
            <Image src={sunOn} alt="sun" width={59} height={59} />
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
            <Image src={cloudOff} alt="sun" width={59} height={59} />
            <Image src={cloudOff} alt="sun" width={59} height={59} />
            <Image src={cloudOff} alt="sun" width={59} height={59} />
          </>
        )}
        {this.props.water === 1 && (
          <>
            <Image src={cloudOn} alt="sun" width={59} height={59} />
            <Image src={cloudOff} alt="sun" width={59} height={59} />
            <Image src={cloudOff} alt="sun" width={59} height={59} />
          </>
        )}
        {this.props.water === 2 && (
          <>
            <Image src={cloudOn} alt="sun" width={59} height={59} />
            <Image src={cloudOn} alt="sun" width={59} height={59} />
            <Image src={cloudOff} alt="sun" width={59} height={59} />
          </>
        )}
        {this.props.water === 3 && (
          <>
            <Image src={cloudOn} alt="sun" width={59} height={59} />
            <Image src={cloudOn} alt="sun" width={59} height={59} />
            <Image src={cloudOn} alt="sun" width={59} height={59} />
          </>
        )}
      </>
    );
  }

  render() {
    return (
      <>
        <div className="image-set-sun">
          <h1 className="sun-label">
            <u>Sunlight Needed</u>
          </h1>
          <br />
          {this.changeSunlight()}
        </div>
        <div className="image-set-cloud">
          <h1 className="water-label">
            <u>Water Needed</u>
          </h1>
          <br />
          {this.changeWater()}
        </div>
      </>
    );
  }
}

export default ImageSetEntryView;
