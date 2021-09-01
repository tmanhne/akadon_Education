import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, FormGroup, Label, Input } from "reactstrap";
import { toast } from "react-toastify";
import moment from "moment";

import { DatePicker, SubLoader } from "../utils";
import {
  userRegister,
  registerWithZalo,
  registerWithFacebook,
} from "../../api";
import provinces from "../../provinces";
import ErrorHandler from "../ErrorHandler";
import RegisterRedirect from "./RegisterRedirect";

const InfoForm = ({
  registerContent,
  setRegisterContent,
  step,
  setStep,
  t,
}) => {
  // LOCAL STATE DECLARATIONS
  const [err, setErr] = useState("");
  const [akadonPolicy, setAkadonPolicy] = useState(false);
  const [loading, setLoading] = useState(false);
  // LONG THEM STATE EMAIL VÀ BIẾN EMAIL GỬI SEVER
  const [email, setEmail] = useState("");
  const phoneSend = registerContent.phone_number || email.phone_number;
  const emailSend = registerContent.email || email.email || null;
  const student_request_id = localStorage.getItem("request_id") * 1 || null;

  const basePayload = {
    role: registerContent.role,
    email: emailSend,
    name: registerContent.name,
    dob: registerContent.dob
      ? moment(registerContent.dob).format("DD/MM/YYYY")
      : undefined,
    phone_number: phoneSend,
    gender: registerContent.gender * 1,
    city: registerContent.city,
    district: registerContent.district,
    student_request_id,
  };

  const { oauthCode, accessToken } = registerContent;

  // FUNCTIONS DECLARATIONS
  function nextStep() {
    const { name, city, district, dob } = registerContent;

    // 1.CHECK NAME
    if (!name) {
      setErr("name");
      return;
    }
    // 2.CHECK DATE OF BIRTH
    if (!dob) {
      setErr("dob");
      return;
    }

    if (dob) {
      const today = moment();
      const birthDay = moment(dob);
      if (today.diff(birthDay, "years") < 1) {
        setErr("dob");
        return;
      }
    }
    // check phone
    if (!phoneSend) {
      setErr("phone_number");
      return;
    }
    if (phoneSend.length !== 10 && phoneSend.length !== 11) {
      setErr("phone_number");
      return;
    }

    // 3.CHECK CITY
    if (!city) {
      setErr("city");
      return;
    }
    // 4.CHECK DISTRICT
    if (!district) {
      setErr("district");
      return;
    }

    // 5.CHECK AKADON POLICY
    if (!akadonPolicy) {
      setErr("akadon_policy");
      return;
    }

    // 6. RESET ERR AND CALL API
    setErr("");
    if (registerContent.accessToken) {
      handleFacebookRegistration();
    } else if (registerContent.oauthCode) {
      handleZaloRegistration();
    } else {
      traditionalRegistration();
    }
    setAkadonPolicy(false);
  }

  async function handleZaloRegistration() {
    const payload = {
      ...basePayload,
      code: registerContent.oauthCode,
    };
    setLoading(true);
    const res = await registerWithZalo(payload);
    setLoading(false);

    if (res.status < 400) {
      setStep(step + 1);
    } else if (res.response) {
      if (res.response.status === 409) {
        toast.error(t("toast:er_42"));
      } else {
        toast.error(` ${t("toast:er_1")}  ${res.response.status}`);
      }
    }
  }

  async function traditionalRegistration() {
    const payload = {
      ...basePayload,
      password: registerContent.password,
    };

    setLoading(true);
    const res = await userRegister(payload);
    setLoading(false);

    if (res.status < 400) {
      setStep(step + 1);
    } else if (res.response) {
      if (res.response.status === 403) {
        toast.error(t("toast:er_40"));
      } else {
        if (res.response.status === 409) {
          toast.error(t("toast:er_42"));
        } else {
          toast.error(` ${t("toast:er_1")}  ${res.response.status}`);
        }
      }
    }
  }

  async function handleFacebookRegistration() {
    const payload = {
      ...basePayload,
      accessToken: registerContent.accessToken,
      userID: registerContent.userID,
      email: emailSend,
    };

    setLoading(true);
    const res = await registerWithFacebook(payload);
    setLoading(false);

    if (res.status < 400) {
      setStep(step + 1);
    } else if (res.response) {
      if (res.response.status === 409) {
        toast.error(t("toast:er_42"));
      } else {
        toast.error(` ${t("toast:er_1")}  ${res.response.status}`);
      }
    }
  }

  if (loading) return <SubLoader />;

  return (
    <>
      <Form className="register-page__info">
        <p className="mb-3 text-hightlight text-center">
          Mục có dấu (*) là thông tin bắt buộc phải cung cấp.
        </p>
        <FormGroup className="flex-box justify-content-end mb-4">
          <Label for="userName">
            {t("common:name")}
            <span className="text-danger">*</span>
            {err === "name" && (
              <p className="py-1 text-right">
                <ErrorHandler error="Tên không hợp lệ ! " />
              </p>
            )}
          </Label>
          <Input
            className="border-radius-2 fixed-width fixed-width"
            type="text"
            name="userName"
            id="userName"
            required
            value={registerContent.name}
            onChange={(e) =>
              setRegisterContent({ ...registerContent, name: e.target.value })
            }
          />
        </FormGroup>

        <FormGroup className="datepicker-icon flex-box justify-content-end mb-4">
          <Label for="date-of-birth">
            {t("common:dob")}
            <span className="text-danger">*</span>
            {err === "dob" && (
              <p className="py-1 text-right">
                <ErrorHandler error="Ngày sinh không hợp lệ ! " />
              </p>
            )}
          </Label>
          <DatePicker
            className="border-radius-2 border w-100"
            wrapperClassName="fixed-width flex-grow"
            name="date-of-birth"
            id="date-of-birth"
            required
            selected={registerContent.dob}
            onChange={(date) =>
              setRegisterContent({ ...registerContent, dob: date })
            }
          />
        </FormGroup>

        <FormGroup className="flex-box justify-content-end mb-4">
          <Label for="gender">{t("common:gender")}</Label>
          <Input
            className="border-radius-2 fixed-width"
            type="select"
            name="gender"
            id="gender"
            value={registerContent.gender}
            onChange={(e) =>
              setRegisterContent({ ...registerContent, gender: e.target.value })
            }
          >
            <option value={1}>{t("common:male")}</option>
            <option value={0}>{t("common:female")}</option>
          </Input>
        </FormGroup>

        <FormGroup className="flex-box justify-content-end mb-4">
          <Label for="city">
            {t("common:city")}
            {registerContent.role === 1 && (
              <span className="text-danger">*</span>
            )}
            {err === "city" && (
              <p className="py-1 text-right">
                <ErrorHandler error="Thành phố không hợp lệ ! " />
              </p>
            )}
          </Label>
          <Input
            className="border-radius-2 fixed-width"
            type="select"
            name="city"
            id="city"
            value={registerContent.city}
            onChange={(e) =>
              setRegisterContent({ ...registerContent, city: e.target.value })
            }
          >
            <option value="">{t("common:city")}</option>
            {provinces.map((p, index) => (
              <option key={index} value={p.name}>
                {p.name}
              </option>
            ))}
          </Input>
        </FormGroup>

        <FormGroup className="flex-box justify-content-end mb-4">
          <Label for="dis">
            {t("common:district")}
            {registerContent.role === 1 && (
              <span className="text-danger">*</span>
            )}
            {err === "district" && (
              <p className="py-1 text-right">
                <ErrorHandler error="Quận/huyện không hợp lệ ! " />
              </p>
            )}
          </Label>
          <Input
            className="border-radius-2 fixed-width"
            type="select"
            name="dis"
            id="dis"
            value={registerContent.district}
            onChange={(e) =>
              setRegisterContent({
                ...registerContent,
                district: e.target.value,
              })
            }
          >
            <option value="">{t("common:district")}</option>
            {registerContent.city &&
              provinces
                .filter((pro) => pro.name === registerContent.city)[0]
                .districts.map((d, index) => (
                  <option key={index} value={d}>
                    {d}
                  </option>
                ))}
          </Input>
        </FormGroup>

        {/* LONG CHUYỂN SỐ DDIENJ CỦA GIA SƯ SANG CHO CẢ HỌC VIÊN VÀ GIA SƯ aca985*/}

        <FormGroup className="flex-box justify-content-end mb-4">
          <Label for="phone">
            {t("common:phone")}
            <span className="text-danger">*</span>
            {err === "phone_number" && (
              <p className="py-1 text-right">
                <ErrorHandler error="Số điện thoại không hợp lệ ! " />
              </p>
            )}
          </Label>
          <Input
            className="border-radius-2 fixed-width"
            type="number"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            disabled={registerContent.phone_number}
            placeholder="012-345-6789"
            id="phone"
            required
            value={registerContent.phone_number || email.phone_number}
            onChange={(e) =>
              setEmail({
                ...email,
                phone_number: e.target.value,
              })
            }
          />
        </FormGroup>

        <FormGroup className="flex-box justify-content-end mb-4">
          <Label for="email">Email( Tùy chọn)</Label>
          <Input
            className="border-radius-2 fixed-width"
            type="email"
            name="email"
            id="email"
            disabled={registerContent.email}
            placeholder="digital.marketing@akadon.edu.vn"
            value={registerContent.email || email.email}
            onChange={(e) =>
              setEmail({
                ...email,
                email: e.target.value,
              })
            }
          />
        </FormGroup>
        <p className="text-hightlight text-small mb-2">
          <span className="text-hightlight2 text-semibold">Mẹo nhỏ:</span> Bạn
          nên cung cấp thêm địa chỉ email, AKADON sẽ hỗ trợ bạn một cách hiệu
          quả hơn.
        </p>

        <FormGroup className="check-box flex-box mb-4 ml-3">
          <Input
            className="w-auto mb-2"
            type="checkbox"
            id="akadon-policy"
            value={akadonPolicy}
            onChange={() => setAkadonPolicy(true)}
          />
          <Label className="w-100 text-left" for="akadon-policy">
            {t("Sign-up-page:accept-akadon-separate-1")}
            <Link
              to="/terms-of-service"
              target="_blank"
              className="text-hightlight1 text-decoration-none"
            >
              {" "}
              {t("Sign-up-page:accept-akadon-separate-2")}
            </Link>{" "}
            {t("Sign-up-page:accept-akadon-separate-3")}
            {err === "akadon_policy" && (
              <p className="py-1 text-left">
                <ErrorHandler error="Bạn phải chấp nhận điều khoản sử dụng để tiếp tục ! " />
              </p>
            )}
          </Label>
        </FormGroup>
      </Form>

      {/* LONG THÊM ROLE ĐỂ LẤY HỌC VIÊN ? GIA SƯ */}
      <RegisterRedirect
        disableBackBtn={oauthCode || accessToken}
        step={step}
        setStep={setStep}
        nextStep={nextStep}
        role={registerContent.role}
      />
    </>
  );
};

export default InfoForm;
