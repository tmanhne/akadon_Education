import React, { useState } from "react";

import "./index.scss";
import GoBack from "../../utils/Goback";
import VerifyPassword from "./VerifyPassword";
import WithDrawalForm from "./WithDrawalForm";

export default function WithDrawal() {
  const [auth, setAuth] = useState(false);
  const [password, setPassword] = useState("");

  return (
    <>
      <GoBack />
      {auth ? (
        <WithDrawalForm />
      ) : (
        <VerifyPassword
          setAuth={setAuth}
          password={password}
          setPassword={setPassword}
        />
      )}
    </>
  );
}
