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