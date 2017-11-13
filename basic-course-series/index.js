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

for(var i=0; i<5; i++) {
    (function () {
        var t=i
        setTimeout(function(){
            console.log(t);
    }, 1000*i);
    })();
}
