import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { Table } from "reactstrap";

import { getEcontract } from "../../../api";
import {useQuery} from "../../../module";
import EyesIcon from "../../../assets/icons/eye-icon.svg";
import FilterDayPicker from "../../utils/Filter/FilterDayPicker";
import FilterFee from "../../utils/Filter/FilterFee";
import FormatTimestamp from "../../utils/FormatTimestamp";
import UserBox from "../../utils/UserBox";
import FeeBox from "../../utils/FeeBox";
import TableHead from "./TableHead";
import SubLoader from "../../utils/SubLoader";

import { useTranslation } from "react-i18next";
function PreAccept({ userType }) {
  const { t } = useTranslation("toast");
  // INIT LOCAL STATES
  const initFilter = {
    subjectList: [],
    levelList: [],
    statusList: [],
  };

  // LOCAL STATE DECLARATIONS
  const [preAcceptRequests, setPreAcceptRequests] = useState([]);
  const [filter, setFilter] = useState(initFilter);
  const [dateRange, setDateRange] = useState();
  const [feeRange, setFeeRange] = useState();
  const [loading, setLoading] = useState(true);

  const query = useQuery();
  const type = query.get("type");

  let filterKeys = generateFilterKeys();
  let requestsToRender = preAcceptRequests;
  const url =
    userType === "student"
      ? "/dashboard/request/"
      : "/dashboard-tutor/request/";

  // CALCULATE MAXFEE
  let maxFee = 10001;
  if (preAcceptRequests.length > 0) {
    preAcceptRequests.map((r) => {
      if (r.fee > maxFee) {
        maxFee = r.bid_fee;
      }
    });
  }

  // SIDE EFFECTS
  useEffect(() => {
    if (type === "pre-accept" && preAcceptRequests.length === 0) {
      getPreAcceptRequests();
    }
  }, [type]);

  useEffect(() => {
    const filterData = generateFilterKeys();
    setFilter(filterData);
  }, [preAcceptRequests]);

  // FUNCTION DECLARATIONS
  async function getPreAcceptRequests() {
    const user_role = userType === "student" ? 0 : 1;
    const res = await getEcontract(user_role, 2);
    setLoading(false)

    if (res.status < 400) {
      const rawData = [...res.data.results];
      setPreAcceptRequests(rawData);
    } else if (res.response) {
      toast.error(` ${t("toast:er_1")}  ${res.response.status} !`);
    }
  }

  function generateFilterKeys() {
    // GENERATE DATA FOR FILTERING
    // 1. Create data for PreAcceptTableHead to render
    // 2. Create data for filter implementation
    let subjectList = [],
      levelList = [],
      statusList = [];

    preAcceptRequests.map((r) => {
      subjectList.push(r.subject_name);
      levelList.push(r.subject_level);
      statusList.push(r.status);
    });

    // Remove duplicate items
    subjectList = [...new Set(subjectList)];
    levelList = [...new Set(levelList)];
    statusList = [...new Set(statusList)];

    return {
      subjectList,
      levelList,
      statusList,
    };
  }

  function handleFiltering(filterObj) {
    // FILTERING IMPLEMENTATIONS
    // 1. Listening onChange events
    // 2. Update filter state
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

  (function filterImplementation() {
    // Everytime filter state update => Update things to render
    requestsToRender = preAcceptRequests.filter((r) => {
      const isSubject = filter.subjectList.includes(r.subject_name);
      const isLevel = filter.levelList.includes(r.subject_level);
      const isStatus = filter.statusList.includes(r.status);

      let isDate = true;
      if (dateRange) {
        const startTime = new Date(dateRange.from).getTime();
        const endTime = new Date(dateRange.to).getTime();
        const time = new Date(r.created_datetime).getTime();
        isDate = time >= startTime && time <= endTime;
      }

      let isFee = true;
      if (feeRange) {
        isFee = r.bid_fee >= feeRange.min && r.bid_fee <= feeRange.max;
      }

      return isDate && isSubject && isLevel && isStatus && isFee;
    });
  })();

  if (loading) {
    return <SubLoader />
  }

  return (
    <div className="table-wraper">
      <Table className="econtract-list__pre-accept">
        <TableHead
          filter={filter}
          handleFiltering={handleFiltering}
          filterKeys={filterKeys}
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
        <tbody>
          {preAcceptRequests.length === 0 && (
            <tr className="text-center text-grey">
              <td colSpan={6}>Hiện tại chưa có yêu cầu để hiển thị !</td>
            </tr>
          )}
          {requestsToRender.length === 0 && preAcceptRequests.length > 0 && (
            <tr className="text-center text-grey">
              <td colSpan={6}>Không tìm thấy nội dung phù hợp !</td>
            </tr>
          )}
          {requestsToRender.map((r) => {
            const read_flag = (r.read_flag === true || r.read_flag === false) ? r.read_flag : true;
            return (
              <tr key={r.id} className={read_flag ? "" : "read-flag"}>
                <td className="align-middle text-center">
                  <FormatTimestamp timestamp={r.created_datetime} />
                </td>
                <td className="align-middle text-center">{r.subject_name}</td>
                <td className="align-middle text-center">{r.subject_level}</td>
                <td className="align-middle text-center">
                  <FeeBox fee={r.request_fee} bidFee={r.bid_fee} />
                </td>
                <td className="user-box align-middle text-center">
                  <UserBox
                    width={36}
                    height={36}
                    name={
                      userType === "student" ? r.tutor_name : r.student_name
                    }
                    avatar={
                      userType === "student" ? r.tutor_avatar : r.student_avatar
                    }
                    rate={
                      userType === "student" ? r.tutor_rating : r.student_rating
                    }
                  />
                </td>
                <td className="align-middle text-center">
                  <div className="status text-small text-nowrap text-hightlight p-1 border-radius-1">
                    Đang thương lượng
                  </div>
                </td>
                <td className="align-middle text-center">
                  <Link
                    to={`${url}${r.id}/${r.bid_id}`}
                    className="cursor-pointer btn p-0"
                  >
                    <img width={32} src={EyesIcon} alt="go detail" />
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

PreAccept.propTypes = { userType: PropTypes.string };

export default PreAccept;
