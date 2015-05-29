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

function paginador(categoria) {
    $(".categoria").load("pagina?categoria="+categoria+" .categoria-wrapper");
    $(".candidatos-wrapper").find(".candidato[data-voto='"+votos[categoria-1]+"']").addClass("escolhido");

    $(".active").removeClass("active").addClass("idle");
//    $(this).removeClass("idle").addClass("active");
}

$(document).ready(function(){

    paginador(categoria);

    $('.categoria').on('click', ".candidato", escolheCandidato);

    $('.idle').on('click', function() {
        categoria = parseInt($(this).text(), 10);
        paginador(categoria);
    });

//    $("#logo").on('click', function() {
//
//        $.ajax({
//            type : 'post',
//            dataType : 'json',
//            url : '/pclaudia/envia',
//            data : {c1: votos[0], c2: votos[1]},
//            success: function(response){
//                console.log("OK");
//            }
//        });
//    });
});


