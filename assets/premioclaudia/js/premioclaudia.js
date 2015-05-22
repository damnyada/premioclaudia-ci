$(document).ready(function(){
    $('.candidato').on('click', function(){
        $('.coracao').removeClass('animated bounceIn');
        $('.coracao').css("background", "url('../assets/premioclaudia/img/coracao-preto.svg') no-repeat center / contain");
        $(this).children(".coracao").css("background", "url('../assets/premioclaudia/img/coracao-vermelho.svg') no-repeat center / contain");
        $(this).children(".coracao").addClass('animated bounceIn');
    });
});
