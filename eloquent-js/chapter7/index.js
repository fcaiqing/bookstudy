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
Grid.prototype.forEach = function (f, ct) {
    for(var y = 0; y<this.height; y++) {
        for(var x=0 ; x< this.width; x++) {
            var val = this.space[x+y*this.width];
            if(val != null) {
                f.call(ct, val, new Point(x, y))
            }
        }
    }
}
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
function BouncingCritter() {
    this.direction = randomElement(directionNames);
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

    map.map(function (line, y) {
        for(var x=0; x<line.length; x++) {
            grid.set(new Point(x,y), elementFromChar(legend, line[x]));
        }
    })
}
function charFromElement(ele) {
    return ele ? ele.originChar : " ";
}
World.prototype.toString = function() {
    var output = "";
    for(var y=0; y<this.grid.height; y++) {
        for (var x=0; x<this.grid.width; x++) {
            var ele = this.grid.get(new Point(x, y));
            output += charFromElement(ele);
        }
        output += '\n';
    }
    return output;
};
function Wall() {
    
};
var world = new World(plan, {
    '#': Wall,
    'o': BouncingCritter
});
console.log(world.toString());
// 赋予生命
World.prototype.turn = function() {
    var acted = [];
    this.grid.forEach(function (critter, point) {
        if(critter.act&&acted.indexOf(critter)===-1) {
            acted.push(critter);
            this.letAct(critter, point);
        }
    },this);
};
World.prototype.letAct = function (critter, point) {
    var action = critter.act(new View(this, point));
    if(action&&action.type==='move') {
        var dest = this.checkDestination(action, point);
        if(dest&&this.grid.get(dest)==null) {
            this.grid.set(point, null);
            this.grid.set(dest, critter);
        }
    }
}
World.prototype.checkDestination = function (action, point) {
    if(directions.hasOwnProperty(action.direction)) {
        var dest = point.plus(directions[action.direction]);
        if(this.grid.isInside(dest)) {
            return dest;
        }
    }
}
function View(world, point) {
    this.world = world;
    this.point = point;
}
View.prototype.look = function (dir) {
    var target = this.point.plus(directions[dir]);
    if(this.world.grid.isInside(target))
        return charFromElement(this.world.grid.get(target));
    else
        return "#";
};
View.prototype.findAll = function (ch) {
    var found = [];
    for(var dir in directions) {
        if(this.look(dir) == ch) {
            found.push(dir);
        }
    }
    return found;
};
View.prototype.find = function (ch) {
    var fonud = this.findAll(ch);
    if(fonud.length === 0) return null;
    return randomElement(fonud);
}
//爬行
for(var i=0; i<5; i++) {
    world.turn();
    console.log(world.toString())
}