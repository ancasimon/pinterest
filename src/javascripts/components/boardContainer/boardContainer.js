import boardData from '../../helpers/data/boardData';
import utils from '../../helpers/utils';
import boardComponent from '../boardComponent/boardComponent';
// eslint-disable-next-line import/no-cycle
import singleView from '../singleView/singleView';

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
    })
    .catch((err) => console.error('getBoards broke', err));
};

export default { buildBoards };
