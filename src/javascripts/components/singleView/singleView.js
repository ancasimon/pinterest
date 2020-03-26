import utils from '../../helpers/utils';
import smash from '../../helpers/data/smash';
// eslint-disable-next-line import/no-cycle
// import boards from '../boardContainer/boardContainer';


const closeSingleViewEvent = () => {
  utils.printToDom('single-view', '');
  $('#boards').removeClass('hide');
};

const viewSingleBoard = (e) => {
  const boardId = e.target.closest('.card').id;
  console.error('single board id', boardId);
  smash.getSingleBoard(boardId)
    .then((singleBoard) => {
      console.error('single board in then', singleBoard);
      let domString = '';
      domString += '<div class="container d-inline-block text-right">';
      domString += '<button id="close-single-view" type="button" class="btn btn-dark"><i class="fas fa-window-close"></i></button>';
      domString += '</div>';
      domString += '<div class="container">';
      domString += '<div class="row">';
      domString += '<div class="col-md-4">';
      domString += `<h2>Name: ${singleBoard.name}</h2>`;
      domString += `<p>Type: ${singleBoard.type}</p>`;
      domString += `<p>${singleBoard.description}</p>`;
      domString += '</div>';
      domString += '<div class="col-md-4">';
      domString += '<h3>See all your pins!</h3>';
      domString += '</div>';
      domString += '</div>';
      domString += '</div>';
      // clearAllBoards();
      utils.printToDom('single-view', domString);
      document.getElementById('close-single-view').addEventListener('click', closeSingleViewEvent);
      $('#boards').addClass('hide');
    })
    .catch((err) => console.error('problem with single board', err));
};

export default { viewSingleBoard };
