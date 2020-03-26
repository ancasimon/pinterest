import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getPinsByBoardId = (boardId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pins.json?orderBy="boardId"&equalTo="${boardId}"`)
    .then((response) => {
      const allThePins = response.data;
      console.error('getPinsByBoardId', allThePins);
      const pins = [];
      Object.keys(allThePins).forEach((pinId) => {
        allThePins[pinId].id = pinId;
        pins.push(allThePins[pinId]);
      });
      console.error('here are all the pins for this board', pins);
      resolve(pins);
    })
    .catch((err) => reject(err));
});

export default { getPinsByBoardId };
