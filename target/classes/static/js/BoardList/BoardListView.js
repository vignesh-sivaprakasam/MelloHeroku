(function (ctx) {
        var Classes 	= ctx.Classes || (ctx.Classes = {});
        var BoardList	= Classes.BoardList || (Classes.BoardList = {});
        const item      = "boardItem";

        function addListener(boardListView, boardListModel) {
                boardListView.div.addEventListener("click", (ev) => {
                        console.log("clicked");
                        boardListView.clickCallback(boardListModel.getID());
                });
                
                boardListView.edit.addEventListener("click", (ev) => {
                        console.log("edit Click");
                        openBoardEditDialog(boardListModel, boardListView.editCallback);
                        ev.stopPropagation();
                });
                
                boardListView.boardDelete.addEventListener("click", (ev) => {
                        boardListView.remove();
                        App.Board.deleteBoard(boardListModel.getID());
                        boardListView.deleteCallback(boardListModel.getID());
                        ev.stopPropagation();
                });
        }

        class BoardListView {
                constructor(boardListModel){
                        this.div                = App.Utility.getTemplate(item).querySelector(".board_item");
                        this.name               = this.div.querySelector(".board_name");
                        this.edit               = this.div.querySelector(".board_edit");
                        this.boardDelete        = this.div.querySelector(".board_delete");
                        this.setName(boardListModel.getName());
                        addListener(this, boardListModel);
                }

                getDom(){
                        return this.div;
                }
                
                setName(name){
                        this.name.textContent = name;
                }

                setColor(color){

                }

                bindClickCallback(callback){
                        this.clickCallback = callback;
                }

                bindEditCallback(callback){
                        this.editCallback = callback;
                }

                bindDeleteCallback(callback){
                        this.deleteCallback = callback;
                }

                remove(){
                        this.div.remove();
                }
        }
        BoardList.View = BoardListView;
})(this);