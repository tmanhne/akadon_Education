import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

import { getTutorReviewList } from "../../../api";
import StarDiagram from "./StarDiagram";
import RatingBox from "../RatingBox";
import FormatTimestamp from "../FormatTimestamp";
import Avatar from "../Avatar";

const FeedbackCard = ({ title }) => {
  const [feedbacks, setFeedbacks] = useState([]);
  const { t } = useTranslation("profile");

  useEffect(() => {
    (async () => {
      const res = await getTutorReviewList();

      if (res.status < 400) {
        const rawData = [...res.data].map((data) => ({
          author: data.user_name,
          star: data.star,
          text: data.comment,
          date: data.created_datetime,
          authorAvatar: data.user_avatar,
          id: data.id,
        }));
        setFeedbacks(rawData);
        return;
      }

      if (res.response) {
        toast.error(` ${t("toast:er_1")}  ${res.response.status} !`);
        return;
      }
    })();
  }, []);

  let rateDiagram = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  };

  feedbacks.map((fb) => {
    switch (fb.star) {
      case 1: {
        rateDiagram[1] += 1;
        break;
      }
      case 2: {
        rateDiagram[2] += 1;
        break;
      }
      case 3: {
        rateDiagram[3] += 1;
        break;
      }
      case 4: {
        rateDiagram[4] += 1;
        break;
      }
      case 5: {
        rateDiagram[5] += 1;
        break;
      }
      default:
        return true;
    }
    return true;
  });

  return (
    <div className="card-style border-radius-2 p-0 pb-3 mb-3">
      <h6 className="py-3 pl-3 mb-0 text-bold2">{title}</h6>
      {feedbacks.length > 0 ? (
        <>
          <div className="pb-4">
            <StarDiagram
              t={t}
              rateDiagram={rateDiagram}
              totalRate={feedbacks.length}
            />
          </div>

          {feedbacks.map((fb) => (
            <div
              key={fb.id}
              className="flex-box mb-12px pt-12px pb-12px border-bottom align-items-start"
            >
              <div className="mr-2 ml-3">
                <Avatar
                  avatar={fb.authorAvatar}
                  width={36}
                  name={fb.authorAvatar.name}
                />
              </div>
              <div>
                <div className="flex-box mb-2">
                  <span className="text-bold2 text-dark mr-1">{fb.author}</span>
                  <span className="text-grey font-weight-normal">
                    {t("feedback")}
                  </span>
                  <div className="text-small ml-2">
                    <RatingBox rate={fb.star} />
                  </div>
                </div>
                <p className="mb-2">{fb.text}</p>
                <div className="text-small-1 text-grey">
                  <FormatTimestamp timestamp={fb.date} />
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <div className="text-grey text-small text-center py-5">
          {t("empty-fb")}
        </div>
      )}
    </div>
  );
};

FeedbackCard.propTypes = {
  title: PropTypes.string,
};

export default FeedbackCard;
