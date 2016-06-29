<?php

abstract class RestResponse{

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

	abstract protected function get($id);

	abstract protected function update($id, $data);

	abstract protected function insert($data);

	abstract protected function delete($id);
}