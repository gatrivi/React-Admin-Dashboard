<?php

// Get the requested URI
$request_uri = urldecode(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH)); 

// If the request is for a file that doesn't exist, send to index
if(!file_exists(__DIR__ . $request_uri)) {
    $request_uri = '/';  
}

// Route all requests to index.html in current dir
$file = __DIR__ . '/index.html';

header('Content-Type: text/html');
readfile($file);