var categoria = 1;
var votos = ["votos"]; //Inicializando o array 'votos' cuja primeira posicao eh uma string

function irParaCategoria(cat){
	$(".categoria_container").removeClass("ativo");
	$("#categoria_" + cat).addClass("ativo");	
}

function armazenaVoto(cat) {
	votos[cat] = $("#categoria_" + cat).find(".escolhido").attr("data-voto"); //Nunca sobrescreve a posicao zero
	console.log("Escolhido " + votos[cat]);
}

function terminaEnquete() {
	console.log("iniciando envio...")
	if (verificaRespostas(votos)) {
		$.ajax({
			type : 'post',
			dataType : 'json',
			url : '/e/envia',
			data : {c1: votos[1], c2: votos[2], c3: votos[3]},
			success: function(response){
				console.log("sucesso");
			}
		});
	} else {
		alert("Você não preencheu tudo");
	}

}

function verificaRespostas(votos) {
	var verifica = true;
	for (var i = 0; i < votos.length; i++) {
		if (votos[i] == null) {
			valida = false;
			break;
		}
	}

	return verifica;
}

function iframeSize(){
	var num = $(".categoria_container.ativo ul").find("li").length;
	var iframeH = 0;

	if(num <= 4){
		iframeH = 550;
	}else if(num>4 && num<=8) {
		iframeH = 750;
	} else if(num>8 && num<=12){
		iframeH = 1000;
	} else if(num>12 && num<=16){
		iframeH = 1250
	} else if(num>16 && num<=20){
		iframeH = 1500;
	} else if(num>20 && num<=24){
		iframeH = 1750;
	}
	 
	window.parent.postMessage(iframeH, "*");
}

$(".categoria_container ul li").on("click", function(){

	console.log("Categoria " + categoria);

	$(this).siblings().removeClass("escolhido");
	$(this).addClass("escolhido ativo");

	armazenaVoto(categoria);

	if (categoria <= 3) {
		categoria++;
		irParaCategoria(categoria);	
	} 

	if (categoria == 4) {
		terminaEnquete();
	}
});

$(".menu ul li").on("click", function() {
	categoria = $(this).text()
	irParaCategoria(categoria);
	iframeSize();
});

$(document).ready(function(){
	iframeSize();
});

