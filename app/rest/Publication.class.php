<?php

require_once('SQLite.class.php');
require_once ('RestResponse.class.php');

class Publication extends RestResponse{

	protected function get($id){
		$return_one_entry = false;
	
		$sql = 'SELECT * FROM publication';

		$params_to_bind = array();

		if (!empty($id)){
			$params_to_bind[] = new SqlParamsToBind(':id', $id);
			
			$sql .= ' WHERE id = :id';
			
			$return_one_entry = true;
		}

		$SQLite = new SQLite();
		
		$publications = $SQLite->queryExtended($sql, $params_to_bind);

		$SQLite->close();

		if ($return_one_entry){
			$publications = $publications[0];
		}

		return json_encode($publications);
	}


	protected function update($id, $data){
		unset($data['id']);

		$params_to_bind = array();

		$sql = 'UPDATE publication SET ';
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

		$publication_updated = get($id);

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

		$sql = 'INSERT INTO publication ('.implode(', ', $sql_columns).') VALUES ('.implode(', ', $sql_values).')';

		$SQLite = new SQLite();
		
		$inserted_id = $SQLite->queryExtended($sql, $params_to_bind);

		$SQLite->close();

		$publication_created = get($inserted_id[0]);

		return $publication_created;
	}

	protected function delete($id){
		$sql = 'DELETE FROM publication WHERE id = :id';
	
		$params_to_bind = array();
		$params_to_bind[] = new SqlParamsToBind(":id", $id);

		$SQLite = new SQLite();
		
		$qty_deleted = $SQLite->queryExtended($sql, $params_to_bind);

		$SQLite->close();
		
		return $qty_deleted[0];
	}
}