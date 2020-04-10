import boardData from './boardData';
import pinData from './pinData';

const getSingleBoardWithPins = (boardId) => new Promise((resolve, reject) => {
  boardData.getBoardById(boardId)
    .then((response) => {
      const board = response.data;
      console.error('board response data', board);
      board.id = boardId;
      board.pins = [];
      pinData.getPinsByBoardId(board.id).then((pins) => {
        if (pins) {
          pins.forEach((pin) => {
            board.pins.push(pin);
          });
          resolve(board);
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

export default { getSingleBoardWithPins, completelyRemoveBoard };
