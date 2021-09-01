import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Form, FormGroup, Input, Label } from "reactstrap";

import Provinces from "../../provinces";
import SubLoader from "../utils/SubLoader";
import { useTranslation } from "react-i18next";

function Address({ defaultAddress, submitAddress }) {
  // INIT LOCAL STATE
  const initContent = {
    city: defaultAddress.city || "Thành phố Hà Nội",
    district: defaultAddress.district || "",
    ward: defaultAddress.ward || "",
    street: defaultAddress.street || "",
  };

  // LOCAL STATE DECLARATIONS
  const [content, setContent] = useState(initContent);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation("setting");

  // SIDE EFFECTS
  useEffect(() => {
    if (defaultAddress.city) {
      setContent(defaultAddress);
    }
  }, [defaultAddress]);

  // DATA IMPLEMENTATIONS
  const isChange = JSON.stringify(initContent) === JSON.stringify(content);

  // FUNCTION DECLARATIONS
  function reset() {
    if (isChange) return;
    setContent(initContent);
  }

  async function handleSubmitAddress(e) {
    const payload = {
      city: content.city,
      district: content.district,
      ward: content.ward,
      apartment: content.street,
    };
    setLoading(true);
    await submitAddress(e, isChange, payload);
    setLoading(false);
  }

  if (loading) {
    return <SubLoader />;
  }

  return (
    <Form onSubmit={handleSubmitAddress}>
      <h4 className="text-dark text-bold2 mb-3">{t("add-title")}</h4>

      <FormGroup className="mb-3">
        <Label htmlFor="city" className="text-small text-bold1 mb-2">
          {t("city")}
        </Label>
        <Input
          type="select"
          id="city"
          value={content.city}
          onChange={(e) => setContent({ ...content, city: e.target.value })}
        >
          {Provinces.map((pr, i) => (
            <option key={pr.name} value={pr.name}>
              {pr.name}
            </option>
          ))}
        </Input>
      </FormGroup>

      <FormGroup className="mb-3">
        <Label htmlFor="dis" className="text-small text-bold1 mb-2">
          {t("district")}
        </Label>
        <Input
          className="border-radius-2"
          type="select"
          name="dis"
          id="dis"
          value={content.district}
          onChange={(e) => setContent({ ...content, district: e.target.value })}
        >
          {content.city &&
            Provinces.filter(
              (pro) => pro.name === content.city
            )[0].districts.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
        </Input>
      </FormGroup>

      <FormGroup className="mb-3">
        <Label htmlFor="ward" className="text-small text-bold1 mb-2">
          {t("ward")}
        </Label>
        <Input
          type="text"
          id="ward"
          value={content.ward}
          onChange={(e) => setContent({ ...content, ward: e.target.value })}
        />
      </FormGroup>

      <FormGroup className="mb-4">
        <Input
          type="text"
          placeholder="Toà nhà, tên đường ..."
          value={content.street}
          onChange={(e) => setContent({ ...content, street: e.target.value })}
        />
      </FormGroup>

      <div style={{ maxWidth: "30rem" }} className="center-box">
        <div
          onClick={reset}
          className={`cancel-btn text-center w-50 mr-2 ${
            isChange && "disable-overlay"
          }`}
        >
          {t("cancle")}
        </div>
        <button
          type="submit"
          className={`main-btn w-50 ${isChange && "disable-overlay"}`}
        >
          {t("save")}
        </button>
      </div>
    </Form>
  );
}

Address.propTypes = { defaultAddress: PropTypes.object };

export default Address;
