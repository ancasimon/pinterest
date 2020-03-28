import firebase from 'firebase/app';
import 'firebase/auth';
import utils from '../../helpers/utils';

const signMeIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
};

const loginButton = () => {
  let domString = '<h1 class="text-center text-white">A Foodie\'s Connection</h1>';
  domString += '<button id="google-auth" class="btn btn-secondary">Google Login</button>';
  utils.printToDom('home', domString);
  $('#google-auth').click(signMeIn);
};

export default { loginButton };
