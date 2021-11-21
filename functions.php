<?php

$dir = $_POST['dir'];

// Ouvre un dossier bien connu, et liste tous les fichiers
if (is_dir($dir)) {
    if ($dh = opendir($dir)) {
        echo '<div class="row">';
        while (($file = readdir($dh)) !== false) {
            if(filetype($dir . $file)!== "dir"){
                echo "<div class='col-2 text-info'><i class='fas fa-file'></i>$file</div>";
            }else if($file !=".." && $file !='.'){
                echo "<div class='col-2 folder text-primary'><i class='fas fa-folder'></i>$file</div>";
            }
        }
        echo '</div>';
        closedir($dh);
    }
}