<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

error_reporting(E_ALL);
ini_set('display_errors', 1);

class Votepn extends CI_Controller {
	public function __construct(){
	   	parent::__construct();
	}

	public function index(){

	}

	public function voteDesktop(){
		$this->load->helper('recaptchalib_helper');
		$this->load->view('pn-vote-desktop');
	}

	public function voteMobile(){
		$this->load->helper('recaptchalib_helper');
		$this->load->view('pn-vote-mobile');
	}

	public function envia(){
		if($_POST['cat']){
			$curl_data_connect = json_encode(
			    array(
			            'pdInitiate' => array(
			                'partnerGUID' => '7381bf0e-95f9-f549-9228-00003062052b',
			                "partnerUserID" => "0",
			                "email" => 'felipe.hardt@abril.com.br',
			                "password" => '@K2b3Yd%8$dS@nwBCWQpfedpS'
			            )
			        )
			    );

			$ch = curl_init();
			curl_setopt( $ch, CURLOPT_URL, "https://api.polldaddy.com/" );
			curl_setopt( $ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
			curl_setopt( $ch, CURLOPT_POST, 1 );
			curl_setopt( $ch, CURLOPT_RETURNTRANSFER, 1 );
			curl_setopt( $ch, CURLOPT_POSTFIELDS, $curl_data_connect );
			$data = curl_exec( $ch );
			curl_close( $ch );
			$dt = json_decode( $data );

			$usercode = $dt->pdResponse->userCode;

			$curl_data = '{"pdRequest": {
			    "partnerGUID": "7381bf0e-95f9-f549-9228-00003062052b",
			    "userCode": "'.$usercode.'",
			    "demands": {
			        "demand": {
			            "vote": {
			               "answers_text": "'.$_POST['voto'].'",
			               "other_text": "",
			               "url": "",
			               "ip": "",
			               "tags": {
			                   "tag": {
			                       "name": "email",
			                       "value": "me@polldaddy.com"
			                   }
			               },
			               "poll_id": "'.$_POST['cat'].'",
			               "widget_id": "0",
			               "cookie": "0"
			           },
			           "id": "vote"
			        }
			    }
			}}';

				$ch = curl_init();
				curl_setopt( $ch, CURLOPT_URL, "https://api.polldaddy.com/" );
				curl_setopt( $ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
				curl_setopt( $ch, CURLOPT_POST, 1 );
				curl_setopt( $ch, CURLOPT_RETURNTRANSFER, 1 );
				curl_setopt( $ch, CURLOPT_POSTFIELDS, $curl_data );
				$data = curl_exec( $ch );
				curl_close( $ch );

			echo json_encode(array('resp' => 'yep'));
		}else{
			echo json_encode(array('resp' => 'nope'));
		}
	}

	public function captcha(){
		$this->load->helper('recaptchalib_helper');
		$privatekey = "6Lf8J_QSAAAAABGbJiAdFXk4prJQq7Lxe3ahP3Wn";
		$resp = recaptcha_check_answer ($privatekey,
				$_SERVER["REMOTE_ADDR"],
				$_POST["challenge"],
				$_POST["response"]);

		if (!$resp->is_valid) {
			echo 'nope';
			return false;
		} else {
			echo 'yep';
			return true;
		}
	}

	public function error(){
		$this->load->view('nonono');
	}

}

/* End of file votepn.php */
/* Location: ./application/controllers/votepn.php */