"use strict";
document.addEventListener('DOMContentLoaded', function () {

let unlock = true;

	// Функционал открытия попапов на странице, блокировка контента при октрытии попапа
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


    // Бургер-меню
    let headerMburger = document.querySelector(".header__burger"),
        headerMenu = document.querySelector(".header__menu"),
        body = document.querySelector("body");

    headerMburger.addEventListener('click', function () {
        headerMburger.classList.toggle("menu-active");
        headerMenu.classList.toggle("menu-active");
        body.classList.toggle("_lock");
    })

    // Липкая щапка при скроле 

	let mainBlock = document.querySelector(".main-block");
	let header = document.querySelector(".header");

    window.addEventListener('scroll', function () {

        if (window.pageYOffset > 500 && document.querySelector(".main-block")) {
            header.classList.add("header-fixed-active");
            cartContent.classList.add("cart-top");
            cartBtn.classList.add("final__order-active")
            mainBlock.classList.add("main-block-padding");
            cartContent.style.height = `95%`;

        } else {
            mainBlock.classList.remove("main-block-padding");
			header.classList.remove("header-fixed-active");
            cartContent.classList.remove("cart-top");
            cartContent.style.height = `100%`;

        }
    })

	// Функционал интернет магазина

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

	// Кнопка очистки товаров из корзины
	const clearCartBtn = document.querySelector('.cart__clear-btn');

	// Попап с переходом на оформление заказа
    let cartFinalOrderBtn = document.querySelector(".cart__finalOrder-btn ");
    cartFinalOrderBtn.addEventListener('click', function () {
        cartFinalOrderBtn.classList.add("_popup-link")
    });


    // Функционал открытия и закрытия корзины
    //========================================

    // Функция открытие корзины
	const openCart = ()=>{
		cartContent.classList.add("active");
		cartBar.classList.add("active");
		document.querySelector("body").classList.add("_lock");
	};

	cart.addEventListener("click", function (e) {
		e.preventDefault();
		openCart(); // Открытие корзины
	});

     // Закртытие бокого меню корзины
	const closeCart = ()=>{
		cartContent.classList.remove("active")
        cartBar.classList.remove("active")
        document.querySelector("body").classList.remove("_lock")
	}

    // Закрытия корзины на нажитие иконки минуса
    cartArr.addEventListener("click", function () {
        closeCart()
    })

    // Закрытия корзины при клике свободную область
    cartBar.addEventListener('click', function (e) {
        if (e.target.classList.contains("cart-bar")){
            closeCart()
        }
    })

    //===================================================

    // Определение функций при счете корзины
    // const randomId = () => {
    //     return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    // };


	//  Изменение поведение кнопки продукта при добавлении его в корзину

	    // Лист кнопок товаров
		const btnPopupBuy = document.querySelectorAll('.popup__btn');

        // Функция для изменения состояния кнопки на состояние "Загрузка"
		const changeStateBtnLoading = () =>{
			    CirrentTarget.classList.remove('hover');
				CirrentTarget.querySelector('.btn__text').innerHTML = ''
				CirrentTarget.querySelector('.loading').classList.add('loading-visible')
				CirrentTarget.disabled = true
		}

		const clickOnBtnProduct = (e) => {
			let CirrentTarget = e.currentTarget;
			e.preventDefault()

			// Если начальное состояние кнопки "Добавить в корзину"  - отвечает артрибут data-isBuy - false
			if(CirrentTarget.getAttribute('data-isBuy')=='false'){

				// Меняем состояние кнопки на состояние "Загрузка"
				CirrentTarget.classList.remove('hover');
				CirrentTarget.querySelector('.btn__text').innerHTML = ''
				CirrentTarget.querySelector('.loading').classList.add('loading-visible')
				CirrentTarget.disabled = true
				// changeStateBtnLoading()

				// Меняем состояние загрузки на состояние "Товар в корзине"
				setTimeout(() => {
					CirrentTarget.querySelector('.btn__text').innerHTML = 'В корзине';
					CirrentTarget.querySelector('.loading').classList.remove('loading-visible');
					CirrentTarget.classList.add('ShopСart');
					CirrentTarget.setAttribute('data-isBuy','true');
					CirrentTarget.disabled = ''
					
				}, 1000);
			// Если кнопка уже имеет состояние "Товар в корзине", то закрываем попап и открываем боковую коризну
			}else{
				cartContent.classList.add("active")
				cartBar.classList.add("active")
				popup_close()
				mainBlock.classList.remove("main-block-padding");
				header.classList.remove("header-fixed-active");
				cartContent.classList.remove("cart-top");
				cartContent.style.height = `100%`;
			}
			
		}
        // Проходимся по всем кнопкам и назнчаем события клика
		btnPopupBuy.forEach(item => {
			item.addEventListener('click',clickOnBtnProduct)
		})


    //===================================================
	let sum = 0; 
    // Удаляем пробелы у цены
    const priceWithoutSpaces = (str) => {
        return str.replace(/\s/g, '');
    };
    // Преоборазования 1000 в читаемое число 1 000
    const normalPrice = (str) => {
        return String(str).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
    };

	// Увелечение текущей суммы
    const plusFullPrice = (currentPrice) => {
        return price += currentPrice;
    }
    // Уменьшение текущей суммы
    const minusFullPrice = (currentPrice) => {
        return price -= currentPrice;
    }
    // Вывод на страницу суммы добавленных товаров
    const printFullPrice = () => {
        fullPrice.textContent = `${normalPrice(price)}`;
        formFullPrise.textContent = `${normalPrice(price)}₽`;
    }
    // Подсчет количества товаров и вывод на страницу кол-во товаров
    const printQuan = (u) => {
		
			let length = 0;
			length += u;
			cartNumber.textContent = length
			formAllProducts.textContent = length
		
		console.log(length)
		console.log(u)

        if (length > 0) {
            cartBtn.classList.add("final__order-active")
			
        } else {
            cartBtn.classList.remove("final__order-active")
			
        }


    }

    // Добавляем класс _lock для корзины
	const addLock = () =>{
		document.querySelector('.cart__content').classList.add('_lock');
	}
    //  При клике на кнопку оформление заказа
	cartBtn.addEventListener('click',()=>{
		addLock()
	})
    
	// Если корзина содержит активный класс
	if(document.querySelector('.cart__content').classList.contains('active')){
		addLock()
	}

	// Генерация html продукта
    const generateCartProduct = (img, title, price, id) => {
        return `
        <li class="cart__item item-cart">
        <div class="item-cart__content" id="${id}">
        <div class="item-cart__content-inner">
        <img class="item-cart__img" src="${img}" alt="">
        <div class="item-cart__content2">
            <div class="item-cart__title">${title}</div>
            <div class="item-cart__prise">${price}</div>
            <div class="item-cart__сounter">
				<div class="сounter__plus">+</div>
				<div class="сounter__count">1</div>
				<div class="сounter__minus">-</div>
			</div>
        </div>
        </div>
        <div class="item-cart__close"></div>
        </div>
        </li>
`
    }

	let productAllСount = {
		count:0
	};
	let productСount = {};
	let productPrice = {};

	const addСount = (count)=>{

		
			
		
		localStorage.setItem('allCountProduts',count)
	
		
		return productAllСount.count = count;
	}

	// Массив данных состоящих из айди добавленных товаров
	let test = JSON.parse(localStorage.getItem('idProducts')) || [];

    // Цикл при котором вызываются функции для расчете цены и количества товара в корзине
    for (let item of btns) {

		// Установка атрибуа data-id попапа с продуктов и выдача ему айди
        item.closest(".popup__body").setAttribute("data-id", randomId++);

        item.addEventListener("click", function (e) {
			e.preventDefault()
			
			// Событие при условии, что текущей кнопки атрибут data-isbuy = false (Значит, что на кнопку еще не нажимали)
			if(e.currentTarget.getAttribute('data-isbuy')=='false'){

				// Получаем данные из текущего продукта при клике на добавление в корзину
				let parent = e.currentTarget.closest(".popup__body");
				let id = parent.dataset.id;
				let img = parent.querySelector(".popup__img-img").getAttribute("src");
				let title = parent.querySelector(".popup__title").textContent;
				let priceString = parent.querySelector(".popup__price").textContent;
				let priceNumber = parseInt(priceWithoutSpaces(parent.querySelector(".popup__price").textContent));

	            // Генерируемый полученный продукт и добавляем его в панешь корзины
				cartList.insertAdjacentHTML('afterbegin', generateCartProduct(img, title, priceString, id));

                // Проверяем, что повторно не добавлен один и тот же продукт
				if(!test.some((item=>item.id===id))){
					test.push({id:id})
				}
				// Обновляем Storage, расчитываем сумму и выводим сумму и количество товаров на страницу
				updateToStorage()
				plusFullPrice(priceNumber)
				printFullPrice()

				if (!productСount[id]) {
					productСount[id] = 1; // Если товара нет в объекте, начинаем с 1
				}
				Object.values(productСount).map((item=>{
					return sum += item
				}))
				addСount(sum)
				console.log(productAllСount.count)
				cartNumber.textContent = sum
			    formAllProducts.textContent = sum
				console.log(productСount)
				sum = 0;
				// printQuan()
			}
        })
    }

    //  Перерасчет цены при удалении товара из корзины
    const deleteProduct = function (deletProd) {

		// id текущего продукта который удалили
        let id = deletProd.querySelector(".item-cart__content").getAttribute('id');
		// Удаляем текущий продукт со страницы и обновляем количество продуктов на странице
        deletProd.remove()
        printQuan()

        // Вызываем функцию для синхронизации продуктов к корзине и на странице
		synchronizeButton(id)


        if (printQuan() == 0) {
            currentPrice -= currentPrice
        }
		// // Преобразовываем цену продукта в нормальное число
         let currentPrice = parseInt(priceWithoutSpaces(deletProd.querySelector('.item-cart__content').querySelector(".item-cart__content2").querySelector(".item-cart__prise").textContent))

        // // Вычитаем из суммы удаленный продукт и печатаем новую сумму и обновляем Storage
        // minusFullPrice(currentPrice)
		
			// price -= currentPrice;
        if(productPrice[id]){
			price -= productPrice[id]
			printFullPrice()
		}
		if(!productPrice[id]){
			price -= currentPrice
			printFullPrice()
		}

		updateToStorage()

       // Функция для синхронизации продуктов к корзине и на странице
		function synchronizeButton(id) {
			// Ищем кнопку товара по его data-id
			let productButton = document.querySelector(`.popup__body[data-id="${id}"]`).querySelector('button');
		
			// Изменяем атрибуты и визуальное состояние кнопки
			productButton.setAttribute('data-isbuy', 'false');
			productButton.querySelector('.btn__text').textContent = 'Добавить в корзину';
			productButton.classList.add('hover');
			productButton.classList.remove('ShopСart');
		}

    }
	
	

	
	// Если кликаем на иконку удаления товара
    cartList.addEventListener('click', function (e) {
        if (e.target.classList.contains("item-cart__close")) {
			// Получем айди удаленного продукта
			let productId = e.target.closest(".cart__item").querySelector('.item-cart__content').getAttribute('id')
			// Запускаем функции для удаления продукта из корзины и массива продуктов
			removeFromCart(productId)
            deleteProduct(e.target.closest(".cart__item"))

		    // Очищаем цену и количество удаленного продукта
			productPrice[productId] = 0;
			productСount[productId] = 0;
			// localStorage.setItem('productСount',JSON.stringify(productСount[productId] = 0))

			
			Object.values(productСount).map((item=>{
				return sum += item
			}))

			let length2 = cartOut.querySelector(".cart__list").children.length;

			if(length2<=0){
				cartNumber.textContent = length2;
			}else{
				printQuan(sum)
			}
	

			
			// addСount(0)
			// printQuan()
		console.log(productСount)


        }
		if(e.target.classList.contains('сounter__plus')){
			let idProdutCount = e.target.closest('.item-cart__content').id;
			let currentPrice = parseInt(priceWithoutSpaces(e.target.closest('.item-cart__content2').querySelector('.item-cart__prise').textContent));
			let currentPriceContent = e.target.closest('.item-cart__content2').querySelector('.item-cart__prise');
			let currentCount = e.target.closest('.item-cart__content2').querySelector('.сounter__count');


			productСount[idProdutCount]++;
			

			if(!productPrice[idProdutCount]){
				productPrice[idProdutCount] = currentPrice
			}
			productPrice[idProdutCount] += currentPrice
	
			// Обновляем количество на странице
			localStorage.setItem('productСount',JSON.stringify(productСount))

			currentCount.textContent = productСount[idProdutCount];
			// currentPriceContent.textContent = `${normalPrice(productPrice[idProdutCount])}₽`
			
			price += currentPrice;
			printFullPrice();
			console.log(productPrice)
			// console.log(productPrice)
			
			
			
            
			
			Object.values(productСount).map((item=>{
				return sum += item
			}))
			addСount(sum)
			
			console.log(productAllСount.count)
			console.log(sum)
			printQuan(+sum)
			sum=0 

			
			
			

			
		}
		if(e.target.classList.contains('сounter__minus')){
			let idProdutCount = e.target.closest('.item-cart__content').id;
			let currentPrice = parseInt(priceWithoutSpaces(e.target.closest('.item-cart__content2').querySelector('.item-cart__prise').textContent));
			let currentCount = e.target.closest('.item-cart__content2').querySelector('.сounter__count');
			if(productСount[idProdutCount]>1){


				if(productСount[idProdutCount]>1){

					if (!productСount[idProdutCount]) {
						productСount[idProdutCount] = 1; // Если товара нет в объекте, начинаем с 1
					}
					productСount[idProdutCount]--;
					
		
					if(!productPrice[idProdutCount]){
						productPrice[idProdutCount] = currentPrice
					}
					productPrice[idProdutCount] -= currentPrice
			
					// Обновляем количество на странице
					localStorage.setItem('productСount',JSON.stringify(productСount))
					currentCount.textContent = productСount[idProdutCount];
		            
					
					price -= currentPrice;
					printFullPrice();

					Object.values(productСount).map((item=>{
						return Math.abs(sum += item)
					}))
					productAllСount.count = sum
					console.log(productAllСount.count)
					addСount(sum)
					console.log(sum)
					printQuan(sum)
					sum=0 
		
					console.log(productPrice)

				}

			}
			
		}
    })
    // Функция для удаления товаров из массива и продуктами, которые туда добавили
	function removeFromCart(productId){
		test = test.filter((item=>{
			return item.id !== productId;
		}))
		updateToStorage();		
	}

    // Local Store

	// Подсчет всей суммы продуктов из корзины
    const countSumm = function () {
        document.querySelectorAll('.cart__item').forEach(el => {
            price += parseInt(priceWithoutSpaces(el.querySelector('.item-cart__prise').textContent))
        })
    }
	// Инициализация локального хранения
    const initialStore = function () {
		
        if (localStorage.getItem('products') !== null) {
			// html продукт который был в locak добавляем в панель корзины
            cartList.innerHTML = localStorage.getItem('products')
			// Печатамем количество товара и общую сумму
            printQuan(0)
            countSumm()
            // printFullPrice()
			fullPrice.textContent = `${normalPrice(price)}`;
            formFullPrise.textContent = `${normalPrice(price)}₽`;
			cartNumber.textContent = localStorage.getItem('allCountProduts')?localStorage.getItem('allCountProduts'):0
			formAllProducts.textContent = localStorage.getItem('allCountProduts')?localStorage.getItem('allCountProduts'):0


			
        }
		if (localStorage.getItem('productСount') !== null) {
			productСount = JSON.parse(localStorage.getItem('productСount'));
             Object.keys(productСount).forEach((id=>{
				let quantityElement = document.getElementById(id).querySelector('.сounter__count');
				if(quantityElement){
					quantityElement.textContent = productСount[id]
				}
			 }))


		}

        // Проходим по всем кнопкам с атрибуами айди, которые есть в локальнос хранилише и сихнронизуем их с товарами из корзины, добавлем стиль по поведение
		test.forEach((item=>{
			let button = document.querySelector(`.popup__body[data-id='${item.id}']`).querySelector('button');
			button.setAttribute('data-isbuy', 'true');
            button.querySelector('.btn__text').textContent = 'В корзине';
            button.classList.remove('hover');
            button.classList.add('ShopСart');
		}))
    };
	// Иницилизуем данные из локал
    initialStore()

    // Функция для обновления локального хранилища
    const updateToStorage = function () {
        let parent = cartList
        let html = parent.innerHTML;
		let id = JSON.stringify(test);
        if (html.length && test.length) {
            localStorage.setItem('products', html)
			localStorage.setItem('idProducts',id)
        } else {
            localStorage.removeItem('products')
			localStorage.removeItem('idProducts')
        }

    };
	// Функция для очистки всей корзины и локал
	const clearCart = () => {
		cartNumber.innerHTML = '0'; // Количество товаров 0
		formAllProducts.textContent = '0'; //Количество товаров в форме офорлмения 0
		fullPrice.textContent = '0'; // Общая сумма продуктов 0
		cartList.innerHTML = ''; // Очистка корзины с продуктами
		formFullPrise.textContent = '0'; // Общая сумма продуктов форме офорлмения  0
		localStorage.clear(); // Очитска локал
		test = []; // Очитска массива с айди добавленных продуктов
		price = 0;
		productСount = {};
		productPrice = {};
		productAllСount.count = 0;
		sum = 0;
	}
    
	// Событие нажатие на кнопку "Очистить корзину"
	clearCartBtn.addEventListener('click',()=>{
		// Очистка корзины и локал
		clearCart()

		// Проходим по всем кнопкам продуктов и сбрасываем их до начального состояния
		btns.forEach((item=>{
			// Устаналиваем атрибут в начальное состояние
			item.setAttribute('data-isBuy','false');

			// Устаналиваем начальное поведение и стиль
			item.querySelector('.btn__text').textContent = 'Добавить в корзину'
			item.classList.add('hover');
			item.classList.remove('ShopСart');
		}))
	})
});


// Динамический адапатив
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


// swiper
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
