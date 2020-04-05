(function (ctx) {
        var Classes                     = ctx.Classes || (ctx.Classes = {});
        const colorComponentTemplate    = "colorComponent";
        const colorItemTemplate         = "colorItem";

        const colors = ["#d93651", "#ff9f1a", "#ffd500", "#8acc47", "#47cc8a", "#30bfbf", "#00aaff", "#8f7ee6", "#98aab3"];

        function createColorItems(colorComp) {
                let colorsDom = colors.map( color => {
                        let frg                         = App.Utility.getTemplate(colorItemTemplate);
                        let colorItem                   = frg.querySelector(".color_item");
                        colorItem.addEventListener("click", ()=>{
                                colorComp.setActive(color);
                        });
                        let colorHolder                 = frg.querySelector(".color_holder");
                        colorHolder.style.background    = color;
                        return colorItem;
                });
                return colorsDom;
        }
        function createColorComponent(doms) {
                let fragment    = App.Utility.getTemplate(colorComponentTemplate);
                let container   = fragment.querySelector(".color_container");
                doms.forEach( dom => {
                        container.appendChild(dom);
                });
                return container;
        }

        class ColorComponent {
                constructor(){
                        this.colorsDom = createColorItems(this);
                        this.dom = createColorComponent(this.colorsDom);
                        this.active = 0;
                        this.setActive(colors[0]);
                }

                getDom(){
                        return this.dom;
                }

                getActive(){
                        return colors[this.active];
                }

                setActive(color){
                        let index = colors.indexOf(color);
                        let prevActive = this.colorsDom[this.active];
                        prevActive.classList.remove("active");

                        let active = this.colorsDom[index];
                        active.classList.add("active");

                        this.active = index;
                }
        }

        Classes.ColorComponent = ColorComponent;
})(this);