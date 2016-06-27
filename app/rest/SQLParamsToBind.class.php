<?php

class SqlParamsToBind{

	/**
	* @var string
	*/
	public $alias;

	/**
	* @var string
	*/
	public $value;

	public function __construct($alias, $value){
		$this->alias = $alias;
		$this->value = $value;
	}
}