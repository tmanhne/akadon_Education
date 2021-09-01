import React, { useState } from "react";
import { Modal } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { chatReport } from "../../api";
import ErrorHandler from "../ErrorHandler";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const ChatReportModal = ({ modal, setModal, room }) => {
  const { t } = useTranslation(["toast", "chat"]);
  const [reportType, setReportType] = useState({});
  const [subReport, setSubReport] = useState("");
  const [error, setError] = useState({ path: "", message: "" });
  const data = [
    {
      id: 0,
      title: t("chat:reason_1"),
      subs: [],
    },
    {
      id: 1,
      title: t("chat:reason_2"),
      subs: [],
    },
    {
      id: 3,
      title: t("chat:reason_3"),
      subs: [
        t("chat:reason_4"),
        t("chat:reason_5"),
        t("chat:reason_6"),
      ],
    },
    {
      id: 4,
      title: t("chat:reason_7"),
      subs: [
        t("chat:reason_8"),
        t("chat:reason_9"),
        t("chat:reason_10"),
      ],
    },
    {
      id: 2,
      title: t("chat:reason_11"),
      subs: [],
    },
  ];
  const handleReport = async () => {
    // 1. CHECK REPORT IS EXIST
    // 2. CHECK SUBREPORT IS EXIST
    // 3. CLEAR ERROR IF EVERYTHING ALREADY
    // 4. API CALL
    if (!reportType.title) {
      setError({
        path: "main-report",
        message: t("chat:err_1"),
      });
      return true;
    }

    if (reportType.subs.length > 0 && subReport === "") {
      setError({
        path: "sub-report",
        message: t("chat:err_2"),
      });
      return true;
    }
    setError({});
    const payload = {
      report_type: reportType.id,
      description: subReport || "",
      room: room.room_name,
    };
    const res = await chatReport(payload);
    if (res.status < 400) {
      toast.success(t("chat:err_3"));
      setModal(false);
    } else if (res.response) {
      toast.error(` ${t("toast:er_1")} ${res.response.status}`, {
        autoClose: false,
      });
    }
  };
  return (
    <Modal
      isOpen={modal}
      contentClassName="card-style p-0"
      className="chat-report-modal"
    >
      <div className="chat-page__report-modal card-style px-0">
        <div className="flex-box align-items-center border-bottom px-3 pb-2 mb-2">
          <h6
            className="text-bold2 flex-grow mb-0"
            style={{ fontSize: "1.2rem" }}
          >
            {t("chat:report_text_1")}
          </h6>
          <FontAwesomeIcon
            onClick={() => setModal(false)}
            className="text-grey h5 mb-0"
            icon={["fal", "times"]}
          />
        </div>
        <div className="flex-box align-items-start px-3 mb-3">
          <FontAwesomeIcon
            className="h5 mb-0 mr-2"
            style={{ color: "#FFD764" }}
            icon={["fas", "exclamation-triangle"]}
          />
          <p className="text-grey mb-0">{t("chat:report_text_2")}</p>
        </div>
        <div
          style={{ marginBottom: "36px" }}
          className="flex-box flex-wrap pl-5 pr-3"
        >
          {data.map((d) => (
            <div
              onClick={() => setReportType({ ...d })}
              style={{
                background: `${
                  reportType.title === d.title ? "#0367B4" : "#EAF4FC"
                }`,
                borderRadius: "60px",
                cursor: "pointer",
              }}
              className={`border px-3 py-2 mr-2 mb-12px ${
                reportType.title === d.title ? "text-light" : "text-dark"
              }`}
              key={d.title}
            >
              {d.title}
            </div>
          ))}
        </div>
        {error.path === "main-report" && (
          <div className="text-center mb-3" style={{ marginTop: "-36px" }}>
            <ErrorHandler error={error.message} />
          </div>
        )}
        {reportType.subs && reportType.subs.length > 0 ? (
          <>
            <p className="mb-3 text-dark pl-5">{t("chat:report_text_3")}</p>
            <div
              style={{ marginBottom: "36px" }}
              className="flex-box flex-wrap pl-5 pr-3"
            >
              {reportType.subs.map((sub) => (
                <div
                  onClick={() => setSubReport(sub)}
                  style={{
                    background: `${subReport === sub ? "#0367B4" : "#EAF4FC"}`,
                    borderRadius: "60px",
                    cursor: "pointer",
                  }}
                  className={`border px-3 py-2 mr-2 mb-12px ${
                    subReport === sub ? "text-light" : "text-dark"
                  }`}
                  key={sub}
                >
                  {sub}
                </div>
              ))}
            </div>
          </>
        ) : (
          ""
        )}
        {error.path === "sub-report" && (
          <div className="text-center mb-3" style={{ marginTop: "-36px" }}>
            <ErrorHandler error={error.message} />
          </div>
        )}
        <div className="border-top px-3 pt-3 pb-2">
          <div
            onClick={handleReport}
            style={{ maxWidth: "15rem" }}
            className="main-btn ml-auto text-light"
          >
            {t("chat:report")}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ChatReportModal;
