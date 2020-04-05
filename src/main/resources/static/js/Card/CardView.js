(function (ctx) {
        var Classes = ctx.Classes || (ctx.Classes   = {});
        var Card    = Classes.Card || (Classes.Card = {});

        const templateName   = "cardTemplate";
        const cardDDtemplate = "cardMenuDropDown";

        function createCard() {
                var temp            = document.getElementById(templateName);
                var content         = temp.content;
                var cloneFragment   = content.cloneNode(true);
                return cloneFragment.querySelector(".card");
        }

        function createCardDialog(stackID) {
                const dom   = createCard();
                const title           = dom.querySelector(".card_title");
                title.contentEditable   = true;
                setTimeout(()=>{title.focus()}, 100);
                title.addEventListener("keydown", (ev) => {
                        if(ev.keyCode == 13){
                                const boardID = App.State.getActiveBoardID();

                                App.Card.createCard(boardID, stackID, {
                                        title : title.textContent
                                }).then((card)=>{
                                        console.log("card create : :",card);
                                        App.Parse.Card.create(boardID, stackID, card);
                                        dom.remove();
                                });
                        }

                        if(ev.keyCode == 27){
                                dom.remove();
                        }
                });
                return dom;
        }

        function createDropDown(stackID, cardModel, deleteCallback) {
                const dom = App.Utility.getTemplate(cardDDtemplate);
                dom.querySelector(".delete").addEventListener("click", ()=>{
                        const boardID = App.State.getActiveBoardID();
                        App.Card.deleteCard(boardID, stackID, cardModel.getID()).then((resp)=>{
                                App.Parse.Card.delete(boardID, stackID, cardModel.getID());
                                deleteCallback();
                        });
                });
                return dom;
        }

        function addListener(cardView, stackID, cardModel) {
                cardView.getDom().addEventListener("dblclick", () => {
                        const expandedCard = new Classes.Card.ExpandedCard(stackID, cardModel);
                        expandedCard.open();
                });
                cardView.menu.addEventListener("click", () => {
                        // let di   = new Classes.Dialog.NormalDialog(left, top, width, height);
                        const rect = cardView.menu.getBoundingClientRect();
                        const dialog = new Classes.Dialog.NormalDialog(rect.x, rect.y + rect.height, 150, 100);
                        const dropdown = createDropDown(stackID, cardModel, () => {
                                dialog.remove();
                        });
                        dialog.append(dropdown);
                });
                cardView.getDom().addEventListener("dragstart", (ev)=>{
                        console.log("drag start");
                        const dragCardID = cardModel.getID();
                        const dropCardID = cardModel.getID();

                        const boardID     = App.State.getActiveBoardID();
                        const boardModel  = App.Data.getBoard(boardID);
                        const dragStackID = boardModel.getStackIdOfCard(dragCardID);

                        const boardState       = App.State.getActiveBoardState();
                        const dragAndDropState = boardState.getDragAndDropState();
                        dragAndDropState.setDragStackID(dragStackID);
                        dragAndDropState.setDragCardID(dragCardID);
                        dragAndDropState.setDropCardID(dragStackID);
                        dragAndDropState.setDropCardID(dropCardID);


                        const dragStack    = boardModel.getStack(dragStackID);
                        const dragPosition = dragStack.getCardPosition(dragCardID);
                        dragAndDropState.setDragPosition(dragPosition);
                });
                cardView.getDom().addEventListener("dragenter", (ev)=>{
                        ev.preventDefault();
                        const boardState       = App.State.getActiveBoardState();
                        const dragAndDropState = boardState.getDragAndDropState();

                        const dragCardID      = dragAndDropState.getDragCardID();
                        let dropCardID        = dragAndDropState.getDropCardID();
                        if(dropCardID != cardModel.getID()){
                                dropCardID        = cardModel.getID();
                                dragAndDropState.setDropCardID(dropCardID);

                                const dragStackID = dragAndDropState.getDragStackID();
                                const boardID     = App.State.getActiveBoardID();
                                if(dragCardID != dropCardID){
                                        const boardModel   = App.Data.getBoard(boardID);
                                        const dropStackID  = boardModel.getStackIdOfCard(dropCardID);
                                        const dropStack    = boardModel.getStack(dropStackID);
                                        const dropPosition = dropStack.getCardPosition(dropCardID);

                                        dragAndDropState.setDropStackID(dropStackID);
                                        dragAndDropState.setDropPosition(dropPosition);
                                        // dragAndDropState.setDragPosition(dropPosition);
                                }
                                const boardView   = App.View.getBoard(boardID);
                                const dragStack   = boardView.getStack(dragStackID);
                                const dragCardDom = dragStack.getCard(dragCardID).getDom();
                                const dragOverDom = cardView.getDom();

                                const cardHolder = dragOverDom.parentElement;

                                if(dragOverDom.nextElementSibling === dragCardDom){
                                        console.log("up b4:", dragAndDropState.getDirection());
                                        if(dragAndDropState.getDirection() == null){
                                                dragAndDropState.setDirection(true);
                                        } else if(dragAndDropState.getDirection() === false){
                                                const dropPosition = dragAndDropState.getDropPosition();
                                                if(dragAndDropState.getDragStackID() === dragAndDropState.getDropStackID()){
                                                        dragAndDropState.setDropPosition(dropPosition - 1);
                                                } else {
                                                        dragAndDropState.setDropPosition(dropPosition);
                                                }
                                        }
                                        cardHolder.insertBefore(dragCardDom, dragOverDom);
                                } else if(dragCardDom.nextElementSibling === dragOverDom) {
                                        console.log("down");
                                        if(dragAndDropState.getDirection() == null){
                                                dragAndDropState.setDirection(false);
                                        }
                                        cardHolder.insertBefore(dragOverDom, dragCardDom);
                                        if(dragCardID != dropCardID){
                                                const dropPosition = dragAndDropState.getDropPosition();
                                                if(dragAndDropState.getDragStackID() === dragAndDropState.getDropStackID()){
                                                        dragAndDropState.setDropPosition(dropPosition);
                                                } else {
                                                        dragAndDropState.setDropPosition(dropPosition + 1);
                                                }
                                        }
                                } else {
                                        if(dragCardDom != dragOverDom){
                                                console.log("stack change");
                                                cardHolder.insertBefore(dragCardDom, dragOverDom);
                                        }
                                }


                                if(dragAndDropState.getDragPosition() === dragAndDropState.getDropPosition()){
                                        console.log("same pos");
                                        dragAndDropState.setDirection(null);
                                }
                        }
                });

                cardView.getDom().addEventListener("drop", (ev)=>{
                        const boardState       = App.State.getActiveBoardState();
                        const dragAndDropState = boardState.getDragAndDropState();

                        console.log("dragCard : ", dragAndDropState.getDragCardID(), " dropCardStack : ", dragAndDropState.getDropStackID(), " position L:", dragAndDropState.getDropPosition());
                        ev.stopPropagation();
                });
        }

        class CardView {
                constructor(stackID, cardModel){
                        this.dom                     = createCard();
                        this.menu                    = this.dom.querySelector(".card_menu");
                        this.title                   = this.dom.querySelector(".card_title");
                        this.title.textContent       = cardModel.getTitle();

                        this.description             = this.dom.querySelector(".card_description");
                        this.description.textContent = cardModel.getDescription();
                        addListener(this, stackID, cardModel);
                }

                getDom(){
                        return this.dom;
                }
                
                setTitle(title){
                        this.title.textContent = title;
                }
                setDescription(description){
                        this.description.textContent = description;
                }

                remove(){
                        this.dom.remove();
                }
        }

        Card.View = CardView;
        Card.View.createCard = createCardDialog;
})(this);