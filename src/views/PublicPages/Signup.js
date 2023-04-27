import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

const Signup = ({ setIsLogging }) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const navigate = useNavigate();

  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      const enteredEmail = emailRef.current.value;
      const enteredPassword = passwordRef.current.value;
      const confirmPassword = confirmPasswordRef.current.value;

      const emailRegex = /^\S+@\S+\.\S+$/;
      if (!emailRegex.test(enteredEmail)) {
        setFormErrors({
          ...formErrors,
          email: "Please enter a valid email address",
        });
      } else {
        setFormErrors({ ...formErrors, email: "" });
      }
      // Validate password
      if (enteredPassword.length < 8) {
        setFormErrors({
          ...formErrors,
          password: "Password must be at least 8 characters long",
        });
      } else {
        setFormErrors({ ...formErrors, password: "" });
      }
      // Validate confirm password
      if (confirmPassword !== enteredPassword) {
        setFormErrors({
          ...formErrors,
          confirmPassword: "Passwords do not match",
        });
      } else {
        setFormErrors({ ...formErrors, confirmPassword: "" });
      }
      // Submit form if there are no errors
      if (
        !formErrors.email &&
        !formErrors.password &&
        !formErrors.confirmPassword
      ) {
        const res = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB1X4e53DHGl7YFqdrLvVXUnqHcgNaUuKo",
          {
            method: "POST",
            body: JSON.stringify({
              email: enteredEmail,
              password: enteredPassword,
              returnSecureToken: true,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (res.ok) {
          window.alert("User Signed Up succesfully");
          navigate("/login");
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
  };

  return (
    <>
      <h2 className='text-center'>Signup</h2>
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
        <FormGroup floating>
          <Input
            id='password'
            placeholder='Enter Password'
            type='password'
            innerRef={passwordRef}
            name='password'
          />
          <Label for='password'>Password</Label>
          {formErrors.password && (
            <span className='error'>{formErrors.password}</span>
          )}
        </FormGroup>
        <FormGroup floating>
          <Input
            id='confirPassword'
            placeholder='Enter Password'
            type='password'
            innerRef={confirmPasswordRef}
            name='confirmPassword'
          />
          <Label for='confirPassword'>Confirm Password</Label>
          {formErrors.confirmPassword && (
            <span className='error'>{formErrors.confirmPassword}</span>
          )}
        </FormGroup>
        {!isLoading && (
          <div className='text-center d-grid gap-2'>
            <Button type='submit' variant='primary' className='text-center'>
              Sign Up
            </Button>
          </div>
        )}
      </Form>
      <div>
        <p className='text-center'>
          Already have an account?
          <span
            style={{ color: "blue", cursor: "pointer", fontWeight: "bold" }}
            onClick={handleClick}
          >
            Login
          </span>
        </p>
      </div>
    </>
  );
};

export default Signup;
