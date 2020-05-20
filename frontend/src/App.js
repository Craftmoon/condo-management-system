import React, { Fragment } from "react";
import { BrowserRouter, Route } from "react-router-dom";

//Components
import Navbar from "./components/navbar/navbar.jsx";

//Pages
import LoginSignUp from "./pages/loginSignUp/index.jsx";
import LandingPage from "./pages/landingPage/landingPage.jsx";
import RegisterAparment from "./pages/apartment/register/apRegister.jsx";
import Home from "./pages/home/home.jsx";

function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <Navbar />
        <Route path="/" component={LandingPage} exact />
        <Route path="/login" component={LoginSignUp} />
        <Route path="/home" component={Home} />
        <Route path="/apartment/register" component={RegisterAparment} />
        {/* <Route path="/apartment/search" component={RegisterAparment} />
        <Route path="/apartment/edit" component={EditAparment} />
        <Route path="/apartment/delete" component={EditAparment} /> */}
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
