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
  justify-content: center;
  margin-top: 100px;
`;

const TodoBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30%;
  height: 30%;
  margin: 0 10px;
  border-radius: 20px;
  background-color: #f0f0f0;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  overflow: hidden;

  transition: transform 0.2s, background-color 0.2s;

  &:hover {
    transform: scale(1.05);
    background-color: #e0e0e0;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  }
`;

export default MainPage;
