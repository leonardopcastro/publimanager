<?php

require_once('SQLite.class.php');
require_once ('Author.class.php');

$Author = new Author();

echo $Author->processRequest();