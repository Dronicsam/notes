import { createRoot } from "react-dom/client";
import Note from "./components/Note";
import Login from "./components/Login.jsx"
import Index from "./components/Index.jsx"
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
}
root.render(component);
