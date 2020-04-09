const buildBoardForm = () => {
  let domString = '';
  domString += '<form class="col-10 offset-1">';
  domString += '<div class="form-group row mt-3">';
  domString += '<label for="board-name" class="col-sm-2 col-form-label">Board Name</label>';
  domString += '<div class="col-sm-10">';
  domString += '<input type="text" class="form-control" id="board-name" placeholder="Enter a name for your new board">';
  domString += '</div>';
  domString += '</div>';
  domString += '<div class="form-group row mt-3">';
  domString += '<label for="board-location" class="col-sm-2 col-form-label">Location</label>';
  domString += '<div class="col-sm-10">';
  domString += '<input type="text" class="form-control" id="board-location" placeholder="Enter a location">';
  domString += '</div>';
  domString += '</div>';
  domString += '<div class="form-group row">';
  domString += '<label for="board-imageUrl" class="col-sm-2 col-form-label">Picture</label>';
  domString += '<div class="col-sm-10">';
  domString += '<input type="text" class="form-control" id="board-imageUrl" placeholder="Enter a url for your image">';
  domString += '</div>';
  domString += '</div>';
  domString += '<button id="button-create-board" type="submit" class="btn btn-secondary">Add My New Board</button>';
  domString += '</form>';

  return domString;
};

export default { buildBoardForm };
