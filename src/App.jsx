import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Quiz from "./Pages/Quiz";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz/:difficulty/:amount" element={<Quiz />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
