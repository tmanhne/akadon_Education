import React, { useEffect } from "react";
import { connect } from "react-redux";

import LoadingAnimate from "../../assets/images/akdon-loading.gif";

function Loader({ loading }) {
  useEffect(() => {
    const root = document.querySelector("html");
    window.scroll(0, 0);
    root.style.overflowY = "hidden";

    if (loading.length === 0) {
      root.style.overflowY = "visible";
    }
  });

  if (loading.length === 0) {
    return <div></div>;
  }

  return (
    <div
      id="akadon-loader"
      className="akadon-loader position-absolute center-box border-radius-2 center-box"
    >
      <img width={500} src={LoadingAnimate} alt="akadon loading" />
    </div>
  );
}

const mapStateToPtops = ({ loading }) => ({ loading });

export default connect(mapStateToPtops, null)(Loader);
