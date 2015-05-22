$(document).ready(function(){
    $('.coracao').on('click', function(){
        $('.coracao').removeClass('animated bounceIn');
        $(this).css("background", "url('../assets/premioclaudia/img/coracao-vermelho.svg') no-repeat center / contain");
        $(this).addClass('animated bounceIn');
    });
});
