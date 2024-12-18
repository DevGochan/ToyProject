import styled from 'styled-components';
import TodoList from './TodoList';
import TodoInsert from './TodoInsert';
import { useState } from 'react';

const TodoTemplate = () => {
  return (
    <TodoWrapper>
      <AppTitle>Todo List</AppTitle>
      <TodoInsert />
      <TodoList />
    </TodoWrapper>
  );
};

// styled-components
const TodoWrapper = styled.div`
  width: 512px;
  margin: 6rem auto 0;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 0 5px #ccc;
  padding: 0;
`;

const AppTitle = styled.h1`
  background: #f9e3bc;
  font-size: 20px;
  height: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #000;
  font-weight: 400;
`;

export default TodoTemplate;
