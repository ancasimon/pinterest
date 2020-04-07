import firebase from 'firebase/app';
import 'firebase/auth';

import boardContainer from '../../components/boardContainer/boardContainer';

const homeDiv = $('#home');
const boardsDiv = $('#boards');
const logoutButton = $('#navbar-logout-button');

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log('logged in');
      // person is logged in
      homeDiv.addClass('hide');
      boardsDiv.removeClass('hide');
      logoutButton.removeClass('hide');
      boardContainer.buildBoards();
    } else {
      console.log('logged out');
      // person is not logged in
      homeDiv.removeClass('hide');
      boardsDiv.addClass('hide');
      logoutButton.addClass('hide');
    }
  });
};

export default { checkLoginStatus };
