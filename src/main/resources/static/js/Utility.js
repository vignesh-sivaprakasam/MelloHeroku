(function (ctx) {
        let App = ctx.App || (ctx.App = {});
        let Utility = App.Utility || (App.Utility = {});

        Utility.getTemplate = (id) => {
                let fragment = document.getElementById(id);
                return fragment.content.cloneNode(true);
        }

        Utility.createCenterDialog = (width, height) => {
                let left = (window.innerWidth / 2) - (width / 2);
                let top  = (window.innerHeight / 2) - (height / 2);
                let di   = new Classes.Dialog.NormalDialog(left, top, width, height);
                return di;
                // di.append(dom);
        }
        
})(this);