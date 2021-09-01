import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link, useHistory } from "react-router-dom";
import { Modal } from "reactstrap";
import { toast } from "react-toastify";
import { toastSuccess } from "../../../module";

import "./index.scss";
import { getBidList, getRequestDetail, pushRequest } from "../../../api";
import EmptyList from "../../../assets/images/bid-list-empty.svg";
import Goback from "../../utils/Goback";
import BidListCard from "./BidListCard";
import StepRequest from "../../utils/StepRequest";
import SubLoader from "../../utils/SubLoader";
import CancleModal from "./modals/CancleModal";
import Request from "./Request";
import useOnepayResponse from "../../customHooks/useOnepayResponse";
import useFetch from "../../customHooks/useFetch";
import PushRequestModal from "../Request/OpeningRequests/PushRequestModal";
import ToastContent from "../../utils/ToastContent";
import SuccessImg from "../../../assets/images/success-image.jpg";

const RequestDetail = ({ match }) => {
  // EXTRACT PROPS
  const { requestId } = match.params;

  // COMPONENT STATES
  const [push, setPush] = useState([]);
  const [loading, setLoading] = useState([]);
  const [cancleModal, setCancleModal] = useState(false);
  const { t } = useTranslation(["request-page", "request-detail"]);

  const request =
    useFetch(getRequestDetail, setLoading, false, requestId) || {};
  const bidList =
    useFetch(getBidList, setLoading, true, { contract_id: requestId }, 1) || {};

  const paymentResponse = useOnepayResponse();
  const history = useHistory();

  // SIDE EFFECTS
  useEffect(() => {
    (async () => {
      if (paymentResponse && paymentResponse.status === "success") {
        const requestId = paymentResponse.payload.slice(1, 10) * 1;
        await handlePushRequest(requestId);
        history.push(`/dashboard/request/request-detail/${requestId}`);
      }
    })();
  }, [paymentResponse]);

  // FUNCTION DECLERATIONS
  async function handlePushRequest(requestId) {
    const res = await pushRequest({ contract_id: requestId });
    // success
    if (res.status < 400) {
      const Image = (
        <img src={SuccessImg} width={183} alt="create an request success" />
      );
      const Content = (
        <p className="mb-0 text-center">
          {t("request-detail:push_success")}
        </p>
      );
      toastSuccess(<ToastContent Image={Image} Content={Content} />);
      setPush({ ...push, isOpen: false });
      return;
    }
    // error
    if (res.response) {
      toast.error(`${t("request-detail:push_fail")} ${res.response.status} !`, {
        autoClose: false,
      });
      setPush({ ...push, isOpen: false });
      return;
    }
  }

  return (
    <>
      <div className="mb-3">
        <StepRequest step={bidList.length === 0 ? 2 : 3} />
      </div>

      <Goback />

      {loading && loading.length > 0 ? (
        <SubLoader />
      ) : (
        <div className="request-detail flex-box align-items-start mb-3">
          <div
            className="request-detail__bidlist-card"
            style={{ width: "62%" }}
          >
            <h6 className="text-bold2 text-uppercase text-dark mb-3">
              {t("detail")}
            </h6>

            {bidList.count === 0 && (
              <div className="flex-box flex-column justify-content-center mt-5">
                <img className="mb-4" src={EmptyList} alt="Empty list" />
                <p className="text-grey text-center">{t("detail-empty")}</p>
              </div>
            )}

            <BidListCard request={request} bidList={bidList.results || []} />
          </div>

          <div className="request-detail__request-card card-style border-radius-2 ml-3">
            <Request
              request={request}
              modal={setCancleModal}
              setModal={setCancleModal}
              bidList={bidList}
              setPush={setPush}
            />
          </div>
        </div>
      )}

      <Modal isOpen={cancleModal} centered={true} contentClassName="card-style">
        <CancleModal
          request={request}
          setModal={setCancleModal}
          modal={cancleModal}
        />
      </Modal>

      <Modal isOpen={push.isOpen} centered={true}  className="payMentNotify">
        <PushRequestModal
          modal={push}
          setModal={setPush}
          handlePushRequest={handlePushRequest}
          t={t}
        />
      </Modal>
    </>
  );
};

RequestDetail.propTypes = {
  match: PropTypes.object,
};

export default RequestDetail;
