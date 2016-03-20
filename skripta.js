window.addEventListener('load', function() {
	//stran nalozena

	//Dodaj novo barvo
	var dodajBarvo = function(event) {
		var input = document.createElement('button');
		var picker = new jscolor(input);
		picker.fromRGB(Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255))
		document.getElementById("barve").appendChild(input);
	}

	document.querySelector("#novaBarva")
		.addEventListener('click', dodajBarvo);

	//Odstrani barve
	var odstraniBarve = function(event) {
		var grupaBarv = document.getElementById("barve")
		while (grupaBarv.firstChild) {
			grupaBarv.removeChild(grupaBarv.lastChild);
		}
	}
	document.querySelector("#odstraniBarve")
		.addEventListener('click', odstraniBarve);

	//Stroboskop
	var vrednosti = [];
	var minCas = 0;
	var maxCas = 0;
	var ustavi = false;

	var spremeniBarvo = function(id) {
		if (ustavi) {
			ustavi = false;

		}
		else {
			document.getElementById("stroboskop").style.backgroundColor = "#" + vrednosti[id];
			novId = (id + 1) % vrednosti.length;
			timeout = Math.floor((Math.random() * (maxCas - minCas)) + minCas);
			setTimeout(function() {
				spremeniBarvo(novId)
			}, timeout);
		}
	}

	var stop = function(event) {
		ustavi = true;
		var start = document.querySelector("#start");
		start.innerHTML = "Zaženi stroboskop";
		start.removeEventListener('click', stop);
		start.addEventListener('click', zagon);
	}

	var zagon = function(event) {
		vrednosti = [];
		var barve = document.querySelectorAll("#barve > button");
		for (i = 0; i < barve.length; i++) {
			var barva = barve[i];
			vrednosti.push(barva.innerHTML);
		}

		minCas = document.getElementById("min").value;
		maxCas = document.getElementById("max").value;
		if(minCas <= maxCas){
		
		spremeniBarvo(0);

		var start = document.querySelector("#start");
		start.innerHTML = "Ustavi stroboskop";
		start.removeEventListener('click', zagon);
		start.addEventListener('click', stop);
		}else{
			alert("Neveljavna izbira časov!")
		}
	}

	document.querySelector("#start").addEventListener('click', zagon);

});