import styled from 'styled-components';
import { Link } from 'react-router-dom';
import todoImage from './../../src/images/1-731f7d48.png';

const MainPage = () => {
  return (
    <>
      <Link to="/TodoPage" style={{ display: 'contents' }}>
        <TodoBtn>
          <img
            src={todoImage}
            alt="Todo List image"
            style={{ borderRadius: '10px' }}
          />
        </TodoBtn>
      </Link>
    </>
  );
};

const TodoBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30%;
  margin-top: 100px;
  border-radius: 20px;
  background-color: #f0f0f0;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  transition: transform 0.2s, background-color 0.2s; /* 부드러운 전환 효과 */
  
  &:hover {
    transform: scale(1.05); /* 살짝 확대 */
    background-color: #e0e0e0; /* 배경 색상 변경 */
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); /* 그림자 강조 */
`;

export default MainPage;
