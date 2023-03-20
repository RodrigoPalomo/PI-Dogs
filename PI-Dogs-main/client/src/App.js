import "./App.css";
import { Routes, Route } from "react-router-dom";
import Landing from "./components/landingPage/LandingPage";
import Home from "./components/home/Home";
import Detail from "./components/detail/Detail";
import Form from "./components/form/Form";
import NavBar from "./components/navBar/NavBar";
import About from "./components/about/About";
import Contact from "./components/contact/Contact";

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/detail" element={<Detail />} />
        <Route exact path="/form" element={<Form />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
}

export default App;