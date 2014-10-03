<?php 

    $path = dirname(__FILE__). '/Gallery/'.$_POST["id"]; // you may need to change the path

    /**
     Use 'opendir(".")' if the PHP file is in the same folder as your images. 
     Or set a relative path 'opendir("../path/to/folder")'.
    */

    $folder = opendir($path); 

    $pic_types = array("jpg", "jpeg", "gif", "png"); // restrict the extension [optional]

    $index = array();

    // looping over the images and push them into array

    while ($file = readdir ($folder)) {

      if(in_array(substr(strtolower($file), strrpos($file,".") + 1),$pic_types))
        {
            array_push($index,$file);
        }
    }
    closedir($folder); // close the dir opended by opendir()

    echo json_encode(array('images' => $index)); // sending to array of images as JSON
	
	
?>