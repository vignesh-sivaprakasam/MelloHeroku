(function (ctx) {
        var Classes   = ctx.Classes || (ctx.Classes = {});
        var Stack     = Classes.Stack || (Classes.Stack = {});

        const templateName = "stackViewTemplate";

        function createStack() {
                let fragment = App.Utility.getTemplate(templateName);
                return fragment.querySelector(".stack");
        }

        function createStackMenu() {
                const template = document.getElementById("stackMenuDropDown");
                const fragment = template.content.cloneNode(true);
                return fragment.querySelector(".menu_dd");
        }

        function createDropDown(left, top, stackView, stackModel) {
                var dom   = createStackMenu();
                let di    = new Classes.Dialog.NormalDialog(left, top, 150, 100);
                di.append(dom);
                const deleteStack = dom.querySelector(".delete");
                deleteStack.addEventListener("click", () => {
                        let boardID = App.State.getActiveBoardID();
                        App.Stack.deleteStack(boardID, stackModel.getID()).then((resp)=>{
                                App.Parse.Stack.delete(boardID, stackModel.getID());
                        });
                        di.remove();
                });

                const editStack = dom.querySelector(".edit");
                editStack.addEventListener("click", (ev) => {
                        console.log("edit stack click");
                        const stackEditCallback = (stack) =>{
                                console.log("stackView edit ", stack);
                        }
                        createStackEditDialog(editStack, stackModel, stackEditCallback);
                        di.remove();
                });
        }

        

        function addListener(stackView, stackModel) {
                let name = stackView.stackName;
                name.addEventListener("keydown", (ev)=>{
                        if(ev.keyCode == 13){
                                ev.preventDefault();
                                let boardID = App.State.getActiveBoardID();
                                name.blur();
                                App.Stack.updateStack(boardID, stackModel.getID(), {
                                        name    : name.textContent,
                                        color   : stackModel.getColor()
                                });
                        }
                        if(ev.keyCode == 27){
                                name.textContent = prevName;
                                name.blur();
                        }
                });

                let menu = stackView.stackMenu;
                menu.addEventListener("click", ()=>{
                        const rect = stackView.stackMenu.getBoundingClientRect();
                        createDropDown(rect.x, rect.y + rect.height, stackView, stackModel);
                });

                let addCard = stackView.addCardDom;
                addCard.addEventListener("click", ()=>{
                        const dom = Classes.Card.View.createCard(stackModel.getID());
                        stackView.getCardHolder().appendChild(dom);
                });

                const cardHolder = stackView.cardHolder;
                cardHolder.addEventListener("dragover",(ev) => {
                        ev.preventDefault();
                });
                cardHolder.addEventListener("drop", (ev) => {
                        console.log("stack drop");
                });
        }
        
        class StackView {
                constructor(stackModel){
                        this.dom            = createStack();
                        this.stackHeader    = this.dom.querySelector(".stack_header");
                        this.stackName      = this.dom.querySelector(".stack_name");
                        this.stackMenu      = this.dom.querySelector(".stack_menu");
                        this.cardHolder     = this.dom.querySelector(".card_holder");
                        this.addCardDom     = this.dom.querySelector(".createCard");

                        this.cards          = new Map();
                        addListener(this, stackModel);
                }
                getDom(){
                        return this.dom;
                }

                getCardHolder(){
                        return this.cardHolder;
                }

                setName(name){
                        this.stackName.textContent = name;
                }

                setColor(color){
                        this.stackHeader.style.backgroundColor = color;
                }

                addCard(cardID, cardView){
                        this.cards.set(cardID, cardView);
                        this.cardHolder.appendChild(cardView.getDom());
                }
                getCard(cardID){
                        return this.cards.get(cardID);
                }
                deleteCard(cardID){
                        const cardView = this.cards.get(cardID);
                        this.cards.delete(cardID);
                        cardView.remove();
                }

                remove(){
                        this.dom.remove();
                }

        }

        Stack.View = StackView;
})(this);