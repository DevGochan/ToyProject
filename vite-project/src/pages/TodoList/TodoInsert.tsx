import { MdAdd } from 'react-icons/md';
import styled from 'styled-components';

const TodoInsert = () => {
  return (
    <TodoInsertWrapper>
      <input type="text" placeholder="할 일을 입력하세요" />
      <button>
        <MdAdd />
      </button>
    </TodoInsertWrapper>
  );
};

const TodoInsertWrapper = styled.form`
  display: flex;
  background: #495057;

  input {
    flex: 9;
    background: none;
    outline: none;
    border: none;
    padding: 0.5rem;
    font-size: 1.125rem;
    line-height: 1.5;
    color: #fff;
    &::placeholder {
      color: #fff;
    }
  }

  button {
    flex: 1;
    background: #868296;
    outline: none;
    border: none;
    color: #fff;
    padding: 1rem;
    font-size: 1.125rem;
    cursor: pointer;
    transition: all 0.2s;
    &:hover {
      background: #adb5bd;
    }
  }
`;

export default TodoInsert;
