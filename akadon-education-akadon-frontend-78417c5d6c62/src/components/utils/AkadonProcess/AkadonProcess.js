import React from "react";
import { Trans } from "react-i18next";

import "./index.scss";
import Img0 from "../../../assets/icons/akadon-process-img-1.png";
import Img1 from "../../../assets/icons/akadon-process-img-2.png";
import Img2 from "../../../assets/images/note2hand.png";
import Img3 from "../../../assets/images/note3negot.png";
import Img4 from "../../../assets/images/note4econtract.png";
import Img5 from "../../../assets/images/note5learn.png";
import Img6 from "../../../assets/images/note6pay.png";

export default function AkadonProcess({ t }) {
  const process = [
    {
      num: 1,
      title: t("block_0_step_1"),
      content: (
        <Trans
          i18nKey="landing-page:block_0_step_1_text"
          components={{
            a: (
              <a href="/"  target="_blank" style={{ textDecoration: "underline" }} />
            ),
          }}
        />
      ),
      img: Img1,
    },
    {
      num: 2,
      title: t("block_0_step_2"),
      content: t("block_0_step_2_text"),
      img: Img2,
    },
    {
      num: 3,
      title: t("block_0_step_3"),
      content: t("block_0_step_3_text"),
      img: Img3,
    },
    {
      num: 4,
      title: t("block_0_step_4"),
      content: t("block_0_step_4_text"),
      img: Img4,
    },
    {
      num: 5,
      title: t("block_0_step_5"),
      content: (
        <Trans
          i18nKey="landing-page:block_0_step_5_text"
          components={{
            a: (
              <a href="/"  target="_blank" style={{ textDecoration: "underline" }} />
            ),
          }}
        />
      ),
      img: Img5,
    },
    {
      num: 6,
      title: t("block_0_step_6"),
      content: t("block_0_step_6_text"),
      img: Img6,
    },
  ];

  return (
    <div className="d-flex flex-row justify-content-between flex-wrap w-100">
      {process.map((procestep, index) => (
        <div
          className="process-box border-radius-2 mt-2 mb-3 pt-3 bg-light position-relative"
          key={index}
        >
          <div className="title-box flex-box flex-column">
            <p className="numb mx-auto text-center h5 mb-0 font-weight-bold text-light bg-hightlight rounded-circle">
              {procestep.num}
            </p>

            <p className="text-uppercase m-1 mt-12px mb-2 text-bold2">
              {procestep.title}
            </p>
          </div>

          <p className="content-box ml-1 mr-1 text-bold1">
            {procestep.content}
          </p>

          {index === 0 ? (
            <div className="position-absolute absolute-box flex-box justify-content-between">
              <img src={Img1} width={30} alt="step 1" />
              <img src={Img0} width={30} alt="step 1" />
            </div>
          ) : (
            <img
              src={procestep.img}
              className="position-absolute absolute-img"
              alt="akadon step"
            />
          )}
        </div>
      ))}
    </div>
  );
}
