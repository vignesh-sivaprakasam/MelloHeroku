(function (ctx) {
        let Classes = ctx.Classes || (ctx.Classes = {});
        let State   = Classes.State || (Classes.State);
        
        class DragAndDropState {
                constructor(){
                        this.dragStackID = null;
                        this.dragCardID  = null;
                        this.dropStackID = null;
                        this.dropCardID  = null;
                        this.dragPosition = null;
                        this.dropPosition    = null;

                        this.direction   = null;
                }

                getDragCardID(){
                        return this.dragCardID;
                }
                setDragCardID(cardID){
                        this.dragCardID = cardID;
                }

                getDragStackID(){
                        return this.dragStackID;
                }
                setDragStackID(stackID){
                        this.dragStackID = stackID;
                }

                getDropCardID(){
                        return this.dropCardID;
                }
                setDropCardID(cardID){
                        this.cardID = cardID;
                }

                getDropStackID(){
                        return this.dropStackID;
                }
                setDropStackID(stackID){
                        this.dropStackID = stackID;
                }

                getDropPosition(){
                        return this.dropPosition;
                }
                setDropPosition(dropPosition){
                        this.dropPosition = dropPosition;
                }

                getDragPosition(){
                        return this.dragPosition;
                }
                setDragPosition(dragPosition){
                        this.dragPosition = dragPosition;
                }

                getDirection(){
                        return this.direction;
                }
                setDirection(direction){
                        this.direction = direction
                }

                reset(){
                        this.dragStackID = null;
                        this.dragCardID  = null;
                        this.dropStackID = null;
                        this.dropCardID  = null;
                        this.position    = null;

                        this.direction   = null;
                }

        }

        State.DragAndDropState = DragAndDropState;
})(this);