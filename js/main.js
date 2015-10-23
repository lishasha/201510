/**
 * Created by v_lisha on 2015/9/22.
 */
var main= {
    loader: function (selector, attr, fnOne, fnEnd) {
        var i = 0;
        var srcs = [];
        var imgs = typeof selector === "string" ? $(selector + "[" + attr + "]") : $(selector).find("[" + attr + "]");
        var count = imgs.length;
        if (count == 0) {
            fnEnd && fnEnd(0);
            return;
        }
        (function () { // 同步加载
            var load = arguments.callee;
            if (i == count) {
                // var name =  (typeof selector === "string" ? selector : "." + selector.get(0).className) + " [" + attr + "]";
                // console.log(name + " 图片加载完成,count:", count);
                fnEnd && fnEnd(count);
                imgs = srcs = null;
                return;
            }
            var img = imgs[i];
            var src = img.getAttribute(attr);
            if (srcs.indexOf(src) == -1) {
                srcs.push(src);
                img.onload = function () {
                    i++;
                    fnOne && fnOne(i, count);
                    img = img.onload = null;
                    load();
                };
            } else {
                i++;
                fnOne && fnOne(i, count);
                load();
            }
            img.src = src;
            img.removeAttribute(attr);
        })();
    },
    audio: function () {
        //音乐动画停止
        var audio_on = $(".audio-on");
        var audio_off = $(".audio-up");
        var audio_bg = document.getElementById('audio-bg');
        var audio_box = $(".audio-box").on("click", function () {
            setTimeout(function () {
                if (audio_bg !== null) {
                    if (audio_bg.paused) {
                        audio_bg.play();
                        audio_on.show();
                        audio_off.hide();
                    } else {
                        audio_bg.pause();
                        audio_on.hide();
                        audio_off.show();
                    }
                }

            }, 10);
        });

    },
    screen: function () {
        //预加载
        var myScreen = $('.screen');
        var page1 = $('.page1');
        main.loader(page1, "_src", null, function () {
            main.loader(myScreen, "_src", null, function () {
                setTimeout(function () {
                    $('.page-box').show();
                    page1.addClass('show');
                }, 200);
            });
        });
    },
    pageli: function () {

    }
}

main.screen();
main.audio();

