import firebase from 'firebase/app';
import 'firebase/auth';

import boardData from '../../helpers/data/boardData';
import pinData from '../../helpers/data/pinData';
import utils from '../../helpers/utils';

const buildEditPinForm = (pinId) => {
  pinData.getSinglePin(pinId)
    .then((response) => {
      const pin = response.data;
      const myUid = firebase.auth().currentUser.uid;
      console.log('getsinglepin response data', pinId);
      console.log('pin name', pin.name);
      console.log('pin board', pin.boardId);
      let domString = '';
      domString += `<div class="container bg-light pb-3 mb-5 rounded-lg col-10 offset-1 edit-pin-form-tag" id=${pinId}>`;
      domString += '<div class="container d-inline-block text-right mt-3">';
      domString += '<button id="close-edit-pin-form" type="button" class="btn btn-dark btn-lg"><i class="fas fa-times"></i></button>';
      domString += '</div>';
      domString += `<h5>Change the board for your <span class="font-italic">${pin.name} </span>pin!</h5>`;
      domString += '<div class="col-10">';
      domString += '<form>';
      boardData.getBoardsByUid(myUid)
        .then((boards) => {
          boards.forEach((board) => {
            domString += '<div class="form-check">';
            domString += `<input class="form-check-input board-radio-btn" type="radio" name="boardRadios" id="${board.id}" value="${board.name}">`;
            domString += `<label class="form-check-label" for=${board.id}>${board.name}</label>`;
            domString += '</div>';
            console.log('boards returned for the pin', boards);
            console.log('board id', board.id);
          })
            .catch((err) => console.error('getBoardsByUid broke', err));
          domString += '</form>';
          domString += '</div>';
        });
      domString += '<button id="button-submit-pin-edits" type="submit" class="btn btn-secondary">Update My Pin</button>';
      domString += '</div>';

      utils.printToDom('edit-pin-form', domString);
      $('#single-view').addClass('hide');
    })
    .catch((error) => console.error('could not update the pin', error));
};

export default { buildEditPinForm };
