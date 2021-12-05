var cart ={};
var all = 0;
var price;
function loadCart(){
  if(localStorage.getItem('cart')) {
	  cart = JSON.parse(localStorage.getItem('cart'));
		  showcart();
	  }

  
  else {
  	$('.cart').html('Корзина пуста');
  }
}
function showcart(){
	if (!isEmpty(cart)){
		$('.cart').html('Корзина пуста');
	}
	else {
		$.getJSON('tovars.json', function (data) {
			var goods = data;
			var out = '';
			var di=40;
			for (var id in cart) {
				out += '<div class="tovar">';
				out += `<div class="vew"><img class="avka" name='avaaa' src="${goods[id].img}"></div>`;
				out += `<div class ="vew"><span class="name"> ${goods[id].name} </span></div>`;
				out += `<div class ="vew"><span class="sale"> ${goods[id].cost}</span></div>`;
				out += `<div class = "vew" id="stra"><button data-id="${id}" class="minus">-</button>`;
				out += `<form><input class="stra" type="number" step="1" min="1" max="1000" name="quantity" value="${cart[id]}"></form>`;
				out += `<button data-id="${id}" class="plus">+</button></div>`;
				out += `<div class="vew"><span class ="summa" data-pr="${cart[id]*goods[id].cost}">${cart[id]*goods[id].cost}</span></div>`;
				out += `<div class="vew" data-ypak="ypak"><button class="bck" data-yp="${di}"onClick="bck()"><</button><img id = "${di}" class="ypak" name="${di}" alt="ypakovka" src="images/ypakovka/1.jpg"><button data-yp="${di}" onClick="frw()" class="frw">></button></div>`;
				out += `<div class="vew"><button data-id="${id}" class="delete flaticon-rubbish"></button></div>`;
				out += '</div>';
				di++;
			}
			$('.cart').html(out);
			$('.delete').on('click', deltovar);
			$('.plus').on('click', plusflowers);
			$('.minus').on('click', minusflowers);
			$('.frw').on('click', frw);
			$('.bck').on('click', bck);
			summaa();
		})
		
	}
}
$('.stra').keyup(function(){
	var val = $('.stra').val();
	$('.stra').value= val;
})
function display1(div){
	if (div.style.display == "none"){
		div.style.display = "block";
		var x = document.getElementById('dis1');
		price = parseInt(x.value);
		all = all + price;
	}
	else {div.style.display = "none";
		all = all - price;
}
	$('.summm').html(all);
}
function display2(div){
	if (div.style.display == "none"){
		div.style.display = "block";
		var x = document.getElementById('dis2');
		price = parseInt(x.value);
		all = all + price;
	}
	else {div.style.display = "none";
		all = all - price;
}
	$('.summm').html(all);
}
function display3(div){
	if (div.style.display == "none"){
		div.style.display = "block";
		var x = document.getElementById('dis3');
		price = parseInt(x.value);
		all = all + price;
	}
	else {div.style.display = "none";
		all = all - price;
}
	$('.summm').html(all);
}

function plusflowers(){
	var id = $(this).attr('data-id');
	cart[id]++;
	savecart();
	showcart();
	summaa();
}
function minusflowers(){
	var id = $(this).attr('data-id');
	if (cart[id]==1){
		delete cart[id];
	}
	else{
	cart[id]--;
	}
	savecart();
	showcart();
	summaa();
}
function deltovar(){
	var id = $(this).attr('data-id');
	delete cart[id];
	savecart();
	showcart();
	summaa();
}
function savecart(){
	localStorage.setItem('cart',JSON.stringify(cart));
}
function isEmpty(object){
	//проверка корзины на пустоту
	for (var key in object)
		if (object.hasOwnProperty(key)) return true;
		return false;
}
function otpremail(){
	var ename = $('#ename').val();
	var email = $('#email').val();
	var phone = $('#phone').val();
	if (ename!= ''&&  email!=''&& phone!=''){
		if (isEmpty(cart)){
			$.post(
				"mail.php",
				{
				"ename" : ename,
				"email" : email,
				"phone": phone,
				"cart":cart
			},
			function(data){
				console.log(data);
			}
			);
	}
		else {
			alert('корзина пуста');
		}
	}
	else{
		alert('заполните поля');
	}

}
$(document).ready(function () {
	loadCart();
	$('.otpr-email').on('click',otpremail);
})
function summaa(){
$(document).ready( function() {
		all=0
  		var x = document.getElementsByClassName("summa");
  		for(var i = 0; i < x.length; i++){
  		var b = x[i];
  		var chislo = parseInt(b.innerHTML);
  		all = all + chislo;
  	}
  	$('.summm').html(all);
});
}

var i=0;

var imgs=new Array('images/ypakovka/1.jpg', "images/ypakovka/3.jpg","images/ypakovka/4.jpg"); //        Добавте свои картинки через запятую
function frw(){
var pl = $(this).attr("data-yp");	
var image=document.getElementById(pl);	
i++;
image.src=imgs[i];
}
function bck(){
	var pl = $(this).attr("data-yp");	
var image=document.getElementById(pl);	
i--;
image.src=imgs[i];

}
