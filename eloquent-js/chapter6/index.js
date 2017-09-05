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
var ad = { w: 2, e: 3 }; var newO = Object.create(ad,
    {
        i: {
            value: 2,
            writable: true,
            configurable: true,//是否可删除
            enumerable: true
        },
        d: {
            value: 4
        }
    }); log("newO", newO); newO.i = 5; log(newO); delete newO.i; log(newO)
//无原型对象
var map = Object.create(null);
//chapter6.9 绘制表格
//保存每行显示需要的最小高度
function rowHeights(rows) {
    return rows.map(function (row) {
        return row.reduce(function (max, cell) {
            return Math.max(max, cell.minHeight());
        }, 0)
    })
}
//保存每列显示需要的最小宽度
function colWidths(rows) {
    return rows[0].map(function (_, i) {//用_作为变量名，表示该变量不会再接下来使用到，事实上我们只是要是使用索引i
        return rows.reduce(function (max, row) {
            return Math.max(max, row[i].minWidth());
        }, 0)
    })
}
//
function drawTable(rows) {
    var heights = rowHeights(rows);
    var widths = colWidths(rows);
    //每行按层绘制
    function drawLine(blocks, lineNo) {
        return blocks.map(function (block) {
            return block[lineNo];
        }).join(" ");
    }
    function drawRow(row, rowNum) {
        var blocks = row.map(function (cell, colNum) {
            return cell.draw(widths[colNum], heights[rowNum]);//绘制的cell{text:[行1, 行2,...] -> [行1， 行2， ...]
        });
        //返回row这行的层数组[层1， 层2, ...]
        return blocks[0].map(function (_, lineNo) {
            return drawLine(blocks, lineNo);
        }).join("\n");
    }
    return rows.map(drawRow).join("\n");
}
//
function repeat(string, times) {
    var result = "";
    for (var i = 0; i < times; i++) {
        result += string;
    }
    return result;
}
//
function TextCell(text) {
    this.text = text.split("\n");
}
TextCell.prototype.minWidth = function () {
    return this.text.reduce(function (width, line) {
        return Math.max(width, line.length);
    }, 0);
};
TextCell.prototype.minHeight = function () {
    return this.text.length;
};
//格式处理对齐
TextCell.prototype.draw = function (width, height) {
    var result = [];
    for (var i = 0; i < height; i++) {
        var line = this.text[i] || "";
        result.push(line + repeat(' ', width - line.length));
    }
    return result;
};
var rows = [];
for (var i = 0; i < 5; i++) {
    var row = [];
    for (var j = 0; j < 5; j++) {
        if ((j + i) % 2 == 0)
            row.push(new TextCell('##\nss\n3545'));
        else
            row.push(new TextCell('dd'));
    }
    rows.push(row);
}
// log(drawTable(rows));

//绘表格
//表格单位
function Cell(txt) {
    this.txt = txt.split('\n');
}
Cell.prototype.height = function () {
    return this.txt.length;
}
Cell.prototype.width = function () {
    return this.txt.reduce(function (width, line) {
        return Math.max(width, line.length);
    }, 0)
}
Cell.prototype.drawCell = function (width, height) {
    var lines=[];
    for(var i=0; i<height; i++) {
        var line=this.txt[i] || "";
        lines.push(line+repeatly(' ', width-line.length))
    }
    return lines;
}
function repeatly(targetC, times) {
    var rst = "";
    for (var i = 0; i < times; i++) {
        rst += targetC;
    }
    return rst;
}
//每行最小的现实高度要求
function minShowHeight(rows) {
    return rows.map(function (row) {
        return row.reduce(function (maxH, cell) {
            return Math.max(maxH, cell.height())
        }, 0)
    })
}
//每列最小现实宽度，有最宽的cell决定
function minShowWidth(rows) {
    //列遍历时，我可以先限定列索引，然后行遍历
    return rows[0].map(function (_, i) {
        return rows.reduce(function (width, row) {
            return Math.max(width, row[i].width());
        }, 0)
    })
}
//绘制表格
function drawFixedTable(rows, addHead) {
    addHead&&addHead(rows);
    //获取绘制表格单元的最小宽和高
    var width = minShowWidth(rows);
    var height = minShowHeight(rows);
    //打印格式处理
    function format(width, height) {
        return rows.map(function (row, rowInx) {
            return row.map(function (cell, colInx) {
                //{}->[]
               return cell.drawCell(width[colInx], height[rowInx]);
            })
        })
    }
    var newRows = format(width, height);
    function print(rows) {
        var colN = rows[0].length;
        rows.map(function (row) {
            var lineN = row[0].length;
            for (var line = 0; line < lineN; line++) {
                var lines = "";
                for (var j = 0; j < colN; j++) {
                    lines += row[j][line];
                    lines = j == colN - 1 ? lines : lines + ' ';
                }
                log(lines);
            }
        })
    }
    print(newRows);
}
//生产数据
function proData(rowN, colN, funCall) {
    var rows = [];
    for (var i = 0; i < rowN; i++) {
        var row = [];
        for (var j = 0; j < colN; j++) {
            var data = (i + j) % 2 === 0 ? funCall() : new Cell("odd");
            row.push(data);
        }
        rows.push(row);
    }
    return rows;
}
/* drawFixedTable(proData(4, 5, function () {
    return new Cell("1234");
})); */
//
function UnderlineCell(inner) {
    this.inner = inner;
};
UnderlineCell.prototype.minWidth = function () {
    return this.inner.width();
}
UnderlineCell.prototype.minHeight = function () {
    return this.inner.height() + 1;
}
UnderlineCell.prototype.draw = function (width, height) {
    return this.inner.drawCell(width, height-1).concat([repeat('-', width)]);
}
function addHead(rows) {
    rows[0].map(function (cell) {
        cell.txt.push(repeatly('=', cell.width()));
    })
}
//表头下划线强调
drawFixedTable(proData(4, 5, function () {
    return new Cell("1234");
}), addHead);
//6.10
var pile = {
    elements: ['eggs', 'origin', 'worms'],
    get height() {
        return this.elements.length;
    },
    set height(value) {
        // log(value);
        this.elements.push(value);
    }
};
log(pile.height);
pile.height = 100;
log(pile.height);
//Getter Setter 的属性等同于
Object.defineProperty(pile, "newAttr", {
    value: "xxqqwew",
    writable: true,
    configurable: false,
    enumerable: false
})
log(pile.newAttr);
//
Object.defineProperty(pile, 'width', {
    //当定义了获取器，但未定义设置器时，此时js会忽略所有属性值得修改
    set: function (value) {
        this.elements.push(value);
    },
    get: function () {
        return this.elements[this.elements.length-1];
    },
    configurable:false,
    enumerable: true
})
log(pile.width);
pile.width = 'xldyaxldya';
log(pile.width);
//6.11
