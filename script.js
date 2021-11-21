$(document).ready(function() {
    let pathRef; 
    
    let generateNav = function() {
        $('#nav').html("");
        let splittedPath = pathRef.split('/');
        for(i=0; i<splittedPath.length; i++){
            if(splittedPath[i]!==""){
                $('#nav').append('<button class="btn btn-primary">' + splittedPath[i] +'</button>')  
            }
        }
        $('button').click(function(){
            selectedDir = splittedPath.indexOf(this.innerText);
            let pathToOpen = splittedPath.splice(0,selectedDir + 1);
            let test = pathToOpen.join("/");
            open(test + "/");
        })
    }

    let open = function(path){
        pathRef = path;
        generateNav();
        $.post(
            'functions.php', // la destination
            {dir : path}, // l'objet de la requête
            function(data){ // la réponse du serveur dans data 
                $('#main').html(data);
                $('.folder').click(function(){
                    open(pathRef + this.innerText + "/");
                })
            }
        )   
    }
    open("/");

    $('#back').click(function(){
        let splittedPath = pathRef.split('/');
        splittedPath.splice(-2,1);
        let previousPath = splittedPath.join("/");
        console.log(previousPath);
        if(previousPath === ""){
            open("/")
        }else {
            open(previousPath);
        }
    })
})