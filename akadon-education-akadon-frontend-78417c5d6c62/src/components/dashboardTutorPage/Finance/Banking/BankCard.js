import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card } from "reactstrap";
import { useTranslation } from "react-i18next";

function BankCard({ bank, setBankModal }) {
  const bankCard = bank.bank_card.slice(-4);
  const {t} = useTranslation(['payment']);

  return (
    <div onClick={() => setBankModal({isOpen: true, content: bank})} className="cursor-pointer px-3 mb-4">
      <Card className="bank-card border-0 border-radius-2 pt-12px pb-12px px-4">
        <div className="is-verify flex-box justify-content-end mb-12px">
          <FontAwesomeIcon className="mr-2" icon={["fas", "check-circle"]} />
          <span>{t("verifyed")}</span>
        </div>

        <h5 className="font-weight-normal text-light text-uppercase text-truncate mb-3">
          {bank.bank}
        </h5>

        <div className="mb-4">
          <FontAwesomeIcon
            className="text-light text-small mr-1"
            icon={["fas", "asterisk"]}
          />
          <FontAwesomeIcon
            className="text-light text-small mr-1"
            icon={["fas", "asterisk"]}
          />
          <FontAwesomeIcon
            className="text-light text-small mr-1"
            icon={["fas", "asterisk"]}
          />
          <FontAwesomeIcon
            className="text-light text-small mr-2"
            icon={["fas", "asterisk"]}
          />
          <span className="text-light">{bankCard}</span>
        </div>

        <h6 className="text-light font-weight-normal text-uppercase">
          {bank.card_owner_name}
        </h6>

        {bank.is_default && (
          <div className="default-card ml-auto border-radius-1 py-1 px-2 text-hightlight1 text-small text-bold2">
            {t("payment:default")}
          </div>
        )}
      </Card>
    </div>
  );
}

BankCard.propTypes = {
  bank: PropTypes.object,
};

export default BankCard;
