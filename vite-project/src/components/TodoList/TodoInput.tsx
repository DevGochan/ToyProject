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
  border-bottom: 1px solid #fff;
  width: 100%;
  display: flex;
  justify-content: center;

  form {
    display: flex; // form 요소에도 flex 사용
    width: 100%; // form의 너비를 100%로 설정
  }

  input {
    width: 80%;
    height: 40px; // 높이를 명시적으로 설정
    border: none;
    border-bottom: 1px solid #89ade1;
    text-align: center;
    align-items: center;
    line-height: 40px; // 높이에 맞춰서 수직 정렬
    padding: 5px;
    margin: 0; // 마진 제거
    &:focus {
      outline: none;
    }
  }

  button {
    width: 20%;
    background-color: #89ade1;
    color: white;
    font-weight: 900;
    border: none;
    padding: 10px;
    cursor: pointer;
    display: flex; // 아이콘과 텍스트를 중앙 정렬하기 위해 flex 사용
    align-items: center; // 수직 중앙 정렬
    justify-content: center; // 수평 중앙 정렬

    &:active {
      box-shadow: inset -0.3rem -0.1rem 1.4rem #fbfbfb,
        inset 0.3rem 0.4rem 0.8rem #bec5d0;
      cursor: pointer;
    }

    svg {
      font-size: 30px; // 아이콘 크기 조정
    }
  }
`;

export default TodoInput;
