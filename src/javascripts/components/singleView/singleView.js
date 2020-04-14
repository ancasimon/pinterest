import utils from '../../helpers/utils';
import smash from '../../helpers/data/smash';
import pinData from '../../helpers/data/pinData';
import newPinForm from '../newPinForm/newPinForm';
import editPinForm from '../editPinForm/editPinForm';


const closeSingleViewEvent = () => {
  utils.printToDom('single-view', '');
  $('#boards').removeClass('hide');
  $('#single-view').addClass('hide');
};

const closeEditPinFormEvent = () => {
  utils.printToDom('edit-pin-form', '');
  $('#single-view').removeClass('hide');
};

const removePin = (e) => {
  const pinId = e.target.closest('.pin-card').id;
  const { boardId } = e.target.closest('.card').dataset;
  pinData.deletePin(pinId)
    .then(() => {
      // eslint-disable-next-line no-use-before-define
      viewSingleBoard(boardId);
    })
    .catch((err) => console.error('could not delete pin', err));
};

const editPinEvent = (e) => {
  e.preventDefault();
  const pinId = e.target.closest('.card').id;
  console.log('pinId accessed for editing', pinId);
  editPinForm.buildEditPinForm(pinId);
};

const makePin = (e) => {
  e.preventDefault();
  const boardId = e.target.closest('.card').id;
  const newPin = {
    alt: $('#pin-name').val(),
    boardId,
    imageUrl: $('#pin-imageUrl').val(),
    name: $('#pin-name').val(),
  };
  pinData.addPin(newPin)
    .then(() => {
      // eslint-disable-next-line no-use-before-define
      viewSingleBoard(boardId);
    })
    .catch((err) => console.error('could not add a pin', err));
};

const modifyPin = (e) => {
  e.preventDefault();
  const pinId = e.target.closest('.edit-pin-form-tag').id;
  const selectedBoard = utils.getRadioVal();
  console.log('pinid to be modified', pinId);
  // const { boardId } = e.target.closest('.edit-pin-form-tag').dataset;
  // console.log('boardid on pin to be modified', boardId);
  pinData.updatePin(pinId, selectedBoard)
    .then(() => {
      // eslint-disable-next-line no-use-before-define
      viewSingleBoard(selectedBoard);
      utils.printToDom('edit-pin-form', '');
      $('#single-view').removeClass('hide');
    })
    .catch((error) => console.error('could not update selected pin', error));
};

const viewSingleBoard = (boardId) => {
  smash.getSingleBoardWithPins(boardId)
    .then((singleBoard) => {
      let domString = '';
      domString += '<div class="container d-inline-block text-right mt-5">';
      domString += '<button id="close-single-view" type="button" class="btn btn-dark btn-lg"><i class="fas fa-times"></i></button>';
      domString += '</div>';
      domString += '<div class="container">';
      domString += `<h2 class="text-white mb-3">${singleBoard.name}</h2>`;

      domString += '<div class="col-10 offset-1 text-center">';
      domString += '<div class="accordion" id="accordionPinForm">';
      domString += `<div class="card alert alert-secondary" id="${singleBoard.id}">`;
      domString += '<div class="card-header" id="headingPinForm">';
      domString += '<h2 class="mb-0">';
      domString += `<button class="btn btn-outline-secondary alert-link collapsed" type="button" data-toggle="collapse" data-target="#collapsePinForm" aria-expanded="false" aria-controls="collapsePinForm">Click Here to Add a New Pin for ${singleBoard.location}</button>`;
      domString += '</h2>';
      domString += '</div>';
      domString += '<div id="collapsePinForm" class="collapse" aria-labelledby="headingPinForm" data-parent="#accordionPinForm">';
      domString += newPinForm.buildPinForm();
      domString += '</div>';
      domString += '</div>';
      domString += '</div>';
      domString += '</div>';

      if (singleBoard.pins.length) {
        domString += '<h3>Current pins:</h3>';
        domString += '<div class="container d-flex flex-wrap">';
        domString += '<div class="row row-cols-1 row-cols-md-3">';
        singleBoard.pins.forEach((item) => {
          domString += '<div class="col mb-3">';
          domString += `<div class="card pin-card bg-light mb-3 h-100" style="min-width: 18rem;" id="${item.id}" data-board-id="${singleBoard.id}">`;
          domString += `<div class="card-header">${item.name}</div>`;
          domString += '<div class="card-body">';
          domString += `<img class="pin-image" src="${item.imageUrl}" alt="${item.name}"></img>`;
          domString += '</div>';
          domString += '<div class="row d-flex justify-content-around pb-2">';
          domString += '<button class="btn btn-secondary delete-pin-button col-3"><i class="fas fa-trash-alt"></i></button>';
          domString += '<button class="btn btn-secondary edit-pin-button col-3"><i class="fas fa-pencil-alt"></i></button>';
          domString += '</div>';
          domString += '</div>';
          domString += '</div>';
        });
        domString += '</div>';
        domString += '</div>';
      } else {
        domString += '<h4>You don\'t have any pins in this board! Add one now!</h4>';
      }
      domString += '</div>';
      utils.printToDom('single-view', domString);
      $('body').on('click', '.delete-pin-button', removePin);
      $('body').on('click', '.edit-pin-button', editPinEvent);
      $('body').on('click', '#close-edit-pin-form', closeEditPinFormEvent);
      document.getElementById('close-single-view').addEventListener('click', closeSingleViewEvent);
      $('#button-create-pin').click(makePin);
      // $('#button-edit-pin').click(modifyPin);
      $('body').on('click', '#button-submit-pin-edits', modifyPin);
      $('#boards').addClass('hide');
      $('#single-view').removeClass('hide');
    })
    .catch((err) => console.error('problem with single board', err));
};

const viewSingleBoardEvent = (e) => {
  if ($(e.target).hasClass('delete-board-button')) {
    return;
  }
  const boardId = e.target.closest('.card').id;
  viewSingleBoard(boardId);
};

export default { viewSingleBoard, viewSingleBoardEvent };
