import firebase from 'firebase/app';
import 'firebase/auth';
import utils from '../../helpers/utils';
import boardComponent from '../boardComponent/boardComponent';
// eslint-disable-next-line import/no-cycle
import singleView from '../singleView/singleView';
import smash from '../../helpers/data/smash';
import boardData from '../../helpers/data/boardData';
import newBoardForm from '../newBoardForm/newBoardForm';

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

const makeBoard = (e) => {
  e.preventDefault();
  const myUid = firebase.auth().currentUser.uid;
  const newBoard = {
    alt: $('#board-location').val(),
    imageUrl: $('#board-imageUrl').val(),
    location: $('#board-location').val(),
    name: $('#board-name').val(),
    uid: myUid,
  };
  console.error('new board', newBoard);
  boardData.addBoard(newBoard)
    .then(() => {
      // eslint-disable-next-line no-use-before-define
      buildBoards();
    })
    .catch((err) => console.error('could not add a board', err));
};

const buildBoards = () => {
  const myUid = firebase.auth().currentUser.uid;
  boardData.getBoardsByUid(myUid)
    .then((boards) => {
      let domString = '';
      domString += '<h1 class="text-center text-white m-2">Food for Thought</h1>';
      domString += '<div class="col-10 offset-1">';
      domString += '<div class="accordion" id="accordionExample">';
      domString += '<div class="card alert alert-secondary"">';
      domString += '<div class="card-header" id="headingTwo">';
      domString += '<h2 class="mb-0">';
      domString += '<button class="btn btn-outline-secondary alert-link collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">Click Here to Add a New Board</button>';
      domString += '</h2>';
      domString += '</div>';
      domString += '<div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">';
      domString += newBoardForm.buildBoardForm();
      domString += '</div>';
      domString += '</div>';
      domString += '</div>';
      domString += '</div>';
      domString += '<div class="d-flex flex-wrap">';
      boards.forEach((board) => {
        domString += boardComponent.boardBuilder(board);
      });
      domString += '</div>';
      utils.printToDom('boards', domString);
      $('body').on('click', '.board-card', singleView.viewSingleBoardEvent);
      $('body').on('click', '.delete-board-button', removeBoard);
      $('#button-create-board').click(makeBoard);
    })
    .catch((err) => console.error('getBoardsByUid broke', err));
};

export default { buildBoards };
