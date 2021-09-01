import React, { useState, useEffect } from "react";
import { Form, FormGroup, Input } from "reactstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";

function Languages({ defaultLanguage, submitLanguage }) {
  const [language, setLanguage] = useState("");
  const { t } = useTranslation("setting");

  // SIDE EFFECTS
  useEffect(() => {
    setLanguage(defaultLanguage);
  }, [defaultLanguage]);

  // FUNCTION DECLARATIONS
  function reset() {
    if (isChange) return;
    setLanguage(defaultLanguage);
  }

  const isChange = language === defaultLanguage;

  return (
    <Form onSubmit={(e) => submitLanguage(e, isChange, language)}>
      <h4 className="mb-3 text-bold2">{t("lang-title")}</h4>
      <p className="text-dark mb-12px">{t("lang-1")}</p>
      <FormGroup className="w-450px">
        <Input
          style={{ width: "15rem" }}
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          type="select"
          className="mb-4 border-radius-2"
        >
          <option value="en">{t("en")}</option>
          <option value="vi">{t("vi")}</option>
        </Input>
      </FormGroup>
      <div className="flex-box pt-3 border-top w-450px">
        <button
          type="submit"
          className={`main-btn px-5 mr-3 text-nowrap ${
            isChange && "disable-overlay boder-rd-100"
          }`}
        >
          {t("lang-save")}
        </button>
        <div
          onClick={reset}
          className={`cancel-btn px-5 ${isChange && "disable-overlay boder-rd-100"}`}
        >
          {t("cancle")}
        </div>
      </div>
    </Form>
  );
}

Languages.propTypes = { defaultLanguage: PropTypes.string };

export default connect(null, null)(Languages);
