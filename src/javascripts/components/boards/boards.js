import firebase from 'firebase/app';
import 'firebase/auth';
import utils from '../../helpers/utils';


const logoutEvent = () => {
  let domString = '<h1 class="text-center">Boards</h1>';
  domString += '<p>This is where you will see the amazing Pinterest boards!</p>';
  utils.printToDom('boards', domString);
  $('#navbar-logout-button').click((e) => {
    e.preventDefault();
    firebase.auth().signOut();
  });
};

export default { logoutEvent };
