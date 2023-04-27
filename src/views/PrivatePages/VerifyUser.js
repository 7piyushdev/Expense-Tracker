import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "reactstrap";
import { expenseActions } from "../../store/expenses";

const VerifyUser = () => {
  const showPremium = useSelector((state) => state.expenses.activatePremium);
  const isPremium = useSelector((state) => state.expenses.isPremium);

  const dispatch = useDispatch();

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyB1X4e53DHGl7YFqdrLvVXUnqHcgNaUuKo",
        {
          method: "POST",
          body: JSON.stringify({
            requestType: "VERIFY_EMAIL",
            idToken: JSON.parse(token),
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.ok) {
        const data = await res.json();
        console.log(data);
        alert("verification code sent");
      } else {
        const err = await res.json();
        alert(err.error.message);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className='d-flex justify-content-center'>
        <div className='m-2'>
          <Button color='primary' onClick={handleSubmit}>
            Verify Email
          </Button>
        </div>
        {showPremium && !isPremium && (
          <div className='m-2'>
            <Button
              color='success'
              onClick={() => dispatch(expenseActions.isPremium())}
            >
              Activate Premium
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default VerifyUser;
