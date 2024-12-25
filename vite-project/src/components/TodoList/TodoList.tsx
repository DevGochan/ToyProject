import { useState } from 'react';
import styled from 'styled-components';
import {
  MdCheckBoxOutlineBlank,
  MdEdit,
  MdDelete,
  MdCancel,
} from 'react-icons/md';
import { FaCheckSquare } from 'react-icons/fa';
import { LiaSave } from 'react-icons/lia';

interface TList {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoItemProps {
  id: number;
  text: string;
  completed: boolean;
  onClickDelete(id: number): void;
  onClickUpdate(updatedTodoItem: TList): void;
}

const TodoList = ({
  id,
  text,
  completed,
  onClickDelete,
  onClickUpdate,
}: TodoItemProps) => {
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [updatedText, setUpdatedText] = useState<string>(text);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedText(event.target.value);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const updatedTodoItem = {
      id: id,
      text: updatedText,
      completed: updatedText == text || completed == false ? completed : false,
    };
    onClickUpdate(updatedTodoItem);
    setIsUpdating(false);
  };

  const handleComplete = () => {
    const updatedTodoItem = {
      id: id,
      text: text,
      completed: !completed,
    };
    onClickUpdate(updatedTodoItem);
  };

  return (
    <div>
      {!isUpdating ? (
        <TodoContainer>
          {completed ? (
            <FaCheckSquare onClick={handleComplete} />
          ) : (
            <MdCheckBoxOutlineBlank onClick={handleComplete} />
          )}
          <p style={completed ? { textDecoration: 'line-through' } : undefined}>
            {text}
          </p>
          <div className="buttonContainer">
            <MdEdit onClick={() => setIsUpdating(true)} />
            <MdDelete onClick={() => onClickDelete(id)} />
          </div>
        </TodoContainer>
      ) : (
        <TodoContainer>
          <form onSubmit={handleFormSubmit}>
            <input
              type="text"
              value={updatedText}
              onChange={handleInputChange}
            />
            <div className="buttonContainer">
              <button
                type="submit"
                style={{ background: 'none', border: 'none', padding: 0 }}
              >
                <LiaSave />
              </button>
              <MdCancel type="button" onClick={() => setIsUpdating(false)} />
            </div>
          </form>
        </TodoContainer>
      )}
    </div>
  );
};

const TodoContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px; // 패딩 추가
  border: 1px solid #ccc;
  border-radius: 5px;
  border-left-width: 10px;
  border-left-color: #f9e3bc;
  margin-bottom: 10px;
  background-color: #f9f9f9;
  box-sizing: border-box; // 박스 크기 계산 방식 변경

  p {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1; /* 원하는 줄 수 */
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
  }

  .buttonContainer {
    display: flex; // flexbox로 변경
    align-items: center; // 수직 중앙 정렬
    width: auto; // 자동 너비로 설정

    svg {
      width: 30px;
      margin-left: 10px; // 버튼 간의 간격 조정
      cursor: pointer;
      font-size: 24px; // 아이콘 크기 조정
      padding: 10px; // 아이콘 주변에 패딩 추가
      border-radius: 5px; // 아이콘에 둥근 테두리 추가
      transition: background-color 0.3s; // 부드러운 배경색 전환

      &:hover {
        background-color: #e0e0e0; // 호버 시 배경색 변경
      }
    }
  }

  svg {
    width: 10%;
    font-size: 30px;
  }

  input {
    width: 100%;
    height: 32px;
    font-size: 15px;
    border: 0;
    border-radius: 15px;
    outline: none;
    padding-left: 10px;
    background-color: rgb(233, 233, 233);
  }

  form {
    display: flex;
    align-items: center;
    height: 100%;
  }
`;

export default TodoList;
