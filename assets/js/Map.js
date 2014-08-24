var Map = function(stage){
    this._stage = stage;

}

Map.prototype.drawGrid = function(layer){

    var width = this._stage.getWidth();
    var height = this._stage.getHeight();



for(var y = 0;y<height;y+=50){
    for(var x = 0;x < width;x+=50){

        var horizontalLine = new Kinetic.Line({
            points:[0,y,width,y],
            stroke:'grey',
            strokeWidth:1,
            opacity:0.1
        });
        var verticalLine = new Kinetic.Line({
            points:[x,0,x,height],
            stroke:'grey',
            strokeWidth:1,
            opacity:0.1
        });
        layer.add(horizontalLine)
            .add(verticalLine);
    }
}

}

Map.prototype.drawData = function(layers){


    this._loadData(layers);

}
Map.prototype._displayData = function(data){


}
Map.prototype._loadData = function(layers){
    $.ajax({
        url: 'assets/data/dummydata-hybrid-with-sprites.json',
        success:function(data){
            for(var row in data){

                var dataRow = data[row];
                var imageName = dataRow.attribs.class.replace('sprites ','');
                var imageObj = Kinetic.Assets[imageName];
               
                var object = new Kinetic.Image({
                    image:imageObj,
                    width:259,
                    height:259,
                    x:500,
                    y:500
                });

                var layer = layers[dataRow.layer];

                layer.add(object);
            }
        },
        dataType: 'json'
    });
}