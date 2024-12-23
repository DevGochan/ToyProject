import styled from 'styled-components';
import { MdAdd } from 'react-icons/md';
import React from 'react';

interface InputTextProps {
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
  onSubmit(event: React.FormEvent<HTMLFormElement>): void;
  inputText: string;
}

const TodoInput = ({ onChange, onSubmit, inputText }: InputTextProps) => {
  return (
    <TodoInputContainer>
      <form onSubmit={(event) => onSubmit(event)}>
        <input
          onChange={(e) => onChange(e)}
          type="text"
          placeholder="할 일을 입력하세요"
          value={inputText}
        />
        <button type="submit">
          <MdAdd />
        </button>
      </form>
    </TodoInputContainer>
  );
};

const TodoInputContainer = styled.div`
  border-bottom: 1px solid #f9e3bc;
  width: 100%;
  display: flex;
  justify-content: center;
  input {
    width: 100%;
    border: none;
    border-bottom: 1px solid #f9e3bc;
    &:focus {
      outline: none;
    }
  }
  button {
    width: 30%;
    background-color: #f9e3bc;
    color: white;
    font-weight: 900;
    border: none;
    padding: 10px;
    cursor: pointer;
    &:active {
      box-shadow: inset -0.3rem -0.1rem 1.4rem #fbfbfb,
        inset 0.3rem 0.4rem 0.8rem #bec5d0;
      cursor: pointer;
    }
  }
`;
export default TodoInput;
