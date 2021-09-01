import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, FormGroup, Input, Label } from "reactstrap";
import provinces from "../../../provinces";

function AddressForm({ t, modal, setModal }) {
  const { payload } = modal;
  const { city, district } = payload;
  function nextStep(e) {
    e.preventDefault();
    if (city && district) {
      setModal({ ...modal, payload: { ...payload, step: 3 } });
    }
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "heroFlow",
      step: 2,
      stepDetail: {
        heroFlowStudyMode: true,
        heroFlowLocalCity: modal.payload.city,
        heroFlowLocalDistrict: modal.payload.district,
      },
    });
  }
  return (
    <>
      <FontAwesomeIcon
        className="text-grey h4 mb-0"
        icon={["fas", "arrow-left"]}
        onClick={() => setModal({ ...modal, payload: { ...payload, step: 1 } })}
      />
      <h4 className="mb-4 font-weight-bold text-center">
        {t("landing-page:req_27")}
      </h4>

      <Form onSubmit={(e) => nextStep(e)} className="mx-auto w-100">
        <FormGroup>
          <Label className="text-bold2 cursor-pointer mb-12px" for="city">
            {t("landing-page:req_28")}
          </Label>
          <Input
            className="border-radius-2"
            type="select"
            id="city"
            required
            value={city}
            onChange={(e) =>
              setModal({
                ...modal,
                payload: { ...payload, city: e.target.value },
              })
            }
          >
            <option value=""> {t("landing-page:req_29")}</option>
            {provinces.map((p, index) => (
              <option key={index} value={p.name}>
                {p.name}
              </option>
            ))}
          </Input>
        </FormGroup>

        <FormGroup>
          <Label className="text-bold2 cursor-pointer" for="district">
            {t("landing-page:req_30")}
          </Label>
          <Input
            className="border-radius-2"
            type="select"
            required
            id="district"
            value={district}
            onChange={(e) =>
              setModal({
                ...modal,
                payload: { ...payload, district: e.target.value },
              })
            }
          >
            <option value=""> {t("landing-page:req_31")}</option>
            {city &&
              provinces
                .filter((pro) => pro.name === city)[0]
                .districts.map((d, index) => (
                  <option key={index} value={d}>
                    {d}
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

AddressForm.propTypes = { modal: PropTypes.object, setModal: PropTypes.func };

export default AddressForm;
