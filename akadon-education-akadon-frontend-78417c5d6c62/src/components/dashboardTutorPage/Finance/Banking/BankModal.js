import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input, Label, FormGroup } from "reactstrap";

function BankModal({ setModal, modal, setDefault }) {
  const bank = modal.content;
  if (!bank) {
    return <div></div>;
  }
  const { is_default } = bank;
  const bankCard = bank.bank_card.slice(-4);

  return (
    <>
      <div className="flex-box p-4 border-bottom mb-4">
        <h4 className="mb-0 text-center text-bold2 flex-grow">
          Tài khoản ngân hàng
        </h4>
        <FontAwesomeIcon
          onClick={() => setModal({ ...modal, isOpen: false })}
          className="h5 text-grey mb-0"
          icon={["fas", "times"]}
        />
      </div>

      <div className="flex-box px-5 align-items-stretch">
        <div className="w-50">
          <div className="pb-5">
            <p className="mb-2 text-grey">Họ và tên chủ thẻ</p>
            <div className="text-uppercase">{bank.card_owner_name}</div>
          </div>

          <div>
            <p className="mb-2 text-grey">Số tài khoản</p>
            <div className="text-uppercase">**** {bankCard}</div>
          </div>
        </div>

        <div className="w-50">
          <div className="pb-5">
            <p className="mb-2 text-grey">Tên ngân hàng</p>
            <div className="text-uppercase">{bank.bank}</div>
          </div>

          <FormGroup className="flex-box">
            <Input
              disabled={bank.is_default}
              className="my-0"
              type="checkbox"
              id="set-default"
            />
            <Label className="mb-0 cursor-pointer" htmlFor="set-default">
              Đặt làm thẻ mặc định
            </Label>
          </FormGroup>
        </div>
      </div>

      <div className="flex-box p-4">
        <div className="flex-grow">
          {!is_default && (
            <div className="flex-box">
              <div
                onClick={() => setDefault(bank)}
                className="main-btn mr-12px px-4"
              >
                Lưu
              </div>
              <div className="cancel-btn px-4">Xóa</div>
            </div>
          )}
        </div>
        <div
          onClick={() => setModal({ ...modal, isOpen: false })}
          className="cancel-btn px-4"
        >
          Đóng
        </div>
      </div>
    </>
  );
}

BankModal.propTypes = {};

export default BankModal;
