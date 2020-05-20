import React from "react";
import { ReactComponent as KiperLogoSmall } from "../../assets/images/logo_kiper_small.svg";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div>
        <KiperLogoSmall style={{ marginLeft: "40" }} />
      </div>
      <div className="operator-info">
        <div className="level-item">Operador</div>
        <div className="level-item">
          <NavLink className="button is-danger is-light is-small" to="/login">
            Sair
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Header;
