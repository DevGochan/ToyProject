import { useState } from 'react';
import styled from 'styled-components';
import { MdCheckBoxOutlineBlank, MdEdit, MdDelete } from 'react-icons/md';
import { FaCheckSquare } from 'react-icons/fa';

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
  return (
    <TodoContainer>
      {completed ? <FaCheckSquare /> : <MdCheckBoxOutlineBlank />}
      <p>{text}</p>
      <div className="buttonContainer">
        <MdEdit />
        <MdDelete onClick={() => onClickDelete(id)} />
      </div>
    </TodoContainer>
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
`;

export default TodoList;
