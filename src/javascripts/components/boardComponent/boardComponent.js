const boardBuilder = (board) => {
  let domString = '';
  domString += '<div class="col-3 mt-2 mb-2">';
  domString += `<div class="card board-card h-100" id="${board.id}">`;
  domString += `<h4 class="card-header">${board.name}</h4>`;
  domString += '<div class="card-body">';
  domString += '<div>';
  domString += `<img class="board-image img-fluid" src="${board.imageUrl}" alt="${board.alt}"></img>`;
  domString += '</div>';
  domString += '</div>';
  domString += '<button type="button" class="btn btn-outline-secondary delete-board-button"><i class="fas fa-trash-alt"></i></button>';
  domString += '</div>';
  domString += '</div>';

  return domString;
};

export default { boardBuilder };
