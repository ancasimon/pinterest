import firebase from 'firebase/app';
import apiKeys from './helpers/apiKeys.json';
import authData from './helpers/data/authData';
import navbar from './components/navbar/navbar';
import home from './components/home/home';

import 'bootstrap';
import '../styles/main.scss';

const init = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  authData.checkLoginStatus();
  home.loginButton();
  navbar.logoutEvent();
};

init();
