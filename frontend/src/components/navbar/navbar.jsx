import React, { Fragment } from "react";
import { ReactComponent as KiperLogoSmall } from "../../assets/images/logo_kiper_small.svg";
import { NavLink } from "react-router-dom";

const Navbar = ({ token, deleteToken }) => {
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href="https://kiper.com.br/">
          <KiperLogoSmall />
        </a>
        <p className="navbar-item is-size-4 ">Gestão de Condomínio</p>
      </div>

      <a
        role="button"
        className="navbar-burger burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="mainNavBar"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
      <div id="mainNavBar" className="navbar-menu">
        {/* <div className="navbar-start"></div> */}

        <div className="navbar-end">
          {token && (
            <Fragment>
              <div className="navbar-item has-dropdown is-hoverable">
                <a className="navbar-link">Apartamento</a>

                <div className="navbar-dropdown">
                  <NavLink to="/register/apartment" className="navbar-item">
                    Cadastrar Apartamento
                  </NavLink>
                  <a className="navbar-item">Pesquisar Apartamento</a>
                  <a className="navbar-item">Atualizar Apartamento</a>
                  <a className="navbar-item">Remover Apartamento</a>
                </div>
              </div>
              <div className="navbar-item has-dropdown is-hoverable">
                <a className="navbar-link">Morador</a>

                <div className="navbar-dropdown">
                  <a className="navbar-item">Cadastrar Morador</a>
                  <a className="navbar-item">Pesquisar Morador</a>
                  <a className="navbar-item">Atualizar Morador</a>
                  <a className="navbar-item">Remover Morador</a>
                </div>
              </div>
            </Fragment>
          )}
          <div className="navbar-item">
            {!token && (
              <NavLink to="/login" className="button is-success  is-outlined ">
                Acessar
              </NavLink>
            )}
            {token && (
              <NavLink
                to="/"
                className="button is-danger is-outlined "
                onClick={() => {
                  deleteToken();
                }}
              >
                Sair
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

// <header>
//   <div>
//     <KiperLogoSmall style={{ marginLeft: "40" }} /> Gestão de Condomínio
//   </div>
//   <div>
//     <nav>
//
//     </nav>
//   </div>
// </header>
