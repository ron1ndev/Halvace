const btnPopupBy = document.querySelectorAll('.popup__btn');
let clickHas = false
btnPopupBy.forEach(item=>{
	item.addEventListener('click',(e)=>{
		let target = e.target;
		clickHas = true;
		target.innerHTML = 'Товар добавлен'
		target.classList.add('color-red');
		setTimeout(() => {
			target.innerHTML = 'Добавить в корзину'
			target.classList.remove('color-red');
		}, 700);
		
	})
})


var ua = window.navigator.userAgent;
var msie = ua.indexOf("MSIE ");
var isMobile = { Android: function () { return navigator.userAgent.match(/Android/i); }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };
function isIE() {
	ua = navigator.userAgent;
	var is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
	return is_ie;
}
if (isIE()) {
	document.querySelector('html').classList.add('ie');
}
if (isMobile.any()) {
	document.querySelector('html').classList.add('_touch');
}

function testWebP(callback) {
	var webP = new Image();
	webP.onload = webP.onerror = function () {
		callback(webP.height == 2);
	};
	webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}
testWebP(function (support) {
	if (support === true) {
		document.querySelector('html').classList.add('_webp');
	} else {
		document.querySelector('html').classList.add('_no-webp');
	}
});

function ibg() {
	if (isIE()) {
		let ibg = document.querySelectorAll("._ibg");
		for (var i = 0; i < ibg.length; i++) {
			if (ibg[i].querySelector('img') && ibg[i].querySelector('img').getAttribute('src') != null) {
				ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
			}
		}
	}
}
ibg();

window.addEventListener("load", function () {
	if (document.querySelector('.wrapper')) {
		setTimeout(function () {
			document.querySelector('.wrapper').classList.add('_loaded');
		}, 0);
	}
});

let unlock = true;

//=================
//ActionsOnHash
if (location.hash) {
	const hsh = location.hash.replace('#', '');
	if (document.querySelector('.popup_' + hsh)) {
		popup_open(hsh);
	} else if (document.querySelector('div.' + hsh)) {
		_goto(document.querySelector('.' + hsh), 500, '');
	}
}
//=================
//Menu
let iconMenu = document.querySelector(".icon-menu");
if (iconMenu != null) {
	let delay = 500;
	let menuBody = document.querySelector(".menu__body");
	iconMenu.addEventListener("click", function (e) {
		if (unlock) {
			body_lock(delay);
			iconMenu.classList.toggle("_active");
			menuBody.classList.toggle("_active");
		}
	});
};
function menu_close() {
	let iconMenu = document.querySelector(".icon-menu");
	let menuBody = document.querySelector(".menu__body");
	iconMenu.classList.remove("_active");
	menuBody.classList.remove("_active");
}
//=================
//BodyLock
function body_lock(delay) {
	let body = document.querySelector("body");
	if (body.classList.contains('_lock')) {
		body_lock_remove(delay);
	} else {
		body_lock_add(delay);
	}
}
function body_lock_remove(delay) {
	let body = document.querySelector("body");
	if (unlock) {
		let lock_padding = document.querySelectorAll("._lp");
		setTimeout(() => {
			for (let index = 0; index < lock_padding.length; index++) {
				const el = lock_padding[index];
				el.style.paddingRight = '0px';
			}
			body.style.paddingRight = '0px';
			body.classList.remove("_lock");
		}, delay);

		unlock = false;
		setTimeout(function () {
			unlock = true;
		}, delay);
	}
}
function body_lock_add(delay) {
	let body = document.querySelector("body");
	if (unlock) {
		let lock_padding = document.querySelectorAll("._lp");
		for (let index = 0; index < lock_padding.length; index++) {
			const el = lock_padding[index];
			el.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		}
		body.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		body.classList.add("_lock");

		unlock = false;
		setTimeout(function () {
			unlock = true;
		}, delay);
	}
}
//=================




//Popups
let popup_link = document.querySelectorAll('._popup-link');
let popups = document.querySelectorAll('.popup');
for (let index = 0; index < popup_link.length; index++) {
	const el = popup_link[index];
	el.addEventListener('click', function (e) {
		if (unlock) {
			let item = el.getAttribute('href').replace('#', '');
			let video = el.getAttribute('data-video');
			popup_open(item, video);
		}
		e.preventDefault();
	})
}
for (let index = 0; index < popups.length; index++) {
	const popup = popups[index];
	popup.addEventListener("click", function (e) {
		if (!e.target.closest('.popup__body')) {
			popup_close(e.target.closest('.popup'));
			
		};
	});
}
function popup_open(item, video = '') {
	let activePopup = document.querySelectorAll('.popup._active');
	if (activePopup.length > 0) {
		popup_close('', false);
	}
	let curent_popup = document.querySelector('.popup_' + item);
	if (curent_popup && unlock) {
		if (video != '' && video != null) {
			let popup_video = document.querySelector('.popup_video');
			popup_video.querySelector('.popup__video').innerHTML = '<iframe src="https://www.youtube.com/embed/' + video + '?autoplay=1"  allow="autoplay; encrypted-media" allowfullscreen></iframe>';
		}
		if (!document.querySelector('.menu__body._active')) {
			body_lock_add(500);
			
		}
		curent_popup.classList.add('_active');
		history.pushState('', '', '#' + item);
	}
}
function popup_close(item, bodyUnlock = true) {
	if (unlock) {
		if (!item) {
			for (let index = 0; index < popups.length; index++) {
				const popup = popups[index];
				let video = popup.querySelector('.popup__video');
				if (video) {
					video.innerHTML = '';
				}
				popup.classList.remove('_active');
			}
		} else {
			let video = item.querySelector('.popup__video');
			if (video) {
				video.innerHTML = '';
			}
			item.classList.remove('_active');
		}
		if (!document.querySelector('.menu__body._active') && bodyUnlock && !document.querySelector('.cart__content').classList.contains('active')) {

			body_lock_remove(500);


		}
		history.pushState('', '', window.location.href.split('#')[0]);
	}
}
let popup_close_icon = document.querySelectorAll('.popup__close,._popup-close');
if (popup_close_icon) {
	for (let index = 0; index < popup_close_icon.length; index++) {
		const el = popup_close_icon[index];
		el.addEventListener('click', function () {
			popup_close(el.closest('.popup'));
		})
	}
}
document.addEventListener('keydown', function (e) {
	if (e.code === 'Escape') {
		popup_close();
	}
});



document.addEventListener('DOMContentLoaded', function () {

    // Бургер
    let headerMburger = document.querySelector(".header__burger"),
        headerMenu = document.querySelector(".header__menu"),
        body = document.querySelector("body");

    headerMburger.addEventListener('click', function () {
        headerMburger.classList.toggle("menu-active");
        headerMenu.classList.toggle("menu-active");
        body.classList.toggle("_lock");
    })

    // Липкая щапка при скроле 
    window.addEventListener('scroll', function () {
        let mainBlock = document.querySelector(".main-block");
        let header = document.querySelector(".header");
        if (window.pageYOffset > 500 && document.querySelector(".main-block")) {
            header.classList.add("header-fixed");
            cartContent.classList.add("cart-top");
            cartBtn.classList.add("final__order-active")
            mainBlock.classList.add("main-block-padding");
            cartContent.style.height = `95%`

        } else {
            mainBlock.classList.remove("main-block-padding");
            header.classList.remove("header-fixed");
            cartContent.classList.remove("cart-top");
            cartContent.style.height = `100%`

        }
    })

    // Боковая корзина 
	let wrap = document.querySelector('.wrapper');

    let cart = document.querySelector(".header__menu-cart")
    let cartContent = document.querySelector(".cart__content")
    let cartArr = document.querySelector(".cart__arr")
    let cartShadow = document.querySelector(".cart__shadow")
    let cartBar = document.querySelector(".cart-bar")
    let fullPrice = document.querySelector(".cart__full-price")
    let price = 0
    let randomId = 0

    let cartBtn = document.querySelector(".cart__finalOrder-btn")
    let btns = document.querySelectorAll(".popup__btn")
    let cartList = document.querySelector(".cart__list")
    let cartDelete = document.querySelector(".item-cart__close")

    let cartNumber = document.querySelector(".header__menu-cart-number")
    let outt = document.querySelector(".cart__item");
    let cartOut = document.querySelector(".cart__out");
    let cartItemContent = document.querySelector(".item-cart__content");

    // Форма
    let formAllProducts = document.querySelector(".popup__all-products");
    let formFullPrise = document.querySelector(".popup__full-price");

    let cartFinalOrderBtn = document.querySelector(".cart__finalOrder-btn ");
    cartFinalOrderBtn.addEventListener('click', function () {
        cartFinalOrderBtn.classList.add("_popup-link")
    });

    // Функция открытие корзины
    cart.addEventListener("click", function (e) {
        e.preventDefault()
        cartContent.classList.add("active")
        cartBar.classList.add("active")
        document.querySelector("body").classList.add("_lock")
		// document.querySelector("body").classList.add("rmMrgScroll")
    })

    // Функция закрытия корзины на иконку
    cartArr.addEventListener("click", function () {
        cartContent.classList.remove("active")
        cartBar.classList.remove("active")
        document.querySelector("body").classList.remove("_lock")
		// document.querySelector("body").classList.remove("rmMrgScroll")

    })

    // Функция закрытия корзины при клике свободную область
    cartBar.addEventListener('click', function (e) {
        if (e.target.classList.contains("cart-bar")){
            cartContent.classList.remove("active")
            cartBar.classList.remove("active")
            document.querySelector("body").classList.remove("_lock")
			// document.querySelector("body").classList.remove("rmMrgScroll")
        }

    })
    // Определение функций при счете корзины
    // const randomId = () => {
    //     return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    // };

    const priceWithoutSpaces = (str) => {
        return str.replace(/\s/g, '');
    };

    const normalPrice = (str) => {
        return String(str).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
    };

    const plusFullPrice = (currentPrice) => {
        return price += currentPrice;
    }

    const minusFullPrice = (currentPrice) => {
        return price -= currentPrice;
    }

    const printFullPrice = () => {
        fullPrice.textContent = `${normalPrice(price)}`;
        formFullPrise.textContent = `${normalPrice(price)}₽`;
    }

    const printQuan = () => {
        let length = cartOut.querySelector(".cart__list").children.length;
        cartNumber.textContent = length
        formAllProducts.textContent = length

        if (length > 0) {
            cartBtn.classList.add("final__order-active")
        } else {
            cartBtn.classList.remove("final__order-active")
        }


    }
	cartBtn.addEventListener('click',()=>{
		document.querySelector('.cart__content').classList.add('_lock');
		console.log(1)
	})
	if(document.querySelector('.cart__content').classList.contains('active')){
		document.querySelector('.cart__content').classList.add('_lock');
	}

    const generateCartProduct = (img, title, price, id) => {
        return `
        <li class="cart__item item-cart">
        <div class="item-cart__content" id="${id}">
        <div class="item-cart__content-inner">
        <img class="item-cart__img" src="${img}" alt="">
        <div class="item-cart__content2">
            <div class="item-cart__title">${title}</div>
            <div class="item-cart__prise">${price}</div>
            
        </div>
        </div>
        <div class="item-cart__close"></div>
        </div>
        </li>
`
    }

    // Цикл при котором вызываются функции для расчете цены и количества товара в корзине 
    for (let item of btns) {
        item.closest(".popup__body").setAttribute("data-id", randomId++);
        item.addEventListener("click", function (e) {

            e.preventDefault
            let parent = e.currentTarget.closest(".popup__body");
            let id = parent.dataset.id;
            let img = parent.querySelector(".popup__img-img").getAttribute("src");
            let title = parent.querySelector(".popup__title").textContent;
            let priceString = parent.querySelector(".popup__price").textContent;
            let priceNumber = parseInt(priceWithoutSpaces(parent.querySelector(".popup__price").textContent));

            cartList.insertAdjacentHTML('afterbegin', generateCartProduct(img, title, priceString, id));

            plusFullPrice(priceNumber)
            printFullPrice()
            printQuan()

            updateToStorage()

        })

    }
    //  Перерасчет цены при удалении товара из корзины
    const deleteProduct = function (deletProd) {
        let id = cartList.querySelector(".cart__item").querySelector(".item-cart__content").id;
        deletProd.remove()
        printQuan()
        if (printQuan() == 0) {
            currentPrice -= currentPrice
        }
        let currentPrice = parseInt(priceWithoutSpaces(deletProd.querySelector('.item-cart__content').querySelector(".item-cart__content2").querySelector(".item-cart__prise").textContent))


        minusFullPrice(currentPrice)
        printFullPrice()

        updateToStorage()

    }
    cartList.addEventListener('click', function (e) {
        if (e.target.classList.contains("item-cart__close")) {
            deleteProduct(e.target.closest(".cart__item"))
        }
    })

    // Local Store
    const countSumm = function () {
        document.querySelectorAll('.cart__item').forEach(el => {
            price += parseInt(priceWithoutSpaces(el.querySelector('.item-cart__prise').textContent))
        })
    }
    const initialStore = function () {
        if (localStorage.getItem('products') !== null) {
            cartList.innerHTML = localStorage.getItem('products')
            printQuan()
            countSumm()
            printFullPrice()
        }
    };
    initialStore()
    const updateToStorage = function () {
        let parent = cartList
        let html = parent.innerHTML;
        if (html.length) {
            localStorage.setItem('products', html)
        } else {
            localStorage.removeItem('products')
        }

    };

});


// Dynamic Adapt v.1
// HTML data-da="where(uniq class name),when(breakpoint),position(digi)"
// e.x. data-da=".item,992,2"
// Andrikanych Yevhen 2020
// https://www.youtube.com/c/freelancerlifestyle

"use strict";

function DynamicAdapt(type) {
	this.type = type;
}

DynamicAdapt.prototype.init = function () {
	const _this = this;
	// массив объектов
	this.оbjects = [];
	this.daClassname = "_dynamic_adapt_";
	// массив DOM-элементов
	this.nodes = document.querySelectorAll("[data-da]");

	// наполнение оbjects объктами
	for (let i = 0; i < this.nodes.length; i++) {
		const node = this.nodes[i];
		const data = node.dataset.da.trim();
		const dataArray = data.split(",");
		const оbject = {};
		оbject.element = node;
		оbject.parent = node.parentNode;
		оbject.destination = document.querySelector(dataArray[0].trim());
		оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
		оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
		оbject.index = this.indexInParent(оbject.parent, оbject.element);
		this.оbjects.push(оbject);
	}

	this.arraySort(this.оbjects);

	// массив уникальных медиа-запросов
	this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {
		return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
	}, this);
	this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
		return Array.prototype.indexOf.call(self, item) === index;
	});

	// навешивание слушателя на медиа-запрос
	// и вызов обработчика при первом запуске
	for (let i = 0; i < this.mediaQueries.length; i++) {
		const media = this.mediaQueries[i];
		const mediaSplit = String.prototype.split.call(media, ',');
		const matchMedia = window.matchMedia(mediaSplit[0]);
		const mediaBreakpoint = mediaSplit[1];

		// массив объектов с подходящим брейкпоинтом
		const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function (item) {
			return item.breakpoint === mediaBreakpoint;
		});
		matchMedia.addListener(function () {
			_this.mediaHandler(matchMedia, оbjectsFilter);
		});
		this.mediaHandler(matchMedia, оbjectsFilter);
	}
};

DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
	if (matchMedia.matches) {
		for (let i = 0; i < оbjects.length; i++) {
			const оbject = оbjects[i];
			оbject.index = this.indexInParent(оbject.parent, оbject.element);
			this.moveTo(оbject.place, оbject.element, оbject.destination);
		}
	} else {
		for (let i = 0; i < оbjects.length; i++) {
			const оbject = оbjects[i];
			if (оbject.element.classList.contains(this.daClassname)) {
				this.moveBack(оbject.parent, оbject.element, оbject.index);
			}
		}
	}
};

// Функция перемещения
DynamicAdapt.prototype.moveTo = function (place, element, destination) {
	element.classList.add(this.daClassname);
	if (place === 'last' || place >= destination.children.length) {
		destination.insertAdjacentElement('beforeend', element);
		return;
	}
	if (place === 'first') {
		destination.insertAdjacentElement('afterbegin', element);
		return;
	}
	destination.children[place].insertAdjacentElement('beforebegin', element);
}

// Функция возврата
DynamicAdapt.prototype.moveBack = function (parent, element, index) {
	element.classList.remove(this.daClassname);
	if (parent.children[index] !== undefined) {
		parent.children[index].insertAdjacentElement('beforebegin', element);
	} else {
		parent.insertAdjacentElement('beforeend', element);
	}
}

// Функция получения индекса внутри родителя
DynamicAdapt.prototype.indexInParent = function (parent, element) {
	const array = Array.prototype.slice.call(parent.children);
	return Array.prototype.indexOf.call(array, element);
};

// Функция сортировки массива по breakpoint и place 
// по возрастанию для this.type = min
// по убыванию для this.type = max
DynamicAdapt.prototype.arraySort = function (arr) {
	if (this.type === "min") {
		Array.prototype.sort.call(arr, function (a, b) {
			if (a.breakpoint === b.breakpoint) {
				if (a.place === b.place) {
					return 0;
				}

				if (a.place === "first" || b.place === "last") {
					return -1;
				}

				if (a.place === "last" || b.place === "first") {
					return 1;
				}

				return a.place - b.place;
			}

			return a.breakpoint - b.breakpoint;
		});
	} else {
		Array.prototype.sort.call(arr, function (a, b) {
			if (a.breakpoint === b.breakpoint) {
				if (a.place === b.place) {
					return 0;
				}

				if (a.place === "first" || b.place === "last") {
					return 1;
				}

				if (a.place === "last" || b.place === "first") {
					return -1;
				}

				return b.place - a.place;
			}

			return b.breakpoint - a.breakpoint;
		});
		return;
	}
};

const da = new DynamicAdapt("max");
da.init();


const prev = document.querySelector('.custom-prev');
let windowWidth = window.innerWidth;

if(windowWidth<=760){
	prev.style.display = 'none'
}


const swiper = new Swiper('.swiper', {
	// Optional parameters
	direction: 'horizontal',
	loop: true,
  
	// If we need pagination
	pagination: {
	  el: '.swiper-pagination',
	},
  
	// Navigation arrows
	navigation: {
	  nextEl: '.custom-next',
	  prevEl: '.custom-prev',
	},
  
	// And if we need scrollbar
	scrollbar: {
	  el: '.swiper-scrollbar',
	},
  });
