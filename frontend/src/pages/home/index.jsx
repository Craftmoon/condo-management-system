import React, { Fragment } from "react";
import ReceiptIcon from "@material-ui/icons/Receipt";
import Sidebar from "../../components/sidebar/sidebar.jsx";
import Header from "../../components/header/header.jsx";
import RegisterAparment from "../apartment/register/index.jsx";
import EditAparment from "../apartment/edit/index.jsx";
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch,
  useHistory,
} from "react-router-dom";

const Home = () => {
  const sidebarItems = [
    //"divider",
    {
      name: "apartment",
      label: "Apartamento",
      Icon: ReceiptIcon,
      items: [
        { name: "apartment/search", label: "Buscar", onClick },
        { name: "apartment/register", label: "Cadastrar", onClick },
        { name: "apartment/edit", label: "Editar", onClick },
        { name: "apartment/delete", label: "Excluir", onClick },
      ],
    },
    {
      name: "tenant",
      label: "Morador",
      Icon: ReceiptIcon,
      items: [
        { name: "tenant/search", label: "Buscar", onClick },
        { name: "tenant/register", label: "Cadastrar", onClick },
        { name: "tenant/edit", label: "Editar", onClick },
        { name: "tenant/delete", label: "Excluir", onClick },
      ],
    },
  ];

  const history = useHistory();

  function onClick(e, item) {
    let path = `${item.name}`;
    history.push(path);
  }

  return (
    <Fragment>
      <Header />
      <div className="page-body">
        <Sidebar items={sidebarItems} />
        <div className="page-content">
          <Switch>
            <Route
              path="/apartment/register"
              component={RegisterAparment}
              exact
            />
            <Route path="/apartment/edit" component={EditAparment} exact />
          </Switch>
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
