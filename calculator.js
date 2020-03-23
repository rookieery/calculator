function my$(className) {
    return document.getElementsByClassName(className);
}
var strs = my$("c1");
var flag = false;
for (var i = 0; i < strs.length; i++) {
    strs[i].addEventListener("click",deal,false);//此处只能用deal不能用deal()
}

//处理字符的函数
function deal(e) {
    var str = e.target.innerText;
    var tmp = my$("screen1")[0].getElementsByTagName("span")[0].innerText;
    if (str === "=") {//显示运算结果
        var a = calculate(tmp);
        //小数显示不下
        my$("screen2")[0].getElementsByTagName("span")[0].innerText = a;
        flag = true;
    } else if (str === "DEL") {//回退功能
        if (flag) {
            my$("screen1")[0].getElementsByTagName("span")[0].innerText = "";
            flag = false;
        } else {
            tmp = tmp.substring(0, tmp.length - 1);
            my$("screen1")[0].getElementsByTagName("span")[0].innerText = tmp;
        }
    } else if (str === "C" || str === "CE") {//清屏功能
        if (str === "C" || flag) {
            my$("screen1")[0].getElementsByTagName("span")[0].innerText = "";
            my$("screen2")[0].getElementsByTagName("span")[0].innerText = 0;
            flag = false;
        } else {
            my$("screen2")[0].getElementsByTagName("span")[0].innerText = 0;
        }
    } else {//更新显示屏
        if (flag) {
            tmp = my$("screen2")[0].getElementsByTagName("span")[0].innerText;
            flag = false;
        }
        if (tmp === "") {
            my$("screen1")[0].getElementsByTagName("span")[0].innerText = str;
        } else {
            my$("screen1")[0].getElementsByTagName("span")[0].innerText = tmp + str;
        }
    }
};
// 算数算法
var calculate = function (s) {
    var stack = new Array();
    for (var i = 0; i < s.length; i++) {
        var tmp = s[i];
        if (tmp >= '0' && tmp <= '9') {
            var r = getNum(s, i);
            dealNum(s, stack, r.num);
            i = r.index;
        } else if (tmp === '+' || tmp === '-' || tmp === '*' || tmp === '/' || tmp === '(') {
            stack.push(tmp);
        } else if (tmp === ')') {
            dealRight(s, stack);
        }
    }
    return getFinalResult(stack);
};

//获取数字的位数
var getNum = function (s, i) {
    var start = i;
    while (i < s.length && ((s[i] >= '0' && s[i] <= '9') || s[i] === '.')) {
        i++;
    }
    return {
        num: Number(s.substring(start, i)),
        index: i - 1
    };
};

//处理乘除法
var dealNum = function (s, stack, num) {
    if (stack.length !== 0 && (stack[stack.length - 1] === '*' || stack[stack.length - 1] === '/')) {
        var sign1 = stack.pop();
        var pre1 = stack.pop();
        var res = sign1 === '*' ? pre1 * num : pre1 / num;
        stack.push(res);
    } else {
        stack.push(num);
    }
}

//处理右括号的情形
var dealRight = function (s, stack) {
    var result = 0;
    //括号里面只有+/-运算
    while (stack[stack.length - 1] !== '(') {
        var next1 = stack.pop();
        if (stack.length === 0 || stack[stack.length - 1] === '(') {
            result += next1;
            break;
        }
        var sign2 = stack.pop();
        result = sign2 === '+' ? result + next1 : result - next1;
    }
    stack.pop();
    var res2 = 0;
    //使得stack里面只有+/-运算符，保证算法优先级(原因：完成括号运算后的结果必然是一个数字)
    while (stack.length !== 0 && (stack[stack.length - 1] === '*' || stack[stack.length - 1] === '/')) {
        var sign3 = stack.pop();
        var pre2 = stack.pop();
        res2 = sign3 === '*' ? pre2 * result : pre2 / result;
        result = res2;
    }
    stack.push(result);
}
//判断栈空，得到最终结果
var getFinalResult = function (stack) {
    var result = 0;
    while (stack.length > 0) {
        var next = stack.pop();
        if (stack.length === 0) {
            return result + next;
        }
        var sign = stack.pop();
        result = sign === '+' ? result + next : result - next;
    }
    return result;
};