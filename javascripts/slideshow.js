'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Slideshow = (function () {
	function Slideshow(sectionID) {
		var _this = this;

		_classCallCheck(this, Slideshow);

		this.slides = [];
		this.firstloaded = false;
		this.numSlidesPreloaded = 0;
		this.activeSlide = 0;
		this.lastActiveSlide = 0;
		this.waitTime = 5000;
		this.initTime = 0;
		this.timeOutHandler = undefined;
		this.slideshowElement = $('#slideshow');
		this.debugindex = 0;

		this.type = "testimonial_0";

		$('.slide').each(function (index, element) {
			var slide = new Slide(_this, $(element), index);
			_this.slides.push(slide);
		});

		if (this.slides.length > 0) {
			this.slides[0].preload();
		}
	}

	_createClass(Slideshow, [{
		key: 'clear',
		value: function clear() {
			clearTimeout(this.timeOutHandler);
		}
	}, {
		key: 'setNextType',
		value: function setNextType(type) {
			this.type = type;
		}
	}, {
		key: 'loaded',
		value: function loaded(slide) {
			var _this2 = this;

			if (!this.firstloaded) {
				this.firstloaded = true;
				slide.show();

				var lasttype = "";
				for (var i = 1; i < this.slides.length; i++) {
					var s = this.slides[i];
					if (s.type != lasttype) {
						lasttype = s.type;
						s.preload();
					}
				}

				this.timeOutHandler = setTimeout(function () {
					_this2.next();
				}, this.waitTime);
			}
			this.numSlidesPreloaded++;
			console.log("Loaded: " + slide.index + " " + slide.type + " " + this.numSlidesPreloaded);
			if (this.numSlidesPreloaded >= 4) {
				for (var i = 1; i < this.slides.length; i++) {
					this.slides[i].preload();
				}
			}
		}
	}, {
		key: 'next',
		value: function next() {
			var _this3 = this;

			this.lastActiveSlide = this.activeSlide;

			var foundslide = this.lookForNext(this.type);
			if (foundslide != undefined) {
				if (foundslide.index != this.activeSlide) {
					this.activeSlide = foundslide.index;
					this.slides[this.lastActiveSlide].hide();
					this.slides[this.activeSlide].show();
				}
			}

			clearTimeout(this.timeOutHandler);
			this.timeOutHandler = setTimeout(function () {
				_this3.next();
			}, this.waitTime);
		}
	}, {
		key: 'lookForNext',
		value: function lookForNext(type) {
			var startindex = this.debugindex + 1;
			var foundslide = undefined;
			for (var i = startindex; i < startindex + this.slides.length; i++) {
				var index = i % this.slides.length;
				var s = this.slides[index];
				if (s.isLoaded && s.type == type) {
					foundslide = s;
					break;
				}
			}
			if (foundslide != undefined) {
				this.debugindex = foundslide.index;
			}
			//console.log("Found: "+this.debugindex);
			return foundslide;
		}
	}, {
		key: 'show',
		value: function show() {
			var _this4 = this;

			if (!this.slideshowElement.hasClass('show')) {
				if (this.timeOutHandler == undefined) {
					this.timeOutHandler = setTimeout(function () {
						_this4.next();
					}, 10);
					console.log("start timeout");
				}
				this.slideshowElement.removeClass('hide').addClass('show');
			}
			$('#background').removeClass('show').addClass('hide');
		}
	}, {
		key: 'hide',
		value: function hide() {
			if (!this.slideshowElement.hasClass('hide')) {
				this.slideshowElement.removeClass('show').addClass('hide');
			}
			if (this.timeOutHandler != undefined) {
				clearTimeout(this.timeOutHandler);
				this.timeOutHandler = undefined;
			}
			$('#background').removeClass('hide').addClass('show');
		}
	}]);

	return Slideshow;
})();

var Slide = (function () {
	function Slide(parent, se, i) {
		_classCallCheck(this, Slide);

		this.parent = parent;
		this.slideelement = se;
		this.index = i;
		this.src = this.slideelement.data("image");
		this.type = this.slideelement.data("type");
		this.startPreload = false;
		this.isLoaded = false;
	}

	_createClass(Slide, [{
		key: 'preload',
		value: function preload() {
			var _this5 = this;

			if (!this.startPreload) {
				this.startPreload = true;
				var img = new Image();
				img.onload = function () {
					_this5.isLoaded = true;
					_this5.slideelement.css('background-image', 'url(' + _this5.src + ')');
					_this5.parent.loaded(_this5);
				};
				img.src = this.src;
			}
		}
	}, {
		key: 'load',
		value: function load() {
			var _this6 = this;

			var img = new Image();
			img.onload = function () {
				_this6.isLoaded = true;
				_this6.slideelement.css('background-image', 'url(' + _this6.src + ')');
				_this6.parent.loaded(_this6);
			};
			img.src = this.src;
		}
	}, {
		key: 'show',
		value: function show() {
			this.slideelement.removeClass('hide').addClass('show');
		}
	}, {
		key: 'hide',
		value: function hide() {
			this.slideelement.removeClass('show').addClass('hide');
		}
	}]);

	return Slide;
})();