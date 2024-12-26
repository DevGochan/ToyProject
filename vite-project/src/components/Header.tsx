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
    <>
      <h1>Header</h1>
    </>
  );
};

export default Header;
