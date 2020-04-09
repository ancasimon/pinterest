const buildPinForm = () => {
  let domString = '';
  domString += '<form class="col-10 offset-1">';
  domString += '<div class="form-group row mt-3">';
  domString += '<label for="pin-name" class="col-sm-2 col-form-label">Pin Name</label>';
  domString += '<div class="col-sm-10">';
  domString += '<input type="text" class="form-control" id="pin-name" placeholder="Enter a name for your new pin">';
  domString += '</div>';
  domString += '</div>';
  domString += '<div class="form-group row">';
  domString += '<label for="pin-imageUrl" class="col-sm-2 col-form-label">Picture</label>';
  domString += '<div class="col-sm-10">';
  domString += '<input type="text" class="form-control" id="pin-imageUrl" placeholder="Enter a url for your pin\'s image">';
  domString += '</div>';
  domString += '</div>';
  domString += '<button id="button-create-pin" type="submit" class="btn btn-secondary">Add My New Pin</button>';
  domString += '</form>';

  return domString;
};

export default { buildPinForm };
