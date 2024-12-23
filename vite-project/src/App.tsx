import './App.css';
import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import TodoPage from './pages/TodoPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/TodoPage" element={<TodoPage />} />
      </Routes>
    </div>
  );
}

export default App;
