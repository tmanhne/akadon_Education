import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Table, Modal } from "reactstrap";
import { useTranslation } from "react-i18next";

import "./index.scss";
import { getLessonPaymentList, paymentDetailLesson } from "../../../api";
import Goback from "../../utils/Goback";
import SubLoader from "../../utils/SubLoader";
import useFetch from "../../customHooks/useFetch";
import Remind from "./modals/Remind";
import Success from "./modals/Success";
import Fail from "./modals/Fail";
import useOnepayResponse from "../../customHooks/useOnepayResponse";
import ViewDetail from "./modals/ViewDetail";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

export default function CoursePayment({ match }) {
  // EXTRACT PROPS
  const { contractId } = match.params;
  const history = useHistory();

  // lOCAL STATE DECLARATIONS
  const [loading, setLoading] = useState([]);
  const [paymentModal, setPaymentModal] = useState({
    payload: null,
    isOpen: false,
  });
  const [successModal, setSuccessModal] = useState(false);
  const [failModal, setFailModal] = useState(false);
  const [lessons, setLessons] = useState([]);
  const [invoice, setInvoice] = useState({ isOpen: false, dataPay: {} });

  const fetchedLessons =
    useFetch(getLessonPaymentList, setLoading, false, contractId) || [];
  const paymentResponse = useOnepayResponse();

  const { t } = useTranslation(["payment", "common"]);

  // SIDE EFFECTS
  useEffect(() => {
    if (paymentResponse && paymentResponse.status === "success") {
      const lesson_id = paymentResponse.payload.slice(1, 10) * 1;
      const updatedLessons = lessons.map((lesson) => {
        if (lesson.id === lesson_id) {
          return { ...lesson, is_paid: true };
        }
        return { ...lesson };
      });
      setLessons([...updatedLessons]);
      setSuccessModal(true);
      const { pathname } = history.location;
      history.push(pathname);
    }
    if (paymentResponse && paymentResponse.status === "fail") {
      setFailModal(true);
    }
  }, [paymentResponse]);

  useEffect(() => {
    setLessons(fetchedLessons);
  }, [fetchedLessons]);

  const handleInvoice = async (payload) => {
    // Active loading
    const loadingId = uuidv4();
    setLoading((prevLoading) => [...prevLoading, loadingId]);

    const res = await paymentDetailLesson({ lesson_id: payload });

    // Disable loading
    setLoading((prevLoading) => {
      const updateLoading = prevLoading.filter((ld) => ld !== loadingId);
      setLoading([...updateLoading]);
    });

    if (res.status < 400) {
      setInvoice({
        ...invoice,
        dataPay: res.data,
        isOpen: true,
      });
    } else if (res.response) {
      toast.error(` ${t("toast:er_27")}  ${res.response.status}`, {
        autoClose: false,
      });
    }
  };

  return (
    <div className="flex-grow flex-box flex-column w-100 align-items-stretch">
      <Goback />

      <div className="card-style py-3 px-0 flex-grow mb-3">
        <h5 className="mb-4 pl-3 text-bold2">{t("detail-title")}</h5>
        {loading && loading.length > 0 ? (
          <SubLoader />
        ) : (
          <Table borderless>
            <thead>
              <tr>
                <th className="text-grey text-bold2 text-center border-bottom pb-3">
                  {t("common:lesson-no")}
                </th>
                <th className="text-grey text-bold2 text-center border-bottom pb-3">
                  {t("date")}
                </th>
                <th className="text-grey text-bold2 text-center border-bottom pb-3">
                  {t("common:status")}
                </th>
                <th className="text-grey text-bold2 text-center border-bottom pb-3">
                  {t("common:action")}
                </th>
              </tr>
            </thead>
            <tbody>
              {lessons.length === 0 && (
                <tr>
                  <td className="text-grey text-center" colSpan={4}>
                    {t("no-lesson-message")}
                  </td>
                </tr>
              )}
              {lessons.map((lesson) => {
                const time = lesson.start_time
                  ? lesson.start_time.split(":").slice(0, 2).join(":")
                  : "00:00";
                return (
                  <tr key={lesson.lesson_no}>
                    <td className="text-bold2 align-middle text-center border-bottom">
                      {t("common:lesson")} {lesson.lesson_no + 1}
                    </td>
                    <td className="align-middle text-center border-bottom">
                      <div className="date-time-box border-radius-1 d-inline-block mx-auto px-3">
                        {time + " - " + lesson.lesson_date}
                      </div>
                    </td>
                    <td className="align-middle text-center border-bottom">
                      {lesson.is_paid ? (
                        <div className="on-paid py-1 text-bold1 px-3 border-radius-1 d-inline-block mx-auto">
                          {t("status-1")}
                        </div>
                      ) : (
                        <div className="on-loan py-1 text-bold1 px-3 border-radius-1 d-inline-block mx-auto">
                          {t("status-2")}
                        </div>
                      )}
                    </td>
                    <td className="align-middle text-center border-bottom">
                      {lesson.is_paid ? (
                        <div
                          onClick={() => handleInvoice(lesson.id)}
                          className="main-btn d-inline-block py-1 px-3 "
                        >
                          {t("view_detail")}
                        </div>
                      ) : (
                      
                        <button
                          onClick={() =>
                            setPaymentModal({ payload: lesson, isOpen: true })
                          }
                          className="main-btn py-1 px-3 bg-hightlight text-bold1"
                        >
                          {t("pay")}
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        )}
      </div>

      <Modal
        isOpen={paymentModal.isOpen}
        centered={true}
        contentClassName="card-style p-0"
      >
        <Remind
          contractId={contractId}
          modal={paymentModal}
          setModal={setPaymentModal}
          t={t}
        />
      </Modal>

      <Modal
        isOpen={successModal}
        centered={true}
        contentClassName="card-style"
      >
        <Success setModal={setSuccessModal} t={t} />
      </Modal>

      <Modal
        isOpen={invoice.isOpen}
        centered={true}
        contentClassName="card-style p-0"
      >
        <ViewDetail setModal={setInvoice} modal={invoice.dataPay} />
      </Modal>

      <Modal isOpen={failModal} centered={true} contentClassName="card-style">
        <Fail t={t} setModal={setFailModal} />
      </Modal>
    </div>
  );
}
