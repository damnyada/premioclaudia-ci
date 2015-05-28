uAgent = navigator.userAgent.toLowerCase();
function detectaDevice(uAgent,v){
    if(uAgent.indexOf('android') !== -1){
        device = 'android';
        efeito_left = 'swipeleft';
        efeito_right = 'swiperight';
        if(v){versaoAndroid(uAgent);}
    }else if(uAgent.indexOf('ipod') !== -1 || uAgent.indexOf('iphone') !== -1 || uAgent.indexOf('ipad') !== -1){
        device = 'ios';
        efeito_left = 'swipeleft';
        efeito_right = 'swiperight';
    }else{
        device = '';
        efeito_left = 'dragleft';
        efeito_right = 'dragright';
    }
}
function comparaVersao(a){
    match = a.match(/android (\d+(?:\.\d+)+)[;)]/);
    if(match){
        v1 = match[1];
        v2 = '4.0.0';
        var v1parts = v1.split('.');
        var v2parts = v2.split('.');
        for(i=0;i<v1parts.length;++i){
            if(v2parts.length == i){
                return true;
            }
            if(v1parts[i] == v2parts[i]){
                continue;
            }
            else if(v1parts[i] > v2parts[i]){
                return true;
            }else{
                return false;
            }
        }
        if(v1parts.length != v2parts.length){
            return false;
        }
        return false
    }else{
        efeito_left = 'swipeleft';
        efeito_right = 'swiperight';
        return true
    }
}

detectaDevice(uAgent);

if(device=='android'){
    if(comparaVersao(uAgent)==false){
        android = 'old';
        x = document.getElementById('logo_mdemulher').getElementsByTagName('img')[0];
        if(typeof x !== 'undefined'){
            y = x.src;
            z = y.substring(0,y.length - 3) + 'png';
            x.src = z;
        }

        if(((document.location).toString()).indexOf('/revista/') != -1){
            x = document.getElementById('logo_revista').getElementsByTagName('img')[0];
            y = x.src;
            z = y.substring(0,y.length - 3) + 'png';
            x.src = z;
        }
        css = document.createElement("link");
        css.setAttribute('rel','stylesheet');
        css.setAttribute('type','text/css');
        css.setAttribute('href','http://static.mdemulher.abril.com.br/mobi/css/android_old.css');
        document.getElementsByTagName("head")[0].appendChild(css);
    }
}

//** verificacao de imagens quebradas **//
//** substitui por imagem default gif **//
function checkImage(src,elm){
    var img = new Image();
    img.onerror = function() {
        if(typeof elm !== 'undefined'){elm.src = 'http://static.mdemulher.abril.com.br/mobi/images/placeholder_mobile_620x372.gif';}
        else{return 'http://static.mdemulher.abril.com.br/mobi/images/placeholder_mobile_620x372.gif';}

        parentElement = elm.parentNode;
        if(parentElement.className == 'auxiliar'){
            parentElement.style.height = '89%';
            elm.style.marginLeft = '-5.5%';
        }
    };
    img.src = src;
}

if(document.getElementById('box_lista_conteudo')){
    x = document.getElementById('box_lista_conteudo').getElementsByTagName('img');
    for(i=0;i<x.length;i++){
        checkImage(x[i].getAttribute("src"),x[i]);
    }
};

busca_aberto = 0;
menu_aberto = 0;
x = '';
altura_item = 0;

    window.onload=function(){
        alertas = document.getElementsByClassName('box_alert_wrapper');
        for (i=0;i<alertas.length;i++) {
            alertas[i].style.opacity = '1';
        }
    }

function fechaALerta(obj){
    obj.parentNode.style.maxHeight = '0';
    obj.parentNode.style.marginTop = '0';
    obj.parentNode.parentNode.style.marginTop = '0';
    obj.parentNode.parentNode.style.maxHeight = '0';
    obj.parentNode.parentNode.parentNode.style.opacity = '0';
}
function abreMenu(event){
    event.preventDefault();
    m = $('#menu');
    if(menu_aberto==0){
        //compensa_top = window.pageYOffset || document.documentElement.scrollTop;
        //document.getElementsByTagName('body')[0].style.position = 'fixed';
        //document.getElementsByTagName('body')[0].style.top = -Math.abs(compensa_top) + 'px';
        //document.getElementById('header').style.top = 0;
        //document.getElementById('spacer_dummy').style.marginTop = '6.4%';
        if(busca_aberto==1){abreBusca(event);}
        m.animate({'left':'-20px'}, 200);
        menu_aberto = 1;
    }else{
        //document.getElementById('header').style.top = 0;
        //document.getElementById('spacer_dummy').style.marginTop = '15.5%';
        //document.getElementsByTagName('body')[0].style.position = 'static';
        //window.scrollTo(0,compensa_top)

        m.animate({'left':'-700px'}, 200);;
        // document.getElementById('move_conteudo').className = '';
        menu_aberto = 0;
        setTimeout(function(){
            document.getElementById('menu').scrollTop = 0;
        },501);
    }
}
function abreBusca(event){
    event.preventDefault();
    b = document.getElementById('busca');
    if(busca_aberto==0){
        if(menu_aberto==1){abreMenu(event);}
        b.className = b.className + 'aberto';
        busca_aberto = 1;
    }else{
        b.className = '';
        busca_aberto = 0;
    }
}
function focoBusca(texto){
    x = document.forms['busca']['query'].value;
    if(x==texto){
        document.forms['busca']['query'].value = '';
    }
}
function blurBusca(texto){
    x = document.forms['busca']['query'].value;
    if(x==''){
        document.forms['busca']['query'].value = texto;
    }
}
function limpaBusca(texto){
        document.forms['busca']['query'].value = texto;
}

// Valor do ponteiro 'inicio' deve ser o mesmo numero que a hash chamadas traz (codeigniter)
inicio = 20;

var pagina_blog = 0;
function maisblogs(filtro,pagina){
    pagina = parseInt(pagina_blog) + parseInt(pagina);
    item = document.getElementById('box_lista_conteudo').getElementsByClassName("mais");
    if(item.length>0){
        variavel = 0;
        for(i=0;i<3;i++){
            variavel++;
            if(item[0]){
                item[0].className = 'box_chamada_wrapper';
            }else{
                document.getElementById('mais_noticias').style.display = 'none';
            }
        }
        if(variavel<3){
            document.getElementById('mais_noticias').style.display = 'none';
        }
        var http = new XMLHttpRequest();
        var url = urlBase+urlBlog+'/mais-posts/page/'+pagina+'/';
        var params = 'filter='+filtro;
        http.open("GET", url+"?"+params, true);
        http.onreadystatechange = function(){
            if(http.readyState == 4 && http.status == 200 && http.responseText!=0){
                respostaHTTP = http.responseText;
                document.getElementById('box_lista_conteudo').insertAdjacentHTML('beforeend',respostaHTTP);
            }else if(http.readyState == 4 && http.status == 200 && http.responseText==0){

            }
        }
        http.send(null);
        pagina_blog++;
    }else{
        document.getElementById('mais_noticias').style.display = 'none';
    }
}

function maisNoticiasOutro(){
    links = document.getElementById('box_lista_conteudo').getElementsByTagName("a");
    for(i=0;i<links.length;i++){
        links[i].onclick = function(){
            return(false);
        }
    }
    setTimeout(function(){
        for(i=0;i<links.length;i++){
            links[i].onclick = function(){};
        }
    },601);
    for(i=0;i<6;i++){
        item = document.getElementById('box_lista_conteudo').getElementsByClassName("mais")[0];
        if(item){
            item.className = 'lista_wrapper';
        }else{
            if(document.getElementById('load_lista')==null){
                document.getElementById('mais_noticias').innerHTML = '';
            }
        }
    }
}

function maisNoticias(t,f,o,n){
    links = document.getElementById('box_lista_conteudo').getElementsByTagName("a");
    for(i=0;i<links.length;i++){
        links[i].onclick = function(){
            return(false);
        }
    }
    setTimeout(function(){
        for(i=0;i<links.length;i++){
            links[i].onclick = function(){};
        }
    },601);
    for(i=0;i<n;i++){
        item = document.getElementById('box_lista_conteudo').getElementsByClassName("mais")[0];
        if(item){
            item.className = 'box_chamada_wrapper';
            if(i==n-1){
                if(document.getElementById('box_lista_conteudo').getElementsByClassName("mais").length<=n){
                    maisNoticiasRequest(t,f,inicio,n,0);
                }
            }
        }else{
            if(document.getElementById('load_lista')==null){
                document.getElementById('box_lista_conteudo').insertAdjacentHTML('beforeend','<div class="box_chamada_wrapper" id="load_lista"><img src="http://static.mdemulher.abril.com.br/mobi/images/loading.gif" style="display: block; margin: 10% auto;"></div>');
            }
            maisNoticiasRequest(t,f,inicio,n,1);
            break;
        }
    }

    x = document.getElementById('box_lista_conteudo').getElementsByTagName('img');
    if(typeof x !== 'undefined'){
        for(i=0;i<x.length;i++){
            checkImage(x[i].getAttribute("src"),x[i]);
        }
    };

}
function maisNoticiasRequest(t,f,o,n,z){
    var http = new XMLHttpRequest();
    var url = '/api';
    var params = 't='+t+'&f='+f+'&i='+o+'&n='+n;

    var http = new XMLHttpRequest();
    var url = '/api';
    var params = 't='+t+'&f='+f+'&i='+o+'&n='+n;
    http.open("GET", url+"?"+params, true);
    http.onreadystatechange = function() {
        if(http.readyState == 4 && http.status == 200){
            respostaHTTP = http.responseText;
            resposta = JSON.parse(respostaHTTP);
            if(z==1){
                document.getElementById('load_lista').parentNode.removeChild(document.getElementById('load_lista'));
            }
            for(var i=0;i<resposta.length;i++){
                var obj = resposta[i];
                if(t=='b'){
                    data_parser = obj['data_pub'].split('-');
                    data_ok = data_parser[2].substring(0,2) +'/'+data_parser[1]+'/'+data_parser[0];
                    novo_item = '<div class="box_chamada_wrapper mais"><div class="lista_magic"></div><a href="'+obj['url']+'"><img src="'+obj['imagem']+'" /><div class="lista_blogs"><span class="link">'+obj['blog_titulo']+'</span> | <span>'+data_ok+'</span></div><h2 class="lista_blogs">'+obj['titulo']+'</h2></a></div>';
                    document.getElementById('box_lista_conteudo').insertAdjacentHTML('beforeend',novo_item);
                    if(z==1){
                        item = document.getElementById('box_lista_conteudo').getElementsByClassName("mais")[0];
                        item.className = 'box_chamada_wrapper';
                    }
                }else{
                    console.log(obj['marcacao']);
                    if(obj['marcacao']!='' && obj['marcacao']!=null){
                        marcacao = '<div class="apresentado_wrapper"><div>apresentado por <strong>'+obj['marcacao']+'</strong></div><img src="http://static.mdemulher.abril.com.br/mobi/images/apresentado-borda.png" /></div>';
                    }else{
                        marcacao = '';
                    }
                    //checkImage(x[i].getAttribute("src"),x[i]);

                    if(obj['cod_conteudo']>999999){
                        novo_item = '<div class="box_chamada_wrapper mais"><a class="box_chamada" href="'+obj['url_mobile']+'">'+marcacao+'<h2>'+obj['titulo']+'</h2><p>'+obj['olho']+'</p><img src="http://mdemulher.abril.com.br/sites/mdemulher/files/styles/opa_gallery_item_vertical_horizontal/public/core/'+obj['imagem']+'" alt="'+obj['imagem_alt']+'"/></a></div>';
                    }else{
                        novo_item = '<div class="box_chamada_wrapper mais"><a class="box_chamada" href="'+obj['url_mobile']+'">'+marcacao+'<h2>'+obj['titulo']+'</h2><p>'+obj['olho']+'</p><img src="http://mdemulher.abril.com.br/sites/mdemulher/files/styles/retangular_horizontal_2/public/migracao/'+obj['imagem']+'" alt="'+obj['imagem_alt']+'"/></a></div>';
                    }

                    document.getElementById('box_lista_conteudo').insertAdjacentHTML('beforeend',novo_item);
                    if(z==1){
                        item = document.getElementById('box_lista_conteudo').getElementsByClassName("mais")[0];
                        item.className = 'box_chamada_wrapper';
                    }
                }
                inicio++;
            }
        }else if(http.readyState == 4 && http.status == 200 && http.responseText == '[]'){
            document.getElementById('mais_noticias').style.display = 'none';
            document.getElementById('load_lista').parentNode.removeChild(document.getElementById('load_lista'));
        }else if(http.readyState == 4 && http.status != 200){
            document.getElementById('load_lista').parentNode.removeChild(document.getElementById('load_lista'));
            document.getElementById('box_lista_conteudo').insertAdjacentHTML('beforeend','<div class="box_chamada_wrapper"><p style="display: block; margin: 10% auto;">erro: tente novamente :)</p></div>');
        }
    }
    http.send(null);
}
/** busca relacionadas para conteudos **/
/** busca relacionadas para conteudos **/
function buscaRelacionadas(query,size,start,canal){
    n = 6
    if(typeof canal==='undefined'){
        canal = 0;
    }
    start_busca = start_aws;
    links = document.getElementById('box_lista_conteudo').getElementsByTagName("a");
    for(i=0;i<links.length;i++){
        links[i].onclick = function(){
            return(false);
        }
    }
    setTimeout(function(){
        for(i=0;i<links.length;i++){
            links[i].onclick = function(){};
        }
    },601);
    for(i=0;i<n;i++){
        item = document.getElementById('box_lista_conteudo').getElementsByClassName("mais")[0];
        if(item){
            item.className = 'lista_wrapper';
            if(i==n-1){
                if(document.getElementById('box_lista_conteudo').getElementsByClassName("mais").length<=n){
                    buscaMaisRelacionadas(query,start_busca,canal,0);
                }
            }
        }else{
            if(document.getElementById('load_lista')==null){
                document.getElementById('box_lista_conteudo').insertAdjacentHTML('beforeend','<div class="lista_wrapper" id="load_lista"><img src="http://static.mdemulher.abril.com.br/mobi/images/loading.gif" style="display: block; margin: 10% auto;"></div>');
            }
            document.getElementById('mais_noticias').style.display = 'none';
            buscaMaisRelacionadas(query,start_busca,canal,1);
            break;
        }
    }
    item = document.getElementById('box_lista_conteudo').getElementsByClassName("mais")[0];
    if(!item){
        document.getElementById('mais_noticias').style.display = 'none';
    }
    x = document.getElementById('box_lista_conteudo').getElementsByTagName('img');
    if(typeof x !== 'undefined'){
        for(i=0;i<x.length;i++){
            checkImage(x[i].getAttribute("src"),x[i]);
        }
    };
}
function buscaMaisRelacionadas(q,start_busca,canal,z){
    var http = new XMLHttpRequest();
    var url = '/relacionadas';
    var params = 'q='+q+'&size=6&start='+start_busca+'&canal='+canal+'&output=json';
    http.open('GET', url+'?'+params, true);
    http.onreadystatechange = function(){
        if(http.readyState == 4 && http.status == 200 && http.responseText != '[]'){
            respostaHTTP = http.responseText;
            resposta = JSON.parse(respostaHTTP);

            if(z==1){document.getElementById('load_lista').parentNode.removeChild(document.getElementById('load_lista'));}
            for(var i=0;i<resposta.length;i++){
                var obj = resposta[i];

                if(parseInt(obj['cod_conteudo'])>parseInt(999999)){
                    novo_item = '<div class="lista_wrapper mais"><div class="lista_magic"></div><a href="'+obj['url_mobile']+'"><div class="auxiliar"><img src="'+'http://mdemulher.abril.com.br/sites/mdemulher/files/styles/opa_gallery_item_vertical_horizontal/public/core/'+obj['imagem']+'" /></div><h2>'+obj['titulo']+'</h2><div class="separador"></div></a></div>';
                }else{
                    if(parseInt(obj['cod_conteudo'])<parseInt(680000)){novo_item = '<div class="lista_wrapper mais"><div class="lista_magic"></div><a href="'+obj['url_mobile']+'"><div class="auxiliar"><img src="'+'http://mdemulher.abril.com.br/sites/mdemulher/files/styles/retangular_horizontal_2/public/migracao/'+obj['imagem']+'" /></div><h2>'+obj['titulo']+'</h2><div class="separador"></div></a></div>';}
                    else{novo_item = '<div class="lista_wrapper mais"><div class="lista_magic"></div><a href="'+obj['url_mobile']+'"><img src="http://mdemulher.abril.com.br/sites/mdemulher/files/styles/retangular_horizontal_2/public/migracao/'+obj['imagem']+'" /><h2>'+obj['titulo']+'</h2><div class="separador"></div></a></div>';}
                }
                document.getElementById('box_lista_conteudo').insertAdjacentHTML('beforeend',novo_item);
                if(z==1){
                    item = document.getElementById('box_lista_conteudo').getElementsByClassName("mais")[0];
                    item.className = 'lista_wrapper';
                }
                start_aws++;
            }
        }else if(http.readyState == 4 && http.status == 200){
            document.getElementById('mais_noticias').style.display = 'none';
            document.getElementById('load_lista').parentNode.removeChild(document.getElementById('load_lista'));
        }else if(http.readyState == 4 && http.status != 200){
            document.getElementById('box_lista_conteudo').insertAdjacentHTML('beforeend','<div class="lista_wrapper"><p style="display: block; margin: 10% auto;">erro: tente novamente :)</p></div>');
        }
    }
    http.send(null);
}

//***** busca e mais resultados de busca *****//
//***** busca e mais resultados de busca *****//
start_busca = 18;
start_aws = 18;
function buscaResultados(query,size,start,canal){
    n = 6
    if(typeof canal==='undefined'){
        canal = 0;
    }
    start_busca = start_aws;
    links = document.getElementById('box_lista_conteudo').getElementsByTagName("a");
    for(i=0;i<links.length;i++){
        links[i].onclick = function(){
            return(false);
        }
    }
    setTimeout(function(){
        for(i=0;i<links.length;i++){
            links[i].onclick = function(){};
        }
    },601);
    for(i=0;i<n;i++){
        item = document.getElementById('box_lista_conteudo').getElementsByClassName("mais")[0];
        if(item){
            item.className = 'lista_wrapper';
            if(i==n-1){
                if(document.getElementById('box_lista_conteudo').getElementsByClassName("mais").length<=n){
                    buscaMaisResultados(query,start_busca,canal,0);
                }
            }
        }else{
            if(document.getElementById('load_lista')==null){
                document.getElementById('box_lista_conteudo').insertAdjacentHTML('beforeend','<div class="lista_wrapper" id="load_lista"><img src="http://static.mdemulher.abril.com.br/mobi/images/loading.gif" style="display: block; margin: 10% auto;"></div>');
            }
            document.getElementById('mais_noticias').style.display = 'none';
            buscaMaisResultados(query,start_busca,canal,1);
            break;
        }
    }
    item = document.getElementById('box_lista_conteudo').getElementsByClassName("mais")[0];
    if(!item){
        document.getElementById('mais_noticias').style.display = 'none';
    }
    x = document.getElementById('box_lista_conteudo').getElementsByTagName('img');
    if(typeof x !== 'undefined'){
        for(i=0;i<x.length;i++){
            checkImage(x[i].getAttribute("src"),x[i]);
        }
    };
}
function buscaMaisResultados(q,start_busca,canal,z){
    var http = new XMLHttpRequest();
    var url = '/busca';
    var params = 'q='+q+'&size=6&start='+start_busca+'&canal='+canal+'&output=json';
    http.open('GET', url+'?'+params, true);
    http.onreadystatechange = function(){
        if(http.readyState == 4 && http.status == 200 && http.responseText != '[]'){
            respostaHTTP = http.responseText;
            resposta = JSON.parse(respostaHTTP);

            if(z==1){document.getElementById('load_lista').parentNode.removeChild(document.getElementById('load_lista'));}
            for(var i=0;i<resposta['hits']['hit'].length;i++){
                var obj = resposta['hits']['hit'][i];

                if(parseInt(obj['cod_conteudo'])>parseInt(999999)){
                    novo_item = '<div class="lista_wrapper mais"><div class="lista_magic"></div><a href="'+obj['data']['url_mobile'][0]+'"><div class="auxiliar"><img src="'+'http://mdemulher.abril.com.br/sites/mdemulher/files/styles/opa_gallery_item_vertical_horizontal/public/core/'+obj['data']['imagem'][0]+'" /></div><h2>'+obj['data']['titulo'][0]+'</h2><div class="separador"></div></a></div>';
                }else{
                    if(parseInt(obj['id'])<parseInt(680000)){novo_item = '<div class="lista_wrapper mais"><div class="lista_magic"></div><a href="'+obj['data']['url_mobile'][0]+'"><div class="auxiliar"><img src="'+'http://mdemulher.abril.com.br/sites/mdemulher/files/styles/retangular_horizontal_2/public/migracao/'+obj['data']['imagem'][0]+'" /></div><h2>'+obj['data']['titulo'][0]+'</h2><div class="separador"></div></a></div>';}
                    else{novo_item = '<div class="lista_wrapper mais"><div class="lista_magic"></div><a href="'+obj['data']['url_mobile'][0]+'"><img src="http://mdemulher.abril.com.br/sites/mdemulher/files/styles/retangular_horizontal_2/public/migracao/'+obj['data']['imagem'][0]+'" /><h2>'+obj['data']['titulo'][0]+'</h2><div class="separador"></div></a></div>';}
                }
                document.getElementById('box_lista_conteudo').insertAdjacentHTML('beforeend',novo_item);
                if(z==1){
                    item = document.getElementById('box_lista_conteudo').getElementsByClassName("mais")[0];
                    item.className = 'lista_wrapper';
                }
                start_aws++;
            }
        }else if(http.readyState == 4 && http.status == 200){
            document.getElementById('mais_noticias').style.display = 'none';
            document.getElementById('load_lista').parentNode.removeChild(document.getElementById('load_lista'));
        }else if(http.readyState == 4 && http.status != 200){
            document.getElementById('box_lista_conteudo').insertAdjacentHTML('beforeend','<div class="lista_wrapper"><p style="display: block; margin: 10% auto;">erro: tente novamente :)</p></div>');
        }
    }
    http.send(null);
}
//***** busca e mais resultados de busca *****//
//***** busca e mais resultados de busca *****//


function maisReceitas(t,f,o,n){
    links = document.getElementById('box_lista_conteudo').getElementsByTagName("a");
    for(i=0;i<links.length;i++){
        links[i].onclick = function(){
            return(false);
        }
    }
    setTimeout(function(){
        for(i=0;i<links.length;i++){
            links[i].onclick = function(){};
        }
    },601);
    for(i=0;i<n;i++){
        item = document.getElementById('box_lista_conteudo').getElementsByClassName("mais")[0];
        if(item){
            item.className = 'lista_wrapper';
            if(i==n-1){
                if(document.getElementById('box_lista_conteudo').getElementsByClassName("mais").length<=n){
                    maisReceitasRequest(t,f,inicio,n,0);
                }
            }
        }else{
            if(document.getElementById('load_lista')==null){
                document.getElementById('box_lista_conteudo').insertAdjacentHTML('beforeend','<div class="lista_wrapper" id="load_lista"><img src="http://static.mdemulher.abril.com.br/mobi/images/loading.gif" style="display: block; margin: 10% auto;"></div>');
            }
            maisReceitasRequest(t,f,inicio,n,1);
            break;
        }
    }

    x = document.getElementById('box_lista_conteudo').getElementsByTagName('img');

}
function maisReceitasRequest(t,f,o,n,z){
    var http = new XMLHttpRequest();
    var url = '/api';
    var params = 't='+t+'&f='+f+'&i='+o+'&n='+n;
    http.open("GET", url+"?"+params, true);
    http.onreadystatechange = function() {
        if(http.readyState == 4 && http.status == 200){
            respostaHTTP = http.responseText;
            resposta = JSON.parse(respostaHTTP);
            if(z==1){
                document.getElementById('load_lista').parentNode.removeChild(document.getElementById('load_lista'));
            }
            for(var i=0;i<resposta.length;i++){
                var obj = resposta[i];
                checkImage(x[i].getAttribute("src"),x[i]);
                novo_item = '<div class="lista_wrapper mais"><div class="lista_magic"></div><a href="'+obj['url_mobile']+'"><img src="http://mdemulher.abril.com.br/sites/mdemulher/files/styles/retangular_horizontal_2/public/migracao/'+obj['imagem']+'" /><h2>'+obj['titulo']+'</h2><div class="separador"></div></a></div>';
                document.getElementById('box_lista_conteudo').insertAdjacentHTML('beforeend',novo_item);
                if(z==1){
                    item = document.getElementById('box_lista_conteudo').getElementsByClassName("mais")[0];
                    item.className = 'box_chamada_wrapper';
                }

                inicio++;
            }
        }else if(http.readyState == 4 && http.status == 200 && http.responseText == '[]'){
            document.getElementById('mais_noticias').style.display = 'none';
            document.getElementById('load_lista').parentNode.removeChild(document.getElementById('load_lista'));
        }else if(http.readyState == 4 && http.status != 200){
            document.getElementById('load_lista').parentNode.removeChild(document.getElementById('load_lista'));
            document.getElementById('box_lista_conteudo').insertAdjacentHTML('beforeend','<div class="box_chamada_wrapper"><p style="display: block; margin: 10% auto;">erro: tente novamente :)</p></div>');
        }
    }
    http.send(null);
}




//** ACCORDION **//
//** Utilizado em /culinaria, /blogs **//
function accordionAbreFecha(){
    if(typeof accordionAberto==='undefined' || accordionAberto==0){
        node = document.getElementById('accordion_top');
        valor = node.offsetTop;
        var top = 0;
        while(node){
            if(node.tagName){
                top = top + node.offsetTop;
                node = node.offsetParent;
            }else{
                node = node.parentNode;
            }
        }
        window.scrollTo(0,(top-60));

        accordionAltura = parseInt(document.getElementById('accordion_top').offsetHeight);
        accordionAlturaInicial = accordionAltura;
        parent = document.getElementsByClassName('parent');
        for(i=0;i<parent.length;i++){
            accordionAltura = accordionAltura + parseInt(parent[i].offsetHeight);
        }
        setTimeout(function(){
            document.getElementById('accordion_wrapper').style.height = accordionAltura + 'px';
        },160);
        accordionAberto = 1;
    }else{
        document.getElementById('accordion_wrapper').style.height = accordionAlturaInicial + 'px';
        if(typeof b!=='undefined'){
            b.parentNode.style.height = accordionAlturaInicial + 'px';
        }
        parentAberto = 0;
        accordionAberto = 0;
    }
}
function parentDinamica(a){
    links = document.getElementById('accordion_container').getElementsByTagName("a");
    for(i=0;i<links.length;i++){
        links[i].onclick = function(){
            return(false);
        }
    }
    setTimeout(function(){
        for(i=0;i<links.length;i++){
            links[i].onclick = function(){};
        }
    },401);

    x = document.getElementById('accordion_wrapper');
    a = a.parentNode;
    if(typeof parentAberto==='undefined' || parentAberto==0){
        b = a;
        parentAbreFecha(a);
        parentAberto = 1;
    }else if(a==b){
        x.style.height = x.offsetHeight - parentAltura + b.offsetHeight + 'px';
        a.parentNode.style.height = accordionAlturaInicial + 'px';
        parentAberto = 0;
    }else if(a!=b){
        x.style.height = (x.offsetHeight + parentAltura) - b.parentNode.style.height;
        b.parentNode.style.height = accordionAlturaInicial + 'px';
        parentAbreFecha(a);
        b = a;
    }
}

function parentAbreFecha(a){
    parentAltura = parseInt(a.offsetHeight);
    child = a.getElementsByClassName('child');
    for(i=0;i<child.length;i++){
        parentAltura = parentAltura + parseInt(child[i].offsetHeight);
    }

    x.style.height = accordionAltura + parentAltura - accordionAlturaInicial + 'px';
    a.parentNode.style.height = parentAltura + 'px';
}

calendario_aberto = 0;
function abreCalendario(){
    if(calendario_aberto==0){
        document.getElementById('calendario').className = 'aberto';
        document.getElementById('mes').className = 'aberto';
        calendario_aberto = 1;
    }else if(calendario_aberto==1){
        document.getElementById('calendario').className = '';
        document.getElementById('mes').className = '';
        calendario_aberto = 0;
    }
}
function filtraCalendario(dia){
    dia_semana = document.getElementsByClassName('resumo_item');
    dia_selecionado = document.getElementsByClassName(dia);

    for(i=0;i<dia_semana.length;i++){
        dia_semana[i].style.opacity = '0';
        dia_semana[i].style.zIndex = '1';
    }
    setTimeout(function(){
        for(i=0;i<dia_semana.length;i++){
            dia_semana[i].style.height = '0';
        }
        for(i=0;i<dia_selecionado.length;i++){
            dia_selecionado[i].style.height = 'auto';
            dia_selecionado[i].style.opacity = '1';
            dia_selecionado[i].style.zIndex = '2';
        }
    },401);
}
function alteraMesCalendario(direcao){
    posicao_left = document.getElementById('strip_mes_atual').offsetLeft;
    if(direcao==0){
        nova_posicao_left = parseInt(posicao_left) + 191;
    }
    else if(direcao==1){
        nova_posicao_left = parseInt(posicao_left) - 191;
    }
    document.getElementById('strip_mes_atual').style.left = nova_posicao_left + 'px';
}

function montaGaleria(){
    if(typeof start_galeria !== 'undefined'){
        itens_galeria = document.getElementsByClassName('galeria_item');
        largura_galeria = 100 * itens_galeria.length;
        largura_item = 100 / itens_galeria.length
        total_itens_galeria = itens_galeria.length

        document.getElementById('galeria_strip').style.width = largura_galeria + '%';

        for(i=0;i<itens_galeria.length;i++){
            itens_galeria[i].style.width = largura_item + '%';
        }
        if(typeof android === 'undefined'){
            document.getElementById('galeria_strip').className = 'galeria_animate';
        }
        galeria_left = parseInt(document.getElementById('galeria_strip').offsetLeft);
    }

    if(document.getElementById('box_lista_conteudo')){
        x = document.getElementById('box_lista_conteudo').getElementsByTagName('img');
        for(i=0;i<x.length;i++){
            checkImage(x[i].getAttribute("src"),x[i]);
        }
    };

    if(document.getElementById('galeria_strip')){
        x = document.getElementById('galeria_strip').getElementsByTagName('img');
        for(i=0;i<x.length;i++){
            checkImage(x[i].getAttribute("src"),x[i]);
        }
    }

    if(document.getElementById('tvflash')){
        x = document.getElementById('tvflash').getElementsByTagName('img');
        for(i=0;i<x.length;i++){
            checkImage(x[i].getAttribute("src"),x[i]);
        }
    }

}

galeria_item_atual = 1;
procede = 1;
function galeriaNavega(itens,direcao){
    itens_galeria = itens;
    galeria_left = parseInt(document.getElementById('galeria_strip').offsetLeft);
    if(direcao==0 && procede==1){
        if(galeria_item_atual>1){
            //pageTracker._trackPageview();
            _abrMetrics.callHit()
            procede = 0;
            galeria_item_atual--;
            document.getElementById('galeria_strip').style.left = -Math.abs((galeria_item_atual * 100) - 100) + '%';
            document.getElementById('item_atual').innerHTML = galeria_item_atual;
            setTimeout(function(){procede = 1;},601);
        }
    }
    else if(direcao==1 && procede==1){
        if(galeria_item_atual<itens_galeria){
            //pageTracker._trackPageview();
            _abrMetrics.callHit()
            procede = 0;
            galeria_item_atual++;
            document.getElementById('galeria_strip').style.left = -Math.abs((galeria_item_atual * 100) - 100) + '%';
            document.getElementById('item_atual').innerHTML = galeria_item_atual;
            setTimeout(function(){procede = 1;},601);
        }
    }
}

if(typeof start_galeria !== 'undefined'){
    var hammertime = Hammer(document.getElementById('galeria_wrapper'));

    hammertime.on(efeito_left,function(ev){
        if(galeria_item_atual<total_itens_galeria){
            //pageTracker._trackPageview();
            _abrMetrics.callHit()
            galeria_item_atual++;
            document.getElementById('galeria_strip').style.left = -Math.abs((galeria_item_atual * 100) - 100) + '%';
            document.getElementById('item_atual').innerHTML = galeria_item_atual;
        }
        ev.stopPropagation();
        ev.preventDefault();
    });

    hammertime.on(efeito_right,function(ev){
        if(galeria_item_atual>=2){
            //pageTracker._trackPageview();
            _abrMetrics.callHit()
            galeria_item_atual--;
            document.getElementById('galeria_strip').style.left = -Math.abs((galeria_item_atual * 100) - 100) + '%';
            document.getElementById('item_atual').innerHTML = galeria_item_atual;
        }
        ev.stopPropagation();
        ev.preventDefault();
    });
}

function getElementPosition(id){
    var offsetTrail = document.getElementById(id);
    var offsetTop = 0;
    while (offsetTrail){
        offsetTop += offsetTrail.offsetTop;
        offsetTrail = offsetTrail.offsetParent;
    }
    window.scroll(0,offsetTop);
}

function votaReceitaX(codconteudo,canal,categoria,rate){
    if(typeof votacao === 'undefined'){
        votacao = 1;
        rating = document.getElementsByClassName('rate');
        for(i=0;i<rating.length;i++){
            var regex = /([^\/]+)$/;
            rating[i].src = rating[i].src.replace(regex, 'estrela-cinza.png');
        }
        for(i=0;i<rate;i++){
            y = rating.length - 1 - i;
            var regex = /([^\/]+)$/;
            rating[y].src = rating[y].src.replace(regex, 'estrela-verde.png');
        }

        var http = new XMLHttpRequest();
        var url = 'http://d.mdemulher.abril.com.br/voto/index.php/receitas/';
        var params = 'codconteudo='+codconteudo+'&canal='+canal+'&categoria='+categoria+'&rating='+rate+'&url='+document.location;
        http.open("GET", url+"?"+params, true);
        http.onreadystatechange = function() {
            if(http.readyState == 4){}
        }
        http.send(null);
    }
}


function siteVersao(){
    document.getElementById('botao_site_versao').className = 'desliza';
    window.location = "http://mdemulher.abril.com.br"+urlDesktop+((urlDesktop.search("\\?")>-1)?"&":"?")+"mobile=classic";
}

montaGaleria();

//**  tvflash  **//
left_atual = 1;
if(typeof start_tvflash !== 'undefined'){
    var hammertime = Hammer(document.getElementById('tvflash'));
    hammertime.on(efeito_left,function(ev){
        if(left_atual<itens_tvflash){
            bullets = document.getElementById('tvflash_status').getElementsByTagName('img');
            for(i=0;i<bullets.length;i++){
                if(i==left_atual){
                    var regex = /([^\/]+)$/;
                    bullets[i].src = bullets[i].src.replace(regex, 'tvflash_on.gif');
                }else{
                    var regex = /([^\/]+)$/;
                    bullets[i].src = bullets[i].src.replace(regex, 'tvflash_off.gif');
                }
            }
            left_atual++;
            document.getElementById('tvflash_strip').className = 'left-' + left_atual;
        }
        ev.stopPropagation();
    });
    hammertime.on(efeito_right,function(ev){
        if(left_atual>=2){
            left_atual--;
            bullets = document.getElementById('tvflash_status').getElementsByTagName('img');
            for(i=0;i<bullets.length;i++){
                if(i==left_atual-1){
                    var regex = /([^\/]+)$/;
                    bullets[i].src = bullets[i].src.replace(regex, 'tvflash_on.gif');
                }else{
                    var regex = /([^\/]+)$/;
                    bullets[i].src = bullets[i].src.replace(regex, 'tvflash_off.gif');
                }
            }
            document.getElementById('tvflash_strip').className = 'left-' + left_atual;
        }
        ev.stopPropagation();
    });

}

function tvflashBullet(left){
    left_atual = left;
    document.getElementById('tvflash_strip').className = 'left-' + left;
    bullets = document.getElementById('tvflash_status').getElementsByTagName('img');
    for(i=0;i<bullets.length;i++){
        if(i==left_atual-1){
            var regex = /([^\/]+)$/;
            bullets[i].src = bullets[i].src.replace(regex, 'tvflash_on.gif');
        }else{
            var regex = /([^\/]+)$/;
            bullets[i].src = bullets[i].src.replace(regex, 'tvflash_off.gif');
        }
    }
}

function enviaBusca(){
    query_busca = document.getElementById('texto_busca').value;

    url = document.URL;
    regex = /(blogs)+/i;
    blog = url.match(regex);

    if(query_busca!=''){
        if(blog){
            window.location = urlBase+urlBlog+'/?s='+query_busca;
        }else{
            window.location = 'http://'+window.location.host+'/busca?q='+query_busca;
        }
    }
    return false;
}

/** Swipe para abrir e fechar menu lateral
var body_total = document.getElementsByTagName('body');
var hammertimeMenu = Hammer(body_total[0]);
hammertimeMenu.on(efeito_right,function(ev){
    if(menu_aberto==0){
        abreMenu(event);
        ev.stopPropagation();
        ev.preventDefault();
    }
});
hammertimeMenu.on(efeito_left,function(ev){
    if(menu_aberto==1){
        abreMenu(event);
        ev.stopPropagation();
        ev.preventDefault();
    }
});
** Swipe para abrir e fechar menu lateral **/

//** resumo de novelas **//
var modificador_mes = 0;
var calendario_aberto = 0;
function abreCalend(){
    if(calendario_aberto==0){
        document.getElementById('mes').className = 'aberto';
        if((before==-Math.abs(4) && totaldays==31) || (before==-Math.abs(5) && totaldays>=30)){document.getElementById('calendario').style.height = 338 + 'px'}
        else{document.getElementById('calendario').style.height = 298 + 'px'}
        calendario_aberto = 1;
    }else if(calendario_aberto==1){
        document.getElementById('calendario').style.height = 40 + 'px';
        document.getElementById('calendario').className = '';
        document.getElementById('mes').className = '';
        calendario_aberto = 0;
    }
}
function novelaMes(d,num){
    t = setTimeout(function(){
        document.getElementById('dias').style.opacity = 0.2;
        document.getElementById('carrega_calendario').style.display = 'block';
    },800);
    var http = new XMLHttpRequest();
    var url = '/novelas';
    var params = 'd='+d;
    http.open('GET',url+'?'+params,true);
    http.onreadystatechange = function(){
        if(http.readyState == 4 && http.status == 200 && http.responseText != '[]'){
            clearTimeout(t);
            if(num==0) modificador_mes--;
            else modificador_mes++;
            respostaHTTP = http.responseText;
            resposta = JSON.parse(respostaHTTP);
            for(w=0;w<resposta.length;w++){
                obj = resposta[w];
                h[obj['data_capitulo'].toString().replace(/-/g,'')] = w;
            }
            var y = new Date().getFullYear();
            var m = new Date().getMonth();
            calendario = new calendar(m,y,0);
            calendario.render();
        }
    }
    http.send(null);
}
function calendar(month,year,aberto){
    var monthstr = ['Janeiro','Fevereiro','MarÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â§o','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
    var firstday = new Date(year,month+modificador_mes,1).getDay();
    var lastday = new Date(year,month+modificador_mes+1,0).getDay();
    var totaldays = new Date(year,month+modificador_mes+1,0).getDate();
    var mes = new Date(year,month+modificador_mes,1).getMonth();
    var ano = new Date(year,month+modificador_mes,1).getFullYear();
    var outarr = [];

    var createHeader = function(){
        outarr.push('<div id="semanas"><div id="calendario_ico" onclick="abreCalend();"><img src="http://static.mdemulher.abril.com.br/mobi/images/calendario-icon.svg" /></div>');
        if(aberto==0){
            outarr.push('<div id="mes" class="aberto">');
        }else{
            outarr.push('<div id="mes">');
        }

        aMes = '' + parseInt(1 + new Date(year,month+modificador_mes,0).getMonth());
        if (aMes.length < 2) aMes = '0' + aMes;
        aAno = new Date(year,month+modificador_mes,0).getFullYear();
        pMes = '' + parseInt(1 + new Date(year,month+modificador_mes+2,0).getMonth());
        if (pMes.length < 2) pMes = '0' + pMes;
        pAno = new Date(year,month+modificador_mes+2,0).getFullYear();
        proximoMes = pAno +'-'+ pMes;
        anteriorMes = aAno +'-'+ aMes;
        outarr.push('<div class="img" onclick="novelaMes(\''+anteriorMes+'\',0);"><img src="http://static.mdemulher.abril.com.br/mobi/images/resumo-novela-seta-left.gif" /></div>');
        outarr.push('<div id="mes_atual">'+monthstr[mes]+' '+ano+'</div>');
        if(modificador_mes<0){
            outarr.push('<div class="img" onclick="novelaMes(\''+proximoMes+'\',1);"><img src="http://static.mdemulher.abril.com.br/mobi/images/resumo-novela-seta-right.gif" /></div>');
        }
        outarr.push('</div>');
        outarr.push(semana_ativa);
        outarr.push('</div>');
    }
    var createDays = function(){

        //before define o numero de dias que o mes anterior 'invade' no calendario deste mes
        //ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â© exatamente isto que cria os espaÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â§os em branco na respectiva coluna de dia da semana
        //fazendo com que o dia 1 do mes atual fique na coluna correta de dia da semana
        before = (-1 * firstday)+2;

        //after define quantos dias do prÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â³ximo mes 'vazam' para este mes
        //ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â© isto que fecha o cÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡lculo para a iteraÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â§ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â£o que criarÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡ o calendÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡rio do mÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Âªs atual
        after = (6 - lastday)+totaldays;

        outarr.push('<div id="carrega_calendario"><img src="http://static.mdemulher.abril.com.br/mobi/images/tcfloading.gif" /></div>');
        outarr.push('<div id="dias"><div><div class="texto">SEG</div><div class="texto">TER</div><div class="texto">QUA</div><div class="texto">QUI</div><div class="texto">SEX</div><div class="texto">SAB</div><div class="texto">DOM</div></div><div>');
        if(before==2){before = -5}
        if(calendario_aberto==1){
            if((before==-Math.abs(4) && totaldays==31) || (before==-Math.abs(5) && totaldays>=30)){document.getElementById('calendario').style.height = 338 + 'px'}
            else{document.getElementById('calendario').style.height = 298 + 'px'}
        }

        //contagem para quebra de linha
        var y=0;

        month_c = parseInt(month + modificador_mes + 1) + '';
        month_d = parseInt(month + modificador_mes) + '';
        year_beta = new Date(year,month_d,1).getFullYear();
        month_beta = new Date(year,month_c,1).getMonth();
        month_beta = month_beta + '';
        if (month_beta.length < 2) month_beta = '0' + month_beta;
        if (month_beta == '00') month_beta = '12';

        //iteraÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â§ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â£o que monta o calendario com os dias do mÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Âªs atual
        for(var i=before; i<=after; i++){

            //com base na iteracao, monta os dias deste mes
            //a iteracao pode muito bem comecar com numeros negativos, indicando serem dias do mes anterior
            var Day = new Date(year, month, i,0,0,0,0);
            day = Day.getUTCDate() + '';
            if (day.length < 2) day_lead = '0' + day;
            else day_lead = day;
            link_dia = String(year_beta)+'-'+String(month_beta)+'-'+String(day_lead)+ '';
            este_dia = link_dia.toString().replace(/-/g,'');

            //quebra de linha no calendario
            if(y>0 && (y%7)==0){
                outarr.push('</div><div>');
            }
            //se a iteracao for igual ou superior a 1 E menor ou igual ao total de dias neste mÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Âªs
            //significa que ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â© um dia vÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡lido do mÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Âªs atual
            if(i>=1 && i<=totaldays){

                if(typeof(h[este_dia])!='undefined'){
                    //forca numero apagado para domingos que eventualmente possuem resumo de novela (erro editorial)
                    if(y>0 && ((y+1)%7)==0){
                        outarr.push('<a class="numero apagado">'+day+'</a>');
                    }else{
                        outarr.push('<a href="/resumo-novelas/'+link_dia+'" class="numero">'+day+'</a>');
                    }
                }else{
                    outarr.push('<a class="numero apagado">'+day+'</a>');
                }
            }else if(i<=totaldays){
                outarr.push('<a href="#" class="numero"></a>');
            }
            y++;
        }
        outarr.push('</div></div>');
        outarr.push('</div>');
    }
    this.render = function(){
      createHeader();
      createDays();
      document.getElementById('calendario').innerHTML = outarr.join('');
    }
}
if(typeof start_calendario !== 'undefined'){
    var y = new Date().getFullYear();
    var m = new Date().getMonth();
    calendario = new calendar(m,y);
    calendario.render();
}
