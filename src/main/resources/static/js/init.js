
function loadBoard(id) {
        App.Board.getBoard(id).then(boardDetails => {
                updateBoardState(boardDetails._id);
                boardName.textContent = boardDetails.name;
                App.Parse.Board.load(boardDetails._id, boardDetails);
                // parseBoardResponse(boardDetails);
        });
}
openBoardListing(loadBoard);

const boardName = document.querySelector(".boardName"); 
App.State = new Classes.State.State();