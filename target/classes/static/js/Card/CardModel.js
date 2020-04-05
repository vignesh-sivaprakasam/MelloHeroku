(function (ctx) {
        var Classes = ctx.Classes || (ctx.Classes   = {});
        var Card    = Classes.Card || (Classes.Card = {});

        class CardModel {
                constructor(id, title, description){
                        this.id          = id;
                        this.title       = title;
                        this.description = description;
                }

                getID(){
                        return this.id;
                }
                setID(id){
                        this.id = id;
                }

                getTitle(){
                        return this.title;
                }
                setTitle(title){
                        this.title = title;
                }

                getDescription(){
                        return this.description;
                }
                setDescription(description){
                        this.description = description;
                }
        }

        Card.Model = CardModel;
})(this);