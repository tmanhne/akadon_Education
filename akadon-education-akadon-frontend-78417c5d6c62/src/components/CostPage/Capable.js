// Author LONG

import React from "react";
import "./index.scss";

function Capable({ capable, caphead }) {
  return (
    <>
      <div className="head-title p-0 pb-3 pt-4 mr-2 ml-2 text-center">
        {caphead.title}
        <p className="text-center mt-3 ml-2 mr-2">{caphead.subtitle}</p>
      </div>

      <div className="content-capable text-bold2 d-flex flex-column" >
        <div className={`${caphead.subcontent&& "resize"} capble-title pt-3`}>{caphead.content}</div>
        <div className="capble-title">{caphead.subcontent}</div>

        <div className=" d-flex flex-row pb-5 pt-4 flex-wrap capble-icon">
          {capable.map((cap, index) => (
            <div className="d-flex flex-column" key={index}>
              <img src={cap.pic} alt="pic" className="m-0 mb-2" />
              <p>{cap.content}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Capable;
