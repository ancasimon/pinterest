import firebase from 'firebase/app';
import 'firebase/auth';

import boardContainer from '../../components/boardContainer/boardContainer';

const homeDiv = $('#home');
const boardsDiv = $('#boards');
const logoutButton = $('#navbar-logout-button');
const editPinFormDiv = $('#edit-pin-form');

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // person is logged in
      homeDiv.addClass('hide');
      boardsDiv.removeClass('hide');
      editPinFormDiv.removeClass('hide');
      logoutButton.removeClass('hide');
      boardContainer.buildBoards();
    } else {
      // person is not logged in
      homeDiv.removeClass('hide');
      boardsDiv.addClass('hide');
      editPinFormDiv.addClass('hide');
      logoutButton.addClass('hide');
    }
  });
};

export default { checkLoginStatus };
