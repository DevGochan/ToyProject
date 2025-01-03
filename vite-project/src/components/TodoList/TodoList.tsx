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

interface TodoItemProps {
  id: string; // id 타입을 string으로 변경
  text: string;
  completed: boolean;
  userID: string; // userID 추가
  onClickDelete: (id: string) => void;
  onClickUpdate: (newTodo: {
    id: string;
    text: string;
    completed: boolean;
    userID: string; // userID 추가
  }) => void; // userID 추가
}

const TodoList = ({
  id,
  text,
  completed,
  userID, // userID 추가
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
      completed: completed, // 완료 상태는 그대로 유지
      userID: userID, // userID 추가
    };
    onClickUpdate(updatedTodoItem);
    setIsUpdating(false);
  };

  const handleComplete = () => {
    const updatedTodoItem = {
      id: id,
      text: text,
      completed: !completed,
      userID: userID, // userID 추가
    };
    onClickUpdate(updatedTodoItem);
  };

  return (
    <div>
      {!isUpdating ? (
        <TodoContainer>
          {completed ? (
            <div style={{ width: '100px', fontSize: '30px' }}>
              <FaCheckSquare onClick={handleComplete} />
            </div>
          ) : (
            <div style={{ width: '100px', fontSize: '30px' }}>
              <MdCheckBoxOutlineBlank onClick={handleComplete} />
            </div>
          )}
          <p style={completed ? { textDecoration: 'line-through' } : undefined}>
            {text}
          </p>
          <div className="buttonContainer">
            <MdEdit onClick={() => setIsUpdating(true)} aria-label="Edit" />
            <MdDelete onClick={() => onClickDelete(id)} aria-label="Delete" />
          </div>
        </TodoContainer>
      ) : (
        <TodoContainer>
          <form onSubmit={handleFormSubmit} style={{ width: '100%' }}>
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
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  border-left-width: 10px;
  border-left-color: #89ade1;
  margin-bottom: 10px;
  background-color: #f9f9f9;
  box-sizing: border-box;

  p {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
  }

  .buttonContainer {
    display: flex;
    align-items: center;
    width: auto;

    svg {
      width: 30px;
      margin-left: 10px;
      cursor: pointer;
      font-size: 24px;
      padding: 10px;
      border-radius: 5px;
      transition: background-color 0.3s;

      &:hover {
        background-color: #e0e0e0;
      }
    }
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
