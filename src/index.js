import { createRoot } from "react-dom/client";

import Note from "./components/Note";
import Login from "./components/Login.jsx";
import Index from "./components/Index.jsx";
import Register from "./components/Register.jsx";
import Error from "./components/404.jsx";
import Account from "./components/Account.jsx";

import { isSession } from "./components/Is_Session.js";


const root = createRoot(document.getElementById("app"));

const token = localStorage.getItem("access_token");

isSession(token)

let component
  switch (window.location.pathname) {
    case "/":
      component = <Index />
      break
    case "/note":
      component = <Note />
      break
    case "/login":
      component = <Login />
      break
    case "/register":
      component = <Register />
      break
    case "/logout":
      component = <Index />
      localStorage.clear()
      break
    case "/account":
      if (token){
        component = <Account />
        break
      }else {
        component = <Login />
        break
      }
    default:
      component = <Error />
}
root.render(component);
