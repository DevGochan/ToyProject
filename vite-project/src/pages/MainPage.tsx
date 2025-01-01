import styled from 'styled-components';
import { Link } from 'react-router-dom';
import todoImage from './../../src/images/1-731f7d48.png';
import comunityImage from './../../src/images/community.png';

const MainPage = () => {
  return (
    <ButtonContainer>
      <Link to="/TodoPage" style={{ display: 'contents' }}>
        <TodoBtn>
          <img
            src={todoImage}
            alt="Todo List image"
            style={{ borderRadius: '10px', width: '100%', height: '100%' }} // 이미지 크기 조정
          />
        </TodoBtn>
      </Link>
      <Link to="/CommunityPage" style={{ display: 'contents' }}>
        <TodoBtn>
          <img
            src={comunityImage}
            alt="comunity image"
            style={{ borderRadius: '10px', width: '100%', height: '100%' }} // 이미지 크기 조정
          />
        </TodoBtn>
      </Link>
    </ButtonContainer>
  );
};

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center; /* 버튼들을 중앙 정렬 */
  margin-top: 100px; /* 상단 여백 */
`;

const TodoBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30%; /* 버튼 너비 조정 */
  height: 30%; /* 버튼 높이 조정 */
  margin: 0 10px; /* 좌우 여백 추가 */
  border-radius: 20px;
  background-color: #f0f0f0;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  overflow: hidden; /* 이미지가 버튼 크기를 넘지 않도록 설정 */

  transition: transform 0.2s, background-color 0.2s;

  &:hover {
    transform: scale(1.05);
    background-color: #e0e0e0;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  }
`;

export default MainPage;
