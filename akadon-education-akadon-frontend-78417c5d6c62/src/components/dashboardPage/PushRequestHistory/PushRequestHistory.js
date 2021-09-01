import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Table } from "reactstrap";
import { pushContractHistory } from "../../../api";
import CurrencyFormat from "../../utils/CurrencyFormat";
import FilterDayPicker from "../../utils/Filter/FilterDayPicker";
import FilterFee from "../../utils/Filter/FilterFee";
import FormatTimestamp from "../../utils/FormatTimestamp";
import Goback from "../../utils/Goback";
import PushCountDown from "./PushCountDown";
import PushHistoryFilter from "./PushHistoryFilter";
import { useTranslation } from "react-i18next";

const PushRequestHistory = ({ match }) => {
  
const { t } = useTranslation("toast");
  // EXTRACT PROPS
  const { contractId } = match.params;

  // INIT LOCAL STATES
  const initFilter = {
    expiredList: [],
    subjectList: [],
  };

  // LOCAL STATE DELCARATIONS
  const [push, setPush] = useState([]);
  const [filter, setFilter] = useState(initFilter);
  const [feeRange, setFeeRange] = useState();
  const [dateRange, setDateRange] = useState();

  let filterKeys = generateFilterKeys();
  let dataToRender = push;

  // CALCULATE MAXFEE
  let maxFee = 100000;
  if (push.length > 0) {
    push.map((bid) => {
      if (bid.fee > maxFee) {
        maxFee = bid.fee;
      }
    });
  }

  // SIDE EFFECTS
  useEffect(() => {
    (async () => {
      const res = await pushContractHistory({ contract_id: contractId });
      if (res.status < 400) {
        setPush([...res.data]);
      } else if (res.response) {
        toast.error(` ${t("toast:er_1")}  ${res.response.status}`);
      }
    })();
  }, [contractId]);

  useEffect(() => {
    const filterData = generateFilterKeys(push);
    setFilter(filterData);
  }, [push]);

  // FUNCTION DECLARATIONS
  (function filterImplementation() {
    // Everytime filter state update => Update things to render
    dataToRender = push.filter((data) => {
      const isSubject = filter.subjectList.includes(data.subject_name);

      const currentDateTime = new Date().getTime();
      const distance =
        new Date(data.expired_datetime).getTime() - currentDateTime;
      const remainDay = Math.ceil(distance / (1000 * 60 * 60 * 24));
      const isEpired = filter.expiredList.includes(
        remainDay > 0 ? remainDay : 0
      );

      let isFee = true;
      if (feeRange) {
        isFee = data.pay_fee >= feeRange.min && data.pay_fee <= feeRange.max;
      }

      let isDate = true;
      if (dateRange) {
        const startTime = new Date(dateRange.from).getTime();
        const endTime = new Date(dateRange.to).getTime();
        const time = new Date(data.created_datetime).getTime();
        isDate = time >= startTime && time <= endTime;
      }

      return isSubject && isEpired && isDate && isFee;
    });
  })();

  function generateFilterKeys() {
    // GENERATE DATA FOR FILTERING
    // 1. Create data for PreAcceptTableHead to render
    // 2. Create data for filter implementation
    let dateList = [],
      expiredList = [],
      subjectList = [],
      feeList = [];

    push.map((d) => {
      dateList.push(d.created_datetime);
      subjectList.push(d.subject_name);
      feeList.push(d.pay_fee);

      const currentDateTime = new Date().getTime();
      const distance = new Date(d.expired_datetime).getTime() - currentDateTime;
      const remainDay = Math.ceil(distance / (1000 * 60 * 60 * 24));
      expiredList.push(remainDay > 0 ? remainDay : 0);
    });

    // Remove duplicate items
    subjectList = [...new Set(subjectList)];
    expiredList = [...new Set(expiredList)].sort((a, b) => b + a);
    return {
      subjectList,
      expiredList,
    };
  }

  function handleFiltering(filterObj) {
    // Listening onChange events, and update filter state
    const keyName = filterObj.key;
    const value = filterObj.str;
    const isKeyExist = filter[keyName].includes(value);

    if (isKeyExist) {
      const updatedFilter = filter[keyName].filter((key) => key !== value);
      setFilter({ ...filter, [keyName]: [...updatedFilter] });
    } else {
      setFilter({ ...filter, [keyName]: [...filter[keyName], value] });
    }
  }

  return (
    <>
      <Goback />
      <h6 className="text-bold2 mb-0 text-uppercase">Payment history</h6>
      <div style={{ minHeight: "400px" }}>
        <Table borderless className="push-history w-100">
          <PushHistoryFilter
            filter={filter}
            filterKeys={filterKeys}
            handleFiltering={handleFiltering}
            FilterDate={
              <FilterDayPicker
                dateRange={dateRange}
                setDateRange={setDateRange}
              />
            }
            FilterFee={
              <FilterFee
                maxFee={maxFee}
                feeRange={feeRange}
                setFeeRange={setFeeRange}
              />
            }
          />
          <tbody className="course-request card-style p-0 ">
            {push.length === 0 && (
              <tr className="text-center text-grey">
                <td colSpan={5}>Hiện tại chưa có yêu cầu để hiển thị !</td>
              </tr>
            )}
            {dataToRender.length === 0 && push.length > 0 && (
              <tr className="text-center text-grey">
                <td colSpan={6}>Không tìm thấy nội dung phù hợp !</td>
              </tr>
            )}
            {dataToRender.map((p, index) => (
              <tr key={index}>
                <td className="text-center py-2">
                  <FormatTimestamp timestamp={p.created_datetime} />
                </td>
                <td className="text-center py-2">{p.subject_name}</td>
                <td className="text-center py-2 text-hightlight text-bold2">
                  <PushCountDown expireDate={p.expired_datetime} />
                </td>
                <td className="text-center py-2">
                  <CurrencyFormat value={p.pay_fee} />
                </td>
                <td className="text-center py-2">
                  <Link
                    to=""
                    className="main-btn text-bold1 text-decoration-none px-4 text-nowrap"
                  >
                    View invoice
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default PushRequestHistory;
