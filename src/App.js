import logo from './logo.svg';
import './App.css';
import Repos from './Repos';
import Repo from './Repo';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">

        <header className="App-header">

          <Routes>
            <Route path="repos" element={<Repos />} />
            <Route path="repos/:orgName" element={<Repos />} />
            <Route path="repos/:orgName/:repoName" element={<Repo />} />
          </Routes>

          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>


      </div>
    </BrowserRouter >
  );
}

export default App;
