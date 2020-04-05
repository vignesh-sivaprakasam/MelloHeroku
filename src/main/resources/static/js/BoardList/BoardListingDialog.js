(function (ctx) {
        const container = "boardListing";
        function openBoardListing() {
                console.log("Open Board Listing ");
                let width   = 400;
                let height  = 450;
                let x       = (window.innerWidth / 2) - (width / 2);
                let y       = (window.innerHeight / 2) - (height / 2);
                var dialog  = new Classes.Dialog.NormalDialog(x, y, width, height, true);

                let clickCallback = (id)=>{
                        dialog.remove();
                        loadBoard(id);
                }
                let editCallback = (board) => {
                        console.log("edit ::",board);
                        // App.Board.getBoard(id).then((board)=>{
                                App.Parse.BoardList.update(board._id, board);
                        // });
                }
                let deleteCallback = (id) => {
                        App.Parse.BoardList.delete(id);
                }
                let createCallback = (board) => {
                        console.log("create ::",board);
                        // App.Board.getBoard(id).then((board)=>{
                                App.Parse.BoardList.create(board);
                                let blView = App.View.List.getBoard(board._id);
                                blView.bindClickCallback(clickCallback);
                                blView.bindEditCallback(editCallback);
                                blView.bindDeleteCallback(deleteCallback);
                                document.querySelector(".board_list").appendChild(blView.getDom());
                        // });
                }
                App.Board.getAllBoards().then((list)=>{
                        App.Parse.BoardList.load(list);
                        let listDom         = createListDom(clickCallback, createCallback, editCallback, deleteCallback);
                        dialog.append(listDom);
                        dialog.open();
                });
        }


        function createListDom(clickCallback, createCallback, editCallback, deleteCallback) {
                let fragment        = App.Utility.getTemplate(container);
                let listContainer   = fragment.querySelector(".board_list_container");
                let divC            = fragment.querySelector(".board_list");

                let order = App.Data.List.order;
                order.forEach((id)=>{
                        let blView = App.View.List.getBoard(id);
                        blView.bindClickCallback(clickCallback);
                        blView.bindEditCallback(editCallback);
                        blView.bindDeleteCallback(deleteCallback);
                        divC.appendChild(blView.getDom());
                });

                const createBoard = fragment.querySelector(".create_board");
                createBoard.addEventListener("click", ()=>{
                        openBoardCreateDialog(createCallback);
                });
                return listContainer;
        }

        ctx.openBoardListing = openBoardListing;
})(this);