(function (ctx) {
        const Parse = App.Parse || (App.Parse = {});

        const Card = {
                load : (boardID, stackID, cardOrder, cards) => {
                        for(let i = 0 ; i < cardOrder.length; i++){
                                for(let j = 0 ; j < cards.length; j++){
                                        const card = cards[j];
                                        if(card._id == cardOrder[i]){
                                                Card.create(boardID, stackID, card);
                                                break;
                                        }
                                }
                        }
                        // cards.forEach( (card) => {
                        //         Card.create(boardID, stackID, card);
                        // });
                        // cardOrder.forEach((cardID)=>{
                        //         Card.create(boardID, stackID, cards);
                        // });

                },
                create : (boardID, stackID, card) => {
                        const cardID     = card._id;
                        const title      = card.title;
                        const desc       = card.description;

                        const boardModel = App.Data.getBoard(boardID);
                        const stackModel = boardModel.getStack(stackID);

                        const cardModel  = new Classes.Card.Model(cardID, title, desc);
                        stackModel.addCard(cardID, cardModel);
                        boardModel.addInCardToStack(cardID, stackID);

                        const boardView = App.View.getBoard(boardID);
                        const stackView = boardView.getStack(stackID);

                        const cardView  = new Classes.Card.View(stackID, cardModel);
                        stackView.addCard(cardID, cardView);
                },
                update : (boardID, stackID, cardID, card) => {
                        const boardModel = App.Data.getBoard(boardID);
                        const stackModel = boardModel.getStack(stackID);
                        const cardModel  = stackModel.getCard(cardID);

                        cardModel.setTitle(card.title);
                        cardModel.setDescription(card.description);

                        const boardView = App.View.getBoard(boardID);
                        const stackView = boardView.getStack(stackID);
                        const cardView  = stackView.getCard(cardID);

                        cardView.setTitle(card.title);
                        cardView.setDescription(card.description);
                },
                delete : function (boardID, stackID, cardID) {
                        const boardModel = App.Data.getBoard(boardID);
                        const stackModel = boardModel.getStack(stackID);
                        stackModel.deleteCard(cardID);

                        const boardView = App.View.getBoard(boardID);
                        const stackView = boardView.getStack(stackID);
                        stackView.deleteCard(cardID);
                }
        }

        Parse.Card = Card;
})(this);