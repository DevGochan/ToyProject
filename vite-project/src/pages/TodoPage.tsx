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

// 각 Todo 항목의 구조
interface TList {
  id: string; // 특정 todo 항목을 고유하게 식별
  text: string;
  completed: boolean;
  userID: string; // Todo 항목을 생성한 사용자
}

const TodoPage: React.FC = () => {
  const [inputText, setInputText] = useState(''); // 입력 필드의 텍스트 관리
  const [todoList, setTodoList] = useState<TList[]>([]); // Todo 항목의 배열 관리
  const { userData } = useAuth(); // 현재 로그인된 사용자의 정보

  const textTypingHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 입력 길이를 체크하여 25자 이하일 경우에만 상태 업데이트
    if (e.target.value.length <= 25) {
      setInputText(e.target.value);
    }
  };

  // Todo 추가시 호출
  const textInputHandler = async (
    event: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault(); // HTML 폼의 기본 동작(페이지 새로고침)을 막기 위해 사용

    if (!userData) {
      alert('로그인이 필요한 서비스입니다.');
      return;
    }

    try {
      await addDoc(collection(db, 'TodoList'), {
        Todo: inputText,
        completed: false,
        created: Timestamp.now(),
        userID: userData.uid,
      });
      setInputText(''); // 입력 후 텍스트 초기화. 문서 저장이 완료된 이후에 실행됨
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  // 컴포넌트가 마운트될 때 Firestore에서 Todo항목을 실시간으로 로드해옴
  useEffect(() => {
    if (!userData) return;

    const q = query(collection(db, 'TodoList'), orderBy('created')); // 데이터 로드 쿼리

    // onSnapshot => DB 실시간 데이터 변경 감지. 감지 시 호출됨
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newTodoList: TList[] = snapshot.docs // snapshot.docs => DB에서 가져온 문서배열
        .map((doc) => ({
          id: doc.id, // 문서의 고유 ID
          text: doc.data().Todo,
          completed: doc.data().completed || false,
          userID: doc.data().userID, // 사용자 ID 추가
        }))
        .filter((todo) => todo.userID === userData.uid); // 로그인한 사용자와 일치하는 항목만 필터링
      setTodoList(newTodoList); // 필터링된 상태 업데이트
    });
    return () => unsubscribe(); // 컴포넌트 언마운트 시 리스너 해제
  }, [userData]); // userData가 변경될 때마다 useEffect 훅을 실행

  // TodoList 삭제 함수
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

  // TodoList 수정 함수
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
        completed: newTodo.completed,
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
          <h1>
            {userData ? (
              <h2>{`${userData.displayName}'s TodoList`}</h2>
            ) : (
              <h2>로그인 해주세요!</h2>
            )}
          </h1>
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
              userID={item.userID}
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
  height: 50vh;
  .entireContainer {
    width: 60%;
    height: 70%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    h1 {
      background-color: #89ade1;
      color: #fff;
      text-align: center;
      padding: 10px;
      box-sizing: border-box;
    }
  }
`;

export default TodoPage;
