import React from 'react'
import PropTypes from 'prop-types'
import {Link} from "react-router-dom"

import Img from "../../../assets/images/upgrade-success.jpg";

function Success({accountType}) {
  return (
    <div className="card-style border-radius-2 p-0 pb-5">

      <img className="w-100 mb-5" src={Img} alt="Upgrade success" />

      <h4 className="text-bold2 mb-4 text-center">
        Đăng ký tài khoản {accountType === 1 ? "Standard" : "Professional"} thành công
      </h4>

      <div className="center-box">
        <Link to="/dashboard-tutor/home" className="main-btn font-weight-bold px-5">Quay về Trang chủ</Link>
      </div>
    </div>
  )
}

Success.propTypes = {
  accountType: PropTypes.number
}

export default Success

