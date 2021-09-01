import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Modal,
  Form,
  FormGroup,
  Input,
  Label,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";
import NumberFormat from "react-number-format";
import { useTranslation } from "react-i18next";

import { getUser, getBankList, payout } from "../../../api";
import CurrencyFormat from "../../utils/CurrencyFormat";
import useFetch from "../../customHooks/useFetch";
import SubLoader from "../../utils/SubLoader";
import ErrorHandler from "../../ErrorHandler";
import Remind from "./modals/Remind";
import Success from "./modals/Success";
import Fail from "./modals/Fail";

function WithDrawalForm() {
  const { t } = useTranslation(["payment"]);
  // LOCAL STATE DECLARATIONS
  const [cash, setCash] = useState({
    totalCash: 0,
    availableCash: 0,
    is_free: false,
  });
  const [amount, setAmount] = useState(0);
  const [selectedBank, setSelectedBank] = useState();

  const [remindModal, setRemindModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [failModal, setFailModal] = useState(false);
  const [loading, setLoading] = useState([]);
  const [error, setError] = useState("");
  // FETCH BANK LIST WITH CUSTOM HOOK
  const bankLists = useFetch(getBankList, setLoading, false) || [];
  let sortedBanks = [];
  bankLists.map((b) => {
    if (b.is_default) {
      sortedBanks = [{ ...b }, ...sortedBanks];
    } else {
      sortedBanks = [...sortedBanks, { ...b }];
    }
  });

  // SIDE EFFECTS
  useEffect(() => {
    const defaultBank = bankLists.find((b) => b.is_default) || bankLists[0];
    setSelectedBank(defaultBank);
  }, [bankLists]);

  useEffect(() => {
    (async () => {
      try {
        const res = await getUser();
        const { virt_amount, real_amount, is_free } = res.data;
        setCash({
          totalCash: virt_amount,
          availableCash: real_amount,
          is_free,
        });
      } catch (error) {
        // console.log(error);
      }
    })();
  }, []);

  // FUNCTION DECLARATIONS
  async function handlePayout(e) {
    const realAmount = cash.is_free
      ? amount.toString()
      : (amount + 4400).toString();
    const payload = {
      account_number: selectedBank.bank_card,
      holder_name: selectedBank.card_owner_name,
      currency: "VND",
      remark: "test payout",
      amount: realAmount,
    };

    setLoading((prevLoading) => [...prevLoading, "payout"]);
    const res = await payout(payload);
    setLoading((prevLoading) => {
      const updateLoading = prevLoading.filter((ld) => ld !== "payout");
      setLoading([...updateLoading]);
    });

    if (res.status < 400) {
      setCash((prevCash) => ({
        ...prevCash,
        availableCash: prevCash.availableCash - amount,
      }));
      setRemindModal(false);
      setSuccessModal(true);
    } else {
      setFailModal(true);
    }
  }

  function handleRemindModal(e) {
    e.preventDefault();
    // 1. Check is valid amount
    if (amount < 10000 || !amount) {
      setError("( Số tiền tối thiểu bạn có thể rút là 10.000 VND ! )");
      return;
    }

    // 2. Check amount is larger than available cash
    if (cash.is_free && amount > cash.availableCash) {
      setError("(Số dư thực tế không đủ !)");
      return;
    }

    if (!cash.is_free && amount + 4400 > cash.availableCash) {
      setError("(Số dư thực tế không đủ !)");
      return;
    }

    if (!selectedBank) {
      setError("(Vui lòng chọn tài khoản thụ hưởng!)");
      return;
    }

    // 3. Reset error and call api
    setError("");
    setRemindModal(true);
  }

  if (loading && loading.length > 0) return <SubLoader />;

  return (
    <>
      <div className="withdrawal mb-4 w-100 card-style border-radius-2 py-3 px-4 flex-grow">
        <h6 className="text-bold2 mb-12px">{t("payment:overview-2")}</h6>

        <div className="border-radius-1 p-3 flex-box free-back-remain mb-12px">
          <div className="bell-icon rounded-circle bg-hightlight-1 center-box mr-12px">
            <FontAwesomeIcon icon={["fas", "bell"]} />
          </div>
          <span>{t("payment:free_withdrawal")} 2</span>
        </div>

        <div className="mb-3">
          <span>{t("payment:overview-3")}</span>
          <span className="text-grey mr-12px">{t("payment:overview-4")}</span>
          <span className="text-bold2 text-hightlight1">
            <CurrencyFormat value={cash.availableCash} amountOnly={true} />
          </span>
        </div>

        <Form className="cash-amount-group">
          <FormGroup tag="fieldset">
            <legend className="h6 mb-3 text-bold2">
              {t("payment:transfer_to")}
            </legend>

            {sortedBanks.map((bank, index) => (
              <FormGroup key={bank.id} check className="mb-4">
                <Label className="cursor-pointer" check>
                  <Input
                    defaultChecked={index === 0}
                    type="radio"
                    name="bank-name"
                    onClick={() => setSelectedBank({ ...bank })}
                  />
                  {bank.bank}
                </Label>
              </FormGroup>
            ))}

            <Link
              to="/dashboard-tutor/finance/banking"
              className="text-hightlight1 d-inline-block text-bold1 text-decoration-none cursor-pointer mb-4"
            >
              + {t("payment:add_bank")}
            </Link>

            <FormGroup className="mb-4">
              <Label
                htmlFor="cash-amount"
                className="text-bold2 mb-12px cursor-pointer"
              >
                <span className="mr-2">{t("payment:withdrawal_amount")}</span>
                {error && <ErrorHandler error={error} />}
              </Label>
              <InputGroup className="border-radius-2 mb-4">
                <NumberFormat
                  className="border flex-grow pl-2"
                  defaultValue={amount}
                  thousandSeparator={true}
                  onValueChange={(values) => setAmount(values.floatValue)}
                />
                <InputGroupAddon addonType="append">
                  <InputGroupText className="bg-light border-left-0 cursor-pointer">
                    VNĐ
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </FormGroup>

            <div>
              <span className="text-bold2 mr-2">
                {t("payment:withdrawal_amount")}:
              </span>
              <span className="text-bold2 text-hightlight mb-2">
                <CurrencyFormat
                  value={cash.is_free ? 0 : 4400}
                  amountOnly={true}
                />
              </span>
            </div>

            <p className="text-small text-grey mb-5">
              {t("payment:withdrawal_fee_note")}
            </p>
            <button
              onClick={handleRemindModal}
              className="main-btn py-3 d-inline-block text-decoration-none"
            >
              {t("payment:comfirm")}
            </button>
          </FormGroup>
        </Form>
      </div>

      <Modal isOpen={remindModal} contentClassName="card-style" centered={true}>
        <Remind setModal={setRemindModal} handlePayout={handlePayout} />
      </Modal>

      <Modal
        isOpen={successModal}
        contentClassName="card-style"
        centered={true}
      >
        <Success
          amount={amount}
          bank={selectedBank}
          setModal={setSuccessModal}
        />
      </Modal>

      <Modal isOpen={failModal} contentClassName="card-style" centered={true}>
        <Fail setModal={setFailModal} />
      </Modal>
    </>
  );
}

export default WithDrawalForm;
