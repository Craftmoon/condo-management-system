import React from "react";
import { ReactComponent as KiperLogoSmall } from "../../assets/images/logo_kiper_small.svg";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <header>
      <div>
        <KiperLogoSmall style={{ marginLeft: "40" }} /> Gestão de Condomínio
      </div>
      <div className="operator-info">
        <nav className="main-navigation__items">
          <NavLink to="/login">Acessar</NavLink>
        </nav>
        {/* <div className="level-item">Operador</div>
        <div className="level-item">
          <NavLink className="button is-danger is-light is-small" to="/login">
            Sair
          </NavLink>
        </div> */}
      </div>
    </header>
  );
};

export default Navbar;
