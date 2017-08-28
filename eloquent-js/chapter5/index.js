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
var ancesstry = [{name: 'c'}, {name: 'Donald'}, {name: "er"}, {name: 'Carel'}, {name: 'Maria'}];
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
var name = "xlj";
var zlw = {
    name: "zlw" ,
    hello: function () {
        console.log(this, this.name);
    }
};
zlw.hello(); // zlw

var hello = zlw.hello;
hello(); // xlj
Function.prototype.bindxx = function (params) {
    var tmp = this;
    return function () {
        tmp.apply(params, _.rest(arguments));
    }
}
var hello1=zlw.hello.bindxx(zlw);
hello1();
//function bind
var theSet = ['Carel', 'Maria', 'Donald'];
function isIntSet(set, person) {
   for(var i=0; i<set.length; i++) {
       if(set[i].indexOf(person.name)>-1)
        return true;
   }
   return false;
}
log(ancesstry.filter(function (person) {
    return isIntSet(theSet, person)
}))
log(ancesstry.filter(isIntSet.bind(null, theSet)))
//bind 不仅能够为函数绑定上下文环境，而且还能传递参数给函数，这些参数优先传给函数
function printArguments(params) {
    log(arguments);
}
var printArgumentsBind = printArguments.bind(null, "我是优先参数");
printArgumentsBind("我在优先参数之后");
