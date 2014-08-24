$(function(){
   var documentWidth = $(document).width();
    var documentHeight = $(document).height();

    var stage = new Kinetic.Stage({
        container: 'mapCanvas',
        width: documentWidth,
        height: documentHeight
    });
    var loader = new Kinetic.Loader(toLoad);



    var map = new Map(stage);
    var gridLayer = new Kinetic.Layer();
    var layers = [];
    var planetLayer = new Kinetic.Layer();
    var asteroidsLayer = new Kinetic.Layer();

    map.drawGrid(gridLayer);
    layers.push(planetLayer);
    layers.push(asteroidsLayer);
    loader.onComplete(function(){
        map.drawData(layers);
    });


    stage.add(gridLayer);
    stage.add(planetLayer);
    stage.add(asteroidsLayer);

    loader.load();

});
