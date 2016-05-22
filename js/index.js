$(document).on('touchmove',function(ev){
    ev.preventDefault();
});
$(function(){
    //背景音乐
    var bgmusic = new Audio();
    bgmusic.src = "images/music.mp3";
    bgmusic.loop = true;
    bgmusic.autoplay = false;
    var flog = false;
    var musicBtn = document.querySelector('#music_box');
    musicBtn.addEventListener('click',function(){
        if(flog == false){
            this.className = '';
            bgmusic.pause();
            flog = true;
        }else{
            this.className = 'm_act';
            bgmusic.play();
            flog = false;
        }
    },false);
    var $main = $('#main');
    var $li=$('#list').children('li');
    var viewHeight=$(window).height();
    var viewWidth = $(window).width();
    function slidePage(){
        var startY = 0;
        var step = 1/4;
        var nowIndex = 0;
        var nextorprevIndex = 0;
        var flog = true;
        $li.on('touchstart',function(ev){
            if(flog){
                flog = false;
                var touch = ev.originalEvent.changedTouches[0];
                startY = touch.pageY;
                nowIndex = $(this).index();
                $li.on('touchmove.move',function(ev){
                    var touch = ev.originalEvent.changedTouches[0];
                    $(this).siblings().hide();
                    if( touch.pageY < startY ){   //↑
                        nextorprevIndex = nowIndex == $li.length-1 ? 0 : nowIndex + 1;
                        $li.eq(nextorprevIndex).css('transform','translate(0,'+( viewHeight + touch.pageY - startY )+'px)');

                    }
                    else{   //↓
                        nextorprevIndex = nowIndex == 0 ? $li.length-1 : nowIndex - 1;
                        $li.eq(nextorprevIndex).css('transform','translate(0,'+( -viewHeight + touch.pageY - startY )+'px)');

                    }
                    $li.eq(nextorprevIndex).show().addClass('zIndex');

                    //$(this).css('transform','translate(0,'+ (touch.pageY - startY)*step +'px) scale('+(1 - Math.abs((touch.pageY - startY))*step/viewHeight )+')');
                    $(this).css({
                        'transform':'translate(0,'+ (touch.pageY - startY)*step +'px) scale('+(1 - Math.abs((touch.pageY - startY))*step/viewHeight )+')',
                        'opacity':0.3,
                        'background-color':'rgba(255,255,255,0.4)'
                    });
                });
                $li.on('touchend.move',function(ev){
                    var touch = ev.originalEvent.changedTouches[0];
                    if( touch.pageY < startY ){   //↑
                        $li.eq(nowIndex).css('transform','translate(0,'+(-viewHeight * step)+'px) scale('+(1 - step)+')');
                    }
                    else{  //↓
                        $li.eq(nowIndex).css('transform','translate(0,'+(viewHeight * step)+'px) scale('+(1 - step)+')');
                    }
                    $li.eq(nowIndex).css('transition','.3s');
                    $li.eq(nextorprevIndex).css('transform','translate(0,0)');
                    $li.eq(nextorprevIndex).css('transition','.3s');
                    $li.off('.move');
                });
            }
        });
        $li.on('transitionEnd webkitTransitionEnd',function(ev){
            if(!$li.is(ev.target)){
                return;
            }
            resetFn();
        });
        function resetFn(){
            $li.css('transform','');
            $li.css('transition','');
            animatefn($li.eq(nextorprevIndex).get(0));
            $li.eq(nextorprevIndex).removeClass('zIndex').addClass('cur').siblings().removeClass('cur').hide();
            $li.css('opacity',1);
            $li.css('background-color','')
            flog = true;
        }
    }
    var SHAKE_THRESHOLD = 2000,shake_flog=false;
    var last_update = 0;
    var x = y = z = last_x = last_y = last_z = 0;
    function deviceMotionHandler(eventData) {
        var acceleration = eventData.accelerationIncludingGravity;
        var curTime = new Date().getTime();
        if ((curTime - last_update) > 100&&shake_flog) {
            var diffTime = curTime - last_update;
            last_update = curTime;
            x = acceleration.x;
            y = acceleration.y;
            z = acceleration.z;
            var speed = Math.abs(x + y + z - last_x - last_y - last_z)/diffTime * 10000;
            if (speed > SHAKE_THRESHOLD) {
                runFn();
                shake_flog=false;
            }
            last_x = x;
            last_y = y;
            last_z = z;
        }
    }
    // 判断设备是否支持 DeviceMotionEvent;
    if (window.DeviceMotionEvent) {
        shake_flog=true;
        window.addEventListener('devicemotion', deviceMotionHandler, false);
    } else {
        setTimeout(function(){
            runFn();
        },1000)
    };
    function runFn(){
        //播放mp3
        musicBtn.style.display = 'block';
        bgmusic.play();
        //动画初始化
        animateCache();
        animatefn($li.eq(0).get(0));
        //背景
        $("#star").html5_3d_animation({
            window_width: viewWidth,
            window_height: viewHeight,
            window_background: '#000',
            star_count: '100',
            star_color: '#FBFFAF',
            star_depth: '100'
        });
        //划动页面;
        slidePage();
        $('#main .load').remove();
    }
});