import utils from '../../helpers/utils';
// import smash from '../../helpers/data/smash';
// import pinData from '../../helpers/data/pinData';
import smash from '../../helpers/data/smash';


const closeSingleViewEvent = () => {
  utils.printToDom('single-view', '');
  $('#boards').removeClass('hide');
};

const viewSingleBoard = (e) => {
  const boardId = e.target.closest('.card').id;
  console.error('single board id', boardId);
  smash.getSingleBoardWithPins(boardId)
    .then((singleBoard) => {
      console.error('single board in then', singleBoard);
      let domString = '';
      domString += '<div class="container d-inline-block text-right">';
      domString += '<button id="close-single-view" type="button" class="btn btn-dark"><i class="fas fa-window-close"></i></button>';
      domString += '</div>';
      domString += '<div class="container text-white">';
      domString += `<h2>Name: ${singleBoard.name}</h2>`;
      domString += `<p>${singleBoard.description}</p>`;
      domString += '<h3>Current pins:</h3>';
      console.error(singleBoard.pins);
      if (singleBoard.pins) {
        singleBoard.pins.forEach((item) => {
          console.error('specific pin in array', item);
          domString += `<p>${item.name}</p>`;
          domString += `<img src="${item.imageUrl}" alt="${item.name}"></img>`;
        });
      } else {
        domString += '<p>No current pins here!</p>';
      }
      domString += '</div>';
      utils.printToDom('single-view', domString);
      document.getElementById('close-single-view').addEventListener('click', closeSingleViewEvent);
      $('#boards').addClass('hide');
    })
    .catch((err) => console.error('problem with single board', err));
};

export default { viewSingleBoard };
