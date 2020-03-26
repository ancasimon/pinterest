import boardData from './boardData';


const getSingleBoard = (boardId) => new Promise((resolve, reject) => {
  boardData.getBoardById(boardId)
    .then((response) => {
      const board = response.data;
      board.id = boardId;
      resolve(board);
      console.error('smash function board info', board);
    })
    .catch((err) => reject(err));
});

export default { getSingleBoard };
