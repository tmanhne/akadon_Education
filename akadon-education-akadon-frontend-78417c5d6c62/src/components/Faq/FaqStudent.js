// Author LONG
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useTranslation, Trans } from "react-i18next";
import { Link } from "react-router-dom";
import { Collapse } from "reactstrap";
import "./index.scss";

function FaqStudent() {
  const { t } = useTranslation("Faq-page");

  const [collapse, setCollapse] = useState([]);

  function handleSetCollapse(key) {
    if (collapse.includes(key)) {
      const updatedCollapse = collapse.filter((col) => col !== key);
      setCollapse([...updatedCollapse]);
    } else {
      setCollapse([...collapse, key]);
    }
  }

  return (
    <>
      <div className="pb-12px mb-12px border-bottom">
        <div
          onClick={() => handleSetCollapse("faq-1")}
          className="cursor-pointer flex-box align-items-start mb-12px"
        >
          {collapse.includes("faq-1") ? (
            <FontAwesomeIcon
              className="text-grey mr-3"
              icon={["fal", "angle-down"]}
            />
          ) : (
            <FontAwesomeIcon
              className="text-grey mr-3"
              icon={["fal", "angle-right"]}
            />
          )}

          <p className="mb-0 flex-grow faq-head-title text-bold1">
            {t("quest_title")}
          </p>
        </div>
        <Collapse isOpen={collapse.includes("faq-1")}>
          <div>
            <p>
              <Trans
                i18nKey={t("quest_1")}
                components={{ p: <Link to="/" target="_blank" /> }}
              />
            </p>
            <p> {t("quest_2")}</p>
          </div>
        </Collapse>
      </div>

      <div className="pb-12px mb-12px border-bottom">
        <div
          onClick={() => handleSetCollapse("faq-2")}
          className="cursor-pointer flex-box align-items-start mb-12px"
        >
          {collapse.includes("faq-2") ? (
            <FontAwesomeIcon
              className="text-grey mr-3"
              icon={["fal", "angle-down"]}
            />
          ) : (
            <FontAwesomeIcon
              className="text-grey mr-3"
              icon={["fal", "angle-right"]}
            />
          )}
          <p className="mb-0 flex-grow faq-head-title text-bold1">
            {t("quest_title_1")}
          </p>
        </div>
        <Collapse isOpen={collapse.includes("faq-2")}>
          {t("quest_3_tran")}
          <ul>
            <li>
              <Trans
                i18nKey={t("quest_3")}
                components={{
                  p: <strong />,
                  a: <Link to="/" target="_blank" />,
                }}
              />
            </li>
            <li>
              <Trans
                i18nKey={t("quest_4")}
                components={{
                  p: <strong />,
                  hightlin: <Link to="/" target="_blank" />,
                }}
              />
            </li>
            <li>
              <Trans
                i18nKey={t("quest_5")}
                components={{
                  p: <strong />,
                  hightlin: <Link to="/" target="_blank" />,
                }}
              />
            </li>
            <li>
              <Trans
                i18nKey={t("quest_6")}
                components={{
                  p: <strong />,
                  hightlin: <Link to="/" target="_blank" />,
                }}
              />
            </li>
            <li>
              <Trans
                i18nKey={t("quest_7")}
                components={{
                  p: <strong />,
                  hightlin: <Link to="/" target="_blank" />,
                }}
              />
            </li>
            <li>
              <Trans
                i18nKey={t("quest_8")}
                components={{
                  p: <strong />,
                  hightlin: <Link to="/" target="_blank" />,
                }}
              />
            </li>
          </ul>
          <p className="text-hightlight font-italic">{t("quest_9")}</p>
          <Trans
            i18nKey={t("quest_10")}
            components={{
              p: <strong />,
              hightlin: <Link to="/note" target="_blank" />,
            }}
          />
        </Collapse>
      </div>

      <div className="pb-12px mb-12px border-bottom">
        <div
          onClick={() => handleSetCollapse("faq-3")}
          className="cursor-pointer flex-box align-items-start mb-12px"
        >
          {collapse.includes("faq-3") ? (
            <FontAwesomeIcon
              className="text-grey mr-3"
              icon={["fal", "angle-down"]}
            />
          ) : (
            <FontAwesomeIcon
              className="text-grey mr-3"
              icon={["fal", "angle-right"]}
            />
          )}
          <p className="mb-0 flex-grow faq-head-title text-bold1">
            {t("quest_title_2")}
          </p>
        </div>
        <Collapse isOpen={collapse.includes("faq-3")}>
          <ul>
            <li>{t("quest_11")}</li>
          </ul>
        </Collapse>
      </div>

      <div className="pb-12px mb-12px border-bottom">
        <div
          onClick={() => handleSetCollapse("faq-4")}
          className="cursor-pointer flex-box align-items-start mb-12px"
        >
          {collapse.includes("faq-4") ? (
            <FontAwesomeIcon
              className="text-grey mr-3"
              icon={["fal", "angle-down"]}
            />
          ) : (
            <FontAwesomeIcon
              className="text-grey mr-3"
              icon={["fal", "angle-right"]}
            />
          )}
          <p className="mb-0 flex-grow faq-head-title text-bold1">
            {t("quest_title_3")}
          </p>
        </div>
        <Collapse isOpen={collapse.includes("faq-4")}>
          <span className="ml-3">{t("quest_12")}</span>
          <ul>
            <li>{t("quest_13")}</li>
            <li>
              <Trans
                i18nKey={t("quest_14")}
                components={{
                  p: <strong />,
                  hightlin: <Link to="/" target="_blank" />,
                }}
              />
            </li>
          </ul>
        </Collapse>
      </div>
      <div className="pb-12px mb-12px border-bottom">
        <div
          onClick={() => handleSetCollapse("faq-5")}
          className="cursor-pointer flex-box align-items-start mb-12px"
        >
          {collapse.includes("faq-5") ? (
            <FontAwesomeIcon
              className="text-grey mr-3"
              icon={["fal", "angle-down"]}
            />
          ) : (
            <FontAwesomeIcon
              className="text-grey mr-3"
              icon={["fal", "angle-right"]}
            />
          )}
          <p className="mb-0 flex-grow faq-head-title text-bold1">
            {t("quest_title_4")}
          </p>
        </div>
        <Collapse isOpen={collapse.includes("faq-5")}>
          <ul>
            <li>{t("quest_15")}</li>
          </ul>
        </Collapse>
      </div>

      <div className="pb-12px mb-12px border-bottom">
        <div
          onClick={() => handleSetCollapse("faq-6")}
          className="cursor-pointer flex-box align-items-start mb-12px"
        >
          {collapse.includes("faq-6") ? (
            <FontAwesomeIcon
              className="text-grey mr-3"
              icon={["fal", "angle-down"]}
            />
          ) : (
            <FontAwesomeIcon
              className="text-grey mr-3"
              icon={["fal", "angle-right"]}
            />
          )}
          <p className="mb-0 flex-grow faq-head-title text-bold1">
            {t("quest_title_5")}
          </p>
        </div>
        <Collapse isOpen={collapse.includes("faq-6")}>
          <span className="ml-3">{t("quest_16")}</span>
          <ul>
            <li>{t("quest_17")}</li>
            <li>{t("quest_18")}</li>
            <li>{t("quest_19")}</li>
          </ul>
        </Collapse>
      </div>

      <div className="pb-12px mb-12px border-bottom">
        <div
          onClick={() => handleSetCollapse("faq-7")}
          className="cursor-pointer flex-box align-items-start mb-12px"
        >
          {collapse.includes("faq-7") ? (
            <FontAwesomeIcon
              className="text-grey mr-3"
              icon={["fal", "angle-down"]}
            />
          ) : (
            <FontAwesomeIcon
              className="text-grey mr-3"
              icon={["fal", "angle-right"]}
            />
          )}
          <p className="mb-0 flex-grow faq-head-title text-bold1">
            {t("quest_title_6")}
          </p>
        </div>
        <Collapse isOpen={collapse.includes("faq-7")}>
          <ul>
            <li>
              <Trans
                i18nKey={t("quest_20")}
                components={{
                  p: <strong />,
                  hightlin: <Link to="/note" target="_blank" />,
                }}
              />
            </li>
            <li>{t("quest_21")}</li>
          </ul>
        </Collapse>
      </div>

      <div className="pb-12px mb-12px border-bottom">
        <div
          onClick={() => handleSetCollapse("faq-8")}
          className="cursor-pointer flex-box align-items-start mb-12px"
        >
          {collapse.includes("faq-8") ? (
            <FontAwesomeIcon
              className="text-grey mr-3"
              icon={["fal", "angle-down"]}
            />
          ) : (
            <FontAwesomeIcon
              className="text-grey mr-3"
              icon={["fal", "angle-right"]}
            />
          )}
          <p className="mb-0 flex-grow faq-head-title text-bold1">
            {t("quest_title_7")}
          </p>
        </div>
        <Collapse isOpen={collapse.includes("faq-8")}>
          <ul>
            <li>
              <Trans
                i18nKey={t("quest_22")}
                components={{
                  p: <strong />,
                  hightlin: <Link to="/note" target="_blank" />,
                }}
              />
            </li>
            <li>{t("quest_23")}</li>
            <li>{t("quest_24")}</li>
          </ul>
        </Collapse>
      </div>

      <div className="pb-12px mb-12px border-bottom">
        <div
          onClick={() => handleSetCollapse("faq-9")}
          className="cursor-pointer flex-box align-items-start mb-12px"
        >
          {collapse.includes("faq-9") ? (
            <FontAwesomeIcon
              className="text-grey mr-3"
              icon={["fal", "angle-down"]}
            />
          ) : (
            <FontAwesomeIcon
              className="text-grey mr-3"
              icon={["fal", "angle-right"]}
            />
          )}
          <p className="mb-0 flex-grow faq-head-title text-bold1">
            {t("quest_title_8")}
          </p>
        </div>
        <Collapse isOpen={collapse.includes("faq-9")}>
          <ul>
            <li>{t("quest_25")}</li>
            <li>{t("quest_26")}</li>
          </ul>
        </Collapse>
      </div>

      <div className="pb-12px mb-12px border-bottom">
        <div
          onClick={() => handleSetCollapse("faq-10")}
          className="cursor-pointer flex-box align-items-start mb-12px"
        >
          {collapse.includes("faq-10") ? (
            <FontAwesomeIcon
              className="text-grey mr-3"
              icon={["fal", "angle-down"]}
            />
          ) : (
            <FontAwesomeIcon
              className="text-grey mr-3"
              icon={["fal", "angle-right"]}
            />
          )}
          <p className="mb-0 flex-grow faq-head-title text-bold1">
            {t("quest_title_9")}
          </p>
        </div>
        <Collapse isOpen={collapse.includes("faq-10")}>
          <ul>
            <li>
              <Trans
                i18nKey={t("quest_27")}
                components={{
                  p: <strong />,
                  hightlin: <Link to="/note" target="_blank" />,
                }}
              />
            </li>
            <li>
              {t("quest_28")}
              <ul>
                <li>{t("quest_29")}</li>
                <li>{t("quest_30")}</li>
              </ul>
            </li>
            <li>
              {t("quest_31")}
              <ul>
                <li> {t("quest_32")}</li>
                <li> {t("quest_33")}</li>
                <li> {t("quest_34")}</li>
                <li> {t("quest_35")}</li>
                <li> {t("quest_36")}</li>
                <li> {t("quest_37")}</li>
              </ul>
            </li>
          </ul>
        </Collapse>
      </div>
    </>
  );
}

export default FaqStudent;
