$(function(){



    var map = new Map();
    map.setX(1220);
    map.setY(1220);
    map.setGridSize(50);


    var loader = new Kinetic.Loader(toLoad);
    loader.onComplete(function(){
        map.draw();
    });
    loader.load();
    $(window).scroll(function(event){
       console.log(event);
    });
    $( ".slider" ).slider({
        range: "max",
        min: 50,
        max: 250,
        step: 50,
        value: 50,
        slide: function( event, ui ) {
            map.clear();
            map.setGridSize(ui.value);
            map.draw();
        }
    });
});
