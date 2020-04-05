(function (ctx) {
        var Classes   = ctx.Classes || (ctx.Classes = {});
        var Board     = Classes.Board || (Classes.Board = {});

        const templateName = "boardViewTemplate";
        function createView() {
                let fragment    = App.Utility.getTemplate(templateName);
                let container   = fragment.querySelector(".boardView");
                return container;
        }

        function addListener(stackView) {
                stackView.addStackDom.addEventListener("click", ()=>{
                        // console.log(left, top);
                        const width   = 400;
                        const height  = 500;
                        const left    = window.innerWidth/2 - (width/2);
                        const top     = window.innerHeight/2 - (height/2);
                        createStackCreateDialog(left, top, width, height);
                });
        }

        class BoardView {
                constructor(){
                        this.dom            = createView();
                        this.stackHolder    = this.dom.querySelector(".stackHolder");
                        this.addStackDom    = this.dom.querySelector(".addStack");
                        this.stacks         = new Map();
                        addListener(this);
                }

                getDom(){
                        return this.dom;
                }

                getStackHolder(){
                        return this.stackHolder;
                }

                addStack(stackID, stackView){
                        this.stacks.set(stackID, stackView);
                        this.stackHolder.appendChild(stackView.getDom());
                }
                getStack(stackID){
                        return this.stacks.get(stackID);
                }
                deleteStack(stackID){
                        let stackView = this.stacks.get(stackID);
                        stackView.remove();
                        this.stacks.delete(id);
                }
        }

        Board.View = BoardView;
})(this);