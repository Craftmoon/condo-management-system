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
                <a className="navbar-link">Morador</a>

                <div className="navbar-dropdown">
                  <NavLink to="/tenant/register" className="navbar-item">
                    Cadastrar Morador
                  </NavLink>
                  <NavLink to="/tenant/search" className="navbar-item">
                    Pesquisar Morador
                  </NavLink>
                  <NavLink to="/tenant/update" className="navbar-item">
                    Atualizar Morador
                  </NavLink>
                  <NavLink to="/tenant/delete" className="navbar-item">
                    Remover Morador
                  </NavLink>
                </div>
              </div>
              <div className="navbar-item has-dropdown is-hoverable">
                <a className="navbar-link">Apartamento</a>

                <div className="navbar-dropdown">
                  <NavLink to="/apartment/register" className="navbar-item">
                    Cadastrar Apartamento
                  </NavLink>
                  <NavLink to="/apartment/search" className="navbar-item">
                    Pesquisar Apartamento
                  </NavLink>
                  <NavLink to="/apartment/update" className="navbar-item">
                    Atualizar Apartamento
                  </NavLink>
                  <NavLink to="/apartment/delete" className="navbar-item">
                    Remover Apartamento
                  </NavLink>
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
