import styled from 'styled-components';
import TodoInput from '../components/TodoList/TodoInput';
import TodoList from '../components/TodoList/TodoList';
import React, { useState } from 'react';

interface TList {
  id: number;
  text: string;
  completed: boolean;
}

const TodoPage = () => {
  const [inputText, setInputText] = useState('');
  const [todoList, setTodoList] = useState<TList[]>([
    {
      id: 1,
      text: '할일 1',
      completed: false,
    },
    { id: 2, text: '할일 2', completed: false },
  ]);

  const textTypingHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const textInputHandler = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const newTodo: TList = {
      id: Date.now(),
      text: inputText,
      completed: false,
    };
    setTodoList([...todoList, newTodo]);
    setInputText('');
  };

  const textDeleteHandler = (id: number) => {
    setTodoList(todoList.filter((todoItem) => todoItem.id !== id));
  };

  const textUpdateHandler = (newTodo: TList): void => {
    const newTodoList = todoList.map((item) => {
      if (item.id === newTodo.id) {
        return newTodo;
      } else {
        return item;
      }
    });
    setTodoList(newTodoList);
  };

  return (
    <>
      <HomeContainer>
        <div className="entireContainer">
          <h1>TodoList</h1>
          <TodoInput
            onChange={textTypingHandler}
            onSubmit={textInputHandler}
            inputText={inputText}
          />
          {todoList.map((item) => (
            <TodoList
              id={item.id}
              text={item.text}
              completed={item.completed}
              onClickDelete={textDeleteHandler}
              onClickUpdate={textUpdateHandler}
            />
          ))}
        </div>
      </HomeContainer>
    </>
  );
};

const HomeContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  .entireContainer {
    width: 60%;
    height: 70%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    border: 1px solid #f9e3bc;
    h1 {
      background-color: #f9e3bc;
      color: #fff;
      text-align: center;
      padding: 10px;
      box-sizing: border-box;
    }
  }
`;

export default TodoPage;
