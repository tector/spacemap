var Map = function(){
    this._stage = null;
    this._gridSize = 50;
    this._posX = 0;
    this._posY = 0;
    this._data = [];
    this._layers = [];
    this._mapHelper = null;
    this._viewportHeight = $(document).height();
    this._viewportWidth = $(document).width();
    this._init();
}
Map.prototype._init = function(){

    this._stage = new Kinetic.Stage({
        container: 'mapCanvas',
        width: this._viewportWidth,
        height: this._viewportHeight,
        draggable:true
    });

    this._mapHelper = new OrthographicMap(0,0,this._viewportHeight,this._viewportWidth,this._gridSize,this._gridSize);
}
Map.prototype.setX = function(x){
    this._posX = x;
}
Map.prototype.setY = function(y){
    this._posY = y;
}
Map.prototype.setGridSize = function(size){
    this._gridSize = size;
    this._mapHelper.setGridSize(size,size);
}
Map.prototype.draw = function(){

  if(this._data.length <= 0){
      this._loadData();
  }
  this._drawObjects();

}
Map.prototype.clear = function(){
    this._stage.clear();
}
Map.prototype._drawObjects = function(){
    var offset = this._mapHelper.getCenterPosition(this._posY,this._posX);
    this._stage.setX(offset.left);
    this._stage.setY(offset.top);
    var center = this._mapHelper.positionToPixel(this._posY,this._posX);
    var area = this._mapHelper.getArea(center.top,center.left);
    var layers = [
        new Kinetic.Layer(),
        new Kinetic.Layer()
    ];
    var currentRow = null;
    for(var i in area){
        var row = area[i];
        for(var dataKey in this._data){
            currentRow = this._data[dataKey];

            if(currentRow.x == row.posX && currentRow.y == row.posY){
                break;
            }
            currentRow = null;
        }
        if(currentRow == null) {
            continue;
        }
        var imageName = currentRow.attribs.class
        var imageObj = Kinetic.Assets[imageName];
        var position = this._mapHelper.positionToPixel(row.posY,row.posX);
        var kineticImage = new Kinetic.Image({
            image:imageObj,
            x: position.left,
            y: position.top,
            width:this._gridSize,
            height:this._gridSize
        });

        layers[currentRow.layer].add(kineticImage);
        currentRow = null;
    }

    for(var l in layers){
        var layer = layers[l];
        this._stage.add(layer);
    }

}
Map.prototype.drawGrid = function(layer){

    var width = this._stage.getWidth();
    var height = this._stage.getHeight();
    var size = this._size;



for(var y = 0;y<height;y+=size){
    for(var x = 0;x < width;x+=size){

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

Map.prototype._loadData = function(){
    var that = this;
    $.ajax({
        url: 'assets/data/dummydata-hybrid-with-sprites.json',
        success:function(data){
            that._data = data;
            that.draw();
        },
        dataType: 'json'
    });
}