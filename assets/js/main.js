$(function(){
   var documentWidth = $(document).width();
    var documentHeigth = $(document).width();
    console.log(documentWidth);
    var stage = new Kinetic.Stage({
        container: 'mapCanvas',
        width: documentWidth,
        height: documentHeigth
    });


    var layer1 = new Kinetic.Layer();
    var layer2 = new Kinetic.Layer();
    stage.addLayer(layer1);
    stage.addLayer(layer2);

});
