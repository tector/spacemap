$(function(){
   var documentWidth = $(document).width();
    var documentHeight = $(document).height();

    var stage = new Kinetic.Stage({
        container: 'mapCanvas',
        width: documentWidth,
        height: documentHeight,
        draggable:true
    });
    var loader = new Kinetic.Loader(toLoad);



    var map = new Map(stage);
    var layers = [];

    var gridLayer = new Kinetic.Layer();
    var planetLayer = new Kinetic.Layer();
    var asteroidsLayer = new Kinetic.Layer();

    map.drawGrid(gridLayer);

    layers.push(planetLayer);
    layers.push(asteroidsLayer);

    loader.onComplete(function(){
        map.drawData(layers);


    });


    stage.add(gridLayer);




    loader.load();

});
