
/**
 * 一个jQuery购物车抛物线插件
 * @method parabola
 * 
 * @param {origin,target,element, time}
 */

(function ($) {
    $.extend({
        "parabola":function (config) {
	    const INTERVAL = 15;
			
            var b = 0,//抛物线函数参数
                x1, y1, x2, y2,
                movex, movey, diffx, diffy;

            var _config = config || {};

            // 起点
            var origin = $(_config.origin) || null;//已经生成jquery对象
            // 终点
            var target = $(_config.target) || null;
            // 运动的元素
            var element = $(_config.element) || null;

            // 曲线弧度
            var a = _config.a || 0.0003;
            // 运动时间(ms)
            var time = _config.time || 1000;

            var init = function () {
                x1 = origin.offset().left;
                y1 = origin.offset().top;//起点坐标

                x2 = target.offset().left;
                y2 = target.offset().top;//终点坐标
                
                movex = x1;
                movey = y1;//平移距离
                
                diffx = x2 - x1;
                diffy = y2 - y1;//平移后终点坐标

                // 已知a = 3, 根据抛物线函数 y = a*x*x + b*x + c
                // 将抛物线起点平移到坐标原点[0, 0]，终点随之平移，
                // 那么抛物线经过原点[0, 0] 得出c = 0;
                // 终点平移后得出：y2-y1 = a*(x2 - x1)*(x2 - x1) + b*(x2 - x1)
                // 即 diffy = a*diffx*diffx + b*diffx;
                // 可求出常数b的值
                b = (diffy - a * diffx * diffx) / diffx;

                element.css({
                    left: x1,
                    top: y1
                });
                
                move();
            };


            var move = function () {
                var start = new Date().getTime();
                    
                var timer = setInterval(function () {
                    if (new Date().getTime() - start > time) {
                        clearInterval(timer);
                        element.css({
                            left: x2,
                            top: y2
                        });
                        typeof _config.callback === 'function' && _config.callback(element);//删除运动元素
                        return;
                    }
                    var x = ((new Date().getTime() - start) / time) * diffx;//必须在指定的时间内跑完差值，到时间即为乘以1
                    var y = a * x * x + b * x;
                    element.css({
                        left: x + movex,
                        top: y + movey
                    })
                }, INTERVAL);
               
            };

            init();
            
            return this;//jQuery链式调用

        }
        
           
        
    });
})(jQuery);
