$(document).ready(function(){
    $('.candidato').on('click', function(){
        $('.coracao').removeClass('animated bounceIn');
        $(this).children(".coracao").css("background", "url('../assets/premioclaudia/img/coracao-vermelho.svg') no-repeat center / contain");
        $(this).addClass('animated bounceIn');
    });
});
