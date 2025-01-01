import './App.css';
import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import TodoPage from './pages/TodoPage';
import Header from './components/Header';
import CommunityPage from './pages/CommunityPage';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/TodoPage" element={<TodoPage />} />
        <Route path="/CommunityPage" element={<CommunityPage />} />
      </Routes>
    </div>
  );
}

export default App;
