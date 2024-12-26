import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <HeaderContainer>
      <Logo>이것저것 기능구현 사이트</Logo>
      <Nav>
        <NavItem>
          <StyledLink to="/">Home</StyledLink>
        </NavItem>
        <NavItem>
          <StyledLink to="/TodoPage">Todo</StyledLink>
        </NavItem>
        <NavItem>
          <StyledLink to="/Board">게시판-구현중</StyledLink>
        </NavItem>
      </Nav>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #333;
  color: white;
`;

const Logo = styled.h1`
  font-size: 1.5rem;
`;

const Nav = styled.nav`
  display: flex;
`;

const NavItem = styled.div`
  margin-left: 2rem;
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

export default Header;
