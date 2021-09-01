import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, FormGroup, Input, Label } from "reactstrap";
import { useTranslation } from "react-i18next";

import { addBank, getOtp } from "../../../../api";
import bankList from "../../../../bankList";

function InfoModal({ setInfoModal, setOtpModal, setInfo, info }) {
  const { t } = useTranslation(["common", "payment"]);

  // FUNCTION DECLARATIONS
  async function submitInfo(e) {
    e.preventDefault();

    const infoPayload = {
      id_card: info.id_number,
      phone_number: info.phone,
      card_owner_name: info.card_name,
      bank: info.bank_name,
      bank_card: info.bank_number,
      name: "",
      is_default: info.isDefault,
    };

    const otpPayload = {
      phone_number: info.phone,
    };

    const res = await addBank(infoPayload);

    await getOtp(otpPayload);

    if (res.status < 400) {
      setOtpModal(true);
      setInfoModal(false);
    }
  }

  return (
    <div>
      <div className="flex-box border-bottom py-3 mb-3">
        <h4 className="mb-0 text-bold2 text-center flex-grow">
          {t("payment:addbank-title")}
        </h4>
        <FontAwesomeIcon
          onClick={() => setInfoModal(false)}
          className="text-grey mr-3 h5 mb-0"
          icon={["fal", "times"]}
        />
      </div>

      <Form onSubmit={submitInfo}>
        <FormGroup>
          <Input
            className="border-radius-2"
            required
            type="text"
            placeholder={t("payment:addbank-field-1")}
            id="name"
            value={info.card_name}
            onChange={(e) => setInfo({ ...info, card_name: e.target.value })}
          />
        </FormGroup>

        <FormGroup>
          <Input
            className="border-radius-2"
            required
            type="tel"
            placeholder={t("payment:addbank-field-2")}
            value={info.phone}
            onChange={(e) => setInfo({ ...info, phone: e.target.value })}
          />
        </FormGroup>

        <FormGroup>
          <Input
            className="border-radius-2"
            required
            type="number"
            placeholder={t("payment:addbank-field-3")}
            value={info.id_number}
            onChange={(e) => setInfo({ ...info, id_number: e.target.value })}
          />
        </FormGroup>

        <FormGroup>
          <Input
            className="border-radius-2"
            required
            type="text"
            placeholder={t("payment:addbank-field-4")}
            value={info.bank_number}
            onChange={(e) => setInfo({ ...info, bank_number: e.target.value })}
          />
        </FormGroup>

        <FormGroup>
          <Input
            className="border-radius-2"
            required
            type="select"
            value={info.bank_name}
            onChange={(e) => setInfo({ ...info, bank_name: e.target.value })}
          >
            <option value="">{t("payment:addbank-field-5")}</option>
            {bankList.map((bank) => (
              <option key={bank} value={bank}>
                {bank}
              </option>
            ))}
          </Input>
        </FormGroup>

        <FormGroup className="mb-4" check>
          <Label check className="cursor-pointer">
            <Input
              type="checkbox"
              defaultChecked={info.isDefault}
              onChange={() => setInfo({ ...info, isDefault: !info.isDefault })}
            />
            <span className="ml-2">{t("payment:addbank-field-6")}</span>
          </Label>
        </FormGroup>

        <div className="flex-box mb-12px">
          <button
            type="button"
            onClick={() => setInfoModal(false)}
            className="cancel-btn w-50 mr-3"
          >
            {t("common:cancel")}
          </button>
          <button type="submit" className="main-btn w-50">
            {t("common:next")}
          </button>
        </div>
      </Form>
    </div>
  );
}

InfoModal.propTypes = {
  setInfoModal: PropTypes.func,
  setOtpModal: PropTypes.func,
  setInfo: PropTypes.func,
  info: PropTypes.object,
};

export default InfoModal;
