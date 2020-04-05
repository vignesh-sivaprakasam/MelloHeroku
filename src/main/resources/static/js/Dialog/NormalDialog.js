/*$Id$*/
"use strict";//No I18N

(function(ctx) {
	var Classes 	= ctx.Classes || (ctx.Classes = {});
	var Dialog	= Classes.Dialog || (Classes.Dialog = {});
	var Container 	= Classes.Dialog.Container;
	
	function NormalDialog(x, y, width, height, isModal) {
                this.dom          = document.createElement("div");
                let style         = this.dom.style;
                style.position    = "absolute";
                style.top         = 0;
                style.left        = 0;
                style.width       = window.innerWidth + "px";
		style.height      = window.innerHeight + "px";
		if(isModal){
			style.background = "black";
			style.opacity = 0.5;
		}
                this.dom.addEventListener("click", (ev) => {
                        console.log("clicked close");
                        this.remove();
                });
                document.body.appendChild(this.dom);
		this.container	= new Container(x, y, width, height);
	}

	NormalDialog.prototype = {
		open: function () {
			this.container.show();
		},
		close: function () {
			this.container.hide();
		},
		append: function (dom) {
			this.container.append(dom);
                },
                remove: function () {
                        this.dom.remove();
                        this.container.remove();
                },
		getDom: function () {
			return this.container.getDom();
		}
	}

	Classes.Dialog.NormalDialog = NormalDialog;
})(this);
