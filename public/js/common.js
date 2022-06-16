"use strict";

let scrollWidth;

function getScrollWidth(scrollWidth) {
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
				PREV: "Назад"
			},
			on: {
				initCarousel: (fancybox, slide) => {
					$('body').addClass('fancybox-active');
				},
				destroy: (fancybox, slide) => {
					$('body').removeClass('fancybox-active');
				}
			}
		});
		$(".modal-close-js, .close-modal--js").click(function () {
			Fancybox.close();
		}); // fancybox.defaults.backFocus = false;

		let modalLinks = document.querySelectorAll(modalLinksClass);

		function addData() {
			for (let link of modalLinks) {
				link.addEventListener('click', () => {
					let modal = document.querySelector(element.getAttribute("href"));
					let data = element.dataset;

					function setValue(val, elem) {
						if (elem && val) {
							let el = modal.querySelector(elem);
							el.tagName == "INPUT" ? el.value = val : el.innerHTML = val;
						}
					}

					setValue(data.title, '.ttu');
					setValue(data.text, '.after-headline');
					setValue(data.btn, '.btn');
					setValue(data.order, '.order');
				});
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
		}, {
			passive: true
		});
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
		document.addEventListener('mouseup', event => {
			let container = event.target.closest(".menu-mobile--js.active"); // (1)

			let link = event.target.closest(".menu-mobile .menu a"); // (1)

			let toggle = event.target.closest('.toggle-menu-mobile--js.on'); // (1)

			if (!container && !toggle) this.closeMenu();
		}, {
			passive: true
		});
		window.addEventListener('resize', () => {
			if (window.matchMedia("(min-width: 992px)").matches) this.closeMenu();
		}, {
			passive: true
		});
	},

	heightwindow() {
		let vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty('--vh', "".concat(vh, "px"));
		window.addEventListener('resize', () => {
			let vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', "".concat(vh, "px"));
		}, {
			passive: true
		});
	}

};
const $ = jQuery;

function eventHandler() {
	let headerH = 0;
	JSCCommon.modalCall();
	JSCCommon.heightwindow();
	JSCCommon.mobileMenu();
	let header = document.querySelector(".header--js");
	let botFixed = document.querySelector(".fixed-box--js");

	function calcHeaderHeight() {
		document.documentElement.style.setProperty('--header-h', "".concat(header.offsetHeight, "px"));
		headerH = header.offsetHeight;

		if (botFixed) {
			document.documentElement.style.setProperty('--bot-fixed-h', "".concat(botFixed.offsetHeight, "px"));
		}

		if (!header) return;
		window.scrollY > 0 ? header.classList.add('fixed') : header.classList.remove('fixed');
	}

	window.addEventListener('resize', calcHeaderHeight, {
		passive: true
	});
	window.addEventListener('scroll', calcHeaderHeight, {
		passive: true
	});
	calcHeaderHeight(); //

	let headerBlockSlider = new Swiper('.headerBlock-slider-js', {
		slidesPerView: 'auto',
		spaceBetween: 20,
		loop: true,
		pagination: {
			el: '.swiper-pagination',
			type: 'bullets',
			clickable: true
		},
		autoplay: {
			delay: 3000
		}
	});
	let cTabs = document.querySelectorAll('.tabs');

	for (let tab of cTabs) {
		let Btns = tab.querySelectorAll('.tabs__btn');
		let contentGroups = tab.querySelectorAll('.tabs__wrap');

		for (let btn of Btns) {
			btn.addEventListener('click', function () {
				for (let btn of Btns) {
					btn.classList.remove('active');
				}

				this.classList.add('active');
				let index = [...Btns].indexOf(this); //-console.log(index);

				for (let cGroup of contentGroups) {
					let contentItems = cGroup.querySelectorAll('.tabs__content');

					for (let item of contentItems) {
						item.classList.remove('active');
					}

					contentItems[index].classList.add('active');
				}
			});
		}
	} //


	$('.free-dd-head-js, .sb-dd-menu-js > li.menu-item-has-children > a').click(function () {
		event.preventDefault();
		let content = this.parentElement.querySelector('.free-dd-content-js') || this.nextElementSibling;
		$(this.parentElement).toggleClass('active');
		$(content).slideToggle(function () {
			$(this).toggleClass('active');
		});
	});

	function makeDDGroup(ArrSelectors) {
		for (let parentSelect of ArrSelectors) {
			let parent = document.querySelector(parentSelect);

			if (parent) {
				// childHeads, kind of funny))
				let ChildHeads = parent.querySelectorAll('.dd-head-js:not(.disabled)');
				$(ChildHeads).click(function () {
					let clickedHead = this;
					$(ChildHeads).each(function () {
						if (this === clickedHead) {
							//parent element gain toggle class, style head change via parent
							$(this.parentElement).toggleClass('active');
							$(this.parentElement).find('.dd-content-js').slideToggle(function () {
								$(this).toggleClass('active');
							});
						} else {
							$(this.parentElement).removeClass('active');
							$(this.parentElement).find('.dd-content-js').slideUp(function () {
								$(this).removeClass('active');
							});
						}
					});
				});
			}
		}
	}

	makeDDGroup(['.sAddInfo-dd-group-js', '.sPrice-dd-items-js']); //

	/*
	$('.close-policy-js').click(function () {
		$('.gray-f--js').slideUp(function () {
			calcHeaderHeight();
		});
	}); 
	*/

	$('.menu-mobile--js .menu-item-has-children').click(function () {
		$(this).find('.sub-menu').slideToggle(function () {
			$(this).toggleClass('active');
		});
	});
	let swiperControllParents = document.querySelectorAll('.swiper-controlls-parent-js');

	for (let parent of swiperControllParents) {
		let sliderCont = parent.querySelector('.c-slider-js');
		let prev = parent.querySelector('.swiper-button-prev');
		let next = parent.querySelector('.swiper-button-next');
		let slider = new Swiper(sliderCont, {
			slidesPerView: 'auto',
			spaceBetween: 20,
			loop: true,
			navigation: {
				nextEl: next,
				prevEl: prev
			},
			pagination: {
				el: '.swiper-pagination',
				type: 'bullets',
				clickable: true
			}
		});
	}

	let scrollTopBtn = document.querySelector('.scroll-top--js');
	$(scrollTopBtn).click(function () {
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	});

	if (scrollTopBtn) {
		window.addEventListener("scroll", toggleFixedBtn.bind(undefined, scrollTopBtn), {
			passive: true
		});
		toggleFixedBtn(scrollTopBtn);
	}

	function toggleFixedBtn(fixedStrip) {
		if (window.scrollY > calcVh(50)) {
			$(fixedStrip).addClass('active');
		} else {
			$(fixedStrip).removeClass('active');
		}
	}

	function calcVh(v) {
		var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
		return v * h / 100;
	}

	$('.tell-dd-btn-js  ').click(function () {
		if (!event.target.closest('.top-nav__number')) {
			$('.tell-dd--js').toggleClass('active');
		}
	});
	document.addEventListener('click', function () {
		if (!event.target.closest('.tell-dd-btn-js') && !event.target.closest('.tell-dd--js')) {
			$('.tell-dd--js').removeClass('active');
		}
	});
	document.addEventListener('scroll', function () {
		$('.tell-dd--js').removeClass('active');
	}); //

	$('.modal-car-slider-js').each(function () {
		let slider = new Swiper(this, {
			observer: true,
			observeParents: true,
			slidesPerView: 'auto',
			spaceBetween: 20,
			loop: true,
			pagination: {
				el: '.swiper-pagination',
				type: 'bullets',
				clickable: true
			}
		});
	});
}

;

if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
}