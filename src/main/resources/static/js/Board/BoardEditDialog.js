(function (ctx) {
        const editDialogTemplate = "boardEditDialog";
        function openBoardEditDialog(board, onSuccessCallback) {
                const width   = 400;
                const height  = 450;
                const x       = (window.innerWidth / 2) - (width / 2);
                const y       = (window.innerHeight / 2) - (height / 2);
                let dialog    = new Classes.Dialog.NormalDialog(x, y, width, height, true);
                let container = createDialog(dialog, board, onSuccessCallback);
                dialog.append(container);
        }

        function createDialog(dialog, board, onSuccessCallback) {
                let fragment        = App.Utility.getTemplate(editDialogTemplate);
                const name          = fragment.querySelector(".board_name_value");
                name.textContent    = board.name;
                
                const color         = fragment.querySelector(".board_color_value");

                let colorComp       = new Classes.ColorComponent();
                colorComp.setActive(board.color);
                color.appendChild(colorComp.getDom());

                const save = fragment.querySelector(".save");
                save.addEventListener("click", ()=>{
                        let boardValue    = {};
                        boardValue.name   = name.textContent;
                        boardValue.color  = colorComp.getActive();

                        App.Board.updateBoard(board.id, boardValue).then(response =>{
                                dialog.remove();
                                onSuccessCallback(response);
                        });
                });

                const cancel = fragment.querySelector(".cancel");
                cancel.addEventListener("click", () => {
                        dialog.remove();
                });
                return fragment.querySelector(".board_edit_container");
        }

        ctx.openBoardEditDialog = openBoardEditDialog;
})(this);