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
log(1,2,4);
function  partial(fun, num1) {
  return function () {
      var range = arguments[0] ? [arguments[0], num1] : [num1];
      return fun.apply(fun, range);
  }  
}
var rand = partial(_.random, 26);
log(rand(2));
function randString(len) {
    var ascii=repeatly(len, function(){ return rand(1)});
    return _.map(ascii,  function (n) {
        return n.toString(36);
    }).join("");
}
function repeatly(len, fun) {
    return _.map(_.range(len), function(){
        return  fun();
    })
}
log("randstring", randString(20), "length", randString(20).length);
log(repeatly(10, function(){ return rand(1)}))
log("random character", randString(1))
