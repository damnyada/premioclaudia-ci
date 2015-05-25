var categoriasLiberadas = 2;
var votos = new Array(categoriasLiberadas);
var categoria = 1;

function escolheCandidato() {
    $('.coracao').removeClass('animated bounceIn');
    $('.coracao').css("background", "url('../assets/premioclaudia/img/coracao-preto.svg') no-repeat center / contain");
    $(this).children(".coracao").css("background", "url('../assets/premioclaudia/img/coracao-vermelho.svg') no-repeat center / contain");
    $(this).children(".coracao").addClass('animated bounceIn');

    $('.candidato').removeClass('escolhido');
    $(this).addClass('escolhido');

    armazenaVoto(categoria);
}

function armazenaVoto(categoria) {
    votos[categoria - 1] = $(".candidatos-wrapper").find(".escolhido").attr("data-voto");
}

function paginador() {
	categoria = parseInt($(this).text(), 10);
//    console.log("categoria " + categoria);
}

$(document).ready(function(){
    $('.candidato').on('click', escolheCandidato);
    $('.idle').on('click', paginador);

    $("#logo").on('click', function() {

        $.ajax({
            type : 'post',
            dataType : 'json',
            url : '/pclaudia/envia',
            data : {c1: votos[1]},
            success: function(response){
                console.log("OK");
            }
        });
    });
});


