var categoria = 1;
var aviso = 0;

function irParaCategoria(cat){
	var id = "#categoria_"+cat;
	$(".categoria_container").removeClass("ativo");
	$("#categoria_"+cat).addClass("ativo");	
	$(".erro_nao_votou").css("display","none");
	window.parent.postMessage('scroll','*');
}

function verificaSetas(cat){
	if(cat==1){
		$('.seta_esq').addClass('seta_cinza_esquerda');
		$('.seta_esq').removeClass('seta_ativa_esquerda');
	}else{
		$('.seta_esq').addClass('seta_ativa_esquerda');
		$('.seta_esq').removeClass('seta_cinza_esquerda');
	}

	if(cat>=3){
		$('.seta_dir').addClass('seta_cinza_direita');
		$('.seta_dir').removeClass('seta_ativa_direita');
	}else{
		$('.seta_dir').addClass('seta_ativa_direita');
		$('.seta_dir').removeClass('seta_cinza_direita');
	}
}

$("#captchaVotos").submit(function(e){       
	e.preventDefault();
	//terminarEnquete();
	validateForm();
});

function captchaVotos(){
	$(".categoria_container").removeClass("ativo");
	$("#categoria_4").addClass("ativo");
}

function validateForm(){
	var challenge = Recaptcha.get_challenge();
	var response = Recaptcha.get_response();

	$.ajax({
	    type: "POST",
	    url: "/e/captcha",
	    data: {
	        challenge: challenge,
	        response: response
	    },
	    success: function(resp) {
	        if(resp == "nope"){
				$('.erro_nao_votou').text('Olá! Você não acertou as letras na ferramenta. Por favor, tente novamente – seus candidatos continuam os mesmos.');
	            $(".erro_nao_votou").css("display","block");
	            Recaptcha.reload();
	            return false;
	        } else {
	        	terminarEnquete();
	           return true;
	        }
	    }
	});
}

function terminarEnquete(){
	var votos = new Array();
	votos[0] = 'votos';
	var naoVotados = new Array();
	for(var i=1; i<=3; i++){
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
		url : '/e/envia',
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

(function(){
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

	var mudandoCategoria = false;
	$('.categoria_container ul li').click(function(){
		if(!mudandoCategoria){
			mudandoCategoria = true;
			$('#categoria_'+categoria+' ul li').removeClass("ativo");
			$(this).addClass("ativo");

			$('#categoria_'+categoria+' ul li').children(".check_selecionado").css({display:"none", opacity:"0"});
			$( this ).children(".check_selecionado").css("display","block");

			$( this ).children(".check_selecionado").animate({
			    opacity: 1
			  }, 500, function() {
			  	if(aviso==1){$(".aviso_container").css("display","block");}
				aviso = 0;
			    if(categoria < 3){
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

	$(document).on("click",".votar",function() {
		$(".lista_categorias_numero").removeClass("ativo");
		$(".segundo").css("display","none");
		categoria = 4;
		captchaVotos();
		mudandoCategoria = false;
		if(aviso==1){$(".aviso_container").css("display","block");}
		aviso = 0;

	});

	$(document).on("click",".seta_ativa_esquerda",function() {
		categoria--;
		irParaCategoria(categoria);
		verificaSetas(categoria);
		$(".lista_categorias_numero").removeClass("ativo");
		$('[data-categoria="'+categoria+'"]').addClass("ativo");
		$(".segundo").css("display","block");
		if(aviso==1){$(".aviso_container").css("display","block");}
		aviso = 0;
	});

	$(document).on("click",".seta_ativa_direita",function() {
		categoria++;
		irParaCategoria(categoria);
		verificaSetas(categoria);
		$(".lista_categorias_numero").removeClass("ativo");
		$('[data-categoria="'+categoria+'"]').addClass("ativo");
		$(".segundo").css("display","block");
		if(aviso==1){$(".aviso_container").css("display","block");}
		aviso = 0;
	});

	$(document).on("click",".fecha_box",function() {
		$(".aviso_container").fadeOut("fast");
		clearTimeout(fechaAviso);
	});

	$(document).on("click",".aviso_container",function() {
		$(".aviso_container").fadeOut("fast");
		clearTimeout(fechaAviso);
	});

	Recaptcha.create("6Lf8J_QSAAAAAC6Uc81IYMu8fQmhK7a_JhhDDC0q",'captchadiv', {
		tabindex: 1,
		theme: "clean",
		callback: Recaptcha.focus_response_field
	});


	setTimeout(function(){
		$(".aviso_container").fadeIn("fast");
	}, 1000);

})();