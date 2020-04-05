import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getBoardsByUid = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/boards.json?orderBy="uid"&equalTo="${uid}"`);
  console.error('this is the uid for the getBoardsByUid function in boardData file', uid)
    .then((response) => {
      const demBoards = response.data;
      const boards = [];
      console.error('response data coming from axios call', demBoards);
      console.error('new empty boards array', boards);
      Object.keys(demBoards).forEach((boardId) => {
        demBoards[boardId].id = boardId;
        boards.push(demBoards[boardId]);
      });
      console.error('current uid', uid);
      resolve(boards);
      console.error('this is the response data for the getBoardsByUid axios call', demBoards);
    })
    .catch((err) => reject(err));
});

const getBoardById = (boardId) => axios.get(`${baseUrl}/boards/${boardId}.json`);

const deleteBoard = (boardId) => axios.delete(`${baseUrl}/boards/${boardId}.json`);

export default { getBoardsByUid, getBoardById, deleteBoard };
