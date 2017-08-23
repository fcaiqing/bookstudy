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
//递归进行数组展平
function flat(arry) {
    if(_.isArray(arry)) {
        return cat.apply(cat, _.map(arry, flat));
    }else {
        return [arry];
    }
}
function cat() {
    var head=_.first(arguments);
    if(existy(head)) {
        return head.concat.apply(head, _.rest(arguments));
    }else return [];
}
function existy(params) {
    return params!=null;
}
log("flat", flat([[1, 2], [5, 6], 7, [[[4,[8]]]]]));
var x = [{a: [1, 2, 3], b: 42}, {c: {d: []}}, 7];
var y = _.clone(x);
var arrToObj= deepClone([1,3,4,5]);
var depY = deepClone(x);
log(_.isEqual(x, y), _.isEqual(x, depY));
log("y", JSON.stringify(y), "x", JSON.stringify(x));
x[1]['c']['d'] = 1233;
//_.clone is shallow cpy.
log("y", JSON.stringify(y), "x", JSON.stringify(x), "depY", JSON.stringify(depY), "arrToObj", JSON.stringify(arrToObj));
//deep clone via recursive
function deepClone(params) {
    if(!existy(params) || !_.isObject(params))
        return params;
    var temp = new Object(); //构造函数是Object会导致array转化为obj
    temp = new params.constructor(); //通过这种方式能够根据对象实例选择对应的构造函数
    for(var k in params) {
        /* if(!_.isObject(params[k]))
            temp[k] = params[k];
        else {
            temp[k] = deepClone(params[k]);
        } */
        if(params.hasOwnProperty(k)) {
            temp[k] = deepClone(params[k]);
        }
    }
    return temp;
}
//_.isEqual做的是比对数值 非地址比对
log(_.isEqual(x, y), _.isEqual(x, depY));  //{'w': 1232, 's':234}=={'w': 1232, 's': 234} //true
