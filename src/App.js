import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from "./components/Header";
import VerifyUser from "./views/PrivatePages/VerifyUser";
import { authActions } from "./store/auth";
import classes from "./App.module.css";

const App = () => {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth.isAuthenticated);
  const darkMode = useSelector((state) => state.expenses.darkMode);
  const dispatch = useDispatch();

  const stayLogin = () => {
    const token = localStorage.getItem("token");
    if (!!token) {
      dispatch(authActions.login(token));
    }
    if (!auth) {
      navigate("/");
    }
  };

  useEffect(() => {
    stayLogin();
  }, []);

  return (
    <>
      <div className={darkMode ? classes.darkMode : ""}>
        <Header />
        <VerifyUser />
        <main>
          <section>
            <Outlet />
          </section>
        </main>
      </div>
    </>
  );
};

export default App;
