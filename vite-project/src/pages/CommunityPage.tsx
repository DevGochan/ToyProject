import styled from 'styled-components';
import PostList from '../components/Community/PostList';

const CommunityPage = () => {
  return (
    <>
      <HomeContainer>
        <div className="entireContainer">
          <h1>자유 게시판</h1>
          <PostList />
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
    width: 80%;
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
export default CommunityPage;
