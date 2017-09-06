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
