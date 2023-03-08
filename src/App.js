import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Listimages from "./components/Listimages";
import Labelimage from "./components/Labelimage";
import CreateImage from "./components/CreateImage";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Listimages />} />
          <Route path='/create-image' element={<CreateImage />} />
          <Route path='/label-image' element={<Labelimage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
