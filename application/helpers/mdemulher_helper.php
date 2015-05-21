<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

function insertImage ($i=null,$a='') {
 	if($i) echo "<img src=\"".urlAsset()."$i\" alt=\"$a\" title=\"$a\" />";
}

function urlAssets() {
	return "http://static.mdemulher.abril.com.br/mobile/";
}

function urlPortal() {
	return "http://mdemulher.abril.com.br/";
}

function urlMobile() {
	return "http://m.mdemulher.abril.com.br/";
}

function printObj($obj) {
	echo "<pre>";
	print_r($obj);
	echo "</pre>";
}

function transformURL($urlIn) {
	if(substr($urlIn, 0, 1)=='/') $urlIn =  UrlPortal() . substr($urlIn, 1);
	$urlMat = explode('/', $urlIn);
	if(isset($urlMat[4]) && $urlMat[4]=='reportagem') {
		$ret = urlMobile().$urlMat[3].'/'.str_replace('.shtml', '', $urlMat[6]);
	} else $ret = $urlIn;
	return $ret;
}

function addPath($urlIn) {
	if(substr($urlIn, 0, 1)=='/') {
		$ret = urlPortal().$urlIn;
	} else $ret = $urlIn;
	return $ret;
}

function urlMobileToClassic($url,$subcanal=""){
	
	$paths = explode('/',$url);
	
	if (count($paths) == 3) {
		$out = urlPortal().$paths[1].'/reportagem/'.$subcanal.'/'.$paths[2].'.shtml?versao=classico';
	} else {
		$out = urlPortal().$url.'?versao=classico';
	}
	
	return $out;
}

function uptadeLinks($texto) {
	
	$ret = $texto;
	
	// separando links da matéria
	$r = '/<a.*?href="([^"]*)?".*?>/';
	preg_match_all($r,$ret,$matches);
	
	foreach($matches[1] as $key => $m) {
		// procurando links de /reportagem/ e trocando por links do mobile.
		if (strrpos($m,'/reportagem/') != false && strrpos($m,'http://mdemulher.abril') != false) {
			$m2 = str_replace('http://mdemulher.abril','http://m.mdemulher.abril',$m);
			$ret = str_replace($m,$m2,$ret);
		}
	}
	
	return $ret;
	
}


function urlRedirect($old,$new,$canal) {
	$headers = 	'From: admin@cloud.mdemulher.info' . "\r\n" .
	    		'Reply-To: admin@cloud.mdemulher.info' . "\r\n" .
	    		'X-Mailer: PHP/' . phpversion();
			$to = "felipe.hardt@abril.com.br, adriano.dias@abril.com.br, edaraujo@abril.com.br";
			$subject = "[Cloud] Materia redirecionada ativa";
			$body = "Ids com erros\n\r--------------\n\r";
			$body .= "Canal ".$canal." Codigo antigo ".$old." Novo ".$new."\n\r--------------\n\r";
			mail($to, $subject, $body, $headers);
			echo "Provavel Problema de Redirect... <br/>Antigo ".$old." Novo ".$new."<br/><br/>";
}

//NORMALIZA URL

function utf8_uri_encode( $utf8_string, $length = 0 ) {
        $unicode = '';
        $values = array();
        $num_octets = 1;
        $unicode_length = 0;
 
        $string_length = strlen( $utf8_string );
        for ($i = 0; $i < $string_length; $i++ ) {
 
                $value = ord( $utf8_string[ $i ] );
 
                if ( $value < 128 ) {
                        if ( $length && ( $unicode_length >= $length ) )
                                break;
                        $unicode .= chr($value);
                        $unicode_length++;
                } else {
                        if ( count( $values ) == 0 ) $num_octets = ( $value < 224 ) ? 2 : 3;
 
                        $values[] = $value;
 
                        if ( $length && ( $unicode_length + ($num_octets * 3) ) > $length )
                                break;
                        if ( count( $values ) == $num_octets ) {
                                if ($num_octets == 3) {
                                        $unicode .= '%' . dechex($values[0]) . '%' . dechex($values[1]) . '%' . dechex($values[2]);
                                        $unicode_length += 9;
                                } else {
                                        $unicode .= '%' . dechex($values[0]) . '%' . dechex($values[1]);
                                        $unicode_length += 6;
                                }
 
                                $values = array();
                                $num_octets = 1;
                        }
                }
        }
 
        return $unicode;
}


function seems_utf8($str) {
        $length = strlen($str);
        for ($i=0; $i < $length; $i++) {
                $c = ord($str[$i]);
                if ($c < 0x80) $n = 0; # 0bbbbbbb
                elseif (($c & 0xE0) == 0xC0) $n=1; # 110bbbbb
                elseif (($c & 0xF0) == 0xE0) $n=2; # 1110bbbb
                elseif (($c & 0xF8) == 0xF0) $n=3; # 11110bbb
                elseif (($c & 0xFC) == 0xF8) $n=4; # 111110bb
                elseif (($c & 0xFE) == 0xFC) $n=5; # 1111110b
                else return false; # Does not match any model
                for ($j=0; $j<$n; $j++) { # n bytes matching 10bbbbbb follow ?
                        if ((++$i == $length) || ((ord($str[$i]) & 0xC0) != 0x80))
                                return false;
                }
        }
        return true;
}


function remove_accents($string) {
        if ( !preg_match('/[\x80-\xff]/', $string) )
                return $string;
 
        if (seems_utf8($string)) {
                $chars = array(
                // Decompositions for Latin-1 Supplement
                chr(195).chr(128) => 'A', chr(195).chr(129) => 'A',
                chr(195).chr(130) => 'A', chr(195).chr(131) => 'A',
                chr(195).chr(132) => 'A', chr(195).chr(133) => 'A',
                chr(195).chr(135) => 'C', chr(195).chr(136) => 'E',
                chr(195).chr(137) => 'E', chr(195).chr(138) => 'E',
                chr(195).chr(139) => 'E', chr(195).chr(140) => 'I',
                chr(195).chr(141) => 'I', chr(195).chr(142) => 'I',
                chr(195).chr(143) => 'I', chr(195).chr(145) => 'N',
                chr(195).chr(146) => 'O', chr(195).chr(147) => 'O',
                chr(195).chr(148) => 'O', chr(195).chr(149) => 'O',
                chr(195).chr(150) => 'O', chr(195).chr(153) => 'U',
                chr(195).chr(154) => 'U', chr(195).chr(155) => 'U',
                chr(195).chr(156) => 'U', chr(195).chr(157) => 'Y',
                chr(195).chr(159) => 's', chr(195).chr(160) => 'a',
                chr(195).chr(161) => 'a', chr(195).chr(162) => 'a',
                chr(195).chr(163) => 'a', chr(195).chr(164) => 'a',
                chr(195).chr(165) => 'a', chr(195).chr(167) => 'c',
                chr(195).chr(168) => 'e', chr(195).chr(169) => 'e',
                chr(195).chr(170) => 'e', chr(195).chr(171) => 'e',
                chr(195).chr(172) => 'i', chr(195).chr(173) => 'i',
                chr(195).chr(174) => 'i', chr(195).chr(175) => 'i',
                chr(195).chr(177) => 'n', chr(195).chr(178) => 'o',
                chr(195).chr(179) => 'o', chr(195).chr(180) => 'o',
                chr(195).chr(181) => 'o', chr(195).chr(182) => 'o',
                chr(195).chr(182) => 'o', chr(195).chr(185) => 'u',
                chr(195).chr(186) => 'u', chr(195).chr(187) => 'u',
                chr(195).chr(188) => 'u', chr(195).chr(189) => 'y',
                chr(195).chr(191) => 'y',
                // Decompositions for Latin Extended-A
                chr(196).chr(128) => 'A', chr(196).chr(129) => 'a',
                chr(196).chr(130) => 'A', chr(196).chr(131) => 'a',
                chr(196).chr(132) => 'A', chr(196).chr(133) => 'a',
                chr(196).chr(134) => 'C', chr(196).chr(135) => 'c',
                chr(196).chr(136) => 'C', chr(196).chr(137) => 'c',
                chr(196).chr(138) => 'C', chr(196).chr(139) => 'c',
                chr(196).chr(140) => 'C', chr(196).chr(141) => 'c',
                chr(196).chr(142) => 'D', chr(196).chr(143) => 'd',
                chr(196).chr(144) => 'D', chr(196).chr(145) => 'd',
                chr(196).chr(146) => 'E', chr(196).chr(147) => 'e',
                chr(196).chr(148) => 'E', chr(196).chr(149) => 'e',
                chr(196).chr(150) => 'E', chr(196).chr(151) => 'e',
                chr(196).chr(152) => 'E', chr(196).chr(153) => 'e',
                chr(196).chr(154) => 'E', chr(196).chr(155) => 'e',
                chr(196).chr(156) => 'G', chr(196).chr(157) => 'g',
                chr(196).chr(158) => 'G', chr(196).chr(159) => 'g',
                chr(196).chr(160) => 'G', chr(196).chr(161) => 'g',
                chr(196).chr(162) => 'G', chr(196).chr(163) => 'g',
                chr(196).chr(164) => 'H', chr(196).chr(165) => 'h',
                chr(196).chr(166) => 'H', chr(196).chr(167) => 'h',
                chr(196).chr(168) => 'I', chr(196).chr(169) => 'i',
                chr(196).chr(170) => 'I', chr(196).chr(171) => 'i',
                chr(196).chr(172) => 'I', chr(196).chr(173) => 'i',
                chr(196).chr(174) => 'I', chr(196).chr(175) => 'i',
                chr(196).chr(176) => 'I', chr(196).chr(177) => 'i',
                chr(196).chr(178) => 'IJ',chr(196).chr(179) => 'ij',
                chr(196).chr(180) => 'J', chr(196).chr(181) => 'j',
                chr(196).chr(182) => 'K', chr(196).chr(183) => 'k',
                chr(196).chr(184) => 'k', chr(196).chr(185) => 'L',
                chr(196).chr(186) => 'l', chr(196).chr(187) => 'L',
                chr(196).chr(188) => 'l', chr(196).chr(189) => 'L',
                chr(196).chr(190) => 'l', chr(196).chr(191) => 'L',
                chr(197).chr(128) => 'l', chr(197).chr(129) => 'L',
                chr(197).chr(130) => 'l', chr(197).chr(131) => 'N',
                chr(197).chr(132) => 'n', chr(197).chr(133) => 'N',
                chr(197).chr(134) => 'n', chr(197).chr(135) => 'N',
                chr(197).chr(136) => 'n', chr(197).chr(137) => 'N',
                chr(197).chr(138) => 'n', chr(197).chr(139) => 'N',
                chr(197).chr(140) => 'O', chr(197).chr(141) => 'o',
                chr(197).chr(142) => 'O', chr(197).chr(143) => 'o',
                chr(197).chr(144) => 'O', chr(197).chr(145) => 'o',
                chr(197).chr(146) => 'OE',chr(197).chr(147) => 'oe',
                chr(197).chr(148) => 'R',chr(197).chr(149) => 'r',
                chr(197).chr(150) => 'R',chr(197).chr(151) => 'r',
                chr(197).chr(152) => 'R',chr(197).chr(153) => 'r',
                chr(197).chr(154) => 'S',chr(197).chr(155) => 's',
                chr(197).chr(156) => 'S',chr(197).chr(157) => 's',
                chr(197).chr(158) => 'S',chr(197).chr(159) => 's',
                chr(197).chr(160) => 'S', chr(197).chr(161) => 's',
                chr(197).chr(162) => 'T', chr(197).chr(163) => 't',
                chr(197).chr(164) => 'T', chr(197).chr(165) => 't',
                chr(197).chr(166) => 'T', chr(197).chr(167) => 't',
                chr(197).chr(168) => 'U', chr(197).chr(169) => 'u',
                chr(197).chr(170) => 'U', chr(197).chr(171) => 'u',
                chr(197).chr(172) => 'U', chr(197).chr(173) => 'u',
                chr(197).chr(174) => 'U', chr(197).chr(175) => 'u',
                chr(197).chr(176) => 'U', chr(197).chr(177) => 'u',
                chr(197).chr(178) => 'U', chr(197).chr(179) => 'u',
                chr(197).chr(180) => 'W', chr(197).chr(181) => 'w',
                chr(197).chr(182) => 'Y', chr(197).chr(183) => 'y',
                chr(197).chr(184) => 'Y', chr(197).chr(185) => 'Z',
                chr(197).chr(186) => 'z', chr(197).chr(187) => 'Z',
                chr(197).chr(188) => 'z', chr(197).chr(189) => 'Z',
                chr(197).chr(190) => 'z', chr(197).chr(191) => 's',
                // Euro Sign
                chr(226).chr(130).chr(172) => 'E',
                // GBP (Pound) Sign
                chr(194).chr(163) => '');
 
                $string = strtr($string, $chars);
        } else {
                // Assume ISO-8859-1 if not UTF-8
                $chars['in'] = chr(128).chr(131).chr(138).chr(142).chr(154).chr(158)
                        .chr(159).chr(162).chr(165).chr(181).chr(192).chr(193).chr(194)
                        .chr(195).chr(196).chr(197).chr(199).chr(200).chr(201).chr(202)
                        .chr(203).chr(204).chr(205).chr(206).chr(207).chr(209).chr(210)
                        .chr(211).chr(212).chr(213).chr(214).chr(216).chr(217).chr(218)
                        .chr(219).chr(220).chr(221).chr(224).chr(225).chr(226).chr(227)
                        .chr(228).chr(229).chr(231).chr(232).chr(233).chr(234).chr(235)
                        .chr(236).chr(237).chr(238).chr(239).chr(241).chr(242).chr(243)
                        .chr(244).chr(245).chr(246).chr(248).chr(249).chr(250).chr(251)
                        .chr(252).chr(253).chr(255);
 
                $chars['out'] = "EfSZszYcYuAAAAAACEEEEIIIINOOOOOOUUUUYaaaaaaceeeeiiiinoooooouuuuyy";
 
                $string = strtr($string, $chars['in'], $chars['out']);
                $double_chars['in'] = array(chr(140), chr(156), chr(198), chr(208), chr(222), chr(223), chr(230), chr(240), chr(254));
                $double_chars['out'] = array('OE', 'oe', 'AE', 'DH', 'TH', 'ss', 'ae', 'dh', 'th');
                $string = str_replace($double_chars['in'], $double_chars['out'], $string);
        }
 
        return $string;
}



function normaliza($string){
	$title = strip_tags($string);
        // Preserve escaped octets.
        $title = preg_replace('|%([a-fA-F0-9][a-fA-F0-9])|', '---$1---', $title);
        // Remove percent signs that are not part of an octet.
        $title = str_replace('%', '', $title);
        // Restore octets.
        $title = preg_replace('|---([a-fA-F0-9][a-fA-F0-9])---|', '%$1', $title);
 
        $title = remove_accents($title);
        if (seems_utf8($title)) {
                if (function_exists('mb_strtolower')) {
                        $title = mb_strtolower($title, 'UTF-8');
                }
                $title = utf8_uri_encode($title, 200);
        }
 
        $title = strtolower($title);
        $title = preg_replace('/&.+?;/', '', $title); // kill entities
        $title = str_replace('.', '-', $title);
        $title = preg_replace('/[^%a-z0-9 _-]/', '', $title);
        $title = preg_replace('/\s+/', '-', $title);
        $title = preg_replace('|-+|', '-', $title);
        $title = trim($title, '-');
 
        return $title;
}

function cp1252_to_utf8($str) {
    $cp1252_map = array ("\xc2\x80" => "\xe2\x82\xac", 
            "\xc2\x82" => "\xe2\x80\x9a", 
            "\xc2\x83" => "\xc6\x92",     
            "\xc2\x84" => "\xe2\x80\x9e", 
            "\xc2\x85" => "\xe2\x80\xa6", 
            "\xc2\x86" => "\xe2\x80\xa0", 
            "\xc2\x87" => "\xe2\x80\xa1", 
            "\xc2\x88" => "\xcb\x86",
            "\xc2\x89" => "\xe2\x80\xb0",
            "\xc2\x8a" => "\xc5\xa0", 
            "\xc2\x8b" => "\xe2\x80\xb9",
            "\xc2\x8c" => "\xc5\x92", 
            "\xc2\x8e" => "\xc5\xbd", 
            "\xc2\x91" => "\xe2\x80\x98",
            "\xc2\x92" => "\xe2\x80\x99",
            "\xc2\x93" => "\xe2\x80\x9c", 
            "\xc2\x94" => "\xe2\x80\x9d",
            "\xc2\x95" => "\xe2\x80\xa2", 
            "\xc2\x96" => "\xe2\x80\x93", 
            "\xc2\x97" => "\xe2\x80\x94", 

            "\xc2\x98" => "\xcb\x9c",
            "\xc2\x99" => "\xe2\x84\xa2",
            "\xc2\x9a" => "\xc5\xa1", 
            "\xc2\x9b" => "\xe2\x80\xba",
            "\xc2\x9c" => "\xc5\x93", 
            "\xc2\x9e" => "\xc5\xbe", 
            "\xc2\x9f" => "\xc5\xb8"
        );
    return strtr (  ( $str ), $cp1252_map );
}

function normaliza_rss($string){
    //arruma formatacao
    $string = cp1252_to_utf8( $string );
    $string = preg_replace('/&(?![a-z#]+;)/i','&amp;',$string);

    //remove style tag
    $pattern[] = '|style="[^"]*"|';
    $pattern[] = '|<style\b[^>]*>(.*?)</style>|s';

    //remove script tag
    $pattern[] = '|<script\b[^>]*>(.*?)</script>|s';


    $string = preg_replace($pattern, "", $string);


    //coloca iframe dentro do figure
    $string = preg_replace('|(<iframe\b[^>]*>(.*?)</iframe>)|s', "<figure>$1</figure>", $string);


    return $string;
}
?>