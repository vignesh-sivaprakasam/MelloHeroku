(function (ctx) {
        const Parse = App.Parse || (App.Parse = {});

        App.View    = App.View || (App.View = {});
        var View    = App.View;
        App.View.getBoard = (id) => {
                return App.View[id];
        }
        App.Data = App.Data || (App.Data = {});
        var Data = App.Data;
        App.Data.getBoard = (id) =>{
                return App.Data[id];
        }

        // const boardName = document.querySelector(".boardName");
        
        const Board = {
                load : (boardID, boardDetails) => {
                        Data[boardID]   = new Classes.Board.Model(boardID, boardDetails.name, boardDetails.color);
                        const boardData = Data[boardID];
                        
                        View[boardID]   = new Classes.Board.View();
                        const boardView = View[boardID];
                        
                        const stacks = boardDetails.stacks;
                        App.Parse.Stack.load(boardID, stacks);
                        
                        const boardContainer = document.querySelector(".boardContainer");
                        boardContainer.appendChild(boardView.getDom());
                }
        }

        Parse.Board = Board;
})(this);