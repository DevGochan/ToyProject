import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { auth } from '../../src/firebase-config';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useState } from 'react';
import { MdLogin } from 'react-icons/md';
import { CiLogout } from 'react-icons/ci';
import { RiHome2Line } from 'react-icons/ri';
import { FaList } from 'react-icons/fa';
import { PiClipboardTextBold } from 'react-icons/pi';

type User = {
  uid: string;
  displayName: string | null;
  email: string | null;
  // 필요한 다른 사용자 속성 추가
};

const Header = () => {
  const [userData, setUserData] = useState<User | null>(null);

  function handleGoogleLogin() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((data) => {
        setUserData(data.user); // user data 설정
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleLogout = () => {
    auth.signOut().then(() => {
      setUserData(null); // 로그아웃 시 상태 초기화
    });
  };

  return (
    <HeaderContainer>
      <Logo>이것저것 기능구현 사이트</Logo>
      <Nav>
        <NavItem>
          <StyledLink to="/" style={{ fontSize: '24px', alignItems: 'center' }}>
            <RiHome2Line style={{ fontSize: '40px', marginBottom: '-10px' }} />
            Home
          </StyledLink>
        </NavItem>
        <NavItem>
          <StyledLink
            to="/TodoPage"
            style={{ fontSize: '24px', alignItems: 'center' }}
          >
            <FaList style={{ fontSize: '40px', marginBottom: '-10px' }} />
            Todo{' '}
          </StyledLink>
        </NavItem>
        <NavItem>
          <StyledLink
            to="/CommunityPage"
            style={{ fontSize: '24px', alignItems: 'center' }}
          >
            <PiClipboardTextBold
              style={{ fontSize: '40px', marginBottom: '-10px' }}
            />
            게시판
          </StyledLink>
        </NavItem>
        <NavItem>
          {userData ? (
            <StyledLink
              to="/"
              onClick={handleLogout}
              style={{ fontSize: '24px', alignItems: 'center' }}
            >
              <MdLogin style={{ fontSize: '40px', marginBottom: '-10px' }} />
              로그아웃
            </StyledLink>
          ) : (
            <StyledLink
              to="#"
              onClick={handleGoogleLogin}
              style={{ fontSize: '24px', alignItems: 'center' }}
            >
              <MdLogin style={{ fontSize: '40px', marginBottom: '-10px' }} />
              로그인
            </StyledLink>
          )}
        </NavItem>
      </Nav>
    </HeaderContainer>
  );
};

const Logined = styled.div`
  display: flex;
  align-items: center; // 아이콘과 텍스트가 수직 정렬되도록 추가
  span {
    margin-right: -20px; // 아이콘과 텍스트 사이에 간격 추가
  }
`;

const LogoutIcon = styled(CiLogout)`
  font-size: 30px; // 원하는 크기로 조정
`;

const HeaderContainer = styled.header`
  display: flex;
  height: 100px;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #777;
  color: white;
  font-size: 20px;
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
