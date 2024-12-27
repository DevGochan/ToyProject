import styled from 'styled-components';
import TodoInput from '../components/TodoList/TodoInput';
import TodoList from '../components/TodoList/TodoList';
import React, { useState, useEffect } from 'react';
import { db } from '../firebase-config';
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  Timestamp,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { useAuth } from '../UserContext';

interface TList {
  id: string; // Firestore의 문서 ID를 사용할 것이므로 string으로 변경
  text: string;
  completed: boolean;
  userID: string; // userID 추가
}

const TodoPage: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [todoList, setTodoList] = useState<TList[]>([]);
  const { userData } = useAuth();

  const textTypingHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 입력 길이를 체크하여 25자 이하일 경우에만 상태 업데이트
    if (e.target.value.length <= 25) {
      setInputText(e.target.value);
    }
  };

  const textInputHandler = async (
    event: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();

    if (!userData) {
      alert('로그인이 필요한 서비스입니다.');
      return;
    }

    try {
      await addDoc(collection(db, 'TodoList'), {
        Todo: inputText,
        created: Timestamp.now(),
        userID: userData.uid, // 현재 사용자의 ID 추가
        completed: false, // completed 필드 추가
      });

      setInputText(''); // 입력 후 텍스트 초기화
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  useEffect(() => {
    if (!userData) return; // 사용자가 로그인하지 않은 경우

    const q = query(collection(db, 'TodoList'), orderBy('created'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newTodoList: TList[] = snapshot.docs
        .map((doc) => ({
          id: doc.id,
          text: doc.data().Todo,
          completed: doc.data().completed || false, // completed 필드도 포함
          userID: doc.data().userID, // 사용자 ID 추가
        }))
        .filter((todo) => todo.userID === userData.uid); // 로그인한 사용자와 일치하는 항목만 필터링

      setTodoList(newTodoList); // 필터링된 상태 업데이트
    });

    return () => unsubscribe(); // 컴포넌트 언마운트 시 리스너 해제
  }, [userData]); // userData가 변경될 때마다 실행

  const textDeleteHandler = async (id: string) => {
    // Firestore에서 해당 문서 삭제
    try {
      await deleteDoc(doc(db, 'TodoList', id));
      // 로컬 상태에서 삭제
      setTodoList(todoList.filter((todoItem) => todoItem.id !== id));
    } catch (error) {
      console.error('Error deleting document: ', error);
    }
  };

  const textUpdateHandler = async (newTodo: TList): Promise<void> => {
    // Firestore에 업데이트
    try {
      // 기존 todo를 찾기
      const existingTodo = todoList.find((item) => item.id === newTodo.id);

      if (existingTodo && existingTodo.text !== newTodo.text) {
        // 입력받은 값과 기존 값이 다를 경우 completed를 false로 변경
        newTodo.completed = false;
      }

      await updateDoc(doc(db, 'TodoList', newTodo.id), {
        Todo: newTodo.text,
        completed: newTodo.completed, // completed 필드도 업데이트
      });

      // 로컬 상태에서 업데이트
      const newTodoList = todoList.map((item) => {
        if (item.id === newTodo.id) {
          return newTodo; // 새로운 todo로 교체
        } else {
          return item; // 변경 없음
        }
      });
      setTodoList(newTodoList);
    } catch (error) {
      console.error('Error updating document: ', error);
    }
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
              key={item.id} // key prop 추가
              id={item.id}
              text={item.text}
              completed={item.completed}
              userID={item.userID} // userID 추가
              onClickDelete={textDeleteHandler} // 삭제 핸들러 추가
              onClickUpdate={textUpdateHandler} // 수정 핸들러 추가
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
