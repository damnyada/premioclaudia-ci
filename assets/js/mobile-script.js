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
    		$("html, body").scrollTop(0);
    	} else {
    		$(".erro-container").show();
    		categoria = 14;
    	}
    	$(".menu").hide();
		setTimeout(function(){
			$(".loading-container").hide();
		}, 300);
    } else {
    	$.ajax({
    		url: "pagina?categoria=" + page,
    		async: false,
    		success: function(html)
    		{
    			DOM = $(html);
    			$("#categoria-titulo").html(DOM[0]);
    		}
    	});
		
		$.ajax({
			url: "pagina?categoria=" + page,
    		async: false,
    		success: function(html)
    		{
    			DOM = $(html);
    			$(".candidatos-container").html(DOM[1]);

    			$(".candidatos ul").find("li[data-voto='" + votos[parseInt(page)] + "']").addClass("escolhido");
				var img = $(".escolhido").find("img");
				var borderDiv = $(this).find(".borderDiv").length > 0 ? $(this).find(".borderDiv") : $("<div/>").addClass("borderDiv");	
				$(".escolhido").prepend(borderDiv);
				borderDiv.append(img);
    		},
    		complete: function() {
    			
    			setTimeout(function(){
    				$('html, body').scrollTop($("#categoria-titulo").offset().top);
    				$(".loading-container").hide();
    			}, 300);
    			
    		}
		});

		
    }

}

$(document).ready(function(){
    paginador(categoria);
}); 

$(".candidatos-container").on("click", ".candidatos ul li", function() {

	$(this).siblings().removeClass("escolhido");
	$(this).addClass("escolhido");
	var img = $(this).find("img");
	var borderDiv = $("<div/>").addClass("borderDiv");
	borderDiv.append(img);
	$(this).prepend(borderDiv);

	setTimeout(function(){
		$(".loading-container").show();
		armazenaVoto(categoria);
		paginador(categoria + 1);
		categoria += 1;	
	}, 100);

	
});

$("#aviso-votar").click(function() {
	
	if (verificaRespostas(votos) == true) {
		$(".circularG").show();
		$.ajax({
			type : 'post',
			dataType : 'json',
			url : '/e/envia',
			data : {c1: votos[1], c2: votos[2], c3: votos[3], c4: votos[4], c5: votos[5],
	                c6: votos[6], c7: votos[7], c8: votos[8], c9: votos[9], c10: votos[10],
	                c11: votos[11], c12: votos[12], c13: votos[13], c14: votos[14]},
			success: function(response){
				$(".menu").hide();
				$(".vota-container").hide();
				$(".final-container").show();
			}
		});
	} else {
		$(".menu").hide();
		$(".erro-container").show();			
	}
});

$("#erro-voltar").on("click", function() {
	$(".erro-container").hide();
	$(".menu").show();
	paginador(categoria);
});

$(".menu ul li").on("click", function() {
	categoria = parseInt($(this).text(), 10);
	paginador(categoria);
});

$("#avanca").on("click", function() {
	if($(".candidatos ul").find(".escolhido").length) {
		paginador(categoria + 1);
		categoria += 1;
	} else {
		$(".erro-container").show();
		$(".menu").hide();
	}
});

$("#volta").on("click", function() {
    if (categoria != 1) {
        categoria -= 1;
        paginador(categoria);
    }
})

$("#comecar").on("click", function() {
	window.location.href = "http://mdemulher.abril.com.br/especial/premio-contigo-2015";
});