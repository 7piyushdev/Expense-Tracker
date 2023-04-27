import React, { useContext, useRef, useState } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context-store/Auth-Context";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";

const Login = ({ setIsLogging, setForgotPassword }) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authCtx = useContext(AuthContext);

  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      const enteredEmail = emailRef.current.value;
      const enteredPassword = passwordRef.current.value;

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

      // Submit form if there are no errors
      if (!formErrors.email && !formErrors.password) {
        const res = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB1X4e53DHGl7YFqdrLvVXUnqHcgNaUuKo",
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
          const data = await res.json();
          dispatch(authActions.login(data.idToken));
          localStorage.setItem("token", JSON.stringify(data.idToken));
          authCtx.addUserToLocal(enteredEmail);
          navigate("/home");
          emailRef.current.value = "";
          passwordRef.current.value = "";
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
      <h2 className='text-center'>Login</h2>
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
        <p className='text-center'>
          <span
            style={{ color: "red", cursor: "pointer", fontWeight: "bold" }}
            onClick={() => setForgotPassword(true)}
          >
            Forgot Password?
          </span>
        </p>
        {!isLoading && (
          <div className='text-center d-grid gap-2'>
            <Button type='submit' variant='primary' className='text-center'>
              Log In
            </Button>
          </div>
        )}
      </Form>
      <div>
        <p className='text-center'>
          New User?
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

export default Login;
