<?php

require_once('SQLite.class.php');
require_once ('Publication.class.php');

$Publication = new Publication();

echo $Publication->processRequest();