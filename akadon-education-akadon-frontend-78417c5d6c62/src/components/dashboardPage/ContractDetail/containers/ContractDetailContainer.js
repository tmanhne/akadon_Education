import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";

import { getRequestDetail, getBidDetail, historyEcontract } from "../../../../api";
import ContractDetail from "../ContractDetail";
import { useTranslation } from "react-i18next";

const ContractDetailContainer = ({ userType, match }) => {
  const { t } = useTranslation("toast");
  // EXTRACT PROPS
  const { requestId, bidId } = match.params;

  // LOCAL STATE DECLARATIONS
  const [request, setRequest] = useState({});
  const [bid, setBid] = useState({});
  const [changeList, setChangeList] = useState([]);
  const [loading, setLoading] = useState(true);

  // SIDE EFFECTS
  useEffect(() => {
    // 1. GET REQUEST DETAIL VIA REQUEST ID
    (async () => {
      const res = await getRequestDetail(requestId);
      setLoading(false);
      if (res.status < 400) {
        // thêm trường hợp lịch không có vì đang thiếu dữ liệu
        if(res.data.schedule){
          setRequest({
            ...res.data,
            schedule: [...res.data.schedule],
            student: { ...res.data.student },
          });
        }
        setRequest({
          ...res.data,
          student: { ...res.data.student },
        });

      } else {
        toast.error(t("toast:er_19"), {
          autoClose: false,
        });
      }
    })();
  }, [requestId]);

  useEffect(() => {
    // 2. GET BID DETAIL VIA BID ID
    (async () => {
      const res = await getBidDetail(bidId);
      setLoading(false);
      if (res.status < 400) {
        setBid({
          ...res.data,
        });
      } else {
        toast.error(t("toast:er_20"), {
          autoClose: false,
        });
      }
    })();
  }, [bidId]);

  useEffect(() => {
    (async () => {
      if (request.id) {
        const payload = { contract_id: request.id };
        const res = await historyEcontract(payload);
        if (res.status < 400) {
          setChangeList(res.data.request_change_bid || []);
        } else if (res.response) {
          toast.error(` $t("toast:er_1") ${res.response.status}`);
        }
      }
    })();
  }, [request.id]);

  return (
    <ContractDetail
      loading={loading}
      request={request}
      bid={bid}
      userType={userType}
      changeList={changeList}
      setChangeList={setChangeList}
      match={match}
    />
  );
};

const mapStateToProps = ({ user }) => {
  const { userType } = user.info;
  return { userType };
};
export default connect(mapStateToProps, null)(ContractDetailContainer);
