import firebase from 'firebase/app';
import 'firebase/auth';

import boardData from '../../helpers/data/boardData';
import pinData from '../../helpers/data/pinData';
import utils from '../../helpers/utils';

const buildEditPinForm = (pinId) => {
  pinData.getSinglePin(pinId)
    .then((response) => {
      const pin = response.data;
      let domString = '';
      domString += `<div class="container bg-light pb-3 mb-5 rounded-lg col-10 offset-1 edit-pin-form-tag" id=${pinId}>`;
      domString += '<div class="container d-inline-block text-right mt-3">';
      domString += '<button id="close-edit-pin-form" type="button" class="btn btn-dark btn-lg"><i class="fas fa-times"></i></button>';
      domString += '</div>';
      domString += `<h5>Change the current board for your <span class="font-italic">${pin.name} </span>pin!</h5>`;
      domString += '<div class="col-10">';
      domString += '<div id="radio-buttons-section" class="m-3">';

      const myUid = firebase.auth().currentUser.uid;
      boardData.getBoardsByUid(myUid)
        .then((boards) => {
          let radioButtonsDomString = '';
          boards.sort((a, b) => b.date - a.date);
          boards.forEach((board) => {
            if (pin.boardId !== board.id) {
              radioButtonsDomString += '<div class="form-check m-2">';
              radioButtonsDomString += `<input class="form-check-input board-radio-btn" type="radio" name="boardRadios" id="${board.id}" value="${board.name}">`;
              radioButtonsDomString += `<label class="form-check-label" for="${board.id}">${board.name}</label>`;
              radioButtonsDomString += '</div>';
            }
          });
          utils.printToDom('radio-buttons-section', radioButtonsDomString);
        })
        .catch((error) => console.error('could not get boards for radio buttons', error));

      domString += '</div>';
      domString += '<button id="button-submit-pin-edits" type="submit" class="btn btn-secondary">Update My Pin</button>';
      domString += '</div>';
      domString += '</div>';
      utils.printToDom('edit-pin-form', domString);
      $('#single-view').addClass('hide');
    })
    .catch((error) => console.error('could not update the pin', error));
};

export default { buildEditPinForm };
