import React from 'react';
import LoadingAnimate from "../../assets/images/akdon-loading.gif";

export default function SuspenseLoader() {
  return (
    <div className="center-box w-100">
      <img width={300} src={LoadingAnimate} alt="akadon loading" />
    </div>
  );
}
