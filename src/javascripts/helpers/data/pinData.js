import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getPinsByBoardId = (boardId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pins.json?orderBy="boardId"&equalTo="${boardId}"`)
    .then((response) => {
      const allThePins = response.data;
      const pins = [];
      if (allThePins) {
        Object.keys(allThePins).forEach((pinId) => {
          allThePins[pinId].id = pinId;
          pins.push(allThePins[pinId]);
        });
      }
      resolve(pins);
    })
    .catch((err) => reject(err));
});

const deletePin = (pinId) => axios.delete(`${baseUrl}/pins/${pinId}.json`);

const addPin = (newPin) => axios.post(`${baseUrl}/pins.json`, newPin);

const getSinglePin = (pinId) => axios.get(`${baseUrl}/pins/${pinId}.json`);

// const updatePin = (pinId, modifiedPin) => axios.put(`${baseUrl}/pins/${pinId}.json`, modifiedPin);

const updatePin = (pinId, newBoardAssignment) => axios.patch(`${baseUrl}/pins/${pinId}.json`, { boardId: newBoardAssignment });

export default {
  getPinsByBoardId,
  deletePin,
  addPin,
  getSinglePin,
  updatePin,
};
