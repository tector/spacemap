$(function(){
   var documentWidth = $(document).width();
    var documentHeight = $(document).height();

    var stage = new Kinetic.Stage({
        container: 'mapCanvas',
        width: documentWidth,
        height: documentHeight
    });

    var map = new Map(stage);
    var gridLayer = new Kinetic.Layer();
    var planetLayer = new Kinetic.Layer();
    var asteroidsLayer = new Kinetic.Layer();

    map.drawGrid(gridLayer);


    stage.add(gridLayer);
    stage.add(planetLayer);
    stage.add(asteroidsLayer);



});
