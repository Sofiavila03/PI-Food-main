import './App.css';
import { Routes, Route, useLocation } from "react-router-dom";
import { Detail, LandingPage, Home, NavBar, About, Form } from './components';

function App() {
  const location = useLocation();
  return (
    <div className="App">
      <div>{location.pathname !== "/" && <NavBar />}</div>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />;
        <Route path="/home" element={<Home />} />;
        <Route path="/detailrecipe/:id" element={<Detail />} />;
        <Route path="/about" element={<About />} />;
        <Route path="/createfood" element={<Form />} />;
      </Routes>
    </div>
  );
}

export default App;