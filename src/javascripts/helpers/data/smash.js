import boardData from './boardData';
import pinData from './pinData';
import userData from './userData';

const getSingleBoardWithPins = (boardId) => new Promise((resolve, reject) => {
  boardData.getBoardById(boardId)
    .then((response) => {
      const board = response.data;
      board.id = boardId;
      board.pins = [];
      pinData.getPinsByBoardId(board.id).then((pins) => {
        console.error('here are the pins for this board', pins);
        if (pins) {
          pins.forEach((pin) => {
            board.pins.push(pin);
            resolve(board);
          });
        }
      });
    })
    .catch((err) => reject(err));
});

const completelyRemoveBoard = (boardId) => new Promise((resolve, reject) => {
  boardData.deleteBoard(boardId)
    .then(() => {
      pinData.getPinsByBoardId(boardId).then((pins) => {
        pins.forEach((eachPin) => {
          pinData.deletePin(eachPin.id);
        });
        resolve();
      });
    })
    .catch((err) => reject(err));
});

const getSingleUserWithBoards = (userId) => new Promise((resolve, reject) => {
  userData.getUserById(userId)
    .then((response) => {
      const user = response.data;
      resolve(user);
    })
    .catch((err) => reject(err));
});

export default { getSingleBoardWithPins, getSingleUserWithBoards, completelyRemoveBoard };
