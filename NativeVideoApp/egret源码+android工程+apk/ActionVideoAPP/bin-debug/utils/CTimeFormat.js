/**
 * 模块功能：时间格式转换
 * @author 彭祥
 *
 */
var CTimeFormat = (function () {
    function CTimeFormat() {
    }
    var d = __define,c=CTimeFormat,p=c.prototype;
    /**
     * 功能：获得系统时间
     * @return  返回格式: [01:32:18]
     */
    CTimeFormat.getTime3 = function () {
        var str = "";
        var mydata = new Date();
        var hour = this.getPrefixNum(mydata.getHours());
        var minute = this.getPrefixNum(mydata.getMinutes());
        var second = this.getPrefixNum(mydata.getSeconds());
        str = "[" + hour + ":" + minute + ":" + second + "]   ";
        return str;
    };
    CTimeFormat.getPrefixNum = function (param1) {
        if (param1 < 10 && param1 >= 0) {
            return "0" + param1.toString();
        }
        return param1.toString();
    };
    /**
     * 功能：获得系统时间
     * @return  返回格式: 01:32:18
     */
    CTimeFormat.getTime1 = function () {
        var str = "";
        var mydata = new Date();
        var hour = this.getPrefixNum(mydata.getHours());
        var minute = this.getPrefixNum(mydata.getMinutes());
        var second = this.getPrefixNum(mydata.getSeconds());
        str = hour + ":" + minute + ":" + second;
        return str;
    };
    /**
     * 功能：转换时间格式，把秒转成 时：分：秒
     * @param value 秒
     * @return  返回格式: 01:32:18
     */
    CTimeFormat.formatSeconds = function (value) {
        var theTime = parseInt(value); // 秒 
        var theTime1 = 0; // 分 
        var theTime2 = 0; // 小时 
        if (theTime > 60) {
            theTime1 = theTime / 60;
            theTime = theTime % 60;
            if (theTime1 > 60) {
                theTime2 = theTime1 / 60;
                theTime1 = theTime1 % 60;
            }
        }
        var result2 = "0" + ":" + theTime;
        if (theTime1 > 0) {
            result2 = "0" + ":" + theTime1 + ":" + theTime;
        }
        if (theTime2 > 0) {
            result2 = theTime2 + "0" + ":" + theTime1 + ":" + theTime;
        }
        return result2;
    };
    /**
     *把秒转化为 29分31秒 格式
     * @param time 秒
     * @return  返回格式: 29:31
   */
    CTimeFormat.convertTime = function (time) {
        var min = Math.round(time % 3600 / 60);
        var sec = Math.round(time % 60);
        var result;
        result = (min < 10 ? "0" + min : "" + min)
            + ":" + (sec < 10 ? "0" + sec : "" + sec);
        return result;
    };
    return CTimeFormat;
}());
egret.registerClass(CTimeFormat,'CTimeFormat');
