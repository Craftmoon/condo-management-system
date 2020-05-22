import React, { Fragment } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
//import { useSelector, useDispatch } from "react-redux";

//Components
import Navbar from "./components/navbar/navbar.jsx";

//Pages
import LoginSignUp from "./pages/loginSignUp/loginSignUp.jsx";
import LandingPage from "./pages/landingPage/landingPage.jsx";
import RegisterAparment from "./pages/apartment/register/apRegister.jsx";
import SearchApartment from "./pages/apartment/search/apSearch.jsx";
import DeleteApartment from "./pages/apartment/delete/apDelete.jsx";
import Home from "./pages/home/home.jsx";
import RegisterTenant from "./pages/tenant/register/tenantRegister.jsx";

function App() {
  const storeToken = (token, operatorId) => {
    window.localStorage.setItem("token", token);
    // dispatch({
    //   type: "UPDATE_AUTH_INFO",
    //   token: token,
    //   operatorId: operatorId,
    // });
  };

  const deleteToken = () => {
    localStorage.removeItem("token");
    // dispatch({
    //   type: "UPDATE_AUTH_INFO",
    //   token: null,
    //   operatorId: null,
    // });
  };

  // const dispatch = useDispatch();
  // const token = useSelector((state) => state.token);
  const token = localStorage.getItem("token");

  return (
    <Fragment>
      <BrowserRouter>
        <Navbar token={token} deleteToken={deleteToken} />
        <Switch>
          {!token && <Route path="/" component={LandingPage} exact />}
          {!token && (
            <Route
              path="/login"
              render={() => <LoginSignUp storeToken={storeToken} />}
            />
          )}
          {token && <Route path="/home" component={Home} />}

          {token && (
            <Route
              path="/apartment/register"
              render={() => <RegisterAparment token={token} />}
            />
          )}
          {token && (
            <Route
              path="/apartment/search"
              render={() => <SearchApartment token={token} />}
            />
          )}
          {token && (
            <Route
              path="/apartment/delete"
              render={() => <DeleteApartment token={token} />}
            />
          )}
          {token && (
            <Route
              path="/tenant/register"
              render={() => <RegisterTenant token={token} />}
            />
          )}
          {!token && <Redirect path="/" to="/" />}
          {token && <Redirect path="/" to="/home" />}
        </Switch>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
