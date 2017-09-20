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
//Grid API
function Point(x, y) {
    this.x = x;
    this.y = y;
}
Point.prototype.plus = function (other) {
   return new Point(other.x+this.x, other.y+this.y);
}

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
//Animal API
var directions = {
    "n": new Point(0, -1),
    "ne": new Point(1, -1),
    "e": new Point(1, 0),
    "se": new Point(1, 1),
    "s": new Point(0, 1),
    "sw": new Point(-1, 1),
    "w": new Point(-1, 0),
    "nw": new Point(-1, -1)
};
function randomElement(array) {
    return array[Math.floor(Math.random()*array.length)];
}
var directionNames = "n ne e se s sw w nw".split(" ");
function BouncingCritter(directions) {
    this.direction = randomElement(directions);
}
BouncingCritter.prototype.act = function (view) {
    if(view.look(this.direction) != " ") {
        this.direction = view.find(" ") || "s";
    }
    return {"type": "move", "direction": this.direction};
};
//World 对象
function elementFromChar(legend, ch) {
    if(ch == " ") {
        return null;
    }
    var element = new legend[ch]();
    element.originChar = ch;
    return element;
}
function World(map, legend) {
    var grid = new Grid(map[0].length, map.length);
    this.grid = grid;
    this.legend = legend;
    
}