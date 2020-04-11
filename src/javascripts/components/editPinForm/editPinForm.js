import pinData from '../../helpers/data/pinData';
import utils from '../../helpers/utils';

const buildEditPinForm = (pinId) => {
  pinData.getSinglePin(pinId)
    .then((response) => {
      const pin = response.data;
      console.log('getsinglepin response data', pin);
      let domString = '';
      domString += `<form class="container bg-light pb-3 mb-5 rounded-lg col-10 offset-1 edit-pin-form-tag" id=${pinId} data-board-id="${pin.boardId}">`;
      domString += '<div class="container d-inline-block text-right mt-3">';
      domString += '<button id="close-edit-pin-form" type="button" class="btn btn-dark btn-lg"><i class="fas fa-times"></i></button>';
      domString += '</div>';
      domString += `<h2>Edit your <span class="font-italic">${pin.name} </span>pin!</h2>`;
      domString += '<div class="form-group row mt-3">';
      domString += '<label for="edit-pin-imageUrl" class="col-sm-4 col-form-label">Here\'s the URL for your pin (read-only):</label>';
      domString += '<div class="col-sm-6">';
      // domString += `<input type="text" readonly class="form-control-plaintext" id="edit-pin-imageUrl" placeholder="You cannot change the URL for your pin picture." value=${pin.imageUrl} alt="${pin.alt}"><a href="${pin.imageUrl}" target="_blank">${pin.imageUrl}</a></input>`;
      domString += `<input type="text" readonly class="form-control-plaintext" id="edit-pin-imageUrl" placeholder="You cannot change the URL for your pin picture." value=${pin.imageUrl} alt="${pin.alt}">`;
      domString += '</div>';
      domString += '</div>';
      domString += '<div class="form-group row mt-3">';
      domString += '<label for="edit-pin-name" class="col-sm-4 col-form-label">Change your pin\'s name:</label>';
      domString += '<div class="col-sm-6">';
      domString += `<input type="text" class="form-control" id="edit-pin-name" placeholder="Enter a name for your pin" value="${pin.name}">`;
      domString += '</div>';
      domString += '</div>';
      domString += '<div class="form-group row">';
      domString += '<label for="edit-pin-boardId" class="col-sm-4 col-form-label">Change the board this pin belongs to:</label>';
      domString += '<div class="col-sm-6">';
      domString += `<input type="text" class="form-control" id="edit-pin-boardId" placeholder="Pick a board for your pin" value="${pin.boardId}">`;
      domString += '</div>';
      domString += '</div>';
      domString += '<button id="button-submit-pin-edits" type="submit" class="btn btn-secondary">Update My Pin</button>';
      domString += '</form>';

      utils.printToDom('edit-pin-form', domString);
      console.log('dataset attribute of board in on pin', `${pin.boardId}`);
      console.log('pin id to edit', `${pinId}`);
      console.log('alt of pin to edit', `${pin.alt}`);
    })
    .catch((error) => console.error('could not update the pin', error));
};

export default { buildEditPinForm };
