//系列五
var a = 20;
var obj = {
    a: 10,
    c: this.a+20,
    fn: function () {
        return this.a
    }
}
console.log(obj.c);
console.log(obj.fn());
//系列七-函数与函数式编程
!function () {
    // 私有变量，用来存储状态与数据
    var states = {a:{}};
    function getStates() {
        return states;
    }
     // 判断数据类型
     function type(elem) {
        if(elem == null) {
            return elem + '';
        }
        return toString.call(elem).replace(/[\[\]]/g, '').split(' ')[1].toLowerCase();
    }
    /**
     * 深度复制保存对象值
     * @param {object} options 要保存的值 
     * @param {object} target 保存可选的目标值 
     */
    function set(options, target) {
        var keys = Object.keys(options);
        var o = target ? target : states;
        keys.map(function (item) {
            if(typeof o[item] == 'undefined') {
                o[item] = options[item];
            }else {
                type(o[item]) == 'object' ? set(options[item], o[item]) : o[item] = options[item];
            }
            return item;
        })
    }
    /**
     * @description 通过属性名获取保存在states中的值
     * @param {*} name 属性名
     */
    function get(name) {
        return states[name] ? states[name] : "";
    }
    // 对外提供接口
    window.get = get;
    window.set = set;
    window.getStates = getStates;
}()
set({a:1});console.log(getStates())
