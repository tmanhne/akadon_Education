import React from "react";
import {connect} from "react-redux";

import LoadingAnimate from "../../assets/images/akdon-loading.gif";
import MainSideBar from "../dashboardPage/utils/MainSideBar";
import TutorMainSideBar from "../dashboardTutorPage/utils/MainSideBar";
import TopNav from "../TopNav/TopNav";

function DashboardLoader({ userType }) {
  return (
    <>
      <div className="dashboard-page flex-box align-items-stretch px-0 mx-auto my-0 w-100">
        {
          userType === "student" ? <MainSideBar /> : <TutorMainSideBar />
        }
        
        <div className="dashboard-page__content flex-grow flex-box flex-column align-items-stretch pt-4 pr-3 pl-4 pb-0">
          <TopNav userType="student" />
          <div className="w-100 h-100 center-box  border-radius-2 bg-light">
            <img width={560} src={LoadingAnimate} alt="akadon loading" />
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = ({user}) => {
  const {userType} = user.info;
  return {userType}
}

export default connect(mapStateToProps, null)(DashboardLoader);
