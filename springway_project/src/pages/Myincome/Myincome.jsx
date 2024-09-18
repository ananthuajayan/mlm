import { useEffect, useState } from "react";
import "./Myincome.scss";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import { PiHandWithdrawBold } from "react-icons/pi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Myincome = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [income, setIncome] = useState(null);
  const [increase, setIncrease] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [walletResult, setWalletResult] = useState(null);
  const [withdraw, setWithdraw] = useState([]);
  const [filter, setFilter] = useState("");
  const [type, setType] = useState("");
  const [selectedIncome, setSelectedIncome] = useState(null);
  const data = location.state?.data || {};
  console.log(data.user_id);
  console.log(withdraw);
  console.log(type);

  const notify = (message) => {
    toast(message);
  };

  const handleOnChange = (e) => {
    setFilter(e.target.value);
    console.log(e.target.value);
    showIncome(e.target.value);
  };

  const fetchIncome = async () => {
    try {
      const response = await axios.get(
        "https://lunarsenterprises.com:3004/mlm/myincome",
        { headers: { user_id: data.user_id, api_key: data.user_api_key } }
      );
      const fetchedIncome = response.data.data;

      // Extract income value for debugging
      const incomeValue = fetchedIncome.u_income;
      console.log("Fetched Income Value:", incomeValue);

      // Calculate truncated value to the nearest lower multiple of 150
      const truncatedValue = Math.trunc(incomeValue / 150) * 150;

      // Update the state with the truncated value
      setIncome(fetchedIncome);
      setSelectedIncome({
        amount: truncatedValue, // Set the truncated amount
        type: "level", // Adjust type if needed
      });

      // Set the wallet result
      const upgradeAmount = response.data.upgradeamount;
      setWalletResult(upgradeAmount);

      // Output truncated values to the console
      console.log("Truncated Income:", truncatedValue);
      console.log("Fetched Income:", fetchedIncome);
      console.log("Wallet Result:", walletResult);
    } catch (error) {
      console.error("Error fetching income:", error);
    }
  };

  useEffect(() => {
    fetchIncome();
  }, [data]);

  const checkStatus = async () => {
    try {
      const response = await axios.get(
        "https://lunarsenterprises.com:3004/mlm/check/status",
        {
          headers: {
            user_id: data.user_id,
            api_key: data.user_api_key,
          },
        }
      );
      navigate("/my_profile", {
        state: { data: data, status: response.data },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const checkIncome = (income, type) => {
    if (income < 300) {
      alert("You can withdraw only 300 or its multiple");
    } else {
      const truncatedIncome = Math.floor(income / 300) * 150;
      setWithdraw([truncatedIncome, type]);
      setSelectedIncome({ amount: truncatedIncome, type });
      setShowWithdrawModal(true);
      setShowModal(false);
    }
  };

  const monthlyIncomeCheck = (income) => {
    if (income < 30000) {
      alert("Insufficient balance");
    } else {
      const truncatedIncome = Math.floor(income / 3000) * 1500;
      setWithdraw([truncatedIncome, "constant"]);
      setSelectedIncome({ amount: truncatedIncome, type: "constant" });
      setShowWithdrawModal(true);
      setShowModal(false);
    }
  };

  const withdrawAmount = async () => {
    try {
      let amountToWithdraw;

      // Log the initial withdraw values
      console.log("Initial withdraw values:", withdraw);

      // Determine the amount to withdraw based on the type
      if (withdraw[1] === "constant") {
        amountToWithdraw = Math.floor(withdraw[0]) * 2;
        console.log(
          "Calculation for constant type:",
          withdraw[0],
          "/ 3000 * 1500 =",
          amountToWithdraw
        );
      } else {
        amountToWithdraw = Math.floor(withdraw[0]) * 2;
        console.log(
          "Calculation for non-constant type:",
          withdraw[0],
          "/ 300 * 150 =",
          amountToWithdraw
        );
      }

      // Log the final amount to withdraw
      console.log("Amount to withdraw:", amountToWithdraw);

      if (amountToWithdraw > 0) {
        console.log("Processing withdrawal with amount:", amountToWithdraw);

        const response = await axios.post(
          "https://lunarsenterprises.com:3004/mlm/income/withdrawal",
          {
            income_type: withdraw[1],
            amount: amountToWithdraw,
          },
          {
            headers: {
              user_id: data.user_id,
              api_key: data.user_api_key,
            },
          }
        );

        if (response.data.result === true) {
          notify(response.data.message);
        }

        fetchIncome();
        console.log("Post-withdrawal amount:", amountToWithdraw);
        setShowWithdrawModal(false); // Close the withdraw modal
        console.log("API response:", response);
      } else {
        toast.error("The amount is too low to withdraw.");
        console.log("The amount is too low to withdraw.");
      }
    } catch (error) {
      console.error("Error during withdrawal:", error);
    }
  };

  const showIncome = async (i) => {
    console.log("hello");
    try {
      const response = await axios.post(
        "https://lunarsenterprises.com:3004/mlm/income/list",
        {
          income_type: i,
        },
        {
          headers: { user_id: data.user_id, api_key: data.user_api_key },
        }
      );
      console.log(response.data.data);
      if (response.data.result === true) {
        navigate("/income", { state: { data: response.data.data } });
      } else {
        navigate("/income");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpgradeClick = () => {
    setShowConfirmModal(true);
    setShowModal(false); // Ensure the income modal is closed when opening the confirmation modal
  };

  const handleConfirmUpgrade = () => {
    setShowConfirmModal(false);
    // Add the upgrade logic here, e.g., call fetchupgrade
    fetchupgrade();
  };

  const handleCancelUpgrade = () => {
    setShowConfirmModal(false);
  };

  const fetchupgrade = async () => {
    try {
      if (walletResult < 750) {
        alert("Insufficient balance");
        return; // Exit the function if the balance is insufficient
      }

      const params = { u_id: data.user_id };

      const response = await axios.post(
        "https://lunarsenterprises.com:3004/mlm/user/upgrade",
        null,
        { headers: params }
      );

      console.log(data.user_id, "na,,eee");
      console.log(response);

      toast.success("Upgrade successful!");
      window.location.reload();
    } catch (error) {
      console.error("An error occurred during the upgrade:", error);
      toast.error("Upgrade failed. Please try again.");
    }
  };

  return (
    <div className="container-fluid py-5" id="reg">
      <div className="income">
        <h4>My Income</h4>
        <div className="btn">
          <button onClick={checkStatus}>Add Bank</button>
        </div>
        <div id="income-select">
          <div className="select" style={{ width: "150px" }}>
            <div className="select mt-3">
              <select
                className="form-select shadow"
                name=""
                id=""
                onChange={handleOnChange}
              >
                <option value="#">Select</option>
                <option value="daily">Daily Income</option>
                <option value="level">Level Income</option>
                <option value="constant">Monthly Income</option>
                <option value="repurchase">Repurchase Income</option>
                <option value="service">Service income</option>
                <option value="crypto">Crypto income</option>
              </select>
            </div>
          </div>
        </div>

        <div className="income-details">
          {income ? (
            <>
              <div className="sub-income">
                <h4>Daily Income -</h4>
                <div className="amount-details">
                  <div className="amount">{income.u_daily_income}</div>
                  <button
                    type="daily"
                    className="withdraw"
                    onClick={() => checkIncome(income.u_daily_income, "daily")}
                  >
                    Withdrawal
                  </button>
                </div>
              </div>
              <div className="sub-income">
                <h4>Level Income -</h4>
                <div className="amount-details">
                  <div className="amount">{income.u_income}</div>
                  <button
                    type="level"
                    className="withdraw"
                    onClick={() => checkIncome(income.u_income, "level")}
                  >
                    Withdrawal
                  </button>
                </div>
              </div>
              <div className="sub-income">
                <h4>Monthly Income -</h4>
                <div className="amount-details">
                  <div className="amount">{income.u_constant_income}</div>
                  <button
                    className="withdraw"
                    type="constant"
                    onClick={() => monthlyIncomeCheck(income.u_constant_income)}
                  >
                    Withdrawal
                  </button>
                </div>
              </div>
              <div className="sub-income">
                <h4>Repurchase Income -</h4>
                <div className="amount-details">
                  <div className="amount">{income.u_repurchase_income}</div>
                  <button
                    type="repurchase"
                    className="withdraw"
                    onClick={() =>
                      checkIncome(income.u_repurchase_income, "repurchase")
                    }
                  >
                    Withdrawal
                  </button>
                </div>
              </div>
              <div className="sub-income">
                <h4>Service Income -</h4>
                <div className="amount-details">
                  <div className="amount">{income.u_service_income}</div>
                  <button
                    type="service"
                    className="withdraw"
                    onClick={() =>
                      checkIncome(income.u_service_income, "service")
                    }
                  >
                    Withdrawal
                  </button>
                </div>
              </div>
              <div className="sub-income">
                <h4>Crypto Income -</h4>
                <div className="amount-details">
                  <div className="amount">{income.u_crypto_income}</div>
                  <button
                    type="crypto"
                    className="withdraw"
                    onClick={() =>
                      checkIncome(income.u_crypto_income, "crypto")
                    }
                  >
                    Withdrawal
                  </button>
                </div>
              </div>

              <div className="sub-income">
                <h4>Activity Income -</h4>
                <div className="amount-details">
                  <div className="amount">00</div>
                  <button type="crypto" className="withdraw">
                    Withdrawal
                  </button>
                </div>
              </div>
            </>
          ) : (
            <p>Loading income data...</p>
          )}
        </div>
        <div className="button-holder">
          <Button className="button" onClick={() => setShowModal(true)}>
            Upgrade
          </Button>
        </div>

        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Upgrade</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="card">
              <div>
                <p>Balance</p>
                <h5>Rs: {walletResult}</h5>
              </div>
              <div className="user-id">
                <p>user-id:{data.user_referral_id}</p>
              </div>
            </div>
            <div className="checks">
              <div className="dep" onClick={handleUpgradeClick}>
                <PiHandWithdrawBold size={20} />
                <p>Upgrade to next level</p>
              </div>
            </div>
          </Modal.Body>
        </Modal>

        {/* Confirmation Modal */}
        <Modal
          show={showConfirmModal}
          onHide={() => setShowConfirmModal(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Confirm Upgrade</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Are you sure you want to upgrade to the next level?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCancelUpgrade}>
              No
            </Button>
            <Button variant="primary" onClick={handleConfirmUpgrade}>
              Yes
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={showWithdrawModal}
          onHide={() => setShowWithdrawModal(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Withdraw</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="card">
              <div>
                <p>{selectedIncome?.type || "Income"} Income:</p>
                <p>Rs: {selectedIncome?.amount || "0"}</p>
              </div>
              <div className="user-id">
                <p>User ID: {data.user_referral_id}</p>
              </div>
            </div>
            <div className="checks">
              <div className="dep" onClick={withdrawAmount}>
                <PiHandWithdrawBold size={20} />
                <p>Withdraw</p>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Myincome;
