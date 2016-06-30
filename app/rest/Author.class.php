<?php

require_once('SQLite.class.php');
require_once ('RestResponse.class.php');

class Author extends RestResponse{

	public function __construct(){
		$this->table = 'author';
	}
}