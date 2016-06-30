<?php

abstract class RestResponse{

	protected $table;

	public function processRequest(){
		if (isset($_GET['id'])){
			$id = $_GET['id'];
		}
		else{
			$id = 0;
		}

		switch($_SERVER['REQUEST_METHOD']){
			case 'GET':
				$response = $this->get($id);
				break;

			case 'PUT':
				$response = $this->update($id, json_decode(file_get_contents('php://input'), true));
				break;

			case 'POST':
				$response = $this->insert(json_decode(file_get_contents('php://input'), true));
				break;

			case 'DELETE':
				$response = $this->delete($id);
				break;
		}

		return $response;
	}

	protected function get($id){
		$return_one_entry = false;
	
		$sql = "SELECT * FROM {$this->table}";

		$params_to_bind = array();

		if (!empty($id)){
			$params_to_bind[] = new SqlParamsToBind(':id', $id);
			
			$sql .= ' WHERE id = :id';
			
			$return_one_entry = true;
		}

		$SQLite = new SQLite();

		$rows = $SQLite->queryExtended($sql, $params_to_bind);

		$SQLite->close();

		if ($return_one_entry){
			$rows = $rows[0];
		}

		return json_encode($rows);
	}


	protected function update($id, $data){
		unset($data['id']);

		$params_to_bind = array();

		$sql = "UPDATE {$this->table} SET ";
		$sql_set = array();

		foreach($data as $column=>$value){
			$params_to_bind[] = new SqlParamsToBind(":{$column}", $value);
			$sql_set[] = "$column = :{$column}";
		}

		$params_to_bind[] = new SqlParamsToBind(":id", $id);

		$sql .= implode(', ', $sql_set);
		$sql .= ' WHERE id = :id';

		$SQLite = new SQLite();
		
		$qty_modified = $SQLite->queryExtended($sql, $params_to_bind);

		$SQLite->close();

		$publication_updated = $this->get($id);

		return $publication_updated;
	}


	protected function insert($data){

		$params_to_bind = array();

		$sql_columns = array();
		$sql_values = array();

		foreach($data as $column=>$value){
			$sql_columns[] = $column;
			$sql_values[] = ":{$column}";
			$params_to_bind[] = new SqlParamsToBind(":{$column}", $value);
			
		}

		$sql = "INSERT INTO {$this->table} (".implode(', ', $sql_columns).') VALUES ('.implode(', ', $sql_values).')';

		$SQLite = new SQLite();
		
		$inserted_id = $SQLite->queryExtended($sql, $params_to_bind);

		$SQLite->close();

		$row_created = $this->get($inserted_id[0]);

		return $row_created;
	}

	protected function delete($id){
		
		$sql = "DELETE FROM {$this->table} WHERE id = :id";
	
		$params_to_bind = array();
		$params_to_bind[] = new SqlParamsToBind(":id", $id);

		$SQLite = new SQLite();
		
		$qty_deleted = $SQLite->queryExtended($sql, $params_to_bind);

		$SQLite->close();
		
		return $qty_deleted[0];
	}
}