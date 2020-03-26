import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

// need to add this here at some point???
// axios.get(`${baseUrl}/boards.json?orderBy="uid"&equalTo="${uid}"`)

const getBoards = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/boards.json`)
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

export default { getBoards, getBoardById };
