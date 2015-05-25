<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

error_reporting(E_ALL);
ini_set('display_errors', 1);


class premioclaudia extends CI_Controller {
	public function __construct(){
	   	parent::__construct();
	}

	public function index(){
		
	}

	public function introClaudia(){
		$this->load->view('pclaudia/premioclaudia');
	}

	public function votaClaudia(){
		$this->load->view('pclaudia/votaclaudia');
	}

	public function obrigadoClaudia(){
		$this->load->view('pclaudia/obrigadoclaudia');
	}	

	public function resultadoClaudia(){
		$this->load->view('pclaudia/resultadoclaudia');
	}	

	public function catDesktop(){
		$categoria = $_GET['categoria'];
		$this->load->view('pcontigo/pag'.$categoria);
	}

	public function envia(){

		if($_POST['c1']){
            //echo "YES"; die();
			$curl_data_connect = json_encode(
			    array(
			            'pdInitiate' => array(
			                'partnerGUID' => '7381bf0e-95f9-f549-9228-00003062052b',
//                            'partnerGUID' => '25c1abeb-bbd3-b7e9-7b4c-000003b94808',

			                "partnerUserID" => "0",
			                "email" => 'portalmdemulher@gmail.com',
//                            "password" => '#yada1990'
			                "password" => '!@K2b3Yd%8$dS@nwBCWQpfedpS'
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
			$categorias = array("categorias", "8887099");

			for ($i = 1; $i <= 1; $i++) {
				$curl_data = '{"pdRequest": {
				    "partnerGUID": "7381bf0e-95f9-f549-9228-00003062052b",
				    "userCode": "'.$usercode.'",
				    "demands": {
				        "demand": {
				            "vote": {
				               "answers_text": "'.$_POST['c'.$i].'",
				               "other_text": "",
				               "url": "",
				               "ip": "",
				               "tags": {
				                   "tag": {
				                       "name": "email",
				                       "value": "me@polldaddy.com"
				                   }
				               },
				               "poll_id": "'.$categorias[$i].'",
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
			}

			echo json_encode(array('resp' => 'yep'));
		}
	}

	public function error(){
		$this->load->view('nonono');
	}

}

/* End of file votecontigo.php */
/* Location: ./application/controllers/votepc.php */
