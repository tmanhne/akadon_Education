import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

import "./index.scss";
import { getUserSettings, deleteSettingsField, userSettings } from "../../api";
import Goback from "../utils/Goback";
import Password from "./Password";
import PhoneNumber from "./PhoneNumber";
import Languages from "./Languages";
import Address from "./Address";
import SubLoader from "../utils/SubLoader";

function Settings({ dispatch, language }) {
  // INIT LOCAL STATES
  const initDefaultFields = {
    main_email: "",
    confirmed_email: [],
    not_confirmed_email: [],
    main_phone_number: "",
    phone_number: [],
    gender_visible: 0,
    phone_number_visible: 0,
    language: language,
  };

  // LOCAL STATE DECLARATIONS
  const [activeTab, setActiveTab] = useState("password");
  const [defaultFields, setDefaultFields] = useState(initDefaultFields);
  const [loading, setLoading] = useState(true);

  const { t } = useTranslation("setting");

  // SIDE EFFECTS
  useEffect(() => {
    getDefaultSettings();
  }, []);

  // EXTRACT PROPS
  const phone_number = defaultFields.main_phone_number;
  const phoneList = defaultFields.phone_number;
  const defaultAddress = {
    city: defaultFields.city,
    district: defaultFields.district,
    ward: defaultFields.ward,
    street: defaultFields.apartment,
  };

  const settingFields = [
    { text: t("header-1"), id: "password", component: <Password /> },
    {
      text: t("header-2"),
      id: "phone-number",
      component: (
        <PhoneNumber
          deletePhone={deletePhone}
          phone_number={phone_number}
          phoneList={phoneList}
        />
      ),
    },
    {
      text: t("header-3"),
      id: "address",
      component: (
        <Address
          submitAddress={submitAddress}
          defaultAddress={defaultAddress}
        />
      ),
    },
    {
      text: t("header-4"),
      id: "language",
      component: (
        <Languages submitLanguage={submitLanguage} defaultLanguage={language} />
      ),
    },
  ];

  // FUNCTION DECLARATIONS
  async function deletePhone(phone_number) {
    const res = await deleteSettingsField({ phone_number });
    if (res.status < 400) {
      toast.success(t("success-3"));
      getDefaultSettings();
    } else if (res.response) {
      toast.error(`Error no-${res.response.status}`);
    }
  }

  async function getDefaultSettings() {
    const res = await getUserSettings();
    setLoading(false);

    if (res.status < 400) {
      setDefaultFields({ ...initDefaultFields, ...res.data });
    } else if (res.response) {
      toast.error(`Error no-${res.response.status} !`);
    }
  }

  async function submitLanguage(e, isChange, language) {
    e.preventDefault();
    if (isChange) return;

    setLoading(true);
    const res = await userSettings({ language });
    setLoading(false);

    if (res.status < 400) {
      toast.success(t("success-1"));
      dispatch({ type: "SET_LANGUAGE", language });
      localStorage.setItem("language", language);
      getDefaultSettings();
      return;
    }
    if (res.response) {
      toast.error(`Error no-${res.response.status} !`);
    }
  }

  async function submitAddress(e, isChange, payload) {
    e.preventDefault();
    if (isChange) return;

    setLoading(true);
    const res = await userSettings(payload);
    setLoading(false);

    if (res.status < 400) {
      toast.success(t("success-2"));
      getDefaultSettings();
      return;
    }
    if (res.response) {
      toast.error(`Error no-${res.response.status} !`);
    }
  }

  return (
    <>
      <Goback />
      <div className="setting-page card-style p-0 border-radius-2 flex-box align-items-stretch">
        <Nav
          tabs
          className="setting-page__sidebar pt-4 flex-box flex-column justify-content-start"
        >
          {settingFields.map((field) => (
            <NavItem
              className={`d-block w-100 mb-4 ${
                activeTab === field.id && "tab-active"
              }`}
              key={field.id}
            >
              <NavLink
                onClick={() => setActiveTab(field.id)}
                className="text-dark py-0 px-4"
              >
                {field.text}
              </NavLink>
            </NavItem>
          ))}
        </Nav>

        <TabContent
          className="setting-page__content flex-grow p-4"
          activeTab={activeTab}
        >
          {loading ? (
            <SubLoader />
          ) : (
            settingFields.map((field) => (
              <TabPane key={field.id} tabId={field.id}>
                {field.component}
              </TabPane>
            ))
          )}
        </TabContent>
      </div>
    </>
  );
}

const mapStateToProps = ({ appConfig }) => {
  const { language } = appConfig;
  return { language };
};
export default connect(mapStateToProps, null)(Settings);
