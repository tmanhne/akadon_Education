import React, { useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, FormGroup, Input, Label } from "reactstrap";
import moment from "moment";

import { createUnoauthRequest } from "../../../api";
import ErrorHandler from "../../ErrorHandler";
import SubLoader from "../../utils/SubLoader";
import { toast } from "react-toastify";
import { Trans } from "react-i18next";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
function StudentInfoForm({ modal, setModal }) {
  const { t } = useTranslation(["toast", "landing-page"]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { payload } = modal;
  const {
    fee,
    is_offline,
    is_pre_study,
    lesson_time_length,
    subject_level,
    subject_name,
    student_info,
    student_propose,
    akadon_policy,
    city,
    district,
    free_time,
    end_date,
  } = payload;
  const title = is_pre_study
    ? t("landing-page:req_21")
    : t("landing-page:req_26");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!akadon_policy) {
      setError("akadon_policy");
      return;
    }

    setLoading(true);
    const res = await createUnoauthRequest({
      fee,
      offline_flag: is_offline,
      is_pre_study,
      lesson_time_length,
      subject_level,
      subject_name,
      student_info,
      student_propose,
      city,
      district,
      free_time,
      end_date: moment(end_date).format("DD/MM/YYYY"),
    });
    setLoading(false);

    if (res.status < 400) {
      const { id } = res.data;
      localStorage.setItem("request_id", id);
      setModal({ ...modal, payload: { ...payload, step: 7 } });
    } else if (res.response) {
      toast.error(` ${t("toast:er_1")}  ${res.response.status} !`);
    }
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "heroFlow",
      step: 6,
      stepDetail: {
        heroFlowStudentInfo: modal.payload.student_info,
        heroFlowStudentPorpose: modal.payload.student_propose,
      },
    });
  }

  if (loading) return <SubLoader />;
  return (
    <>
      <FontAwesomeIcon
        className="text-grey h4 mb-0"
        icon={["fas", "arrow-left"]}
        onClick={() => setModal({ ...modal, payload: { ...payload, step: 5 } })}
      />
      <h4 className="mb-2 font-weight-bold text-center">{title}</h4>
      <p className="text-center mb-3 text-grey">{t("landing-page:req_22")}</p>
      <Form
        onSubmit={(e) => handleSubmit(e)}
        className="mx-auto w-100"
        style={{ maxWidth: "600px" }}
      >
        <FormGroup className="mb-3">
          <Label
            className="text-bold2 cursor-pointer mb-12px"
            htmlFor="student-info"
          >
            {t("landing-page:req_23")}
          </Label>
          <Input
            type="textarea"
            rows={3}
            id="student-info"
            value={student_info}
            onChange={(e) =>
              setModal({
                ...modal,
                payload: { ...payload, student_info: e.target.value },
              })
            }
          />
        </FormGroup>

        <FormGroup className="mb-3">
          <Label
            className="text-bold2 cursor-pointer mb-12px"
            htmlFor="student-propose"
          >
            {t("landing-page:req_24")}
          </Label>
          <Input
            type="textarea"
            id="student-propose"
            rows={3}
            placeholder={t("landing-page:btn_req_2")}
            value={student_propose}
            onChange={(e) =>
              setModal({
                ...modal,
                payload: { ...payload, student_propose: e.target.value },
              })
            }
          />
        </FormGroup>

        <FormGroup className="mb-4 ml-3">
          <Input
            type="checkbox"
            id="akadon-policy"
            className="mt-1"
            defaultChecked={akadon_policy}
            onChange={() =>
              setModal({
                ...modal,
                payload: { ...payload, akadon_policy: !akadon_policy },
              })
            }
          />
          <Label className="cursor-pointer mb-12px" htmlFor="akadon-policy">
            <Trans
              i18nKey="landing-page:req_25"
              components={{
                lin: (
                  <Link
                    to="/terms-of-service"
                    target="_blank"
                    className="ml-1 text-dark text-bold2"
                    style={{ textDecoration: "underline" }}
                  />
                ),
              }}
            />

            {error === "akadon_policy" && (
              <ErrorHandler error={t("landing-page:btn_req_1")} />
            )}
          </Label>
        </FormGroup>

        <button className="main-btn-new text-uppercase py-0 w-75 mx-auto d-block mb-5">
          {t("landing-page:btn_req_3")}
          <FontAwesomeIcon
                  icon={["fas", "arrow-right"]}
                  className="btn-arrow facebook-class"
                />
        </button>
      </Form>
    </>
  );
}

StudentInfoForm.propTypes = {
  modal: PropTypes.object,
  setModal: PropTypes.func,
};

export default StudentInfoForm;
