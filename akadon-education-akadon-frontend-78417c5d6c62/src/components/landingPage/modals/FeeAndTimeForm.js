import React from "react";
import PropTypes from "prop-types";
import { Form, FormGroup, Input, Label } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ExIcon from "../../../assets/icons/exclamation-icon.svg";

function FeeAndTimeForm({ t, modal, setModal }) {
  const { payload } = modal;
  const { fee, lesson_time_length, is_offline } = payload;
  const initFee = [
    { value: 50000, text: "50.000" },
    { value: 100000, text: "100.000" },
    { value: 150000, text: "150.000" },
    { value: 200000, text: "200.000" },
    { value: 250000, text: "250.000" },
    { value: 300000, text: "300.000" },
    { value: 350000, text: "350.000" },
    { value: 400000, text: "400.000" },
    { value: 450000, text: "450.000" },
    { value: 500000, text: "500.000" },
  ];
  const time = [
    { value: "a1", text: t("common:time2") },
    { value: "a2", text: t("common:time3") },
    { value: "a3", text: t("common:time4") },
    { value: "a4", text: t("common:time5") },
    { value: "a5", text: t("common:time6") },
    { value: "a6", text: t("common:time7") },
    { value: "a7", text: t("common:time8") },
    { value: "a8", text: t("common:time9") },
  ];

  function nextStep(e) {
    e.preventDefault();
    if (!fee) return;
    setModal({ ...modal, payload: { ...payload, step: 4 } });
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "heroFlow",
      step: 3,
      stepDetail: {
        heroFlowBudget: modal.payload.fee,
        heroFlowSessionsDurations: modal.payload.lesson_time_length,
      },
    });
  }

  return (
    <>
      <FontAwesomeIcon
        className="text-grey h4 mb-0"
        icon={["fas", "arrow-left"]}
        onClick={() =>
          setModal({
            ...modal,
            payload: { ...payload, step: is_offline ? 2 : 1 },
          })
        }
      />
      <h4 className="mb-4 font-weight-bold text-center">
        {t("landing-page:req_9")}
      </h4>

      <Form onSubmit={(e) => nextStep(e)} className="mx-auto w-100">
        <FormGroup className="position-relative">
          <Label className="text-bold2 cursor-pointer mb-12px" for="fee ">
            {t("landing-page:req_10")}
            <span className="text-danger">*</span>
            <img className="ml-1" src={ExIcon} width={16} alt="note" />
          </Label>
          <Input
            className="border-radius-2"
            type="select"
            required
            value={fee}
            onChange={(e) =>
              setModal({
                ...modal,
                payload: { ...payload, fee: e.target.value },
              })
            }
          >
            <option value=""> {t("landing-page:btn_req_4")}</option>
            {initFee.map((fee, index) => (
              <option value={fee.value} key={index}>
                {fee.text}
              </option>
            ))}
          </Input>
          <div className="fee-unit position-absolute">
            {t("common:currency-unit")}
          </div>
        </FormGroup>

        <FormGroup>
          <Label className="text-bold2 cursor-pointer" for="district">
            {t("landing-page:req_11")}
            <span className="text-danger">*</span>
          </Label>
          <Input
            className="border-radius-2"
            type="select"
            required
            id="district"
            value={lesson_time_length}
            onChange={(e) =>
              setModal({
                ...modal,
                payload: { ...payload, lesson_time_length: e.target.value },
              })
            }
          >
            {time.map((t, index) => (
              <option value={t.value} key={index}>
                {t.text}
              </option>
            ))}
          </Input>
        </FormGroup>

        <button
          type="submit"
          className="main-btn-new text-uppercase py-0 w-100 mb-5"
        >
          {t("common:next-btn")}
          <FontAwesomeIcon
                  icon={["fas", "arrow-right"]}
                  className="btn-arrow facebook-class"
                />
        </button>
      </Form>
    </>
  );
}

FeeAndTimeForm.propTypes = {
  t: PropTypes.func,
  modal: PropTypes.object,
  setModal: PropTypes.func,
};

export default FeeAndTimeForm;
