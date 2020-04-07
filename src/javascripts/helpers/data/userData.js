import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getUser = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/users.json`)
    .then((response) => {
      const myUser = response.data;
      const users = [];
      Object.keys(myUser).forEach((userId) => {
        myUser[userId].id = userId;
        users.push(myUser[userId]);
      });
      resolve(users);
    })
    .catch((err) => reject(err));
});

const getUserById = (userId) => {
  axios.get(`${baseUrl}/users/${userId}.json`);
};

export default { getUser, getUserById };
