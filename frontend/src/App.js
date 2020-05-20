import React from "react";

import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

//Pages
import LoginSignUp from "./pages/loginSignUp/index.jsx";
import Home from "./pages/home/index.jsx";

function App() {
  return (
    <BrowserRouter>
      <Route path="/login" component={LoginSignUp} />
      <Route path="/home" component={Home} />
    </BrowserRouter>
  );
}

export default App;
