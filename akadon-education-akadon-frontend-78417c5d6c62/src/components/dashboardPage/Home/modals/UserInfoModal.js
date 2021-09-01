import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form, FormGroup, Input, Label } from "reactstrap";
import moment from "moment";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

import { DatePicker, SubLoader } from "../../../utils";
import provinces from "../../../../provinces";
import { updateQuandaUser } from "../../../../api";
import ErrorHandler from "../../../ErrorHandler";

function UserInfoModal({ setModal, user, editUserSuccess, t }) {
  const initContent = {
    name: user.name,
    dob: "",
    gender: 1,
    city: "",
    district: "",
  };
  const [content, setContent] = useState(initContent);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleUpdateUser(e) {
    const { name, gender, city, district, dob } = content;
    e.preventDefault();
    if (!name) {
      setError("name");
      return;
    }

    setError("");
    const payload = {
      dob: dob ? moment(dob).format("DD/MM/YYYY") : undefined,
      name,
      gender,
      city,
      district,
    };

    setLoading(true);
    const res = await updateQuandaUser(payload);
    setLoading(false);

    if (res.status < 400) {
      editUserSuccess({ is_qanda_complete: true });
      setModal(false);
      localStorage.setItem(
        "user",
        JSON.stringify({ ...user, is_qanda_complete: true })
      );
    } else if (res.response) {
      toast.error(` ${t("toast:er_1")}  ${res.response.status} !`);
    }
  }

  if (loading) return <SubLoader />;

  return (
    <>
      <h5 className="text-center text-bold2 py-3 mb-3 border-bottom">
        {t("profile")}
      </h5>
      <p className="text-center mb-3">
        {t("greeting_1")} <br /> {t("greeting_2")}
      </p>

      <Form className="mx-auto">
        <FormGroup className="flex-box mb-4">
          <Label
            className="cursor-pointer text-right text-nowrap mr-3 mb-0 text-bold1"
            htmlFor="name"
          >
            {t("full_name")} <span className="text-danger">*</span>
            {error === "name" && (
              <p className="mb-0">
                <ErrorHandler error="Tên không hợp lệ" />
              </p>
            )}
          </Label>
          <Input
            type="text"
            id="name"
            required
            value={content.name}
            onChange={(e) => setContent({ ...content, name: e.target.value })}
          />
        </FormGroup>

        <FormGroup className="flex-box mb-4">
          <Label
            className="cursor-pointer text-right text-nowrap mr-3 mb-0 text-bold1"
            htmlFor="birthDay"
          >
            {t("dob")}
          </Label>
          <DatePicker
            className="border border-radius-2 w-100"
            wrapperClassName="w-100"
            id="birthDay"
            selected={content.dob}
            onChange={(date) => setContent({ ...content, dob: date })}
          />
        </FormGroup>

        <FormGroup className="flex-box mb-4">
          <Label
            className="cursor-pointer text-right text-nowrap mr-3 mb-0 text-bold1"
            htmlFor="gender"
          >
            {t("gender")}
          </Label>
          <Input
            type="select"
            id="gender"
            value={content.gender}
            onChange={(e) => setContent({ ...content, gender: e.target.value })}
          >
            <option value={0}>{t("male")}</option>
            <option value={1}>{t("female")}</option>
          </Input>
        </FormGroup>

        <FormGroup className="flex-box mb-4">
          <Label
            className="cursor-pointer text-right text-nowrap mr-3 mb-0 text-bold1"
            htmlFor="city"
          >
            {t("city")}
          </Label>
          <Input
            type="select"
            id="city"
            value={content.city}
            onChange={(e) => setContent({ ...content, city: e.target.value })}
          >
            <option value="">{t("select_city")}</option>
            {provinces.map((p, index) => (
              <option key={index} value={p.name}>
                {p.name}
              </option>
            ))}
          </Input>
        </FormGroup>

        <FormGroup className="flex-box mb-4">
          <Label
            className="cursor-pointer text-right text-nowrap mr-3 mb-0 text-bold1"
            htmlFor="district"
          >
            {t("dis")}
          </Label>
          <Input type="select" id="district">
            <option value="">{t("select_dis")}</option>
            {content.city &&
              provinces
                .filter((pro) => pro.name === content.city)[0]
                .districts.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
          </Input>
        </FormGroup>

        <FormGroup className="flex-box mb-5">
          <Label
            className="cursor-pointer text-right text-nowrap mr-3 mb-0 text-bold1"
            htmlFor="phoneNumber"
          ></Label>
          <button onClick={handleUpdateUser} className="main-btn flex-grow">
            {t("confirm")}
          </button>
        </FormGroup>
      </Form>
    </>
  );
}

UserInfoModal.propTypes = {
  name: PropTypes.string,
  setModal: PropTypes.func,
};

export default UserInfoModal;
