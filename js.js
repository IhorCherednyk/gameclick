
//Получаем данные JSON, и замускаем игру
var xhr = new XMLHttpRequest();
var width;
var height;
xhr.open('GET', 'https://kde.link/test/get_field_size.php', false);
xhr.send();

if (xhr.status != 200) {
	alert( xhr.status + ': ' + xhr.statusText ); 
} else {
	var data = JSON.parse(xhr.responseText);
	width = data.width;
	height = data.height;
	console.log("Размеры поля: " + width + " X " + height);
	play(width,height);
}





//Функция игры
function play(width,height){
	//создаем поле,назначаем переменные
	var field = document.querySelector(".game-body");
	var imgQuantity = 9;
	var imgAr = []; 
	var currentImg = (width * height)/2
	var test = (width*height) % 2;
	if(width <= 8 && height <= 8 && !test){
		field.style.width = (width*70) + "px";
		field.style.height = (height*70) + "px";
		for (var i = 0; i < height; i++) {
			var row = document.createElement('div');
			row.classList.add("row")
			for (var j = 0; j < width; j++) {
				var cell = document.createElement('div');
				cell.classList.add("cell");
				row.appendChild(cell);
			};
			field.appendChild(row);
		};
	}else {
		alert("Поле не должно быть больше 8 ячеек и должно быть кратно двум")
	}

	//создаем масив который будет генерировать случайные атрибуты
	function generateAr(currentImg){
		if(currentImg >= imgQuantity){
			for (var i = 0; i < imgQuantity; i++) {
				imgAr.push(i);
				imgAr.push(i);
			};
			currentImg -= imgQuantity;
			generateAr(currentImg);
		}else if (currentImg <= imgQuantity & currentImg != 0) {
			for (var i = 0; i < currentImg; i++) {
				imgAr.push(i);
				imgAr.push(i);
			};
		}
	}
	generateAr(currentImg);
	//рендомный разброс чисел в масиве
	function compareRandom(a, b) {
		return Math.random() - 0.5;
	}
	imgAr.sort(compareRandom);

	// назначаем дата атрибуты и добовляем клас хиден
	var el = document.querySelectorAll(".cell");
	for (var i = 0; i < el.length; i++) {
		el[i].setAttribute("img",imgAr[i]);
		el[i].classList.add("hidden");
	};

	//главная логика игры
	var flag = true;
	var curent;
	var counter = 0;
	field.addEventListener("click", function(e){

		e = e || event;
		if(e.target.className.indexOf("hidden") > 1){
			var th = e.target;
			var attr = th.getAttribute("img");
			th.classList.remove("hidden");
			th.classList.add("img" + attr);

			setTimeout(function(){
				if(flag){					
					curent = th;
					console.log(curent);
					flag = false;
				}else{
					if(curent.getAttribute("img") == attr){
						counter++;
						if(counter == currentImg){
							var res = confirm("Ты победил еще разок?")
							if(res){
								location.reload(); 
							}
						}
					}else {
						console.log(curent,th);
						curent.classList.add("hidden");
						th.classList.add("hidden");
						curent = null;
					}
					flag = true;
				}

			},200);
			
		}
	});


}
