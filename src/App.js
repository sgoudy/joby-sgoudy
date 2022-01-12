import { Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import Home from './components/Home';

function App() {
  return (
    <Router>
          <Routes>
            <Route exact path="/" element={<Home />}/>
            <Route path="*" element={<Home/>}/>
          </Routes>
    </Router>

  );
}

export default App;
