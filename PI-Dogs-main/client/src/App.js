import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import Landing from "./components/landingPage/LandingPage";
import Home from "./components/home/Home";
import Detail from "./components/detail/Detail";
import Form from "./components/form/Form";
import NavBar from "./components/navBar/NavBar";
import About from "./components/about/About";
import Contact from "./components/contact/Contact";

function App() {
  const location = useLocation();
  return (
    <div>
      {location.pathname !== "/" && <NavBar />}
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/detail/:id" element={<Detail />} />
        <Route exact path="/createDog" element={<Form />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
}

export default App;