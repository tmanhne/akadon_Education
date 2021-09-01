// Author LONG

import React from "react";
import { useTranslation } from "react-i18next";
import { Card, CardBody } from "reactstrap";

import FeesPro from "../../../assets/icons/feepro.png";
import FeesBasic from "../../../assets/icons/feesbasic.png";
import FeesStand from "../../../assets/icons/feestand.png";
import orange from "../../../assets/icons/landcostorange.svg";
import purple from "../../../assets/icons/landcostpurple.svg";

import AccountType from "../../CostPage/AccountType";
import Capable from "../../CostPage/Capable";
import SpecDetailTutor from "../../CostPage/SpecDetailTutor";

import SpecDetail from "../../CostPage/SpecDetail";
import "./index.scss";

function Cost({
  basicFeatures,
  standardFeatures,
  proFeatures,
  capheadtutor,
  capabletutor,
  feeBa,
  feeStand,
  feePro,
  capable,
  caphead,
  blue,
  title,
}) {
  const { t } = useTranslation(["landing-page"]);

  return (
    <>
      <div className="d-flex flex-column cost-common" id="chiphi">
        <div className="title-content text-center d-flex border-radius-2">
          <h2 className="font-weight-bold">{title}</h2>
        </div>
        {capable ? (
          <Card className="border-0 cad-content">
            <CardBody className="p-0 mt-4 d-flex flex-column">
              <Capable capable={capable} caphead={caphead} />
              <SpecDetail check={blue} t={t} />
            </CardBody>
          </Card>
        ) : (
          <Card className="border-0 cost-common__cad-content">
            <CardBody className="p-0 mt-5 d-flex flex-wrap justify-content-center">
              <div className="w-100 d-flex flex-wrap justify-content-center">
                <AccountType
                  features={basicFeatures}
                  title={t("block_8_header_1")}
                  check={purple}
                  color="#8A88F3"
                  icon={FeesBasic}
                  feekind={feeBa}
                />
                <AccountType
                  features={standardFeatures}
                  title={t("block_8_header_2")}
                  check={orange}
                  color="#FF6D34"
                  icon={FeesStand}
                  feekind={feeStand}
                />
                <AccountType
                  features={proFeatures}
                  title={t("block_8_header_3")}
                  check={blue}
                  color="#0367B4"
                  icon={FeesPro}
                  feekind={feePro}
                />
              </div>

              <Capable capable={capabletutor} caphead={capheadtutor} />
              <SpecDetailTutor check={blue} t={t} />
            </CardBody>
          </Card>
        )}
      </div>
    </>
  );
}

export default Cost;
