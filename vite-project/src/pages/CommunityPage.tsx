import React, { useState, useEffect } from 'react';
import { db } from '../firebase-config';
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  Timestamp,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { useAuth } from '../UserContext';
import styled from 'styled-components';

const CommunityPage = () => {
  return (
    <>
      <HomeContainer>
        <div className="entireContainer">
          <h1>자유 게시판</h1>
        </div>
      </HomeContainer>
    </>
  );
};

const HomeContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  .entireContainer {
    width: 60%;
    height: 70%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    border: 1px solid #f9e3bc;
    h1 {
      background-color: #f9e3bc;
      color: #fff;
      text-align: center;
      padding: 10px;
      box-sizing: border-box;
    }
  }
`;
export default CommunityPage;
