// Firebase 인증 상태 관리를 위한 컴포넌트. context와 provider을 설정.

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';

// 인증 상태를 관리하기 위한 데이터 구조 정의. 현재 사용자 데이터와 그 데이터를 설정하는 함수 포함
interface AuthContextType {
  userData: User | null;
  setUserData: (user: User | null) => void;
}

// 인증 상태를 전역 관리하기 위해 context 생성.초기값으로 undefined.
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// children을 받아서 해당 컴포넌트를 감싸는 역할. 이 컴포 내에서 사용자 인증 상태를 관리함
export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [userData, setUserData] = useState<User | null>(null);
  const auth = getAuth();

  // useEffect로 Firebase의 인증 상태 변화 감지
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserData(user); // 로그인 상태 관리
    });
    return () => unsubscribe();
  }, [auth]);

  return (
    <AuthContext.Provider value={{ userData, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

// 현재 인증 상태를 가져옴
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a UserProvider');
  }
  return context;
};
