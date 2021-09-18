let scrollWidth;
function getScrollWidth(scrollWidth){
	let div = document.createElement('div');

	div.style.overflowY = 'scroll';
	div.style.width = '50px';
	div.style.height = '50px';

	document.body.append(div);

	scrollWidth = div.offsetWidth - div.clientWidth;
	let root = document.documentElement;
	root.style.setProperty('--spacing-end', scrollWidth + 'px');
	div.remove();
}
getScrollWidth(scrollWidth);

const JSCCommon = {
	btnToggleMenuMobile: [].slice.call(document.querySelectorAll(".toggle-menu-mobile--js")),
	menuMobile: document.querySelector(".menu-mobile--js"),
	menuMobileLink: [].slice.call(document.querySelectorAll(".menu-mobile--js ul li a")),

	modalCall() {
		let modalLinksClass = ".link-modal-js";

		Fancybox.bind(modalLinksClass, {
			arrows: false,
			infobar: false,
			touch: false,
			infinite: false,
			dragToClose: false,
			type: 'inline',
			autoFocus: false,
			l10n: {
				Escape: "Закрыть",
				NEXT: "Вперед",
				PREV: "Назад",
			},

			on: {
				initCarousel: (fancybox, slide) => {
					$('body').addClass('fancybox-active');
				},
				destroy: (fancybox, slide) => {
					$('body').removeClass('fancybox-active');
				},
			},
		});

		$(".modal-close-js").click(function () {
			Fancybox.close();
		})
		// fancybox.defaults.backFocus = false;
		let modalLinks = document.querySelectorAll(modalLinksClass);
		function addData() {
			for(let link of modalLinks){
				link.addEventListener('click', () => {
					let modal = document.querySelector(element.getAttribute("href"));
					let data = element.dataset;

					function setValue(val, elem) {
						if (elem && val) {
							let el = modal.querySelector(elem);

							el.tagName == "INPUT"
								? el.value = val
								: el.innerHTML = val;
						}
					}
					setValue(data.title, '.ttu');
					setValue(data.text, '.after-headline');
					setValue(data.btn, '.btn');
					setValue(data.order, '.order');
				})
			}
		}
		if (modalLinks) addData();
	},
	// /modalCall
	toggleMenu() {
		const toggle = this.btnToggleMenuMobile;
		const menu = this.menuMobile;
		document.addEventListener("click", function (event) {
			const toggleEv = event.target.closest(".toggle-menu-mobile--js");
			if (!toggleEv) return;
			toggle.forEach(el => el.classList.toggle("on"));
			menu.classList.toggle("active");
			[document.body, document.querySelector('html')].forEach(el => el.classList.toggle("fixed")); 
		}, { passive: true });
	},
	closeMenu() {
		let menu = this.menuMobile;
		if (!menu) return;
		if (menu.classList.contains("active")) {
			this.btnToggleMenuMobile.forEach(element => element.classList.remove("on"));
			this.menuMobile.classList.remove("active");
			[document.body, document.querySelector('html')].forEach(el => el.classList.remove("fixed")); 
		}

	},
	mobileMenu() {
		if (!this.menuMobileLink) return;
		this.toggleMenu();
		document.addEventListener('mouseup', (event) => {
			let container = event.target.closest(".menu-mobile--js.active"); // (1)
			let link = event.target.closest(".menu-mobile .menu a"); // (1)
			let toggle = event.target.closest('.toggle-menu-mobile--js.on'); // (1)
			if (!container && !toggle) this.closeMenu();
		}, { passive: true });

		window.addEventListener('resize', () => {
			if (window.matchMedia("(min-width: 992px)").matches) this.closeMenu();
		}, { passive: true });
	},
	//
	inputMask() {
		let InputTel = document.querySelectorAll('input[type="tel"]');
		for (let input of InputTel){
			input.setAttribute("pattern", "[+][0-9]{1}[(][0-9]{3}[)][0-9]{3}-[0-9]{2}-[0-9]{2}")
		}
		Inputmask("+9(999)999-99-99").mask(InputTel);
	},
	// /inputMask
	ifie() {
		if (!!window.MSInputMethodContext && !!document.documentMode) {
			document.body.insertAdjacentHTML("beforeend", '<div class="browsehappy">	<p class=" container">К сожалению, вы используете устаревший браузер. Пожалуйста, <a href="http://browsehappy.com/" target="_blank">обновите ваш браузер</a>, чтобы улучшить производительность, качество отображаемого материала и повысить безопасность.</p></div>');
		}
	},
	sendForm() {
		var gets = (function () {
			var a = window.location.search;
			var b = new Object();
			var c;
			a = a.substring(1).split("&");
			for (var i = 0; i < a.length; i++) {
				c = a[i].split("=");
				b[c[0]] = c[1];
			}
			return b;
		})();
		// form
		$(document).on('submit', "form", function (e) {
			e.preventDefault();
			const th = $(this);
			var data = th.serialize();
			th.find('.utm_source').val(decodeURIComponent(gets['utm_source'] || ''));
			th.find('.utm_term').val(decodeURIComponent(gets['utm_term'] || ''));
			th.find('.utm_medium').val(decodeURIComponent(gets['utm_medium'] || ''));
			th.find('.utm_campaign').val(decodeURIComponent(gets['utm_campaign'] || ''));
			$.ajax({
				url: 'action.php',
				type: 'POST',
				data: data,
			}).done(function (data) {

				Fancybox.close();
				Fancybox.show([{ src: "#modal-thanks", type: "inline" }]);
				// window.location.replace("/thanks.html");
				setTimeout(function () {
					// Done Functions
					th.trigger("reset");
					// $.magnificPopup.close();
					// ym(53383120, 'reachGoal', 'zakaz');
					// yaCounter55828534.reachGoal('zakaz');
				}, 4000);
			}).fail(function () { });

		});
	},
	heightwindow() {
		let vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty('--vh', `${vh}px`);

		window.addEventListener('resize', () => {
			let vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		}, { passive: true });
	},
	animateScroll(topShift=80) {
		$(document).on('click', ".scroll-link", function () {
			event.preventDefault();

			let targetSelector = $(this).attr("href");
			if (!document.querySelector(targetSelector)) {
				$(this).attr("href", '/' + targetSelector);
			}

			//
			let targetTop = $(targetSelector).offset().top;
			$('html, body').animate({ scrollTop: targetTop - topShift}, 0);
		});
	},
};
const $ = jQuery;

function eventHandler() {
	let headerH = 0;

	JSCCommon.modalCall();
	JSCCommon.heightwindow();
	JSCCommon.inputMask();
	// JSCCommon.ifie();
	JSCCommon.mobileMenu();
	// JSCCommon.sendForm();
	// JSCCommon.animateScroll(headerH);

	var x = window.location.host;
	let screenName;
	screenName = document.body.dataset.bg;
	if (screenName && x.includes("localhost:30")) {
		document.body.insertAdjacentHTML("beforeend", `<div class="pixel-perfect" style="background-image: url(screen/${screenName});"></div>`);
	}

	//luckyoneJs
	let topNav = document.querySelector(".top-nav--js");
	let botFixed = document.querySelector(".fixed-box--js");
	function calcHeaderHeight() {
		document.documentElement.style.setProperty('--header-h', `${topNav.offsetHeight}px`);
		headerH = topNav.offsetHeight;
		if(botFixed){
			document.documentElement.style.setProperty('--bot-fixed-h', `${botFixed.offsetHeight}px`);
		}

		if (!topNav) return;
		window.scrollY > 0
			? topNav.classList.add('fixed')
			: topNav.classList.remove('fixed');
	}
	window.addEventListener('resize', calcHeaderHeight, { passive: true });
	window.addEventListener('scroll', calcHeaderHeight, { passive: true });
	calcHeaderHeight();

	let defaultSl = {
		spaceBetween: 0,
		lazy: {
			loadPrevNext: true,
		},
		watchOverflow: true,
		loop: true,

		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		pagination: {
			el: ' .swiper-pagination',
			type: 'bullets',
			clickable: true,
		},
	};
	let freeMomentum = {
		freeMode: true,
		loopFillGroupWithBlank: true,
		touchRatio: 0.2,
		slideToClickedSlide: true,
		freeModeMomentum: true,
	};

	let swiper = new Swiper('selector', {
		...defaultSl,
		...freeMomentum,
	});

	//
	let headerBlockSlider = new Swiper('.headerBlock-slider-js', {
		slidesPerView: 'auto',
		spaceBetween: 20,
		loop: true,
		pagination: {
			el: '.swiper-pagination',
			type: 'bullets',
			clickable: true,
		},
	});
	//ultimate tabs
	let cTabs = document.querySelectorAll('.tabs');
	for (let tab of cTabs){
		let Btns = tab.querySelectorAll('.tabs__btn')
		let contentGroups = tab.querySelectorAll('.tabs__wrap');

		for (let btn of Btns){
			btn.addEventListener('click', function (){

				for (let btn of Btns){
					btn.classList.remove('active');
				}
				this.classList.add('active');

				let index = getIndex(btn,Btns);

				for (let cGroup of contentGroups){
					let contentItems = cGroup.querySelectorAll('.tabs__content');

					for (let item of contentItems){
						item.classList.remove('active');
					}
					contentItems[index].classList.add('active');
				}
			})
		}
	}
	function getIndex(htmlEl, itemsNodeList){
		for(let [itemIndex, item] of Object.entries(itemsNodeList)){
			if (item === htmlEl){
				return itemIndex;
			}
		}
	}
	//
	$('.free-dd-head-js').click(function () {
		$(this.parentElement).toggleClass('active');
		$(this.parentElement).find('.free-dd-content-js').slideToggle(function () {
			$(this).toggleClass('active');
		});
	});
	function makeDDGroup(ArrSelectors){
		for (let parentSelect of ArrSelectors){
			let parent = document.querySelector(parentSelect);
			if (parent){
				// childHeads, kind of funny))
				let ChildHeads = parent.querySelectorAll('.dd-head-js:not(.disabled)');
				$(ChildHeads).click(function (){
					let clickedHead = this;

					$(ChildHeads).each(function (){
						if (this === clickedHead){
							//parent element gain toggle class, style head change via parent
							$(this.parentElement).toggleClass('active');
							$(this.parentElement).find('.dd-content-js').slideToggle(function (){
								$(this).toggleClass('active');
							});
						}
						else{
							$(this.parentElement).removeClass('active');
							$(this.parentElement).find('.dd-content-js').slideUp(function (){
								$(this).removeClass('active');
							});
						}
					});

				});
			}
		}
	}
	makeDDGroup([
		'.sAddInfo-dd-group-js',
	]);
	//

	$('.set-curr-year-js').each(function (){
		this.innerHTML = new Date().getFullYear();
	})
	//footer
	$('.close-policy-js').click(function (){
		$('.gray-f--js').slideUp();
	})
	//.menu-mobile--js
	$('.menu-mobile--js .menu-item-has-children').click(function (){
		$(this).find('.sub-menu').slideToggle(function (){
			$(this).toggleClass('active');
		})
	})

};

if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
}