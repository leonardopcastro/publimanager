<?php

require_once('SQLite.class.php');
require_once ('RestResponse.class.php');

class Publication extends RestResponse{

	public function __construct(){
		$this->table = 'publication';
	}
}