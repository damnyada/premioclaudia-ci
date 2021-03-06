<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

$route['default_controller'] = 'votecontigo';
//$route['404_override'] = 'votepc/error';


//Prêmio Claudia 2015
$route['premio-claudia'] = 'premioclaudia/introClaudia';
$route['premio-claudia/votacao-2015'] = 'premioclaudia/votaClaudia';
$route['premio-claudia/obrigado'] = 'premioclaudia/obrigadoClaudia';
$route['premio-claudia/resultado'] = 'premioclaudia/resultadoClaudia';
$route['pclaudia/pagina'] = 'premioclaudia/catDesktop';
$route['pclaudia/envia'] = 'premioclaudia/envia';

// Prêmio CONTIGO! de TV 2015
$route['premiocontigo/vote'] = 'votecontigo/voteDesktop';
$route['premiocontigo/mobile'] = 'votecontigo/voteMobile';
$route['premiocontigo/pagina'] = 'votecontigo/catDesktop';
$route['premiocontigodetv2015/mobile'] = 'votecontigo/voteMobile';
$route['premiocontigodetv2015/pagina'] = 'votecontigo/catDesktop';
$route['e/envia'] = 'votecontigo/envia';

// Prêmio CONTIGO! Música
//$route['desktop/vote'] = 'votepc/voteDesktop';
//$route['mobile/vote'] = 'votepc/voteMobile';
//$route['e/captcha'] = 'votepc/captcha';
//$route['e/envia'] = 'votepc/envia';

//$route['desktop/resultado'] = 'votepc/resultadoDesktop';

// Prêmio SAÚDE
$route['premiosaude/desktop/vote'] = 'voteps/voteDesktop';
$route['premiosaude/mobile/vote'] = 'voteps/voteMobile';
$route['premiosaude/e/vote'] = 'voteps/captcha';
$route['premiosaude/e/envia'] = 'voteps/envia';

// Prêmio NOVA
$route['premionova/desktop/vote'] = 'votepn/voteDesktop';
$route['premionova/mobile/vote'] = 'votepn/voteMobile';
$route['premionova/e/vote'] = 'votepn/captcha';
$route['premionova/e/envia'] = 'votepn/envia';

/* End of file routes.php */
/* Location: ./application/config/routes.php */
