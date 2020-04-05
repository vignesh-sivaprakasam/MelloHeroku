(function (ctx) {
        var Classes 	= ctx.Classes || (ctx.Classes = {});
        var BoardList	= Classes.BoardList || (Classes.BoardList = {});

        class BoardListModel {
                constructor(id, name, color){
                        this.id       = id;
                        this.name     = name;
                        this.color    = color;
                }

                getID(){
                        return this.id;
                }
                setID(id){
                        this.id = id;
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
        }

        BoardList.Model = BoardListModel;
})(this);