"use strict";
(function (ctx) {
        const Parse = App.Parse || (App.Parse = {});

        const Stack = {
                load : (boardID, stacks) => {
                        stacks.forEach((stack)=>{
                                Stack.create(boardID, stack._id, stack);
                        });
                },
                create : (boardID, stackID, stack) => {
                        const stackName  = stack.name;
                        const stackColor = stack.color;
                        const boardModel = App.Data.getBoard(boardID);
                        const stackModel = new Classes.Stack.Model(stackID, stackName, stackColor);
                        // stackModel.setOrder(JSON.parse(stack.cardOrder.cardOrder));
                        boardModel.addStack(stackID, stackModel);

                        const boardView = App.View.getBoard(boardID);
                        const stackView = new Classes.Stack.View(stackModel);
                        stackView.setName(stackModel.getName());
                        stackView.setColor(stackModel.getColor());
                        
                        boardView.addStack(stackID, stackView);

                        const cards = stack.cards;
                        console.log("stack", stack);
                        App.Parse.Card.load(boardID, stackID, stack.card_order, cards);
                },
                update : (boardID, stackID, stack)=>{
                        const boardModel = App.Data.getBoard(boardID);
                        const stackModel = boardModel.getStack(stackID);

                        stackModel.setName(stack.name);
                        stackModel.setColor(stack.color);

                        const boardView = App.View.getBoard(boardID);
                        const stackView = boardView.getStack(stackID);

                        stackView.setName(stack.name);
                        stackView.setColor(stack.color);
                },
                delete : (boardID, stackID) => {
                        const boardModel = App.Data.getBoard(boardID);
                        boardModel.deleteStack(stackID);

                        const boardView = App.View.getBoard(boardID);
                        const stackView = boardView.getStack(stackID);
                        // stackView.remove();

                        boardView.deleteStack(stackID);
                        // const stackModel = boardModel.getStack(stackID);
                }
        }

        Parse.Stack = Stack;
})(this);