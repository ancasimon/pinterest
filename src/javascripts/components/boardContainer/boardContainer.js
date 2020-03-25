import boardData from '../../helpers/data/boardData';
import utils from '../../helpers/utils';
import boardComponent from '../boardComponent/boardComponent';

const buildBoards = () => {
  boardData.getBoards()
    .then((boards) => {
      let domString = '';
      domString += '<h2 class="text-center">Famous Boards</h2>';
      domString += '<div class="d-flex flex-wrap">';
      boards.forEach((board) => {
        domString += boardComponent.boardBuilder(board);
      });
      domString += '</div>';
      utils.printToDom('boards', domString);
    })
    .catch((err) => console.error('getBoards broke', err));
};

export default { buildBoards };
