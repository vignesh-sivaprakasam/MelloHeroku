(function (ctx) {

        function createEditDialog() {
                const template = document.getElementById("stackEditDialog");
                const fragment = template.content.cloneNode(true);
                return fragment.querySelector(".stack_edit_container");
        }

        function openDialog(x, y, width, height, colorActiveCallback, onSaveCallback) {
                let dom         = createEditDialog();
                const dialog    = new Classes.Dialog.NormalDialog(x, y, width, height);
                dialog.append(dom);
                const name          = dom.querySelector(".stack_name_value");

                const color         = dom.querySelector(".stack_color_value");
                let colorComp       = new Classes.ColorComponent();
                colorActiveCallback(colorComp)
                color.appendChild(colorComp.getDom());

                const save = dom.querySelector(".save");
                save.addEventListener("click", ()=>{
                        let stackValue    = {};
                        stackValue.name   = name.textContent;
                        stackValue.color  = colorComp.getActive();
                        onSaveCallback(stackValue);
                        dialog.remove();
                });

                const cancel = dom.querySelector(".cancel");
                cancel.addEventListener("click", ()=>{
                        dialog.remove();
                });
                return dom;
        }

        function createStackEditDialog(editStack, stackModel, stackEditCallback) {
                const rect = editStack.getBoundingClientRect();
                const colorCompCallback = (colorComp)=>{
                        colorComp.setActive(stackModel.getColor());
                }

                let dom = openDialog(rect.x, rect.y, 400, 500, colorCompCallback,  (stackValue)=>{
                        let boardID = App.State.getActiveBoardID();
                        App.Stack.updateStack(boardID, stackModel.getID(), stackValue).then((resp)=>{
                                stackEditCallback(resp);
                                App.Parse.Stack.update(boardID, resp._id, resp);
                        });
                });

                dom.querySelector(".stack_name_value").textContent = stackModel.getName();
        }

        function createStackCreateDialog(x, y, width, height) {
                
                const colorCompCallback = (colorComp)=>{
                }

                let dom = openDialog(x, y, width, height, colorCompCallback,  (stackValue)=>{
                        let boardID = App.State.getActiveBoardID();
                        App.Stack.createStack(boardID, stackValue).then((resp)=>{
                                // stackView.setColor(stackValue.color);
                                App.Parse.Stack.create(boardID, resp._id, resp);
                        });
                });
                dom.querySelector(".edit_header > .text_center").textContent = "Stack Create Dialog";
                dom.querySelector(".save").textContent = "Create";
        }

        ctx.createStackEditDialog   = createStackEditDialog;
        ctx.createStackCreateDialog = createStackCreateDialog;
})(this);