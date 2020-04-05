(function (ctx) {
        var Classes = ctx.Classes || (ctx.Classes   = {});
        var Card    = Classes.Card || (Classes.Card = {});

        const templateName = "expandedCardTemplate";

        function createExpandedCard() {
                const fragment = App.Utility.getTemplate(templateName);
                return fragment.querySelector(".expandedCard");
        }

        function addListener(expandedCard, stackID, cardModel) {
                const title = expandedCard.title;
                title.contentEditable = true;
                title.addEventListener("keydown", (ev)=>{
                        if(ev.keyCode == 13){
                                ev.preventDefault();
                                const boardID = App.State.getActiveBoardID();
                                const cardValue = {
                                        title       : title.textContent,
                                        description : cardModel.getDescription()
                                };
                                App.Card.updateCard(boardID, stackID, cardModel.getID(), cardValue).then((card) => {
                                        App.Parse.Card.update(boardID, stackID, cardModel.getID(), card);
                                });
                                title.blur();
                        }
                        if(ev.keyCode == 27){
                                title.textContent = cardModel.getTitle();
                                title.blur();
                        }
                });

                const desc = expandedCard.desc;
                desc.contentEditable = true;
                desc.addEventListener("keydown", (ev)=>{
                        if(ev.keyCode == 13){
                                ev.preventDefault();
                                const boardID = App.State.getActiveBoardID();
                                const cardValue = {
                                        title       : cardModel.getTitle(),
                                        description : desc.textContent
                                };
                                App.Card.updateCard(boardID, stackID, cardModel.getID(), cardValue).then((card) => {
                                        App.Parse.Card.update(boardID, stackID, cardModel.getID(), card);
                                });
                                desc.blur();
                        }
                        if(ev.keyCode == 27){
                                desc.textContent = cardModel.getDescription();
                                desc.blur();
                        }

                });
        }

        class ExpandedCardView {
                constructor(stackID, cardModel){
                        this.dom = createExpandedCard();
                        this.title      = this.dom.querySelector(".exp_body_title");
                        this.desc       = this.dom.querySelector(".exp_body_desc");
                        this.expBody    = this.dom.querySelector(".exp_card_body");
                        this.closeDiv   = this.dom.querySelector(".exp_card_close");

                        this.closeDiv.addEventListener("click", () => {
                                this.close();
                        });
                        addListener(this, stackID, cardModel);
                        this.setTitle(cardModel.getTitle());
                        this.setDescription(cardModel.getDescription());
                }

                getDom(){
                        return this.dom;
                }

                setTitle(title){
                        this.title.textContent = title;
                }

                setDescription(description){
                        this.desc.textContent = description;
                }

                open(){
                        document.body.appendChild(this.dom);
                }

                close(){
                        this.dom.remove();
                }
        }

        Card.ExpandedCard = ExpandedCardView;
})(this);