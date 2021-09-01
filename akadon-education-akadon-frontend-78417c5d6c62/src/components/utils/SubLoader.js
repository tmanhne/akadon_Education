import React from "react";
import LoadingAnimate from "../../assets/images/akdon-loading.gif";

export default function SubLoader() {
  return (
    <div className="center-box w-100">
      <img width={300} src={LoadingAnimate} alt="akadon loading" />
    </div>
  );
}
