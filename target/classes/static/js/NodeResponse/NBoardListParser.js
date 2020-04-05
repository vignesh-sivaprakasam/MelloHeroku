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

        const IBoardListParser = {
                load : (response) => {
                        let boards = response;
                        boards.forEach((board)=>{
                                IBoardListParser.create(board);
                        });
                }, 
                create : (board) => {
                        const id                = board._id;
                        const name              = board.name;
                        const color             = board.color;
                        let boardListModel      = new Classes.BoardList.Model(id, name, color);
                        App.Data.List[id] = boardListModel;
                        App.Data.List.order.push(id);

                        let boardListView     = new Classes.BoardList.View(boardListModel);
                        boardListView.setName(name);
                        App.View.List[id] = boardListView;
                },

                update : (id, board) => {
                        const name              = board.name;
                        const color             = board.color;
                        let boardModel = App.Data.List.getBoard(id);
                        boardModel.setName(name);
                        boardModel.setColor(color);

                        let boardView  = App.View.List.getBoard(id);
                        boardView.setName(name);
                        boardView.setColor(color);
                },

                delete : (id) => {
                        delete App.Data.List[id]
                        let boardView  = App.View.List.getBoard(id);
                        boardView.remove();
                }
        };
                
        

        Parse.BoardList = IBoardListParser;
})(this);