import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { auth } from '../../src/firebase-config';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { MdLogin } from 'react-icons/md';
import { CiLogout } from 'react-icons/ci';
import { RiHome2Line } from 'react-icons/ri';
import { FaList } from 'react-icons/fa';
import { PiClipboardTextBold } from 'react-icons/pi';
import { useAuth } from '../UserContext';

const Header = () => {
  const { userData, setUserData } = useAuth();

  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((data) => {
        setUserData(data.user);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLogout = () => {
    auth.signOut().then(() => {
      setUserData(null);
    });
  };

  return (
    <HeaderContainer>
      <Logo>이것저것 기능구현 사이트</Logo>
      <Nav>
        <NavItem>
          <StyledLink to="/" style={{ fontSize: '24px' }}>
            <RiHome2Line style={{ fontSize: '40px' }} />
            Home
          </StyledLink>
        </NavItem>
        <NavItem>
          <StyledLink to="/TodoPage" style={{ fontSize: '24px' }}>
            <FaList style={{ fontSize: '40px' }} />
            Todo
          </StyledLink>
        </NavItem>
        <NavItem>
          <StyledLink to="/CommunityPage" style={{ fontSize: '24px' }}>
            <PiClipboardTextBold style={{ fontSize: '40px' }} />
            게시판
          </StyledLink>
        </NavItem>
        <NavItem>
          {userData ? (
            <StyledLink
              to="/"
              onClick={handleLogout}
              style={{
                fontSize: '24px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
              }}
            >
              {userData.photoURL ? (
                <img
                  src={userData.photoURL}
                  alt="User Avatar"
                  style={{
                    width: '40px',
                    borderRadius: '50%',
                    marginBottom: '8px',
                  }}
                />
              ) : (
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: '#ccc',
                    marginBottom: '8px',
                  }}
                />
              )}
              {userData.displayName}
              <CiLogout style={{ fontSize: '40px', marginBottom: '-10px' }} />
            </StyledLink>
          ) : (
            <StyledLink
              to="#"
              onClick={handleGoogleLogin}
              style={{
                fontSize: '24px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
              }}
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

const HeaderContainer = styled.header`
  display: flex;
  height: 120px;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #333; /* 어두운 배경 */
  color: white;
  font-size: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2); /* 그림자 추가 */
`;

const Logo = styled.h1`
  font-size: 1.5rem;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
`;

const NavItem = styled.div`
  margin-left: 2rem;
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.3s ease; /* 부드러운 전환 효과 */
  padding: 8px; /* 패딩 추가 */
  line-height: 1.2; /* 라인 높이 조정 */

  &:hover {
    color: #ffcc00; /* 호버 시 색상 변경 */
    transform: translateY(-3px); /* 위로 이동 효과 */
  }

  img {
    border-radius: 50%; /* 프로필 이미지 둥글게 */
  }
`;

export default Header;
