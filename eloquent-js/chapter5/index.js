function log() {
    getUrlObj()['tst']&& console.log.apply(null, arguments);
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
var byName = {};
var ancesstry = [{name: 'c'}, {name: 'd'}, {name: "er"}];
ancesstry.forEach(function(person){
    byName[person.name] = person; 
});
log(byName);
function reduceAncesstry(person, f, defaultValue) {
    function valueFor(person) {
        if(person == null) {
            return defaultValue;
        }else {
            return f(person, valueFor(byName[person.mother]),
            valueFor(byName[person.father]));
        }
    }
    return valueFor(person);
}
function shareDNA(person, fromMonther, fromFather) {
    if(person.name == "er") {
        return 1;
    }else {
        return (fromFather + fromMonther)/2;
    }
}
var ph = byName['er'];
log(reduceAncesstry(ph, shareDNA, 0)/4)
//var name = "xlj";
var zlw = {
    name: "zlw" ,
    hello: function () {
        console.log(this.name);
    }
};
zlw.hello(); // zlw

var hello = zlw.hello;
hello(); // xlj
Function.prototype.bindxx = function (params) {
    return function (params) {
        // this.apply(params, _.rest(arguments));
    }
}
var hello1=zlw.hello.bindxx(zlw);
// hello1();