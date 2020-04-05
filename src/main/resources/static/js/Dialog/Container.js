/*$Id$*/
"use strict";//No I18N

(function(ctx) {
	var Classes 	= ctx.Classes || (ctx.Classes = {});
        var Dialog      = Classes.Dialog || (Classes.Dialog = {});
	var innerWidth  = window.innerWidth;
        var innerHeight = window.innerHeight;
        
	function Container(x, y, width, height) {
		this.dom       = document.createElement("div");
		var style      = this.dom.style;
		style.position = "absolute";
		style.zIndex   = "998";
		style.margin   = "auto";
		this.setLeft(x);
		this.setTop(y);
		this.setDimension(width, height);
		document.body.appendChild(this.dom);
	}

	Container.prototype = {
		getX : function () {
			return this.x;
		},
		getY : function () {
			return this.y;
		},

		setLeft : function (x) {
			if(x < 0){
				x = 0;
			} else if(x + this.width > innerWidth){
				x = innerWidth - this.width;
			}
			this.x = x;
			this.dom.style.left = x + "px";// No I18N
		},
		setRight : function (x) {
			if(x < 0){
				x = 0;
			} else if(x + this.width > innerWidth){
				x = innerWidth - this.width;
			}
			this.x = x;
			this.dom.style.right = x + "px";// No I18N
		},
		setTop : function (y) {
			if(y < 0){
				y = 0;
			} else if( (y + this.height) > innerHeight)  {
				y = innerHeight - this.height;
			}
			this.y = y;
			this.dom.style.top = y + "px";// No I18N
		},

		setBottom : function (y) {
			if(y < 0){
				y = 0;
			} else if( (y + this.height) > innerHeight)  {
				y = innerHeight - this.height;
			}
			this.y = y;
			this.dom.style.bottom = y + "px";// No I18N
		},

		getWidth: function () {
			return this.width;
		},
		setWidth: function (width) {
			this.width = width;
			this.dom.style.width = width + "px";// No I18N
		},

		getHeight: function (){
			return this.height;
		},
		setHeight: function (height) {
			this.height = height;
			this.dom.style.height = height + "px";// No I18N
		},

		setPosition: function (x, y) {
			this.setLeft(x);
			this.setTop(y);
		},
		setDimension: function (width, height) {
			this.setWidth(width);
			this.setHeight(height);
		},

		show : function () {
			this.dom.style.display    =  "";// No I18N
		},

		hide : function () {
			this.dom.style.display    = "none";// No I18N
		},

		append: function (child) {
			this.dom.appendChild(child);
		},
		remove: function () {
			this.dom.remove();
		},

		addListener: function (listener) {
			listener.mousedown && addEvent.call(this,this.dom, listener.mousedown, "mousedown"); // No I18N
		},

		getDom: function () {
			return this.dom;
		}
	}

	function addEvent(dom, fn, eventName) {
		dom.addEventListener(eventName, fn.bind(this));
        }
        
	Dialog.Container = Container;
})(this);
