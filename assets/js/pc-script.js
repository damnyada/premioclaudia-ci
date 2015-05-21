var categoria = 1;
var votos = new Array(14); //Inicializando o array 'votos' cuja primeira posicao eh uma string

function armazenaVoto(cat) {
	votos[cat] = $("#categoria_" + cat).find(".escolhido").attr("data-voto"); //Nunca sobrescreve a posicao zero
}

function verificaRespostas(votos) {
	var verifica;

	for (var i = 1; i <= 14; i++) {
		if (votos[i]) {
			verifica = true;
		} else {
			verifica = false;
			return verifica;
			break;
		}
	}

	return verifica;
}

function paginador(page) {
    if (page > 14) {
    	if(verificaRespostas(votos) == true) {
    		$(".vota-container").css("display", "inline-block");
    	} else {
    		$(".erro-container").css("display", "inline-block");
    	}
    } else {
    	
    	$("#titulo").load("pagina?categoria=" + page + " #titulo-categoria");  
    	$(".candidatos-container").load("pagina?categoria=" + page + " .candidatos", function(){
			$(".candidatos ul").find("li[data-voto='" + votos[parseInt(page)] + "']").addClass("escolhido");
			iframeSize();

    	});

    }

    $("#cat-buttons li").css("color", "black");
	$("#cat-buttons li").css("background-image", "url('/assets/img/pcontigo/layout/botao-bolinha-branca.svg')");
	$("#but-" + categoria).css("color", "white");
	$("#but-" + categoria).css("background-image", "url('/assets/img/pcontigo/layout/botao-bolinha-vermelha.svg')");

	verificaSetas();
}

function verificaSetas() {
	if (categoria == 1) {
		$("#volta").css("display", "none");
	} else {
		$("#volta").css("display", "inline-block");
		$("#avanca").css("display", "inline-block")
	}
}

function iframeSize(){
	var num = $(".candidatos ul").find("li").length;
	var iframeH = 0;

	if(num <= 4){
		iframeH = 1520;
	}else if(num>4 && num<=8) {
		iframeH = 1520;
	} else if(num>8 && num<=12){
		iframeH = 1700;
	} else if(num>12 && num<=16){
		iframeH = 2150;
	} else if(num>16 && num<=20){
		iframeH = 2350;
	} else if(num>20 && num<=24){
		iframeH = 2700;
	}

	window.parent.postMessage(iframeH, "*");
}

$(document).ready(function(){
    paginador(categoria);
    verificaSetas();
}); 

$(".candidatos-container").on("click", ".candidatos ul li", function() {

    $(this).siblings().removeClass("escolhido");
	$(this).addClass("escolhido");

	armazenaVoto(categoria);
});

$("#aviso-votar").click(function() {
	
	if (verificaRespostas(votos) == true) {
		$(".circularG").css("display", "inline-block");
		$.ajax({
			type : 'post',
			dataType : 'json',
			url : '/e/envia',
			data : {c1: votos[1], c2: votos[2], c3: votos[3], c4: votos[4], c5: votos[5],
	                c6: votos[6], c7: votos[7], c8: votos[8], c9: votos[9], c10: votos[10],
	                c11: votos[11], c12: votos[12], c13: votos[13], c14: votos[14]},
			success: function(response){
				$(".vota-container").css("display", "none");
				$(".final-container").css("display", "inline-block");
			}
		});
	} else {
		$(".vota-container").css("display", "none");
		$(".erro-container").css("display", "inline-block");		
	}
});

$(".aviso-revisar").click(function() {
	$(".vota-container").css("display", "none");
	$(".erro-container").css("display", "none");
	categoria = 1;
	paginador(categoria);
});

$(".menu ul li").on("click", function() {
	categoria = parseInt($(this).text(), 10);
	paginador(categoria);
});

$("#avanca").on("click", function() {
    if (categoria != 15) {
        categoria += 1;
        paginador(categoria);
    }
})

$("#volta").on("click", function() {
    if (categoria != 1) {
        categoria -= 1;
        paginador(categoria);
    }
})

/*$("#aviso-voltar").on("click", function() {
	window.location.href = "http://mdemulher.abril.com.br/especial/premio-contigo-2015";
})*/

//aviso
$("#aviso-comecar").hover(function() {
	$(this).css({"background-image": "url('/assets/img/pcontigo/layout/botao-VOLTAR-02.svg')"});
}, function() {
	$(this).css({"background-image": "url('/assets/img/pcontigo/layout/botao-VOLTAR-01.svg')"});
});

$(".aviso-revisar").hover(function() {
	$(this).css({"background-image": "url('/assets/img/pcontigo/layout/botao-REVISAR-02.svg')"});
}, function() {
	$(this).css({"background-image": "url('/assets/img/pcontigo/layout/botao-REVISAR-01.svg')"});
});

$("#aviso-votar").hover(function() {
	$(this).css({"background-image": "url('/assets/img/pcontigo/layout/botao-VOTAR-02.svg')"});
}, function() {
	$(this).css({"background-image": "url('/assets/img/pcontigo/layout/botao-VOTAR-01.svg')"});
});

$("#aviso-voltar").hover(function() {
	$(this).css({"background-image": "url('/assets/img/pcontigo/layout/botao-VOLTAR-02.svg')"});
}, function() {
	$(this).css({"background-image": "url('/assets/img/pcontigo/layout/botao-VOLTAR-01.svg')"});
});

$("#aviso-comecar").on("click", function() {
	window.location.href = "http://mdemulher.abril.com.br/especial/premio-contigo-2015";
});