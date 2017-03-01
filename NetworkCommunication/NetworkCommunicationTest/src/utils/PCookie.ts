class PCookie {
	public constructor() {

		//使用方法
		// this.setCookie("p0", "111", 365);
		// this.getCookie("p0")
	}

	/**
	* 写cookies;
	* 在默认的情况下，cookie 会在浏览器关闭的时候自动清除，但是我们可以通过expires来设置 cookie 的有效期。语法如下：
	*/
    private setCookie(name, value, expiredays) {
        //var expiredays = 30;
        var exp = new Date();
        exp.setTime(exp.getTime() + expiredays * 24 * 60 * 60 * 1000);
        document.cookie = name + "=" + value + ";expires=" + exp.toString();
    }

    //读cookies
    private getCookie(name) {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg))
            return arr[2];
        else
            return null;
    }

    //删cookies
    private delCookie(name) {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval = this.getCookie(name);
        if (cval != null)
            document.cookie = name + "=" + cval + ";expires=" + exp.toString();
    }

}