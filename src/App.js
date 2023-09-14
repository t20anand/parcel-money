import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Input from './pages/input.jsx';
import Repo from './pages/repo.jsx';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Input/>}></Route>
          <Route path='/repo/:username/:repo' element={<Repo/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
