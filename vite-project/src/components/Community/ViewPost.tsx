import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { db } from '../../firebase-config'; // Firestore 설정 파일 가져오기
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { useAuth } from '../../UserContext';

interface Post {
  id: string;
  title: string;
  content: string; // 필요한 속성 추가
  userNickname?: string;
  userImage?: string;
  created: any; // 생성일 타입 (Date로 캐스팅할 수 있음)
  views: number;
  likes: number;
  postCount: number; // 번호 계산을 위한 속성
  likedBy?: string[]; // 추천한 사용자의 ID를 저장하는 배열
  comments?: Comment[]; // 댓글 데이터 추가
}

interface Comment {
  userId?: string | null;
  content: string;
  created: Date;
  userImage?: string | null;
  userNickname?: string | null;
  commentLikes: number;
  commentDisLikes: number;
  likedBy?: string[]; // 추천한 사용자 ID 배열
  dislikedBy?: string[]; // 비추천한 사용자 ID 배열
}

interface ViewPostProps {
  post: Post;
  closeModal: () => void;
}

const ViewPost: React.FC<ViewPostProps> = ({ post, closeModal }) => {
  const [views, setViews] = useState(post.views);
  const [likes, setLikes] = useState(post.likes);
  const [hasLiked, setHasLiked] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<any[]>(post.comments || []); // 댓글 상태
  const { userData } = useAuth();

  useEffect(() => {
    handleView(); // 컴포넌트가 마운트될 때 조회수 증가
    checkUserLike(); // 컴포넌트가 마운트될 때 추천 여부 확인
  }, []);

  const handleView = async () => {
    const updatedViews = views + 1;
    setViews(updatedViews);
    const postRef = doc(db, 'Community', post.id);
    await updateDoc(postRef, { views: updatedViews });
  };

  const checkUserLike = async () => {
    const postRef = doc(db, 'Community', post.id);
    const postDoc = await getDoc(postRef);
    if (postDoc.exists()) {
      const postData = postDoc.data();
      if (postData.likedBy && postData.likedBy.includes(userData)) {
        setHasLiked(true); // 이미 추천한 경우
      }
    }
  };

  const handleLike = async () => {
    if (!userData) {
      alert('로그인이 필요한 서비스입니다.');
      return;
    }
    const postRef = doc(db, 'Community', post.id);
    const postDoc = await getDoc(postRef);

    if (postDoc.exists()) {
      const postData = postDoc.data();
      const updatedLikes = likes + 1;
      const likedBy = postData.likedBy || [];

      // 추천한 사용자의 ID를 추가
      if (likedBy.length < 3) {
        likedBy.push(userData);
        setLikes(updatedLikes);
        await updateDoc(postRef, { likes: updatedLikes, likedBy });
      } else {
        alert('추천은 최대 3번까지 가능합니다.');
      }
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    if (!userData) {
      alert('로그인이 필요한 서비스입니다.');
    }

    e.preventDefault();
    if (!comment.trim()) return; // 빈 댓글은 제출하지 않음

    const newComment: Comment = {
      userId: userData?.uid,
      content: comment,
      created: new Date(),
      userImage: userData?.photoURL,
      userNickname: userData?.displayName,
      commentLikes: 0,
      commentDisLikes: 0,
      likedBy: [], // 초기화
      dislikedBy: [], // 초기화
    };

    const postRef = doc(db, 'Community', post.id);
    await updateDoc(postRef, {
      comments: [...comments, newComment],
    });

    setComments([...comments, newComment]); // 댓글 상태 업데이트
    setComment(''); // 입력 필드 초기화
  };

  const handleCommentLike = async (index: number) => {
    if (!userData) {
      alert('로그인이 필요한 서비스입니다.');
      return;
    }

    const updatedComments = [...comments];
    const comment = updatedComments[index];

    if (comment.userId === userData.uid) {
      alert('자신의 댓글은 추천할 수 없습니다.');
      return;
    }

    // 이미 추천한 경우
    if (comment.likedBy?.includes(post.id)) {
      alert('이미 추천한 댓글입니다.');
      return;
    }

    // 추천 수 증가 및 사용자 ID 추가
    comment.commentLikes += 1;
    comment.likedBy = [...(comment.likedBy || []), post.id];

    const postRef = doc(db, 'Community', post.id);
    await updateDoc(postRef, {
      comments: updatedComments,
    });

    setComments(updatedComments);
  };

  const handleCommentDislike = async (index: number) => {
    if (!userData) {
      alert('로그인이 필요한 서비스입니다.');
      return;
    }

    const updatedComments = [...comments];
    const comment = updatedComments[index];

    if (comment.userId === userData.uid) {
      alert('자신의 댓글은 비추천할 수 없습니다.');
      return;
    }

    // 이미 비추천한 경우
    if (comment.dislikedBy?.includes(post.id)) {
      alert('이미 비추천한 댓글입니다.');
      return;
    }

    // 비추천 수 증가 및 사용자 ID 추가
    comment.commentDisLikes += 1;
    comment.dislikedBy = [...(comment.dislikedBy || []), post.id];

    const postRef = doc(db, 'Community', post.id);
    await updateDoc(postRef, {
      comments: updatedComments,
    });

    setComments(updatedComments);
  };

  return (
    <ModalOverlay onClick={closeModal}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <Title>제목 : {post.title}</Title>
        <InfoTable>
          <thead>
            <tr>
              <th
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  paddingRight: '150px',
                }}
              >
                <img
                  src={post.userImage}
                  style={{
                    maxWidth: '30px',
                    borderRadius: '50%',
                    marginRight: '8px',
                  }}
                  alt="User Avatar"
                />
                {post.userNickname || '익명'}
              </th>
              <th>{post.created?.toDate().toLocaleString()}</th>
              <th>조회 {views | 0}</th>
              <th>추천 {likes | 0}</th>
            </tr>
          </thead>
        </InfoTable>
        <Content
          dangerouslySetInnerHTML={{
            __html: post.content.replace(/\n/g, '<br />'),
          }}
        />
        <ButtonContainer>
          <LikeButton onClick={handleLike}>추천</LikeButton>
          <CloseButton onClick={closeModal}>닫기</CloseButton>
        </ButtonContainer>
        <CommentSection>
          <hr />
          <h3 style={{ paddingTop: '5px' }}>Comment ({comments.length})</h3>
          <CommentList>
            {comments.map((c, index) => (
              <CommentItem key={index}>
                <span style={{ display: 'inline-flex' }}>
                  <img
                    src={c.userImage}
                    style={{
                      maxWidth: '25px',
                      borderRadius: '50%',
                      marginRight: '4px',
                    }}
                    alt="User Avatar"
                  />
                  <strong style={{ fontSize: '20px' }}>{c.userNickname}</strong>
                  <span style={{ display: 'flex', alignItems: 'center' }}>
                    {c.created instanceof Date
                      ? c.created.toLocaleString()
                      : c.created && c.created.toDate
                      ? c.created.toDate().toLocaleString()
                      : '알 수 없음'}
                  </span>
                </span>
                <span className="likeBtnBox">
                  <CommentLikeButton onClick={() => handleCommentLike(index)}>
                    추천 {c.commentLikes}
                  </CommentLikeButton>
                  <CommentDislikeButton
                    onClick={() => handleCommentDislike(index)}
                  >
                    비추천 {c.commentDisLikes}
                  </CommentDislikeButton>
                </span>
                <p style={{ padding: '20px' }}> {c.content} </p>
              </CommentItem>
            ))}
          </CommentList>
          <CommentForm onSubmit={handleCommentSubmit}>
            <CommentInput
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="댓글을 입력하세요..."
            />
            <CommentSubmitButton type="submit">댓글 남기기</CommentSubmitButton>
          </CommentForm>
        </CommentSection>
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
  backdrop-filter: blur(5px);
`;

const ModalContainer = styled.div`
  background-color: #ffffff;
  padding: 30px;
  border-radius: 10px;
  width: 60%;
  max-width: 800px;
  max-height: 600px;
  overflow-y: auto;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  animation: fadeIn 0.3s ease;
  text-align: left;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const Title = styled.h2`
  margin-bottom: 15px;
  font-size: 24px;
  color: #333;
`;

const InfoTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 15px;

  th {
    padding: 12px;
    text-align: left;
    background-color: #f4f4f4;
    border-bottom: 2px solid #ddd;
  }

  td {
    padding: 12px;
    border-bottom: 1px solid #ddd;
  }

  tr:hover {
    background-color: #f9f9f9;
  }
`;

const Content = styled.p`
  margin-top: 10px;
  font-size: 16px;
  line-height: 1.5;
  color: #555;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

const CloseButton = styled.button`
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const LikeButton = styled.button`
  padding: 10px 15px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #218838;
  }
`;

const CommentSection = styled.div`
  margin-top: 20px;
`;

const CommentForm = styled.form`
  display: flex;
  margin-bottom: 15px;
  padding-top: 10px;
`;

const CommentInput = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 10px;
  font-size: 16px;
`;

const CommentSubmitButton = styled.button`
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const CommentList = styled.div`
  margin-top: 10px;
`;

const CommentItem = styled.div`
  padding: 8px;
  border-bottom: 1px solid #ddd;
  margin-bottom: 5px;
  position: relative; /* 상대 위치 지정 */

  strong {
    color: #333;
  }

  span {
    font-size: 12px;
    color: #777;
    margin-left: 10px;
  }

  .likeBtnBox {
    position: absolute;
    right: 0; /* 오른쪽으로 정렬 */
    top: 10px; /* 상단 간격 조정 */
    display: flex;
    gap: 10px; /* 버튼 간격 추가 */
  }
  @media (max-width: 1000px) {
    .likeBtnBox {
      position: static; /* 위치 초기화 */
      margin-top: 10px; /* 간격 추가 */
      justify-content: flex-end; /* 오른쪽 정렬 */
      display: flex; /* 플렉스 박스 활성화 */
    }
  }
`;

const CommentLikeButton = styled.button`
  padding: 8px 12px;
  background-color: #28a745; /* 추천 버튼 색상 */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  display: flex;
  align-items: center;

  &:hover {
    background-color: #218838; /* 더 어두운 색상으로 변경 */
    transform: translateY(-2px); /* 버튼을 위로 이동 */
  }

  &:active {
    transform: translateY(0); /* 버튼을 원래 위치로 */
  }

  /* 추천 아이콘 추가 */
  &::before {
    content: '👍'; /* 추천 아이콘 */
    margin-right: 5px;
  }
`;

const CommentDislikeButton = styled.button`
  padding: 8px 12px;
  background-color: #dc3545; /* 비추천 버튼 색상 */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  display: flex;
  align-items: center;

  &:hover {
    background-color: #c82333; /* 더 어두운 색상으로 변경 */
    transform: translateY(-2px); /* 버튼을 위로 이동 */
  }

  &:active {
    transform: translateY(0); /* 버튼을 원래 위치로 */
  }

  /* 비추천 아이콘 추가 */
  &::before {
    content: '👎'; /* 비추천 아이콘 */
    margin-right: 5px;
  }
`;
export default ViewPost;
