import React, { useRef, useState } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

const ForgotPassword = ({ setIsLogging, setForgotPassword }) => {
  const emailRef = useRef();

  const [formErrors, setFormErrors] = useState({
    email: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      const enteredEmail = emailRef.current.value;

      const emailRegex = /^\S+@\S+\.\S+$/;
      if (!emailRegex.test(enteredEmail)) {
        setFormErrors({
          ...formErrors,
          email: "Please enter a valid email address",
        });
      } else {
        setFormErrors({ ...formErrors, email: "" });
      }

      // Submit form if there are no errors
      if (!formErrors.email) {
        const res = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyB1X4e53DHGl7YFqdrLvVXUnqHcgNaUuKo",
          {
            method: "POST",
            body: JSON.stringify({
              requestType: "PASSWORD_RESET",
              email: enteredEmail,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (res.ok) {
          alert("Link Sent, Change Password and try again");
          setForgotPassword(false);
        } else {
          const err = await res.json();
          alert(err.error.message);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClick = () => {
    setIsLogging((prevState) => !prevState);
    setForgotPassword((prevState) => !prevState);
  };

  return (
    <>
      <p className='text-center'>Enter registered email to retrieve password</p>
      <Form onSubmit={onSubmit}>
        <FormGroup floating>
          <Input
            id='login-email'
            placeholder='Enter Email'
            type='email'
            innerRef={emailRef}
            name='email'
          />
          <Label for='login-email'>Email:</Label>
          {formErrors.email && (
            <span className='error'>{formErrors.email}</span>
          )}
        </FormGroup>
        {!isLoading && (
          <div className='text-center d-grid gap-2'>
            <Button type='submit' variant='primary' className='text-center'>
              Send Link
            </Button>
          </div>
        )}
        {isLoading && (
          <div className='text-center d-grid gap-2'>
            <Button>Loading...</Button>
          </div>
        )}
      </Form>
      <div>
        <p className='text-center'>
          New User?{" "}
          <span
            style={{ color: "blue", cursor: "pointer", fontWeight: "bold" }}
            onClick={handleClick}
          >
            Signup
          </span>
        </p>
      </div>
    </>
  );
};

export default ForgotPassword;
