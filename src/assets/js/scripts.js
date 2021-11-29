document.addEventListener('DOMContentLoaded', (event) => {

//  Site Sliders
new Splide('.latestproducts', {
	type: 'loop',
	perPage: 4,
	focus: 'center',
	breakpoints: {
		1000: {
			perPage: 3
		},
		700: {
			perPage: 2
		},
		400: {
			perPage: 1
		}
	},
}).mount();

new Splide('.popularproducts', {
	type: 'loop',
	perPage: 4,
	focus: 'center',
	breakpoints: {
		1000: {
			perPage: 3
		},
		700: {
			perPage: 2
		},
		400: {
			perPage: 1
		}
	},
}).mount();

//  Mobile menu

var menuBtn = document.getElementById("MobileMenuBtn");
var mobileMenu = document.getElementById("MobileMenu");
var siteOverlay = document.getElementById("siteOverlay");
var mobileDropdown = document.getElementById("MobileDropdown");
var mobileDropdownMenu = document.getElementById("ResDrop");
var closeMenu = document.getElementById('closeMenu');
menuBtn.addEventListener('click', function () {
	mobileMenu.style.left = 0;
	siteOverlay.style.display = "block";
})
siteOverlay.addEventListener('click', function () {
	this.style.display = "none";
	mobileMenu.style.left = "-300px";
})
closeMenu.addEventListener('click', function () {
	siteOverlay.style.display = "none";
	mobileMenu.style.left = "-300px";
});
var dropdownMenu = document.querySelectorAll('.mobile-dropdown');
var dropdownArray = Array.prototype.slice.call(dropdownMenu, 0);

dropdownArray.forEach(function (el) {
	var dokme = el.querySelector('i.fa-plus');
	var dokmeCol = el.querySelector('i.fa-minus');
	var resDrop = dokme.parentNode.querySelector('.mobile-menu.ResDrop');
	dokme.addEventListener('click', function () {
		resDrop.classList.add("show");
		dokme.style.display = "none";
		dokmeCol.style.display = "block";
	});
	dokmeCol.addEventListener('click', function () {
		dokmeCol.parentNode.querySelector('.mobile-menu.ResDrop').classList.remove("show");
		dokme.style.display = "block";
		dokmeCol.style.display = "none";
	});

});

var dropdownCategory = document.querySelectorAll('.DropdownCategory');
var dropdownCategoryArray = Array.prototype.slice.call(dropdownCategory, 0);
dropdownCategoryArray.forEach(function (el) {
	var elLink = el;
	var elMenu = el.querySelector('ul.dropCat')
	elLink.addEventListener("mouseover", function () {
		elMenu.classList.add("open");
	})
	elLink.addEventListener("mouseout", function () {
		elMenu.classList.remove("open");
	})
});	
})
