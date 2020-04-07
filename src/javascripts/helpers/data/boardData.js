import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getBoardsByUid = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/boards.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      const demBoards = response.data;
      const boards = [];
      Object.keys(demBoards).forEach((boardId) => {
        demBoards[boardId].id = boardId;
        boards.push(demBoards[boardId]);
      });
      resolve(boards);
    })
    .catch((err) => reject(err));
});

const getBoardById = (boardId) => axios.get(`${baseUrl}/boards/${boardId}.json`);

const deleteBoard = (boardId) => axios.delete(`${baseUrl}/boards/${boardId}.json`);

export default { getBoardsByUid, getBoardById, deleteBoard };
