// Author LongHoang

import React, { useState } from "react";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Form,
  Modal,
  UncontrolledDropdown,
} from "reactstrap";
import "./index.scss";
import lessonsList from "../../../lessonsList";
import subjectList from "../../../subjectsList";
import Level from "../../utils/Level";
import Subject from "../../utils/Subject";
import RequestFormModal from "../../landingPage/modals/RequestFormModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const StudentReqBox = ({ t, data }) => {
  const [requestModal, setRequestModal] = useState({
    payload: { step: 1, lesson_time_length: "a3" },
    isOpen: false,
  });
  const [error, setError] = useState("");

  const { payload } = requestModal;
  const { subject_name, subject_level } = payload;
  // console.log(subjectList, lessonsList);

  function nextStep(e) {
    e.preventDefault();
    if (!subject_level || !subject_name) {
      setError(t("landing-page:ex_1"));
      return;
    }
    setError("");
    setRequestModal({
      isOpen: true,
      payload: { ...payload, subject_level, subject_name },
    });
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "heroFlow",
      step: 1,
      stepDetail: {
        heroFlowSubject: requestModal.payload.subject_level,
        heroFlowGrade: requestModal.payload.subject_name,
      },
    });
  }
  return (
    <>
      <Form
        onSubmit={(e) => nextStep(e)}
        className="position-relative bg-transparent px-3"
      >
        <div className="input-box flex-box flex-column">
          <UncontrolledDropdown className="flex-grow w-100 mb-3">
            <DropdownToggle
              className="bg-light text-dark flex-box w-100 user-drop"
              caret
            >
              <p className="flex-grow text-left mb-0 text-truncate">
                {subject_name ? <Subject subject={subject_name} /> : t("landing-type:text_28")}
              </p>
            </DropdownToggle>
            <DropdownMenu className="w-100 border-radius-2 py-0">
              {subjectList.map((subject, index) => (
                <DropdownItem
                  key={index}
                  onClick={() =>
                    setRequestModal({
                      ...requestModal,
                      payload: { ...payload, subject_name: subject },
                    })
                  }
                >
                  <Subject subject={subject} />
                </DropdownItem>
              ))}
            </DropdownMenu>
          </UncontrolledDropdown>

          <UncontrolledDropdown className="w-100 mb-3">
            <DropdownToggle
              className="bg-light text-dark flex-box w-100 user-drop"
              caret
            >
              <p className="flex-grow text-left mb-0">
                {subject_level ? <Level level={subject_level} /> : t("landing-type:text_29")}
              </p>
            </DropdownToggle>
            <DropdownMenu className="w-100 border-radius-2 py-0">
              {lessonsList.map((lesson, index) => (
                <DropdownItem
                  key={index}
                  onClick={() =>
                    setRequestModal({
                      ...requestModal,
                      payload: { ...payload, subject_level: lesson },
                    })
                  }
                >
                  <Level level={lesson} />
                </DropdownItem>
              ))}
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>

        <button className="mainl-btn  text-uppercase" type="submit">
          {data}

          <FontAwesomeIcon
            icon={["fas", "arrow-right"]}
            className="icon-login"
          />
        </button>
        {error && <p className="text-center mt-3 text-danger">{error}</p>}
      </Form>

      <Modal
        isOpen={requestModal.isOpen}
        centered={true}
        contentClassName="card-style p-3"
        modalClassName="request-modal"
      >
        <RequestFormModal
          t={t}
          modal={requestModal}
          setModal={setRequestModal}
        />
      </Modal>
    </>
  );
};

export default StudentReqBox;
