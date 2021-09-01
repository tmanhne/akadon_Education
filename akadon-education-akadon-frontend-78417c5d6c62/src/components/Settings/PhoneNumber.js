import React, { useState } from "react";
import { Collapse, Form, FormGroup, Label, Input, Modal } from "reactstrap";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

import { userSettings } from "../../api";
import VerifyPassword from "./modals/VerifyPassword";
import VerifyCode from "./modals/VerifyCode";
import SubLoader from "../utils/SubLoader";
import { useTranslation } from "react-i18next";

function PhoneNumber({ phone_number, phoneList, deletePhone }) {
  const [isCollapse, setIsCollapse] = useState(false);
  const [verifyPasswordModal, setVerifyPasswordModal] = useState(false);
  const [verifySuccess, setVerifySuccess] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const { t } = useTranslation("setting");

  // FUNCTION DECLARATIONS
  function handleNextStep(e) {
    e.preventDefault();
    if (phoneNumber.length < 5 && typeof phoneNumber === "string") {
      setError(t("phone-err-1"));
    }
    setError("");
    setVerifyPasswordModal(true);
  }

  async function handleAddPhone() {
    setLoading(true);
    const res = await userSettings({ phone_number: phoneNumber });
    setLoading(false);
    if (res.status < 400) {
      setVerifySuccess(true);
      setVerifyPasswordModal(false);
    } else if (res.response) {
      toast.error(`${t("err")} ${res.response.status}`);
    }
  }

  async function selectMainPhoneNumber(phoneNumber) {
    const res = await userSettings({ main_phone_number: phoneNumber });
    if (res.status < 400) {
      toast.success(`${t("phone-err-2")} ${phoneNumber} ${t("phone-err-3")}`);
    } else if (res.response) {
      toast.error(`${t("err")} ${res.response.status}`);
    }
  }

  if (loading) {
    return <SubLoader />;
  }

  return (
    <>
      <h4 className="text-dark text-bold2 mb-3">{t("phone-title")}</h4>

      <div className="mb-4">
        <p className="text-dark text-bold2 mb-2">{phone_number}</p>
        <p className="text-grey mb-0">{t("verified")}</p>
      </div>

      {phoneList.map((p) => (
        <div key={p} className="mb-3">
          <p className="text-dark text-bold2 mb-2">{p.phone_number}</p>
          <div className="flex-box">
            <span className="text-grey">{t("verified")}</span>
            <div className="grey-dot mx-2"></div>
            <span
              onClick={() => selectMainPhoneNumber(p.phone_number)}
              className="text-hightlight1 cursor-pointer"
            >
              {t("set-default")}
            </span>
            <div className="grey-dot mx-2"></div>
            <span
              onClick={() => deletePhone(p.phone_number)}
              className="text-hightlight1 cursor-pointer"
            >
              {t("delete")}
            </span>
          </div>
        </div>
      ))}

      <div className="w-450px">
        <div
          onClick={() => setIsCollapse(!isCollapse)}
          className="py-3 mb-3 text-dark cursor-pointer border-bottom border-top"
        >
          {t("add-phone")}
        </div>

        <Collapse isOpen={isCollapse}>
          <Form onSubmit={handleNextStep}>
            <FormGroup className="mb-12px">
              <Label
                htmlFor="phone-number"
                className="text-dark text-bold1 mb-12px"
              >
                {t("phone-number")}
              </Label>
              <Input
                className="border-radius-2"
                id="phone-number"
                type="number"
                placeholder={t("enter-phone")}
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </FormGroup>
            <div className="flex-box mb-12px">
              <p className="mb-0 text-dark mr-3">{t("verify-phone")}</p>
              <FormGroup className="mb-0 ml-2">
                <Input type="radio" defaultChecked name="phone" />
                <Label className="text-bold1 mb-0">{t("take-message")}</Label>
              </FormGroup>
            </div>
            <p className="text-grey text-justify mb-4">{t("phone-note")}</p>
            <div className="flex-box">
              <button type="submit" className="main-btn mr-3 w-50">
                {t("add")}
              </button>
              <div
                onClick={() => setIsCollapse(false)}
                className="cancel-btn w-50 center-box"
              >
                {t("cancle")}
              </div>
            </div>
          </Form>
        </Collapse>
      </div>

      <Modal
        isOpen={verifyPasswordModal}
        toggle={() => setVerifyPasswordModal(!verifyPasswordModal)}
      >
        <VerifyPassword
          callback={handleAddPhone}
          modal={verifyPasswordModal}
          setModal={setVerifyPasswordModal}
          setLoading={setLoading}
        />
      </Modal>

      <Modal
        isOpen={verifySuccess}
        toggle={() => setVerifySuccess(!verifySuccess)}
      >
        <VerifyCode phone_number={phoneNumber} setModal={setVerifySuccess} />
      </Modal>
    </>
  );
}

PhoneNumber.propTypes = {
  phone_number: PropTypes.string,
  phoneList: PropTypes.array,
};

export default PhoneNumber;
