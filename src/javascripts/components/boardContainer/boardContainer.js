import firebase from 'firebase/app';
import 'firebase/auth';
import utils from '../../helpers/utils';
import boardComponent from '../boardComponent/boardComponent';
// eslint-disable-next-line import/no-cycle
import singleView from '../singleView/singleView';
import smash from '../../helpers/data/smash';
import boardData from '../../helpers/data/boardData';

const removeBoard = (e) => {
  const boardId = e.target.closest('.card').id;
  smash.completelyRemoveBoard(boardId)
    .then(() => {
      // eslint-disable-next-line no-use-before-define
      buildBoards();
    })
    .catch((err) => console.error('cannot delete board', err));
};

// This is the code that gets me authorization by user and that I added inside the function below:
// const getCurrentUid = () => {
//   const myUid = firebase.auth().currentUser.uid;
//   console.error(myUid);
//   boardData.getBoardsByUid(myUid).then().catch();
// };

const buildBoards = () => {
  const myUid = firebase.auth().currentUser.uid;
  boardData.getBoardsByUid(myUid)
    .then((boards) => {
      let domString = '';
      domString += '<h1 class="text-center text-white m-2">Food for Thought</h1>';
      domString += '<div class="d-flex flex-wrap">';
      boards.forEach((board) => {
        domString += boardComponent.boardBuilder(board);
      });
      domString += '</div>';
      utils.printToDom('boards', domString);
      $('body').on('click', '.board-card', singleView.viewSingleBoardEvent);
      $('body').on('click', '.delete-board-button', removeBoard);
    })
    .catch((err) => console.error('getBoardsByUid broke', err));
};

export default { buildBoards };
