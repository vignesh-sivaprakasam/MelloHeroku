(function (ctx) {
        var Classes   = ctx.Classes || (ctx.Classes = {});
        var Stack     = Classes.Stack || (Classes.Stack = {});

        class StackModel {
                constructor(id, name, color){
                        this.id       = id;
                        this.name     = name;
                        this.color    = color;
                        this.cards    = new Map();
                        this.order    = [];
                }

                getID(){
                        return this.id;
                }

                getName(){
                        return this.name;
                }
                setName(name){
                        this.name = name;
                }

                getColor(){
                        return this.color;
                }
                setColor(color){
                        this.color = color;
                }

                // setOrder(order){
                //         this.order = order;
                // }

                addCard(cardID, card){
                        this.cards.set(cardID, card);
                        this.order.push(cardID);
                }

                deleteCard(cardID){
                        this.cards.delete(cardID);
                        const index = this.order.indexOf(cardID);
                        this.order.splice(index, 1);
                }
                getCard(cardID){
                        return this.cards.get(cardID);
                }
                getCardPosition(cardID){
                        return this.order.indexOf(cardID);
                }
        }

        Stack.Model = StackModel;
})(this);