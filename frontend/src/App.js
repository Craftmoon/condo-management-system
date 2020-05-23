import React, { useState } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

//Components
import Navbar from "./components/navbar/navbar.jsx";

//Pages
import Home from "./pages/home/home.jsx";
import LoginSignUp from "./pages/loginSignUp/loginSignUp.jsx";
import LandingPage from "./pages/landingPage/landingPage.jsx";
import RegisterAparment from "./pages/apartment/register/apRegister.jsx";
import SearchApartment from "./pages/apartment/search/apSearch.jsx";
import DeleteApartment from "./pages/apartment/delete/apDelete.jsx";
import UpdateApartment from "./pages/apartment/update/apUpdate.jsx";
import RegisterTenant from "./pages/tenant/register/tenantRegister.jsx";
import SearchTenant from "./pages/tenant/search/tenantSearch.jsx";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const storeToken = (tok, operatorId) => {
    window.localStorage.setItem("token", tok);
    setToken(tok);
  };

  const deleteToken = () => {
    localStorage.removeItem("token");
    setToken(false);
  };

  return (
    <>
      <BrowserRouter>
        <Switch>
          {!token && (
            <>
              <Route
                path="/login"
                render={() => <LoginSignUp storeToken={storeToken} />}
              />
              <Redirect path="/" to="/login" />
            </>
          )}

          {token && (
            <>
              <Navbar token={token} deleteToken={deleteToken} />
              <Route path="/home" component={Home} />
              <Route
                path="/apartment/register"
                render={() => <RegisterAparment />}
              />
              <Route
                path="/apartment/search"
                render={() => <SearchApartment />}
              />
              <Route
                path="/apartment/update"
                render={() => <UpdateApartment />}
              />
              <Route
                path="/apartment/delete"
                render={() => <DeleteApartment />}
              />
              <Route
                path="/tenant/register"
                render={() => <RegisterTenant token={token} />}
              />
              <Route
                path="/tenant/search"
                render={() => <SearchTenant token={token} />}
              />
              <Redirect path="/" to="/home" />
            </>
          )}
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
