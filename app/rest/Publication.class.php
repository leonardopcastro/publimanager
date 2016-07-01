<?php

require_once('SQLite.class.php');
require_once ('RestResponse.class.php');

class Publication extends RestResponse{

	public function __construct(){
		$this->table = 'publication';
	}

	protected function get($id){

		$publications = parent::get($id);
		
		if (!empty($publications)){
			
			$publications = json_decode($publications, true);

			if (!empty($id)){
				$publications = array($publications);
			}
			
			foreach($publications as $key=>$publi){
				$publications[$key]['autores'] = $this->getAuthors($publi['id']);
			}

			if (!empty($id)){
				$publications = $publications[0];
			}
			
			$publications = json_encode($publications);
		}

		return $publications;
	}

	protected function insert($data){
		
		if (!empty($data['autores'])){
			$autores = $data['autores'];
			
			unset($data['autores']);
		}
		
		$publicacao = parent::insert($data);
		
		if (!empty($autores)){
			$this->insertAuthors(json_decode($publicacao, true), $autores);
		}

		return $publicacao;
	}


	protected function update($id, $data){
		
		$this->deleteAuthors($id);

		if (!empty($data['autores'])){
			$autores = $data['autores'];
			
			unset($data['autores']);
		}

		$this->insertAuthors($data, $autores);

		$publication =  json_decode(parent::update($id, $data), true);

		$publication['autores'] = $this->getAuthors($publication['id']);

		return json_encode($publication);
	}


	protected function delete($id){
		$this->deleteAuthors($id);

		return parent::delete($id);
	}


	private function getAuthors($publicacao_id){
		$sql = '
			SELECT author.*
			FROM publication_author 
				LEFT JOIN author ON (author.id = publication_author.author_id)
			WHERE publication_author.publication_id = :publication_id';

		$param_to_bind[] = new SqlParamsToBind(':publication_id', $publicacao_id);

		$SQLite = new SQLite();
		
		$publication_authors = $SQLite->queryExtended($sql, $param_to_bind);

		$SQLite->close();

		return $publication_authors;
	}


	private function insertAuthors($publicacao, $autores){
		$sql = 'INSERT INTO publication_author (publication_id, author_id) VALUES (:publication_id, :author_id)';

		$SQLite = new SQLite();

		foreach($autores as $aut){
			
			$params_to_bind = array();
			$params_to_bind[] = new SqlParamsToBind(":publication_id", $publicacao['id']);
			$params_to_bind[] = new SqlParamsToBind(":author_id", $aut['id']);

			$inserted_id = $SQLite->queryExtended($sql, $params_to_bind);
		}
		
		$SQLite->close();
	}


	private function deleteAuthors($publication_id){
		$sql = "DELETE FROM {$this->table}_author WHERE publication_id = :id";
	
		$params_to_bind = array();
		$params_to_bind[] = new SqlParamsToBind(":id", $publication_id);

		$SQLite = new SQLite();
		
		$qty_deleted = $SQLite->queryExtended($sql, $params_to_bind);

		$SQLite->close();
		
		return $qty_deleted[0];
	}
}