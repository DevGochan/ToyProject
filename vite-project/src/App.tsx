import './App.css';
import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import TodoPage from './pages/TodoPage';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/TodoPage" element={<TodoPage />} />
      </Routes>
    </div>
  );
}

export default App;
