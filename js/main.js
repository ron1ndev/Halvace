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




   // Фунционал наведение на выпадающее меню	
   const catalogShop = document.querySelector('.header__item-dropdown'); // Пункт меню с которого будет выпадать меню
   const submenu = document.querySelector('.header__submenu'); // Скрытый блок с под меню
     
    // Функция для показа под меню
	function showSubMenu (e){
		if(e.currentTarget.classList.contains('header__item-dropdown')){
			catalogShop.classList.add('header__item-dropdown-active');
			submenu.classList.add('header__submenu-active'); // Показываем меню
		}
	};
    // Функция для скрытия под меню
	function hideSubMenu(){
		submenu.classList.remove('header__submenu-active');
		catalogShop.classList.remove('header__item-dropdown-active');
	};

   // Событие на движение мыши по объеку 
    catalogShop.addEventListener('mousemove',(e) => showSubMenu(e));

    // Событие увода мыши с объекта меню
    catalogShop.addEventListener('mouseout',hideSubMenu);

    // Бургер-меню
    let headerMburger = document.querySelector(".header__burger"),
        headerMenu = document.querySelector(".header__menu"),
        body = document.querySelector("body");

    headerMburger.addEventListener('click', function () {
        headerMburger.classList.toggle("menu-active");
        headerMenu.classList.toggle("menu-active");
        body.classList.toggle("_lock");
    })
	// ============================


// Липкая щапка при скроле 
	if(document.querySelector(".main-block")){
		
		let mainBlock = document.querySelector(".main-block");
		let header = document.querySelector(".header");

		window.addEventListener('scroll', function () {

			if (window.pageYOffset > 80) {
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

		}
	// ==========================


	// Функция для перемещение элемента при разрешении 993
	function moveElement(destinationContainer,fallbackContainer,element,breakpoint,prepend){
		if(window.innerWidth<breakpoint){
			destinationContainer.append(element);
		}else{
			if(fallbackContainer){
				prepend?fallbackContainer.prepend(element):fallbackContainer.append(element);
				
			}
		}
	}


	// Функционал интернет магазина

    // Боковая корзина 
    let randomId = 0; // Инициализация рандомного айди

	// Переменные для вычисления суммы и количества продукта
	let itemQuan  = 0; // Промежуточный результат количества продуктов
	let itemPrice = 0; // Промежусточный резуальтат цены продукта

	let totalPrice = 0, // Общий прайс продуктов в корзине
	 totalCount = 0, // Общее количество продуктов в корзине
	 productСount = {}, // Количество каждого отдельного продукта в корзине
	 productPrice = {}; // Прайс каждого отдельного продукта в корзине

	// Переменные элементов корзины
	const cartBar = document.querySelector(".cart-bar"), // Боковая панель
	 cartContent = document.querySelector(".cart__content"), // Контент боковой корзины
	 cartList = document.querySelector(".cart__list"), // Лист товаров 
	 cart = document.querySelector(".header__menu-cart"), // Иконка корзины
	 cartNumber = document.querySelector(".header__menu-cart-number"), // Счетчик количества корзины
     fullPrice = document.querySelector(".cart__full-price"), // Вывод итоговой цены
	 cartArr = document.querySelector('.cart__arr');

	// Кнопки
	const clearCartBtn = document.querySelector('.cart__clear-btn'), // Кнопка для очистки товаров из корзины
	 btns = document.querySelectorAll(".popup__btn"), // Кнопки товаров добавления в корзину
	 cartBtn = document.querySelector(".cart__finalOrder-btn"); // Кнопка для оформления заказа

	// Переменные по оформлению заказа
	const formAllProducts = document.querySelector(".popup__all-products"),  // Итоговое количество в попапе оформления заказа
	 formFullPrise = document.querySelector(".popup__full-price"); // Итоговая цена в попапе оформления заказа
	
	// Попап с переходом на оформление заказа
    const cartFinalOrderBtn = document.querySelector(".cart__finalOrder-btn ");

	// Событие перехода в попап формы для оформления заказа
    cartFinalOrderBtn.addEventListener('click', function () {
        cartFinalOrderBtn.classList.add("_popup-link");
    });

    // Функционал открытия и закрытия корзины
    //========================================

    // Функция открытие корзины
	const openCart = ()=>{
		cartContent.classList.add("active");
		cartBar.classList.add("active");
		document.querySelector("body").classList.add("_lock");
	};

	// Функция закрытия корзины
	const closeCart = ()=>{
			cartContent.classList.remove("active");
			cartBar.classList.remove("active");
			document.querySelector("body").classList.remove("_lock");
		};

	// Событие открытие корзины на иконку корзины
	cart.addEventListener("click", function (e) {
		e.preventDefault();
		openCart(); // Открытие корзины
	});


    // Закрытия корзины при клике свободную область, либо на иконку минуса
    cartBar.addEventListener('click', function (e) {
        if (e.target.classList.contains("cart-bar")){
            closeCart();
        }
    });
	cartArr.addEventListener('click', function (e) {
    
			closeCart();
    });
	

// Фунционал спайпов
let startX, startY;

// Координаты начала касания
const touchStartHandler = (event) => {
    const touch = event.touches[0];
    startX = touch.clientX;
    startY = touch.clientY;

};
// Координаты конца касания
const touchEndHandler = (event) => {
    const touch = event.changedTouches[0];
    const endX = touch.clientX;
    const endY = touch.clientY;

    const diffX = endX - startX;
    const diffY = endY - startY;

    if (Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX > 0) {
			closeCart();
            // Swipe Right
        } else {
            // Swipe Left
        }
    } else {
        if (diffY > 0) {
            // Swipe Down
        } else {
            // Swipe up
        }
    }
};

cartContent.addEventListener('touchstart', touchStartHandler);
cartContent.addEventListener('touchend', touchEndHandler);


    //===================================================

    // Установка рандомного айди продукту
    // const randomId = () => {
    //     return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    // };


	//  Изменение поведение кнопки продукта при добавлении его в корзину

	    // Лист кнопок товаров
		const btnPopupBuy = document.querySelectorAll('.popup__btn');

        // Функция для изменения состояния кнопки на состояние "Загрузка"
		const changeStateBtnLoading = (currentTarget) =>{
			currentTarget.classList.remove('hover');
			currentTarget.querySelector('.btn__text').innerHTML = '';
			currentTarget.querySelector('.loading').classList.add('loading-visible');
			currentTarget.disabled = true;
		};
        // Функция для изменения состояния кнопки на состояние "Товар в корзине"
		const changeStateBtnAddCart = (currentTarget) =>{
			currentTarget.querySelector('.btn__text').innerHTML = 'В корзине';
			currentTarget.querySelector('.loading').classList.remove('loading-visible');
			currentTarget.classList.add('ShopСart');
			currentTarget.setAttribute('data-isBuy','true');
			currentTarget.disabled = '';
		};
		
        // Функция для нажатия кнопки продукта для покладки в корзину
		const clickOnBtnProduct = (e) => {
		
			let currentTarget = e.target.closest('.popup__btn');
			e.preventDefault();

			// Если начальное состояние кнопки "Добавить в корзину"  - отвечает артрибут data-isBuy - false
			if(currentTarget.getAttribute('data-isBuy')=='false'){

				// Меняем состояние кнопки на состояние "Загрузка"
				changeStateBtnLoading(currentTarget);

				setTimeout(() => {
                // Меняем состояние загрузки на состояние "Товар в корзине"
					changeStateBtnAddCart(currentTarget);

				}, 1000);
			// Если кнопка уже имеет состояние "Товар в корзине", то закрываем попап и открываем боковую коризну
			}else{
				cartContent.classList.add("active");
				cartBar.classList.add("active");
				popup_close(currentTarget.closest('.popup'));
				// mainBlock.classList.remove("main-block-padding");
				header.classList.remove("header-fixed-active");
				cartContent.classList.remove("cart-top");
				cartContent.style.height = `100%`;
				
			}
			
		}
        // Проходимся по всем кнопкам и назначаем события клика

		document.addEventListener('click',(e)=>{
		let target = e.target;

		if(target.closest('.popup__btn')){
			
			clickOnBtnProduct(e)
		}
		
		})

    //===================================================
    
	// Вспомогательные функции для изменения числа, вывод значений

    // Удаляем пробелы у цены
    const priceWithoutSpaces = (str) => {
        return str.replace(/\s/g, '');
    };
    // Преоборазования 1000 в читаемое число 1 000
    const normalPrice = (str) => {
        return String(str).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
    };

    // Вывод на страницу суммы добавленных товаров
    const printFullPrice = () => {
        fullPrice.textContent = `${normalPrice(totalPrice)}₽`;
        formFullPrise.textContent = `${normalPrice(totalPrice)}₽`;
    };
	
    // Подсчет количества товаров и вывод на страницу кол-во товаров
    const printQuan = () => {

		cartNumber.textContent = totalCount;
		formAllProducts.textContent = totalCount;
    };

    // ==============================================

    // Добавляем класс _lock для корзины
	const addLock = () =>{
		document.querySelector('.cart__content').classList.add('_lock');
	};
    //  При клике на кнопку оформление заказа
	cartBtn.addEventListener('click',()=>{
		addLock();
	});
    
	// Если корзина содержит активный класс
	if(document.querySelector('.cart__content').classList.contains('active')){
		addLock();
	};

	// Генерация html продукта
    const generateCartProduct = (img, title, price, id) => {
        return `
        <li class="cart__item item-cart">
        <div class="item-cart__content" id="${id}">
        <div class="item-cart__content-inner">
        <img class="item-cart__img" src="${img}" alt="">
        <div class="item-cart__content2">
            <div class="item-cart__title">${title}</div>
            <div class="item-cart__prise" data-price="${price}">${price}</div>
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
    };

	// Массив данных состоящих из айди добавленных товаров
	let idProduts = JSON.parse(localStorage.getItem('productID')) || [];

    // Цикл при котором вызываются функции для расчете цены и количества товара в корзине


	document.addEventListener('click',(e)=>{
		let target = e.target;

		if(target.closest('.popup__btn')){
			
			let item = target.closest('.popup__btn');

				e.preventDefault();
				
				// Событие при условии, что текущей кнопки атрибут data-isbuy = false (Значит, что на кнопку еще не нажимали)
				if(item.getAttribute('data-isbuy')=='false'){
		             
					// Получаем данные из текущего продукта при клике на добавление в корзину
					let parent = item.closest(".popup__body");
					let id = parent.dataset.id;
					let img = parent.querySelector(".popup__img-img").getAttribute("src");
					let title = parent.querySelector(".popup__title").textContent;
					let priceString = parent.querySelector(".popup__price").textContent;
					let priceNumber = parseInt(priceWithoutSpaces(parent.querySelector(".popup__price").textContent));
	

					// Проверяем, что повторно не добавлен один и тот же продукт
					if(!idProduts.some((item=>item.id===id))){

						// Генерируемый полученный продукт и добавляем его в панель корзины
						cartList.insertAdjacentHTML('afterbegin', generateCartProduct(img, title, priceString, id));

						idProduts.push({id:id});


					// Обновляем Storage, расчитываем сумму и выводим сумму и количество товаров на страницу
					updateToStorage();
	
					// Устаналиваем начальное значение продукта при добавлении в корзину
					function setInitialValue (productData, id, initValue, productLocal){
						// Если товара нет в объекте, добавялем с начальным значение
						if (!productData[id]) {
							productData[id] = initValue; 
							localStorage.setItem(productLocal,JSON.stringify(productData));
						}
					};
					setInitialValue(productСount, id, 1, 'productСount'); // Начальное количество 1
					setInitialValue(productPrice, id, priceNumber, 'productPrice'); // Начальное цена продукта
	
					itemQuan = 0;
					// Собираем количество значений
					Object.values(productСount).map((item=>{
						return itemQuan += item;
					}));
	
					// Устаналиваем общее количество продуктов и сохраняем в локал
					totalCount = itemQuan;
					localStorage.setItem('produtcAllCount',totalCount);
					
					printQuan(); // Печатаем количество продуктов
	
					// Устаналиваем общий прайс продуктов и сохраняем в локал
					totalPrice += priceNumber;
					localStorage.setItem('productAllprice',totalPrice);
					
					printFullPrice(); // Печатаем цену продуктов

					}

	
				}
		}
		
	})

    //  Перерасчет цены при удалении товара из корзины
    const deleteProduct = function (deletProd) {

		// id текущего продукта который удалили
        let id = deletProd.querySelector(".item-cart__content").getAttribute('id');
		// Удаляем текущий продукт со страницы и обновляем количество продуктов на странице
        deletProd.remove(); // Удалаяем html продукт из корзины
  

        // Вызываем функцию для синхронизации продуктов к корзине и на странице
		synchronizeButton(id);
	
        // Вычитаем из суммы удаленный продукт и печатаем новую сумму и обновляем Storage
		updateToStorage();

       // Функция для синхронизации продуктов к корзине и на странице
		function synchronizeButton(id) {

			if(document.querySelector(`.popup__body[data-id="${id}"]`)!==null){
			// Ищем кнопку товара по его data-id
			let productButton = document.querySelector(`.popup__body[data-id="${id}"]`).querySelector('button');
		
			// Изменяем атрибуты и визуальное состояние кнопки
			productButton.setAttribute('data-isbuy', 'false');
			productButton.querySelector('.btn__text').textContent = 'Добавить в корзину';
			productButton.classList.add('hover');
			productButton.classList.remove('ShopСart');
			}

		};

    };
    // Получуение данных о продукте
	function getProductData(target) {
        // Текуща цена продукта
		let currentPrice = parseInt(priceWithoutSpaces(target.closest('.item-cart__content2').querySelector('.item-cart__prise').dataset.price))

		// Текущее количество продукта
		let currentCount = target.closest('.item-cart__content2').querySelector('.сounter__count');

		return {currentPrice, currentCount};
	};
    // Обновление продукта
	function updateProduct(productId,delta,currentPrice,currentCount){

					// Увеличения количества отдельных продуктов
					productСount[productId] += delta; 

					// Увеличения цены отдельных продуктов
					productPrice[productId] += currentPrice * delta;  
		
					setTotalPrice(); // Установка общего прайса продуктов
				
					printFullPrice(); // Выводим общий прайс продуктов на страницу
		
					// Функция подсчета общего количества продуктов в корзине
					setTotalCount(productId,currentCount);
		
					printQuan(); // Выводим общее количество продуктов на страницу
	};
    // Функиця для обнолвения данных удаленного продукта
	function updateDeleteProduct (productData, totalData, productId, productLocal){

        // Вычитамем из общего прайса цену N продуктов
		totalData -= productData[productId]; // 

		localStorage.setItem(productLocal,totalData); // Обновляем локал

		return totalData;
	}
	
		
	// События связанные с дейсвтием корзины
    cartList.addEventListener('click', function (e) {

		let productId = e.target.closest(".cart__item").querySelector('.item-cart__content').getAttribute('id');


		// Если кликаем на иконку удаления товара
        if (e.target.classList.contains("item-cart__close")) {
			
			// Запускаем функции для удаления продукта из корзины и массива продуктов
			removeFromCart(productId);
            deleteProduct(e.target.closest(".cart__item"));

		    // Обновление общего количества и цены после удаления из корзины
			totalCount =  updateDeleteProduct(productСount, totalCount, productId,'produtcAllCount');
			totalPrice = updateDeleteProduct(productPrice, totalPrice, productId,'productAllprice');
			
			// Удаления данных по продукту из объекта продуктов
			delete productСount[productId];
			delete productPrice[productId];
 
			// Печатаем количество, цену и обновляем локал
			printQuan();
			printFullPrice();
			updateToStorage();

        }
		// Функционал клика плюс товара
		if(e.target.classList.contains('сounter__plus')){
              let productItemPrice = e.target.closest('.item-cart__content2').querySelector('.item-cart__prise');

			  
			// Получаем данные о продукте
			let {currentPrice, currentCount} = getProductData(e.target);

            // Увеличиваем количество и цену продукта
			updateProduct(productId,1,currentPrice,currentCount);

			productItemPrice.textContent = `${productPrice[productId]}₽`

			
		}
		// Функционал клика на минус товара
		if(e.target.classList.contains('сounter__minus')){

			let productItemPrice = e.target.closest('.item-cart__content2').querySelector('.item-cart__prise');

			// Получаем данные о продукте
			let {currentPrice, currentCount} = getProductData(e.target);

			if(productСount[productId]>1){

				// Уменьшаем количество и цену продукта
				updateProduct(productId,-1,currentPrice,currentCount);

				productItemPrice.textContent = `${productPrice[productId]}₽`

			}
		}
    })

    // Функция подсчета общего количества продуктов в корзине
	function setTotalCount (id,currentCount){
		
            // В storage устанавливаем информацию о каждом количестве отдельного продукта
			localStorage.setItem('productСount',JSON.stringify(productСount));

			// Меняем значение количества отдельного продукта
			currentCount.textContent = productСount[id];
            
			itemQuan=0;  //Обнуляем промежуточное количество всех продуктов

            // Проходимся по всем продуктам и складываем количество каждого продукта в промежуточное количество
			Object.values(productСount).map((item=>{
				return itemQuan += item;
			}));

			totalCount = itemQuan; // Устанавливаем общее количество продуктов

            // В storage устаналиваем общие количество продуктов
			localStorage.setItem('produtcAllCount',totalCount);
	}

    // Функция по расчету общей цены продуктов
	function setTotalPrice (){

		// В storage устанавливаем информацию о каждом прайсе отдельного продукта
		localStorage.setItem('productPrice',JSON.stringify(productPrice));

		itemPrice = 0; //Обнуляем промежуточный прайс всем продуктов

		// Проходимся по всем продуктам и складываем цены в промежуточный прайс 
		Object.values(productPrice).map((item=>{
			return itemPrice += item;
			
		}));

		totalPrice = itemPrice; // Устанавливаем общий прайс продуктов

		// В storage устаналиваем общий прайс продуктов
		localStorage.setItem('productAllprice',totalPrice);
	};

	
    // Функция для удаления товаров из массива с продуктами, которые туда добавили
	function removeFromCart(productId){
		idProduts = idProduts.filter((item=>{
			return item.id !== productId;
		}))
		updateToStorage();		
	};

    // Local Store

	// Инициализация локального хранения
    const initialStore = function () {

		// Если в локал есть данные о продукте
        if (localStorage.getItem('products') !== null) {
			// html продукт который был в local добавляем в панель корзины
            cartList.innerHTML = localStorage.getItem('products');

            // Инициализуем данные об общей цене и количестве
			totalCount = parseInt(localStorage.getItem('produtcAllCount'));
			totalPrice = parseInt(localStorage.getItem('productAllprice'));

			// Инициализуем данные о каждом отдельном продукте по его количеству и цене
			productСount = localStorage.getItem('productСount')?JSON.parse(localStorage.getItem('productPrice')):{};            
			productPrice = localStorage.getItem('productPrice')?JSON.parse(localStorage.getItem('productPrice')):{};

			// Печатамем количество товара и общую сумму
			printQuan();
			printFullPrice();
        }
        // Если в локал есть данные о количестве 
		if (localStorage.getItem('productСount') !== null) {
			// Получаем данные о добавленном продукте
			productСount = JSON.parse(localStorage.getItem('productСount'));
			// Вытаскиваем все айди продуктов
             Object.keys(productСount).forEach((id=>{
				// Находим счетчик каждого отдельного проудкта по айди
				let quantityElement = document.getElementById(id).querySelector('.сounter__count');
				if(quantityElement){
					quantityElement.textContent = productСount[id]; // Устанавливаем текущее значение каждого отдельного счетчика у продукта
				}
			 }))
		}

		if (localStorage.getItem('productPrice') !== null) {
			// Получаем данные о добавленном продукте
			productPrice = JSON.parse(localStorage.getItem('productPrice'));
			// Вытаскиваем все айди продуктов
             Object.keys(productPrice).forEach((id=>{
				// Находим счетчик каждого отдельного проудкта по айди
				let priceElement = document.getElementById(id).querySelector('.item-cart__prise');
				if(priceElement){
					priceElement.textContent = `${productPrice[id]}₽`; // Устанавливаем текущее значение каждого отдельного счетчика у продукта
				}
			 }))
		}

		// if(window.location.pathname === '/index.html' || window.location.pathname === '/decor.html' || window.location.pathname === '/Furniture.html' || window.location.pathname === '/Lighting.html'){
        // Проходим по всем кнопкам с атрибуами айди, которые есть в локальнос хранилише и сихнронизуем их с товарами из корзины, добавлем стиль по поведению
		idProduts.forEach((item=>{
			if(document.querySelector(`.popup__body[data-id='${item.id}']`)!==null){
				if(document.querySelector(`.popup__body[data-id='${item.id}']`).querySelector('button')){
					let button = document.querySelector(`.popup__body[data-id='${item.id}']`).querySelector('button');
					button.setAttribute('data-isbuy', 'true');
					button.querySelector('.btn__text').textContent = 'В корзине';
					button.classList.remove('hover');
					button.classList.add('ShopСart');
				}
			}
		
		}))
		// }

    };

	
    // Функция для обнолвения даннхы по количестве и цены
	function updateProductData (productData,productLocal) {
        // Если нет продуктов, то удаляем даннеы из локал, иначе устанавливаем актуальное
		if(Object.keys(productData).length===0){
			localStorage.removeItem(productLocal);
		}else{
			localStorage.setItem(productLocal,JSON.stringify(productData));
		}
	}

    // Функция для обновления локального хранилища
    const updateToStorage = function () {
        let parent = cartList;
        let html = parent.innerHTML;
		let id = JSON.stringify(idProduts);
 
		updateProductData(productСount,'productСount'); // Обновляем данные о количестве
		updateProductData(productPrice,'productPrice'); // Обновляем данные о цене

		// Если есть html продукт и данные об айди добавленных продуктов
        if (html.length && idProduts.length) {
            localStorage.setItem('products', html);
			localStorage.setItem('productID',id);
        } else {
            localStorage.removeItem('products');
			localStorage.removeItem('productID');
        }

    };
	// Функция для очистки всей корзины и локал
	const clearCart = () => {
		cartNumber.innerHTML = '0'; // Количество товаров в корзине
		formAllProducts.textContent = '0'; // Количество товаров в форме оформления заказа
		fullPrice.textContent = '0₽'; // Общая сумма продуктов
		formFullPrise.textContent = '0₽'; // Общая сумма продуктов в форме оформления заказа
		cartList.innerHTML = ''; // Очистка корзины с продуктами(html)
		idProduts = []; // Очитска массива с ID добавленных продуктов
		productСount = {}; // Очистка количества отдельных продуктов
		productPrice = {}; // Очитка цены отдельных продуктов
		totalCount = 0; // Очитка общего количества продуктов в коризне
		totalPrice = 0; // Очитка общего прайса продуктов в корзине
		itemQuan = 0; // Сброс промежуточного количества
		itemPrice = 0; // Сброс промежуточного прайса
		
	}

    // Функция для сброса кнопок до начального состояния
	function resetButtons () {
				// Проходим по всем кнопкам продуктов и сбрасываем их до начального состояния
			const btns = document.querySelectorAll('.popup__btn');
			btns.forEach((item=>{
					// Устаналиваем атрибут в начальное состояние
					item.setAttribute('data-isBuy','false');
		
					// Устаналиваем начальное поведение и стиль
					item.querySelector('.btn__text').textContent = 'Добавить в корзину';
					item.classList.add('hover');
					item.classList.remove('ShopСart');
				}))
	};
    // Событие нажатие на кнопку "Очистить корзину"
	clearCartBtn.addEventListener('click',()=>{

		clearCart(); // Очитка корзины
		resetButtons(); // Сбос кнопок
		localStorage.clear(); // Очитска localStorage
	});

	// Блок с динамическим выводом товаров

	let visibleDatePage = {}; // Видимые товары на странице

	let currentPage = window.location.pathname.replace('/Halvace/', '').replace('.html', '').replace('/', ''); // Получаем текущую страницу без / и html

	// Уникальные элементы страницы с товарами
	let furnitureId = document.querySelector('#Furniture');
	let LightingId = document.querySelector('#Lighting');
	let decorId = document.querySelector('#decor');

	// Функция при инициализации созданных товаров
	function initProductOnPage(category){
        // Если на нужных страницах с товарами
		if(furnitureId || LightingId || decorId){

			// Переменные
			const furnitureList = document.querySelector('.category__row'); // Лист продуктов Furniture
			const popupContent = document.querySelector('.popupContent'); // Блок со всеми попапами продуктов
			const btn = document.querySelector('.category__btn'); // Кнопка "Показать еще"
			// Элемент загрузки
			const furnitureLoading = document.querySelector('.furniture_loading');
	        
			// Функция установки видимых товаров на конртеной странице
			function setVisibleDataPage (){
				visibleDatePage[currentPage] += 4;
				localStorage.setItem('visibleDataPage',JSON.stringify(visibleDatePage));
			};

			// Функция загрущки сохранненого значения видимых товаров
			function loadSaveVisibleDataPage(){
				if(localStorage.getItem('visibleDataPage')){
					visibleDatePage = JSON.parse(localStorage.getItem('visibleDataPage'));
				}else{
					visibleDatePage = {
						"Furniture":4,
					    "Lighting":4,
				        "decor":4
					};
				};
			};
	
			// Пример новых данных всех категорий
			const data = {

				'Furniture':[
					{
					  "name": "Диван «Модерн Блэк»",
					  "price": "32 500",
					  "img": "img/data/furniture/1.webp",
					  "id": "0",
					  "decr": "Элегантный черный диван с минималистичным дизайном, прекрасно вписывающийся в современные интерьеры."
					},
					{
					  "name": "Диван «Сканди Лайт»",
					  "price": "21 300",
					  "img": "img/data/furniture/2.webp",
					  "id": "1",
					  "decr": "Светло-серый диван с чистыми линиями и скандинавским стилем, подходящий для небольших жилых пространств."
					},
					{
					  "name": "Диван «Изумруд Комфорт»",
					  "price": "29 800",
					  "img": "img/data/furniture/3.webp",
					  "id": "2",
					  "decr": "Мягкий диван насыщенного изумрудного цвета с подушками для дополнительного уюта."
					},
					{
					  "name": "Кресло «Ваниль Лаунж»",
					  "price": "15 400",
					  "img": "img/data/furniture/4.webp",
					  "id": "3",
					  "decr": "Стильное и мягкое кресло в кремовом цвете, добавляющее теплоту и комфорт в интерьер."
					},
					{
					  "name": "Кресло «Шарм Классик»",
					  "price": "31 600",
					  "img": "img/data/furniture/5.webp",
					  "id": "4",
					  "decr": "Винтажное серое кресло с высокими спинками и текстурированной тканью, придающее комнате утонченный стиль."
					},
					{
					  "name": "Диван «Уют Круг»",
					  "price": "23 500",
					  "img": "img/data/furniture/6.webp",
					  "id": "5",
					  "decr": "Круглый диван с мягкими подушками, идеальный для комфортного отдыха и уютных встреч."
					},
					{
					  "name": "Диван «Графит Люкс»",
					  "price": "28 900",
					  "img": "img/data/furniture/7.webp",
					  "id": "6",
					  "decr": "Глубокий серый диван с плотными тканями и современным дизайном, подходящий для стильных гостиных."
					},
					{
					  "name": "Кресло «Солнечный Чилл»",
					  "price": "14 600",
					  "img": "img/data/furniture/8.webp",
					  "id": "7",
					  "decr": "Удобное кресло с мягкой обивкой желтого цвета, добавляющее в интерьер жизнерадостные акценты."
					},
					{
						"name": "Кресло «Шарм Классик»",
						"price": "31 600",
						"img": "img/data/furniture/9.webp",
						"id": "8",
						"decr": "Винтажное серое кресло с высокими спинками и текстурированной тканью, придающее комнате утонченный стиль."
					  },
					  {
						"name": "Диван «Уют Круг»",
						"price": "23 500",
						"img": "img/data/furniture/10.webp",
						"id": "9",
						"decr": "Круглый диван с мягкими подушками, идеальный для комфортного отдыха и уютных встреч."
					  },
					  {
						"name": "Диван «Графит Люкс»",
						"price": "28 900",
						"img": "img/data/furniture/11.webp",
						"id": "10",
						"decr": "Глубокий серый диван с плотными тканями и современным дизайном, подходящий для стильных гостиных."
					  },
					  {
						"name": "Кресло «Солнечный Чилл»",
						"price": "14 600",
						"img": "img/data/furniture/12.webp",
						"id": "11",
						"decr": "Удобное кресло с мягкой обивкой желтого цвета, добавляющее в интерьер жизнерадостные акценты."
					  }
				  ],
				'Lighting':[
					{
					  "name": "Диван «Модерн Блэк»",
					  "price": "32 500",
					  "img": "img/data/light/1.webp",
					  "id": "0",
					  "decr": "Элегантный черный диван с минималистичным дизайном, прекрасно вписывающийся в современные интерьеры."
					},
					{
					  "name": "Диван «Сканди Лайт»",
					  "price": "21 300",
					  "img": "img/data/light/2.webp",
					  "id": "1",
					  "decr": "Светло-серый диван с чистыми линиями и скандинавским стилем, подходящий для небольших жилых пространств."
					},
					{
					  "name": "Диван «Изумруд Комфорт»",
					  "price": "29 800",
					  "img": "img/data/light/3.webp",
					  "id": "2",
					  "decr": "Мягкий диван насыщенного изумрудного цвета с подушками для дополнительного уюта."
					},
					{
					  "name": "Кресло «Ваниль Лаунж»",
					  "price": "15 400",
					  "img": "img/data/light/4.webp",
					  "id": "3",
					  "decr": "Стильное и мягкое кресло в кремовом цвете, добавляющее теплоту и комфорт в интерьер."
					},
					{
					  "name": "Кресло «Шарм Классик»",
					  "price": "31 600",
					  "img": "img/data/light/5.webp",
					  "id": "4",
					  "decr": "Винтажное серое кресло с высокими спинками и текстурированной тканью, придающее комнате утонченный стиль."
					},
					{
					  "name": "Диван «Уют Круг»",
					  "price": "23 500",
					  "img": "img/data/light/6.webp",
					  "id": "5",
					  "decr": "Круглый диван с мягкими подушками, идеальный для комфортного отдыха и уютных встреч."
					},
					{
					  "name": "Диван «Графит Люкс»",
					  "price": "28 900",
					  "img": "img/data/light/7.webp",
					  "id": "6",
					  "decr": "Глубокий серый диван с плотными тканями и современным дизайном, подходящий для стильных гостиных."
					},
					{
					  "name": "Кресло «Солнечный Чилл»",
					  "price": "14 600",
					  "img": "img/data/light/8.webp",
					  "id": "7",
					  "decr": "Удобное кресло с мягкой обивкой желтого цвета, добавляющее в интерьер жизнерадостные акценты."
					},
					{
						"name": "Кресло «Шарм Классик»",
						"price": "31 600",
						"img": "img/data/light/9.webp",
						"id": "8",
						"decr": "Винтажное серое кресло с высокими спинками и текстурированной тканью, придающее комнате утонченный стиль."
					  },
					  {
						"name": "Диван «Уют Круг»",
						"price": "23 500",
						"img": "img/data/light/10.webp",
						"id": "9",
						"decr": "Круглый диван с мягкими подушками, идеальный для комфортного отдыха и уютных встреч."
					  },
					  {
						"name": "Диван «Графит Люкс»",
						"price": "28 900",
						"img": "img/data/light/11.webp",
						"id": "10",
						"decr": "Глубокий серый диван с плотными тканями и современным дизайном, подходящий для стильных гостиных."
					  },
					  {
						"name": "Кресло «Солнечный Чилл»",
						"price": "14 600",
						"img": "img/data/light/12.webp",
						"id": "11",
						"decr": "Удобное кресло с мягкой обивкой желтого цвета, добавляющее в интерьер жизнерадостные акценты."
					  }
				  ],
				  'decor':[
					{
					  "name": "Диван «Модерн Блэк»",
					  "price": "32 500",
					  "img": "img/data/decor/1.webp",
					  "id": "0",
					  "decr": "Элегантный черный диван с минималистичным дизайном, прекрасно вписывающийся в современные интерьеры."
					},
					{
					  "name": "Диван «Сканди Лайт»",
					  "price": "21 300",
					  "img": "img/data/decor/2.webp",
					  "id": "1",
					  "decr": "Светло-серый диван с чистыми линиями и скандинавским стилем, подходящий для небольших жилых пространств."
					},
					{
					  "name": "Диван «Изумруд Комфорт»",
					  "price": "29 800",
					  "img": "img/data/decor/3.webp",
					  "id": "2",
					  "decr": "Мягкий диван насыщенного изумрудного цвета с подушками для дополнительного уюта."
					},
					{
					  "name": "Кресло «Ваниль Лаунж»",
					  "price": "15 400",
					  "img": "img/data/decor/4.webp",
					  "id": "3",
					  "decr": "Стильное и мягкое кресло в кремовом цвете, добавляющее теплоту и комфорт в интерьер."
					},
					{
					  "name": "Кресло «Шарм Классик»",
					  "price": "31 600",
					  "img": "img/data/decor/5.webp",
					  "id": "4",
					  "decr": "Винтажное серое кресло с высокими спинками и текстурированной тканью, придающее комнате утонченный стиль."
					},
					{
					  "name": "Диван «Уют Круг»",
					  "price": "23 500",
					  "img": "img/data/decor/6.webp",
					  "id": "5",
					  "decr": "Круглый диван с мягкими подушками, идеальный для комфортного отдыха и уютных встреч."
					},
					{
					  "name": "Диван «Графит Люкс»",
					  "price": "28 900",
					  "img": "img/data/decor/7.webp",
					  "id": "6",
					  "decr": "Глубокий серый диван с плотными тканями и современным дизайном, подходящий для стильных гостиных."
					},
					{
					  "name": "Кресло «Солнечный Чилл»",
					  "price": "14 600",
					  "img": "img/data/decor/8.webp",
					  "id": "7",
					  "decr": "Удобное кресло с мягкой обивкой желтого цвета, добавляющее в интерьер жизнерадостные акценты."
					}
				  ]
			};

			// Функция для скрытия элемента
			function hideElem (elem){
				elem.style.display = 'none';	
			};
			// функция для показа элемента
			function showElem(elem){
				elem.style.opacity = '1';
				elem.style.visibility = 'visible';
			};
			// Функция создания новых продуктов
			function createCardProduct (categoryData){
			
				let newData = data[categoryData].slice(0,visibleDatePage[categoryData]); // Создаем новый массив учитывая начальное значение показов товара
				furnitureList.innerHTML = ''; // Перед новой отрисовкой товаров, очищаем старую
	
				// Проходимя по массиву с продуктами и генерируем новый продукт
				newData.map((item)=>{
					   let {name,price,img,id} = item;
				
					   let product = document.createElement('li');
					   product.classList.add('category__column');
					   product.innerHTML = `
					   <div class="category__item">
					   <a class="_popup-link" href="#new-prodectN${id}">
						   <div class="category__img _ibg">
							   <img src=${img} alt=${name}>
						   </div>
					   </a>
					   <div class="category__item-title">${name}</div>
					   <div class="category__item-price">${price}₽</div>
				   </div>
					   `
					   furnitureList.append(product); // Добавляем продукт в лист продуктов
				});
			};
			// Функция создания новых попапов для каждого продукта
			function createPopupProduct (categoryData){
	
					let newData = data[categoryData].slice(0,visibleDatePage[categoryData]); // Создаем новый массив попапов продукта учитывая начальное значение показов товара
					popupContent.innerHTML = ''; // Перед новой отрисовкой товаров, очищаем старую
	
					// Проходимя по массиву с продуктами и генерируем новый попап продукта
					newData.map((item)=>{
						let {name,price,img, decr, id} = item;
						let product  = document.createElement('div');
						product.classList.add('popup', `popup_new-prodectN${id}`);
						product.innerHTML = `
						<div class="popup__content">
						<div class="popup__body" data-id=${id} id="new-prodectN${id}">
							<div class="popup__img _ibg"><img class="popup__img-img" src=${img} alt=${name}></div>
							<div class="popup__info">
							<div class="popup__title">${name}</div>
							<div class="popup__price">${price}₽</div>
							<button class="popup__btn hover" data-isBuy="false">
								<div class="btn__text">Добавить в корзину</div>
								<div class="loading">
									<div class="loading_content">
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><radialGradient id="a12" cx=".66" fx=".66" cy=".3125" fy=".3125" gradientTransform="scale(1.5)"><stop offset="0" stop-color="#FFFFFF"></stop><stop offset=".3" stop-color="#FFFFFF" stop-opacity=".9"></stop><stop offset=".6" stop-color="#FFFFFF" stop-opacity=".6"></stop><stop offset=".8" stop-color="#FFFFFF" stop-opacity=".3"></stop><stop offset="1" stop-color="#FFFFFF" stop-opacity="0"></stop></radialGradient><circle transform-origin="center" fill="none" stroke="url(#a12)" stroke-width="15" stroke-linecap="round" stroke-dasharray="200 1000" stroke-dashoffset="0" cx="100" cy="100" r="70"><animateTransform type="rotate" attributeName="transform" calcMode="spline" dur="2" values="360;0" keyTimes="0;1" keySplines="0 0 1 1" repeatCount="indefinite"></animateTransform></circle><circle transform-origin="center" fill="none" opacity=".2" stroke="#FFFFFF" stroke-width="15" stroke-linecap="round" cx="100" cy="100" r="70"></circle></svg>
									</div>
								</div>
							</button>
							<div class="popup__descr">${decr}</div>
						</div>
							<div class="popup__close"><span></span></div>
						</div>
					</div>
					})
				
					`
					popupContent.append(product); // Добавляем попап продукта в лист попапов
					});
			};
			// Функция по перезначению добавления обработчиков на динамические продукты для открытия попапов к ним
			function bindPopupEvents() {
					let popup_link = document.querySelectorAll('._popup-link');
					let popups = document.querySelectorAll('.popup');
					for (let i = 0; i < popup_link.length; i++) {
						const el = popup_link[i];
						el.addEventListener('click', function (e) {
							let item = el.getAttribute('href').replace('#', '');
							popup_open(item);
							e.preventDefault();
						});
					}
		
					for (let index = 0; index < popups.length; index++) {
						const popup = popups[index];
						popup.addEventListener("click", function (e) {
							if (!e.target.closest('.popup__body')) {
								popup_close(e.target.closest('.popup'));
								
							};
						});
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
			};
			// Функция для динамиеской подгрузки товаров
			function lazyLoading(){
		
					btn.disabled = true; // Блокируем кнопку "Показать еще"
	
					// visibleDatePage[currentPage]+=4; // Увеличиваем начальное значание показа товаров

						setVisibleDataPage();

						
						createPopupProduct(category); // Отрисовываем новый список товаров
						createCardProduct(category); // Отрисовываем нвоый список попапов к продуктам
						bindPopupEvents(); // Переназначаем обработчики для октрытия попапов продукта
						
						btn.disabled = false; // Разблокируем кнопку "Показать еще"
						// Проверяем если длина массива продуктов равна видимому количеству товаров, то убираем кнопку "Показать еще"
						if(data[category].length === visibleDatePage[category]){
							hideElem(btn);
						};			

					
			}

			loadSaveVisibleDataPage(); // Инициализация видимвых товаров на странице
			createCardProduct(category); // Создание динамических товаров
			createPopupProduct(category); // Создание динамических попапов для товаров
			bindPopupEvents(); // Переназначаем обработчики для октрытия попапов продукта
	
			// Проверяем равно ли количество видимых товаров на странице количеству в массиве продуктов
			if(furnitureList.children.length>=data[category].length){
				hideElem(btn); // Если да, то кнопку "Добавить еще" удаляем
			};
	
			// Функционал для показа элемта загрузки
			// Скрываем элемент загрузки, когда все товары подгрузились
			hideElem(furnitureLoading); // Скрываем элемент загрузки
			showElem(btn); // Показываем кпноку "Показать еще"
	
			// Если была нажата кнопка "Добавить еще" - подгружаем новые товары на страницу и сохраняем их в локал
			btn.addEventListener('click',lazyLoading);	
		}
	}

	initProductOnPage(currentPage);
    // Проверяем есть блок со страницы Furniture

	// Иницилизуем данные из локал
	initialStore();   
});
































if(document.querySelector('.swiper')){

//swiper
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
  
}
