(function (ctx) {
        let Classes = ctx.Classes || (ctx.Classes = {});
        let State   = Classes.State || (Classes.State = {});

        class state {
                constructor(){
                        this.map         = new Map();
                        this.activeBoardID = null;
                }

                getActiveBoardID(){
                        return this.activeBoardID;
                }

                setActiveBoardID(boardID){
                        this.activeBoardID = boardID;
                }

                getActiveBoardState(){
                        !this.map.get(this.activeBoardID) && this.map.set(this.activeBoardID, new Classes.State.BoardState());
                        return this.map.get(this.activeBoardID);
                }

                setBoardState(boardID, boardState){
                        this.map.set(boardID, boardState);
                }
        }

        ctx.updateBoardState = (id) => {
                App.State.setActiveBoardID(id);
        }

        State.State = state;
})(this);