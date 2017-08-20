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
console.log(flat([[1, 2], [5, 6], 7, [[[4,[8]]]]]));