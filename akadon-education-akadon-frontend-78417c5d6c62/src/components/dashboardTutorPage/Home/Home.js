import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Modal } from "reactstrap";
import { Link } from "react-router-dom";

import "./index.scss";
import { getRequestList } from "../../../api";
import RequestCard from "./RequestCard";
import RequestDetailModal from "./RequestDetailModal";
import TutorBanner from "./TutorBanner";
import ProcessBox from "../../utils/ProcessBox/ProcessBox";
import UpgradeCard from "./UpgradeCard";
import SubLoader from "../../utils/SubLoader";
import useFetch from "../../customHooks/useFetch";
import titlerequest from "../../../assets/icons/titlerequest.svg";

const Home = () => {
  const [detailModal, setDetailModal] = useState({
    payload: null,
    isOpen: false,
  });
  const [loading, setLoading] = useState([]);

  const { t } = useTranslation(["home-page", "common"]);

  const requests = useFetch(getRequestList, setLoading, true) || [];

  if (loading && loading.length > 0) {
    return <SubLoader />;
  }

  return (
    <>
      <TutorBanner />
      <div className="dashboard-tutor-home mb-3">
        <ProcessBox />

        <div className="dashboard-tutor-home__request mb-3">
          <div className="flex-box header-box mb-3">
            <div className="h5 mb-0">
              <img className="mr-2" src={titlerequest} alt="title" />{" "}
              {t("block-1-tutor")}
            </div>
            <Link
              to="/dashboard-tutor/requests-list"
              className="main-btn bg-hightlight px-3 text-nowrap"
            >
              {t("common:view-all")}
            </Link>
          </div>
          <div className="flex-box content-box">
            {requests.results ? (
              requests.results
                .slice(0, 4)
                .map((data) => (
                  <RequestCard
                    key={data.id}
                    request={data}
                    setDetailModal={setDetailModal}
                  />
                ))
            ) : (
              <p className="text-center text-grey">
                {t("block-1-tutor-empty")}
              </p>
            )}
          </div>
        </div>

        <UpgradeCard />
      </div>

      <Modal
        isOpen={detailModal.isOpen}
        centered={true}
        contentClassName="request-form-modal card-style"
      >
        <RequestDetailModal
          detailModal={detailModal}
          setDetailModal={setDetailModal}
        />
      </Modal>
    </>
  );
};

export default Home;
