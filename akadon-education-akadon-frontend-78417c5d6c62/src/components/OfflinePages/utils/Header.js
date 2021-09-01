import React from "react";
import { Link } from "react-router-dom";

import Logo from "../../../assets/icons/nonSloganLogo.svg";

export default function Header() {
  return (
    <div className="logo-box text-center">
      <Link to="/" target="_blank">
        <img src={Logo} alt="akadon" width={100} />
      </Link>
    </div>
  );
}
