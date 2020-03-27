import boardData from '../../helpers/data/boardData';
import utils from '../../helpers/utils';
import boardComponent from '../boardComponent/boardComponent';
// eslint-disable-next-line import/no-cycle
import singleView from '../singleView/singleView';
import smash from '../../helpers/data/smash';

const removeBoard = (e) => {
  const boardId = e.target.closest('.card').id;
  smash.completelyRemoveBoard(boardId)
    .then(() => {
      utils.printToDom('single-view', '');
      // eslint-disable-next-line no-use-before-define
      buildBoards();
    })
    .catch((err) => console.error('cannot delete board', err));
};

const buildBoards = () => {
  boardData.getBoards()
    .then((boards) => {
      let domString = '';
      domString += '<h1 class="text-center text-white m-2">Food for Thought</h1>';
      domString += '<div class="d-flex flex-wrap">';
      boards.forEach((board) => {
        domString += boardComponent.boardBuilder(board);
      });
      domString += '</div>';
      utils.printToDom('boards', domString);
      $('body').on('click', '.board-card', singleView.viewSingleBoard);
      $('body').on('click', '.delete-board-button', removeBoard);
    })
    .catch((err) => console.error('getBoards broke', err));
};

export default { buildBoards };
