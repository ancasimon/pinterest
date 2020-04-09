import utils from '../../helpers/utils';
import smash from '../../helpers/data/smash';
import pinData from '../../helpers/data/pinData';
import newPinForm from '../newPinForm/newPinForm';


const closeSingleViewEvent = () => {
  utils.printToDom('single-view', '');
  $('#boards').removeClass('hide');
  $('#single-view').addClass('hide');
};

const removePin = (e) => {
  const pinId = e.target.closest('.pin-card').id;
  pinData.deletePin(pinId)
    .then(() => {
      $(e.target.closest('.pin-card')).addClass('hide, remove-from-dom');
    })
    .catch((err) => console.error('could not delete pin', err));
};

const viewSingleBoard = (boardId) => {
  smash.getSingleBoardWithPins(boardId)
    .then((singleBoard) => {
      let domString = '';
      domString += '<div class="container d-inline-block text-right mt-5">';
      domString += '<button id="close-single-view" type="button" class="btn btn-dark"><i class="fas fa-window-close"></i></button>';
      domString += '</div>';
      domString += '<div class="container">';
      domString += `<h2 class="text-white mb-3">${singleBoard.name}</h2>`;

      domString += '<div class="col-10 offset-1 text-center">';
      domString += '<div class="accordion" id="accordionPinForm">';
      domString += '<div class="card alert alert-secondary"">';
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

      domString += '<h3>Current pins:</h3>';
      domString += '<div class="container d-flex flex-wrap">';
      domString += '<div class="row row-cols-1 row-cols-md-3">';
      if (singleBoard.pins.length) {
        singleBoard.pins.forEach((item) => {
          domString += '<div class="col mb-3">';
          domString += `<div class="card pin-card bg-light mb-3 h-100" id="${item.id}">`;
          domString += `<div class="card-header">${item.name}</div>`;
          domString += '<div class="card-body">';
          domString += `<img class="pin-image" src="${item.imageUrl}" alt="${item.name}"></img>`;
          domString += '</div>';
          domString += '<button class="btn btn-secondary delete-pin-button"><i class="fas fa-trash-alt"></i></button>';
          domString += '</div>';
          domString += '</div>';
        });
      } else {
        domString += '<p>No current pins here!</p>';
      }
      domString += '</div>';
      domString += '</div>';
      domString += '</div>';
      utils.printToDom('single-view', domString);
      $('body').on('click', '.delete-pin-button', removePin);
      document.getElementById('close-single-view').addEventListener('click', closeSingleViewEvent);
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
