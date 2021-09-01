import React, { useState } from "react";

import "./index.scss";
import Overview from "./Overview";
import History from "./History";
import SubLoader from "../../../utils/SubLoader";

export default function Revenue() {
  const [loading, setLoading] = useState(false);

  

  if (loading) { return <SubLoader />}
  return (
    <>
      <Overview setLoading={setLoading} />
      <History />
    </>
  );
}
