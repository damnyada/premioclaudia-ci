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

        $.ajax({
            type : 'post',
            dataType : 'json',
            url : '/pclaudia/envia',
            data : {categoria: categoriasCod[categoriaAtual-1], voto: votos[categoriaAtual-1]},
            success: function(response){
                console.log("OK");
            }
        });

    }

    function armazenaVoto(categoriaAtual) {
        votos[categoriaAtual - 1] = $(".candidatos-wrapper").find(".escolhido").attr("data-voto");
    }

    function paginador(categoriaAtual) {
        $(".categoria").load("pagina?categoria="+categoriaAtual+" .categoria-wrapper", function() {
            $(".candidatos-wrapper").find(".candidato[data-voto='"+votos[categoriaAtual-1]+"']").addClass("escolhido").children(".coracao").addClass("vermelho");
        });

    }

    paginador(categoriaAtual);

    $('.categoria').on('click', ".candidato", escolheCandidato);

    $('.catIndex').on('click', function() {
        categoriaAtual = parseInt($(this).text(), 10);
        paginador(categoriaAtual);

        $(".catIndex").removeClass("active");
        $(".index").find(".catIndex:contains('"+categoriaAtual+"')").addClass("active");
    });
});


