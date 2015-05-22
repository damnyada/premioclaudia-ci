$(".candidato").on("click", function() {
    $(".coracao").css("background", "url('../assets/premioclaudia/img/coracao-vermelho.svg')");
});

$(document).ready(function(){
    $('.coracao').on('click', function(){
        $(this).addClass('animated bounceIn');
    });
});
