import { createRoot } from "react-dom/client";
import Note from "./components/Note";
import Login from "./components/Login.jsx";
import Index from "./components/Index.jsx";
import Register from "./components/Register.jsx";
import Error from "./components/404.jsx";



const root = createRoot(document.getElementById("app"));
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
    default:
      component = <Error />
}
root.render(component);
