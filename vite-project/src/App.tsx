import './App.css';
import TodoTemplate from './pages/TodoList/TodoTemplate';
import TodoInsert from './pages/TodoList/TodoInsert';
import { Route, Routes } from 'react-router-dom';
import Main from './pages/MainPage';
import TodoList from './pages/TodoList/TodoList';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/TodoTemplate" element={<TodoTemplate />} />
      </Routes>
    </div>
  );
}

export default App;

//  https://www.youtube.com/watch?v=8VilHGPmrck 참고
