import styled from 'styled-components';
import React, { useState } from 'react';
import { db } from '../../firebase-config';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { useAuth } from '../../UserContext';

interface WriteFormProps {
  closeModal: () => void;
  postCount: number; // 게시글 수 추가
}

const WriteForm: React.FC<WriteFormProps> = ({ closeModal, postCount }) => {
  const { userData } = useAuth();
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userData) {
      alert('로그인이 필요한 서비스입니다.');
      return;
    }
    try {
      await addDoc(collection(db, 'Community'), {
        title: title,
        content: content,
        userID: userData.uid,
        created: Timestamp.now(),
        postCount: postCount + 1,
        userNickname: userData.displayName,
        userImage: userData.photoURL,
        views: 0,
        likes: 0,
      });
      alert('게시글 작성이 완료되었습니다!');
      closeModal();
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  return (
    <ModalOverlay>
      <ModalContainer>
        <h2>글쓰기</h2>
        <Form onSubmit={handleSubmit}>
          <Label>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="제목"
            />
          </Label>
          <Label>
            <TextArea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              placeholder="내용"
            />
          </Label>
          <ButtonContainer>
            <CancelButton type="button" onClick={closeModal}>
              취소
            </CancelButton>
            <SubmitButton type="submit">작성</SubmitButton>
          </ButtonContainer>
        </Form>
      </ModalContainer>
    </ModalOverlay>
  );
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(5px); /* 배경 흐림 효과 */
`;

const ModalContainer = styled.div`
  background-color: #ffffff;
  padding: 30px;
  border-radius: 10px;
  width: 60%; /* 고정된 너비 */
  max-width: 800px; /* 최대 너비 설정 */
  height: auto; /* 높이는 자동으로 조정 */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  animation: fadeIn 0.3s ease;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 10px;
  margin-top: 10px;
  font-weight: bold; /* 라벨 텍스트를 두껍게 */
`;

const Input = styled.input`
  padding: 15px; /* 패딩 증가 */
  margin-top: 5px;
  border: 1px solid #cccccc;
  border-radius: 5px;
  font-size: 18px; /* 폰트 크기 증가 */

  &:focus {
    border-color: #007bff;
    outline: none; /* 기본 포커스 스타일 제거 */
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5); /* 포커스 시 그림자 추가 */
  }
`;

const TextArea = styled.textarea`
  padding: 15px; /* 패딩 증가 */
  margin-top: 5px;
  border: 1px solid #cccccc;
  border-radius: 5px;
  resize: vertical;
  font-size: 18px; /* 폰트 크기 증가 */
  height: 400px; /* 높이 고정 */
  width: 90%;

  &:focus {
    border-color: #007bff;
    outline: none; /* 기본 포커스 스타일 제거 */
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5); /* 포커스 시 그림자 추가 */
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const SubmitButton = styled.button`
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3; /* 더 어두운 파랑으로 변경 */
  }
`;

const CancelButton = styled.button`
  padding: 10px 15px;
  background-color: #d9534f;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c9302c; /* 더 어두운 빨강으로 변경 */
  }
`;

export default WriteForm;
