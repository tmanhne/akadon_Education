import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Form,
  FormGroup,
  InputGroup,
  Input,
  Label,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";
import { Link } from "react-router-dom";
import {useTranslation} from "react-i18next"

import EyesIcon from "../../assets/icons/eyes-icon.svg";
import SlashEyesIcon from "../../assets/icons/slash-eyes-icon.svg";
import FacebookIcon from "../../assets/icons/facebook-icon.svg";
import ZaloIcon from "../../assets/icons/zalo-icon.svg";
import PasswordPattern from "./PasswordPattern";
import ErrorHandler from "../ErrorHandler";

function RegisterForm({
  error,
  registerContent,
  setRegisterContent,
  register,
  setIsValidPassword,
  handleGetCode,
}) {
  const [hide, setHide] = useState(true);
  const {
    name,
    phone_number,
    password,
    quanda_id,
    akadon_policy,
    code,
  } = registerContent;
  const {t} = useTranslation("landing-page")

  function handleResendCode(e) {
    e.preventDefault();
    handleGetCode({ phone_number });
    document.getElementById("resendCode").disabled = true;
    setTimeout(() => {
      document.getElementById("resendCode").disabled = false;
    }, 10000);
  }

  return (
    <>
      <Form>
        <FormGroup className="mb-4">
          <Label htmlFor="name" className="mb-1 cursor-pointer">
            Họ và tên
            {error === "name" && (
              <ErrorHandler error={t("landing-page:invalid_value")} />
            )}
          </Label>
          <Input
            id="name"
            type="text"
            placeholder="Họ và tên"
            className="border-radius-2 border"
            value={name}
            onChange={(e) =>
              setRegisterContent({ ...registerContent, name: e.target.value })
            }
          />
        </FormGroup>

        <FormGroup className="mb-4">
          <Label htmlFor="phoneNumber" className="mb-1 cursor-pointer">
            Số điện thoại
            {error === "phone_number" && (
              <ErrorHandler error={t("landing-page:invalid_value")} />
            )}
          </Label>
          <Input
            id="phoneNumber"
            type="tel"
            placeholder="Số điện thoại"
            className="border-radius-2 border"
            value={phone_number}
            onChange={(e) =>
              setRegisterContent({
                ...registerContent,
                phone_number: e.target.value.replaceAll(/[^0-9]/g, ""),
              })
            }
          />
        </FormGroup>

        <FormGroup className="mb-2">
          <Label className="cursor-pointer mb-1" for="password">
            Mật khẩu
            {error === "password" && (
              <ErrorHandler error={t("landing-page:invalid_value")} />
            )}
          </Label>
          <InputGroup>
            <Input
              className="border-right-0"
              type={hide ? "password" : "text"}
              name="password"
              id="password"
              placeholder="Nhập mật khẩu"
              required
              value={password}
              onChange={(e) =>
                setRegisterContent({
                  ...registerContent,
                  password: e.target.value,
                })
              }
            />
            <InputGroupAddon onClick={() => setHide(!hide)} addonType="append">
              <InputGroupText className="cursor-pointer bg-light border-left-0">
                <img
                  src={!hide ? EyesIcon : SlashEyesIcon}
                  alt="visible password"
                />
              </InputGroupText>
            </InputGroupAddon>
          </InputGroup>
        </FormGroup>

        <PasswordPattern
          setIsValidPassword={setIsValidPassword}
          password={registerContent.password || ""}
        />

        <FormGroup className="my-4">
          <Label htmlFor="quandaId" className="mb-1 cursor-pointer">
            Qanda ID
            {error === "quanda_id" && (
              <ErrorHandler error={t("landing-page:invalid_value")} />
            )}
          </Label>
          <Input
            id="quandaId"
            placeholder="Nhập Qanda ID"
            className="border-radius-2 border"
            value={quanda_id}
            onChange={(e) =>
              setRegisterContent({
                ...registerContent,
                quanda_id: e.target.value,
              })
            }
          />
        </FormGroup>

        {registerContent.code !== undefined && (
          <FormGroup className="mb-4">
            <Label htmlFor="code" className="mb-1 cursor-pointer">
              Nhập mã code
              <span className="ml-2 font-italic text-hightlight">
                AKADON đã gửi một mã code vào số điện thoại mà bạn đăng ký. Vui
                lòng kiểm tra tin nhắn từ akadon.
              </span>
              {error === "code" && (
                <ErrorHandler error={t("landing-page:invalid_value")} />
              )}
            </Label>
            <Input
              id="code"
              placeholder="Nhập mã code"
              className="border-radius-2 border mb-2"
              value={code}
              onChange={(e) =>
                setRegisterContent({
                  ...registerContent,
                  code: e.target.value,
                })
              }
            />
            <div className="text-right">
              <span className="text-grey">Bạn chưa nhận được mã?</span>
              <button
                id="resendCode"
                onClick={(e) => handleResendCode(e)}
                className="border-0 bg-light cursor-pointer"
                style={{ textDecoration: "underline" }}
              >
                {" "}
                Gửi lại code
              </button>
            </div>
          </FormGroup>
        )}

        <FormGroup className="mb-4 pl-3">
          <Input
            defaultChecked={akadon_policy}
            type="checkbox"
            id="akadonPolicy"
            className="mb-0 mr-2 mt-1"
            value={akadon_policy}
            onChange={() =>
              setRegisterContent({
                ...registerContent,
                akadon_policy: !akadon_policy,
              })
            }
          />
          <Label className="cursor-pointer mb-0" htmlFor="akadonPolicy">
            Tôi chấp nhận{" "}
            <Link className="text-hightlight1" to="/terms-of-service">
              Điều khoản
            </Link>{" "}
            sử dụng
          </Label>
        </FormGroup>

        <button onClick={register} className="main-btn w-100">
          Xác nhận
        </button>
      </Form>

      {/* <p className="text-small text-grey text-center my-3">Hoặc đăng ký bằng</p>

      <div className="center-box pb-5">
        <button className="center-box border border-radius-3 w-50 mr-3 py-3">
          <img src={FacebookIcon} alt="facebook" className="mr-2" width={24} />
          <span>Facebook</span>
        </button>
        <button className="center-box border border-radius-3 w-50 py-3">
          <img src={ZaloIcon} alt="zalo" className="mr-2" width={24} />
          <span>Zalo</span>
        </button>
      </div> */}
    </>
  );
}

RegisterForm.propTypes = {
  error: PropTypes.string,
  registerContent: PropTypes.object,
  setRegisterContent: PropTypes.func,
  register: PropTypes.func,
};

export default RegisterForm;
