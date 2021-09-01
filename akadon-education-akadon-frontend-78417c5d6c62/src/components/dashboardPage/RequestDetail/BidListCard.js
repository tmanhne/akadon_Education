import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, UncontrolledCollapse } from "reactstrap";
import PropTypes from "prop-types";

import NewBidIcon from "../../../assets/icons/new-bid-icon.svg";
import CurrencyFormat from "../../utils/CurrencyFormat";
import BidDetail from "./BidDetail";
import UserBox from "../../utils/UserBox";
import FormatTimestamp from "../../utils/FormatTimestamp";

const BidListCard = ({ bidList, request }) => {
  // LOCAL STATE DECLARATIONS
  const [collapse, setCollapse] = useState([]);

  // FUNCTION DECLARATIONS
  const handleCollapse = (id) => {
    if (collapse.indexOf(id) === -1) {
      setCollapse([...collapse, id]);
    } else {
      let newCollapse = [...collapse];
      newCollapse[collapse.indexOf(id)] = "";
      setCollapse(newCollapse);
    }
  };

  return (
    <>
      {bidList.map((b) => {
        const feeStatus = b.fee - request.fee;
        const tutor = b.tutor || {};
        const { priority, avatar, name, rating } = tutor;
        return (
          <Card
            className={`${
              priority > 0 && "pro-shadow"
            } bid-item border-radius-2 position-relative px-3 pt-12px pb-12px mb-12px`}
            key={b.id}
          >
            {/* BID HEADER BLOCK */}
            <div className="flex-box">
              <div
                className="text-bold1 text-center mr-3 flex-shrink-1"
                style={{ flexBasis: "5rem" }}
              >
                <FormatTimestamp timestamp={b.created_datetime} />
              </div>
              <UserBox
                avatar={avatar}
                width={56}
                height={56}
                name={name}
                rate={rating}
                priority={priority}
              />
              <div
                className={`${
                  feeStatus > 0
                    ? "text-danger"
                    : feeStatus < 0
                    ? "text-hightlight3"
                    : "text-hightlight"
                } h5 flex-grow text-center mb-0 text-bold2`}
              >
                <CurrencyFormat value={b.fee} />
                {feeStatus !== 0 && (
                  <FontAwesomeIcon
                    className="ml-2 mb-2"
                    icon={[
                      "fas",
                      `${feeStatus < 0 ? "caret-down" : "caret-up"}`,
                    ]}
                  />
                )}
              </div>
              <div
                onClick={() => handleCollapse(b.id)}
                id={`bid-id-${b.id}`}
                className="bid-detail-btn main-btn px-3 border-radius-2 center-box shadow-btn-hover"
              >
                {collapse.indexOf(b.id) === -1 ? (
                  <FontAwesomeIcon
                    className="h4 mb-0"
                    icon={["fal", "angle-down"]}
                  />
                ) : (
                  <FontAwesomeIcon
                    className="h4 mb-0"
                    icon={["fal", "angle-up"]}
                  />
                )}
              </div>
            </div>

            {/* BID DETAIL */}
            <UncontrolledCollapse toggler={`bid-id-${b.id}`}>
              <BidDetail bid={b} request={request} />
            </UncontrolledCollapse>

            {/* READ FLAG SIGN */}
            {!b.read_flg && (
              <div
                className="position-absolute"
                style={{ top: "-0.25rem", left: "-0.5rem" }}
              >
                <img src={NewBidIcon} alt="teacher medal" width={48} />
              </div>
            )}
          </Card>
        );
      })}
    </>
  );
};

BidListCard.propTypes = {
  bidList: PropTypes.array,
};

export default BidListCard;
