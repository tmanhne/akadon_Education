import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function VerifySuccess({modal, setModal, email}) {
  return (
    <div className="card-style p-0 pb-5">
      <div className="flex-box mb-4 p-3 border-bottom">
        <h4 className="text-bold2 mb-0 text-center flex-grow">Thêm email khác</h4>
        <FontAwesomeIcon onClick={() => setModal(!modal)} className="text-grey h4 mb-0" icon={["fal", "times"]} />
      </div>
      <div style={{ maxWidth: "450px" }} className="mx-auto">
        <div className="text-dark mb-4 text-center">
          <span>Một email đã gửi tới </span>
          <span className="text-dark text-bold1">{email}</span>
          <span> để đảm bảo đây là địa chỉ hợp lệ.</span>
          </div>
        <div onClick={() => setModal(!modal)} className="main-btn flex-grow w-50 mx-auto">Đóng</div>
      </div>
    </div>
  )
}

VerifySuccess.propTypes = {
  modal: PropTypes.bool,
  setModal: PropTypes.func,
  email: PropTypes.string
}

export default VerifySuccess

