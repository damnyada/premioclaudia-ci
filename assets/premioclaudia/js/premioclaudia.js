$(document).ready(function(){

    var categoriasCod = ["8887099", "8887102"]
    var categoriasLiberadas = 2;
    var votos = new Array(categoriasLiberadas);

    var categoriaAtual = 1;

    function escolheCandidato() {
        $('.coracao').removeClass('vermelho animated bounceIn');
        $(this).children(".coracao").addClass('vermelho animated bounceIn');

        $('.candidato').removeClass('escolhido');
        $(this).addClass('escolhido');

        armazenaVoto(categoriaAtual);

        setTimeout(function() {
            $(".loader").fadeIn();
            $.ajax({
                type : 'post',
                dataType : 'json',
                url : '/pclaudia/envia',
                data : {categoria: categoriasCod[categoriaAtual-1], voto: votos[categoriaAtual-1]},
                success: function(response){
                    console.log("OK");
                    $(".loader").fadeOut();
                }
            });

            if (categoriaAtual < categoriasLiberadas) {
                categoriaAtual += 1;
                paginador(categoriaAtual);
            } else {
                window.location.assign("/pclaudia/obrigado");
            }

        }, 300);
    }

    function armazenaVoto(categoriaAtual) {
        votos[categoriaAtual - 1] = $(".candidatos-wrapper").find(".escolhido").attr("data-voto");
    }

    function paginador(categoriaAtual) {
        $(".categoria").load("/pclaudia/pagina?categoria="+categoriaAtual+" .categoria-wrapper", function() {
            $(".candidatos-wrapper").find(".candidato[data-voto='"+votos[categoriaAtual-1]+"']").addClass("escolhido").children(".coracao").addClass("vermelho");
        });

        $(".catIndex").removeClass("active");
        $(".index").find(".catIndex:contains('"+categoriaAtual+"')").addClass("active");

    }

    $('.categoria').on('click', ".candidato", escolheCandidato);

    $('.categoria').delegate('.vejaMais', 'click', function(event) {
        event.stopPropagation();
    });

    $('.catIndex').on('click', function() {
        categoriaAtual = parseInt($(this).text(), 10);
        paginador(categoriaAtual);
    });

    paginador(categoriaAtual);

});


