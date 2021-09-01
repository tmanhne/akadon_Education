import React from "react";
import FaqImg from "../../../assets/images/faq-bg.png";
import FaqTutor from "../../Faq/FaqpTutor";
import FaqStudent from "../../Faq/FaqStudent";
import "./index.scss";

const Faq = ({ user }) => {
  return (
    <>
      {/* BANNER AND HEADER */}
      <div
        className=" flex-box justify-content-center align-items-start  w-100 pb-90px"
        id="faq"
      >
        <div>
          <h1 className="font-weight-bold sub-text mb-4 py-4">FAQ</h1>
        </div>
      </div>
      <div className="faq-common d-flex flex-row-reverse justify-content-center mx-auto">
        <img src={FaqImg} alt="faq" />
        <div className="faq-common__content mb-5 px-3 flex-grow">
          {user === "student" ? <FaqStudent /> : <FaqTutor />}
        </div>
      </div>
    </>
  );
};

export default Faq;
