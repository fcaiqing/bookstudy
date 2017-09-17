function log() {
    getUrlObj()['tst'] && console.log.apply(null, arguments);
}
function getUrlObj() {
    var qs = (location.search.length > 0 ? location.search.substring(1) : ""),
        args = {},
        items = qs.length ? qs.split("&") : [],
        item = null, name = null, value = null;
    for (var i = 0; i < items.length; i++) {
        item = items[i].split("=");
        name = decodeURIComponent(item[0]);
        value = decodeURIComponent(item[1]);
        if (name.length)
            args[name] = value;
    }
    return args;
}
//构建电子生态系统
var plan = [
    "################################",
    "#      #    #      o          ##",
    "#                              #",
    "#      o       #####           #",
    "##       #    #    ##     o    #",
    "###         ##         #       #",
    "#         ###          #       #",
    "#   ####          o            #",
    "#   ##      o                  #",
    "#  o   #       o          ###  #",
    "#           #                  #",
    "################################"
]
function Point(x, y) {
    this.x = x;
    this.y = y;
}
Point.prototype.plus = function (other) {
   return new Point(other.x+this.x, other.y+this.y);
}
var grid = [["top left", "top middle", "top right"],
            ["bottom left", "bottom middle", "bottom right"]];
console.log(grid[1][2]);

//
function Grid(width, height) {
    this.space = new Array(width*height);
    this.width = width;
    this.height = height;
}
Grid.prototype.isInside = function (point) {
    return point.x>=0&&point.x<this.width&&
    point.y>=0&&point.y<this.height;
};
Grid.prototype.get = function (point) {
    return this.space[point.x+point.y*this.width];
};
Grid.prototype.set = function (point, value) {
    this.space[point.x+point.y*this.width] = value;
};
//
var grid = new Grid (5, 5);
log(grid.get(new Point(1, 1)));
grid.set(new Point(1, 1), "X");
log(grid.get(new Point(1, 1)));
//
