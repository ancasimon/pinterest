import boardData from './boardData';
import pinData from './pinData';

const getSingleBoardWithPins = (boardId) => new Promise((resolve, reject) => {
  boardData.getBoardById(boardId)
    .then((response) => {
      const board = response.data;
      board.id = boardId;
      board.pins = [];
      pinData.getPinsByBoardId(board.id).then((pins) => {
        console.error('here are the pins for this board', pins);
        // pinData.getPinsByBoardId().then((allPins) => {
        //   console.error('all pins', allPins);
        //   pins.forEach((pin) => {
        //     const newPin = allPins.find((x) => x.id === pin.id);
        //     board.pins.push(newPin);
        //     console.error(pin.name);
        //   });
        if (pins) {
          pins.forEach((pin) => {
            board.pins.push(pin);
            resolve(board);
            console.error('smash function board info', board);
          });
        }
      });
    })
    .catch((err) => reject(err));
});

export default { getSingleBoardWithPins };
