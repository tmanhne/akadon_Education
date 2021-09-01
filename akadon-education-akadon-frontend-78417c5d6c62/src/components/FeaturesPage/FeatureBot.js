// Author LONG

import React from "react";
import "./index.scss";

function FeatureBot({ detail }) {
  return (
    <div className="d-flex flex-wrap justify-content-center ">
      {detail.map((con, index) => (
        <div className="box-feature text-justify" key={index}>
          <img src={con.icon} alt={con.icon} />
          <h3 className="font-weight-bold mt-3 mb-3 text-left">{con.title}</h3>
          {con.content}
        </div>
      ))}
    </div>
  );
}

export default FeatureBot;
