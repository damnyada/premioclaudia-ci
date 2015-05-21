var categoria = 1;
var aviso = 0;
var totalCategorias = 7;

$("#captchaVotos").submit(function(e){       
	e.preventDefault();
	//terminarEnquete();
	validateForm();
});

function captchaVotos(){
	$(".categoria_container").removeClass("ativo");
	$("#categoria_4").addClass("ativo");
}

function terminarEnquete(){
	var votos = new Array();
	votos[0] = 'votos';
	var naoVotados = new Array();
	for(var i=1; i<=totalCategorias; i++){
		if( $('#categoria_'+i+' ul li.ativo').length ){
			votos[i] = $('#categoria_' + i + ' ul li.ativo').attr("data-voto");
		}else{
			votos[i] = '0';
			naoVotados.push(i);
		}
	}

	if(naoVotados.length == 0){
		$(".botao_votar").css('display','none');
		$("#captchadiv").css('display','none');
		$(".botao_votando").css('display','block');
		enviarVotos(votos);
	}else{
		var variasCategorias = "";
		if(naoVotados.length > 1){
			variasCategorias = "s";
		}
		$(".erro_nao_votou").text("É necessário votar em todas as categorias. Você não votou na" + variasCategorias + " seguinte" + variasCategorias + " categoria" + variasCategorias + ": ");
		Recaptcha.reload();
		for(var i=0; i < naoVotados.length; i++){
			if(i>0){
				$(".erro_nao_votou").text($(".erro_nao_votou").text() + ", ");
			}
			$(".erro_nao_votou").text($(".erro_nao_votou").text() + naoVotados[i]);
			
			if(i == naoVotados.length - 1){
				$(".erro_nao_votou").text($(".erro_nao_votou").text() + ".");
			}
		}
		$(".erro_nao_votou").css("display","block");
		Recaptcha.reload();
	}
}

function enviarVotos(votosCod){
	$.ajax({
		type : 'post',
		dataType : 'json',
		url : '/premiosaude/e/envia',
		data : {c1:votosCod[1],c2:votosCod[2],c3:votosCod[3]},
		success: function(response){
			if(response.resp=='yep'){
				$(".botao_votando").css('display','none');
				$(".categoria_container").removeClass("ativo");
				$("#final_votacao").addClass("ativo");
				$(".nav").css("display","none");
			} else {
				$(".botao_votando").css('display','none');
				$(".categoria_container").removeClass("ativo");
				$("#final_votacao").addClass("ativo");
				$(".nav").css("display","none");
			}
		}
	});
}

function enviarVotoUnico(categoria, participante){
	console.log("categoria: " + categoria + "\n222participante: " + participante);
	$.ajax({
		type : 'post',
		dataType : 'json',
		url : '/premiosaude/e/envia',
		data : {cat:categoria,voto:participante},
		success: function(response){
			if(response.resp=='yep'){
				console.log("yep");
				/*
				$(".botao_votando").css('display','none');
				$(".categoria_container").removeClass("ativo");
				$("#final_votacao").addClass("ativo");
				$(".nav").css("display","none");
				*/
			} else {
				console.log("nope");
				/*
				$(".botao_votando").css('display','none');
				$(".categoria_container").removeClass("ativo");
				$("#final_votacao").addClass("ativo");
				$(".nav").css("display","none");
				*/
			}
		}
	});
}

function bt_votarClickVoto(categoria, participante){
	enviarVotoUnico(categoria, participante);
	ativaModalVotoFeito();
}

function ativaModalVotoFeito(){
	$avisoContainer = $("#avisoContainer");
    $loadingAviso = $("#loadingAviso");
    $avisoContainerInterno = $("#avisoContainerInterno");
    
    $avisoContainerInterno.hide();
    $loadingAviso.show();
    $avisoContainer.show();

    mostraModal = setTimeout(function(){
      $loadingAviso.hide();
      $avisoContainerInterno.show();
    }, 1000);	
}

function fechaAviso(){
	$avisoContainer = $("#avisoContainer");
    $avisoContainer.hide();
}

(function(){
	/*
	$('span.lista_categorias_numero').click(function(){
		categoria = parseInt($(this).attr('data-categoria'));
		if(categoria!=4){
			irParaCategoria(categoria);
		}
		verificaSetas(categoria);
		$(".lista_categorias_numero").removeClass("ativo");
		$('[data-categoria="'+categoria+'"]').addClass("ativo");
		$(".segundo").css("display","block");
		if(aviso==1){$(".aviso_container").css("display","block");}
		aviso = 0;
	});
	*/
	/*
	var mudandoCategoria = false;
	$('.categoria_container ul li').click(function(){
		if(!mudandoCategoria){
			mudandoCategoria = true;
			$('#categoria_'+categoria+' ul li').removeClass("ativo");
			$(this).addClass("ativo");

			$('#categoria_'+categoria+' ul li').children(".check_selecionado").css({display:"none", opacity:"0"});
			$( this ).children(".check_selecionado").css("display","block");
			
			var codigoCategoriaVotada = $(this).parent("ul").attr("data-categoria");;
			var codigoParticipanteVotado = $(this).attr("data-voto");

			console.log("categoria: " + codigoCategoriaVotada + "\nparticipante: " + codigoParticipanteVotado);

			$( this ).children(".check_selecionado").animate({
			    opacity: 1
			  }, 500, function() {
			  	if(aviso==1){$(".aviso_container").css("display","block");}
				aviso = 0;
			    if(categoria < totalCategorias){
					categoria++;		
					$(".lista_categorias_numero").removeClass("ativo");
					$('[data-categoria="'+categoria+'"]').addClass("ativo");
					$(".segundo").css("display","block");
					irParaCategoria(categoria);
					verificaSetas(categoria);
					mudandoCategoria = false;
				}else{
					categoria++;
					$(".lista_categorias_numero").removeClass("ativo");
					$(".segundo").css("display","none");
					captchaVotos();
					mudandoCategoria = false;

				}
			});
		}
	});
	*/

	$modalBotaoOk = $("#modalBotaoOk");
	$modalBotaoOk.click(fechaAviso);

	$modalVotarNovamente = $("#modalVotarNovamente");
	$modalVotarNovamente.click(fechaAviso);

	$('.titulo_categoria_completo').click( function(){
		if(!$(this).next('ul').hasClass('aberto')){

			$('.titulo_categoria_completo').removeClass('ativo');
			$('.titulo_categoria_completo').next().removeClass('aberto').slideUp();
			
			$(this).addClass('ativo');
			$(this).next('ul').addClass('aberto').slideDown();
		}else {
			$(this).removeClass('ativo');
			$(this).next().removeClass('aberto').slideUp();
		}		
	});

	$(".bt_votar").click(function(){
		var codigoCategoriaVotada = $(this).parents("ul").attr("data-categoria");;
		var codigoParticipanteVotado = $(this).parents("li").attr("data-voto");
		bt_votarClickVoto(codigoCategoriaVotada, codigoParticipanteVotado)
	});

})();