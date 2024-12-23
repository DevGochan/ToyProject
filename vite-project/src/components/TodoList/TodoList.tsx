interface TodoItemProps {
  id: number;
  text: string;
  completed: boolean;
  onClickDelete(id: number): void;
}

const TodoList = ({ id, text, completed, onClickDelete }: TodoItemProps) => {
  return (
    <li className="todoContainer">
      {completed ? <button>완료됨</button> : <button>완료하기</button>}
      <p>{text}</p>
      <div className="buttonContainer">
        <button type="button">수정</button>
        <button type="button" onClick={() => onClickDelete(id)}>
          삭제
        </button>
      </div>
    </li>
  );
};

export default TodoList;
