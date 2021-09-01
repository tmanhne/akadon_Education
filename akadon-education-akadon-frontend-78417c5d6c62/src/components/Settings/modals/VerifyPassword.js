import React, { useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Form,
  Label,
  Input,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";
import { Link } from "react-router-dom";

import EyesIcon from "../../../assets/icons/eyes-icon.svg";
import SlashEyesIcon from "../../../assets/icons/slash-eyes-icon.svg";
import { verifyPassword } from "../../../api";
import ErrorHandler from "../../ErrorHandler";

function VerifyPassword({ modal, setModal, callback, setLoading }) {
  // LOCAL STATE DECLARATIONS
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [hide, setHide] = useState(false);

  // FUNCTION DECLARATIONS
  async function handleVerifyPassword(e) {
    e.preventDefault();
    if (!password) {
      setError("Invalid password !");
      return;
    }
    setLoading(true);
    const res = await verifyPassword({ password });
    setLoading(false);
    if (res.response) {
      setError("Incorrect password !");
      return;
    }

    await callback();
  }

  return (
    <div className="card-style p-0">
      <div className="flex-box mb-4 p-3 border-bottom">
        <h4 className="text-bold2 mb-0 text-center flex-grow">
          Enter your password
        </h4>
        <FontAwesomeIcon
          onClick={() => setModal(!modal)}
          className="text-grey h4 mb-0"
          icon={["fal", "times"]}
        />
      </div>

      <Form
        onSubmit={handleVerifyPassword}
        style={{ maxWidth: "450px" }}
        className="mx-auto"
      >
        <p className="text-dark mb-4 text-center">
          For security purpose, please enter your password
        </p>

        <FormGroup className="mb-5">
          <Label
            htmlFor="password"
            className="mb-12px text-dark text-bold1 cursor-pointer"
          >
            <span className="mr-2">Your password</span>
            {error && <ErrorHandler error={error} />}
          </Label>
          <InputGroup>
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              className="border-radius-style-1 border-right-0"
              placeholder="Enter password"
              type={!hide ? "password" : "text"}
            />
            <InputGroupAddon onClick={() => setHide(!hide)} addonType="append">
              <InputGroupText className="cursor-pointer bg-light border-left-0 border-left-0 border-radius-style-2">
                <img
                  src={hide ? EyesIcon : SlashEyesIcon}
                  alt="visible password"
                />
              </InputGroupText>
            </InputGroupAddon>
          </InputGroup>

          <Link to="" className="text-hightlight1 text-bold2">
            Forget password?
          </Link>
        </FormGroup>

        <div className="flex-box mb-5">
          <div
            onClick={() => setModal(!modal)}
            className="cancel-btn mr-3 w-50"
          >
            Cancel
          </div>
          <div onClick={handleVerifyPassword} className="main-btn flex-grow">
            Next
          </div>
        </div>
      </Form>
    </div>
  );
}

VerifyPassword.propTypes = {
  modal: PropTypes.bool,
  setModal: PropTypes.func,
  callback: PropTypes.func,
};

export default VerifyPassword;
