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
var ad={w: 2, e: 3};var newO = Object.create(ad,
    {
     i:{
         value:2,
         writable: true,
         configurable: true,//是否可删除
         enumerable: true
        },
     d:{
         value:4
     }
});log("newO", newO);newO.i=5;log(newO);delete newO.i;log(newO)
//无原型对象
var map = Object.create(null);
//多态
