import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import "./index.scss";
import AkadonLogo from "../../assets/images/akadon-logo.svg";
import Image from "../../assets/icons/registration-text.svg";
import Footer from "../landingPage/Footer";
import SubLoader from "../utils/SubLoader";
import RegisterForm from "./RegisterForm";
import RegistrationSuccess from "./RegistrationSuccess";
import { getSmsCode, quandaRegistration } from "../../api";
import { toast } from "react-toastify";

export default function QuandaRegistration() {
  const initRegisterContent = {
    name: "",
    phone_number: "",
    password: "",
    quanda_id: "",
    akadon_policy: true,
  };

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [registerContent, setRegisterContent] = useState(initRegisterContent);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);

  const { t } = useTranslation(["landing-page","toast"]);

  async function register(e) {
    e.preventDefault();
    const { name, phone_number, quanda_id, code, password } = registerContent;
    if (!name) {
      setError("name");
      return;
    }
    if (
      !phone_number ||
      phone_number.length < 7 ||
      phone_number.length > 15 ||
      typeof (phone_number * 1) !== "number"
    ) {
      setError("phone_number");
      return;
    }
    if (!isValidPassword) {
      setError("password");
      return;
    }
    if (!quanda_id) {
      setError("quanda_id");
      return;
    }

    setError("");

    if (code === undefined) {
      handleGetCode({ phone_number });
      return;
    }

    if (!code) {
      setError("code");
      return;
    }

    const payload = {
      name,
      phone_number,
      vrf_code: code,
      password,
      qanda_id: quanda_id,
    };
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "RegisStudent" });
    handleRegistration(payload);
    return;
  }

  async function handleGetCode(payload) {
    setLoading(true);
    const res = await getSmsCode(payload);
    setLoading(false);

    if (res.status < 400) {
      setRegisterContent({ ...registerContent, code: "" });
      const inputCode = document.getElementById("code");
      inputCode.focus();
      inputCode.scrollIntoView();
    } else if (res.response) {
      if (res.response.status === 404) {
        toast.error(t("toast:er_39"));
      } else if (res.response.status === 403) {
        toast.error(t("toast:er_40"));
      } else {
        toast.error(` ${t("toast:er_1")}  ${res.response.status} !`);
      }
    }
  }

  async function handleRegistration(payload) {
    setLoading(true);
    const res = await quandaRegistration(payload);
    setLoading(false);

    if (res.status < 400) {
      setRegisterSuccess(true);
    } else if (res.response) {
      if (res.response.status === 404) {
        toast.error(t("toast:er_39"));
      } else if (res.response.status === 403) {
        toast.error(t("toast:er_40"));
      } else {
        toast.error(` ${t("toast:er_1")}  ${res.response.status} !`);
      }
    }
  }

  return (
    <div className="quanda-registration p-3">
      <div className="text-center mt-4 mb-2">
        <img className="mb-2" src={AkadonLogo} alt="akadon" width={250} />
      </div>

      <div className="text-center mt-4 mb-2">
        <img src={Image} alt="registration" width={225} />
      </div>
      {loading ? (
        <SubLoader />
      ) : registerSuccess ? (
        <RegistrationSuccess />
      ) : (
        <RegisterForm
          error={error}
          registerContent={registerContent}
          setRegisterContent={setRegisterContent}
          register={register}
          setIsValidPassword={setIsValidPassword}
          handleGetCode={handleGetCode}
        />
      )}
      <div className="mt-5 pt-5">
        <Footer t={t} />
      </div>
    </div>
  );
}
