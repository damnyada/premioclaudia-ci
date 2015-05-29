var categoriasLiberadas = 2;
var votos = new Array(categoriasLiberadas);
var categoria = 1;

function escolheCandidato() {
    $('.coracao').removeClass('vermelho animated bounceIn');
    $(this).children(".coracao").addClass('vermelho animated bounceIn');

    $('.candidato').removeClass('escolhido');
    $(this).addClass('escolhido');

    armazenaVoto(categoria);
}

function armazenaVoto(categoria) {
    votos[categoria - 1] = $(".candidatos-wrapper").find(".escolhido").attr("data-voto");
}

function paginador(categoria) {
    $(".categoria").load("pagina?categoria="+categoria+" .categoria-wrapper", function() {
        $(".candidatos-wrapper").find(".candidato[data-voto='"+votos[categoria-1]+"']").addClass("escolhido").children(".coracao").addClass("vermelho");
    });

}

$(document).ready(function(){

    paginador(categoria);

    $('.categoria').on('click', ".candidato", escolheCandidato);

    $('.catIndex').on('click', function() {
        categoria = parseInt($(this).text(), 10);
        paginador(categoria);

        $(".catIndex").removeClass("active");
        $(".index").find(".catIndex:contains('"+categoria+"')").addClass("active");
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


