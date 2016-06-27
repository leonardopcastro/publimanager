<?php
error_reporting(E_ALL);
ini_set('display_errors', 1); 

require_once('SQLParamsToBind.class.php');
	
class SQLite extends SQLite3{
	
	function __construct(){
		$this->open('../../database/publimanager.db');
	}
   
	function queryExtended($sql, $sql_params_to_bind){
		
		$Statement = $this->prepare($sql);

		if (!empty($sql_params_to_bind)){
			foreach($sql_params_to_bind as $bind){
				$Statement->bindValue($bind->alias, $bind->value);
			}
		}

		$Result = $Statement->execute();

		$sql_operation = array();
		
		preg_match('/^([a-z]+)\s/i', $sql, $sql_operation);

		$sql_operation = strtoupper($sql_operation[1]);

		return $this->getResponseFromQuery($sql_operation, $Result);
	}


	private function getResponseFromQuery($sql_operation, $Result){
		
		if (!$Result){
			throw new Exception($this->lastErrorMsg());
		}

		if ($sql_operation == 'UPDATE' || $sql_operation == 'DELETE'){
			$response = array($this->changes());
		}
		elseif($sql_operation == 'INSERT'){
			$response = array($this->lastInsertRowID());
		}
		else{
			$response = array();
		
			while($row = $Result->fetchArray(SQLITE3_ASSOC)){
				$response[] = $row;
			}
		}

		return $response;
	}
}