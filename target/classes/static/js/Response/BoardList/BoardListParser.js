(function (ctx) {
        
        const Parse = App.Parse || (App.Parse = {});
        App.Data              = App.Data || (App.Data = {});
        App.Data.List         = App.Data.List || (App.Data.List = {});
        App.Data.List.order   = [];
        App.Data.List.getBoard = (id) => {
                return App.Data.List[id];
        }

        App.View        = App.View || (App.View = {});
        App.View.List   = App.View.List || (App.View.List = {});
        App.View.List.getBoard = (id) => {
                return App.View.List[id];
        }

        const IBoardListParser = (function () {
                let parseLoad = (response) => {
                        let boards = response;
                        boards.forEach((board)=>{
                                parseCreate(board);
                        });
                } 
                let parseCreate = (board) => {
                        let boardListModel    = new Classes.BoardList.Model(board.id, board.name, board.color);
                        App.Data.List[board.id]     = boardListModel;
                        App.Data.List.order.push(board.id);

                        let boardListView     = new Classes.BoardList.View(boardListModel);
                        boardListView.setName(board.name);
                        App.View.List[board.id] = boardListView;
                }

                let parseUpdate = (id, board) => {
                        let boardModel = App.Data.List.getBoard(id);
                        boardModel.setName(board.name);
                        boardModel.setColor(board.color);

                        let boardView  = App.View.List.getBoard(id);
                        boardView.setName(board.name);
                        boardView.setColor(board.color);
                }

                let parseDelete = (id) => {
                        delete App.Data.List[id]
                        let boardView  = App.View.List.getBoard(id);
                        boardView.remove();
                }

                return {
                        load    : parseLoad,
                        create  : parseCreate,
                        update  : parseUpdate,
                        delete  : parseDelete
                }
        })();
                
        

        Parse.BoardList = IBoardListParser;
})(this);