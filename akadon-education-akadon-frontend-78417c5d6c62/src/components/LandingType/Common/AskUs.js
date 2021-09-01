import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Container, Form, FormGroup, Input, Label } from "reactstrap";
import Image from "../../../assets/images/faq.png";
import ErrorHandler from "../../ErrorHandler";
import "./index.scss";

export default function AskUs({
  userName,
  setUserName,
  email,
  setEmail,
  question,
  setQuestion,
  sendQuestion,
  error,
  waitSend,
  mobileNumber,
  setMobileNumber,
  t,
}) {
  return (
    <Container
      className="Askus-common position-relative pl-2"
      fluid={true}
      id="askus"
    >
      <div className="Askus-common__content flex-box justify-content-between mx-auto">
        <div className="img-box text-right">
          <img className="ml-auto" src={Image} alt="faq" />
        </div>

        <div className="content-box mr-3">
          <Form className="w-100 mobilefaq">
            <h2 className="text-bold1 mb-4 ml-2">{t("block_5_text_1")}</h2>

            <div className="flex-box info-box mb-3">
              <FormGroup className="mr-12px w-50">
                <Label
                  className="cursor-pointer text-small mb-2"
                  htmlFor="name"
                >
                  {t("block_5_text_2")}
                  {error === "name" && (
                    <ErrorHandler error=" (Tên không hợp lệ !)" />
                  )}
                </Label>
                <Input
                  type="text"
                  id="name"
                  placeholder={t("block_5_text_2")}
                  className="border-radius-2"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </FormGroup>

              <FormGroup className="w-50">
                <Label
                  className="cursor-pointer text-small mb-2"
                  htmlFor="mobileNumber"
                >
                  {t("block_5_text_6")}
                  {error === "mobileNumber" && (
                    <ErrorHandler error=" ( không hợp lệ !)" />
                  )}
                </Label>
                <Input
                  type="number"
                  id="mobileNumber"
                  placeholder="012-345-6789"
                  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                  className="border-radius-2"
                  required
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                />
              </FormGroup>
            </div>

            <FormGroup className="mb-3 w-100">
              <Label className="cursor-pointer text-small mb-2" htmlFor="email">
                {t("block_5_text_3")}
                {error === "email" && (
                  <ErrorHandler error=" (Email không hợp lệ !)" />
                )}
              </Label>
              <Input
                type="email"
                id="email"
                placeholder={t("block_5_text_3")}
                className="border-radius-2"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormGroup>

            <FormGroup className="mb-3 w-100">
              <Label
                className="cursor-pointer text-small mb-2"
                htmlFor="content"
              >
                {t("block_5_text_4")}
                {error === "question" && (
                  <ErrorHandler error={t("landing-page:invalid_value")} />
                )}
              </Label>
              <Input
                type="textarea"
                placeholder={t("block_5_text_5")}
                className="border-radius-2"
                rows={6}
                id="content"
                required
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
            </FormGroup>

            <button
              type="submit"
              style={{ width: "12rem" }}
              className={`${
                waitSend && "disabl-overlay"
              } main-btn-new text-bold2 questionsend`}
              onClick={(e) => {
                sendQuestion(e);
                window.dataLayer.push({
                  event: "question",
                });
              }}
            >
              {t("block_5_btn_2")}
              <FontAwesomeIcon
                icon={["fas", "arrow-right"]}
                className="btn-arrow facebook-class"
              />
            </button>
          </Form>
        </div>
      </div>
    </Container>
  );
}
