var OrthographicMap = function(height,width,viewportHeight,viewportWidth,tileWidth,tileHeight){
    this._height = height;
    this._width = width;
    this._viewportHeight = viewportHeight;
    this._viewportWidth = viewportWidth;
    this._tileWidth = tileWidth;
    this._tileHeight = tileHeight;
}

OrthographicMap.prototype.setViewport = function(viewportHeight,viewportWidth){
    this._viewportHeight = viewportHeight;
    this._viewportWidth = viewportWidth;
}
OrthographicMap.prototype.setGridSize = function(tileHeight,tileWidth){
    this._tileWidth = tileWidth;
    this._tileHeight = tileHeight;
}
OrthographicMap.prototype.positionToPixel = function(posY,posX)
{
    var left = posX * this._tileWidth;
    var top = posY * this._tileHeight;

    return {
        'top':top,
        'left':left
    }
}

OrthographicMap.prototype.pixelToPosition = function(top,left){
    var posX = Math.round(left/this._tileWidth);
    var posY = Math.round(top/this._tileHeight);
    return {
        'posX':posX,
        'posY':posY
    }
}
OrthographicMap.prototype.getCenterPosition = function(posY,posX){
    var position = this.positionToPixel(posY,posX);
    var left = position.left;
    var top = position.top;
    left = -left + Math.round(this._viewportWidth / 2);
     top  = -top + Math.round(this._viewportHeight/2);
    return {
        'top':top,
        'left':left
    }
}

OrthographicMap.prototype.getArea = function(top,left){
    var halfViewportWidth = Math.round(this._viewportWidth/2);
    var halfVIewportHeight = Math.round(this._viewportHeight/2);
    var topPosition = top - halfVIewportHeight;
    var bottomPosition = top + halfVIewportHeight;
    var leftPosition = left - halfViewportWidth;
    var rightPosition = left + halfViewportWidth;
    var area = {};
    for(var y = topPosition;y< bottomPosition;y+=this._tileHeight){
        for(var x = leftPosition;x<rightPosition;x+= this._tileHeight){
            var position = this.pixelToPosition(y,x);
            var key = position.posY+ '-'+position.posX;
            area[key] = {
                'posX':position.posX,
                'posY':position.posY
            }
        }
    }
    return area;
}