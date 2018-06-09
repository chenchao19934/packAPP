
import Vue from 'vue';

class vueTouch {
    constructor(el, binding, type, vnode) {
        this.obj=el;
        this.binding=binding;
        this.touchType=type;
        this.vueTouches={x:0,y:0};
        this.vueMoves=true;
        this.vueLeave=true;
        this.longTouch=true;
        this.vueCallBack=typeof(binding.value)=="object"?binding.value.fn:binding.value;
        this.obj.addEventListener("touchstart",e => {
            this.start(e);
        },false);
        this.obj.addEventListener("touchend",e => {
            this.end(e);
        },false);
        this.obj.addEventListener("touchmove",e => {
            this.move(e);
        },false);
        vnode.key = this.randomString()
    }

    start(e) {
		this.vueMoves=true;
		this.vueLeave=true;
		this.longTouch=true;
		this.vueTouches={x:e.changedTouches[0].clientX,y:e.changedTouches[0].clientY};	
		this.time=setTimeout(() => {
			if(this.vueLeave&&this.vueMoves){
				this.touchType=="longtap"&&this.vueCallBack(this.binding.value,e);
				this.longTouch=false;
			};
		},1000);
	}

    end(e) {
		const disX=e.changedTouches[0].clientX-this.vueTouches.x;
		const disY=e.changedTouches[0].clientY-this.vueTouches.y;
		clearTimeout(this.time);
		if(Math.abs(disX)>10||Math.abs(disY)>100){
			this.touchType=="swipe"&&this.vueCallBack(this.binding.value,e);
			if(Math.abs(disX)>Math.abs(disY)){
				if(disX>130 && disY<200){
					this.touchType=="swiperight"&&this.vueCallBack(this.binding.value,e);
				};
				if(disX<-130 && disY>-200){
					this.touchType=="swipeleft"&&this.vueCallBack(this.binding.value,e);
				};
			}else{
				if(disY>10){
					this.touchType=="swipedown"&&this.vueCallBack(this.binding.value,e);
				};
				if(disY<-10){
					this.touchType=="swipeup"&&this.vueCallBack(this.binding.value,e);
				};	
			};
		}else{
			if(this.longTouch&&this.vueMoves){
				this.touchType=="tap"&&this.vueCallBack(this.binding.value,e);
				this.vueLeave=false
			};
		};
	}

    move(e) {
		this.vueMoves=false;
	}

    getAngel(x1, y1, x2, y2) {
        let x = Math.abs(x1 - x2),
        	y = Math.abs(y1 - y2),
			z = Math.sqrt(x*x + y*y),
			angle = Math.floor((180/(Math.PI/Math.acos(y / z))));

		// return  Math.round((Math.asin(y / z)));

        // if(x2>x1&&y2>y1){//鼠标在第四象限
        // 	angle = 180 - angle;
        // }

        // if(x2==x1&&y2>y1){//鼠标在y轴负方向上
        // 	angle = 180;
        // }

        // if(x2>x1&&y2==y1){//鼠标在x轴正方向上
        // 	angle = 90;
        // }

        // if(x2<x1&&y2>y1){//鼠标在第三象限
        // 	angle = 180+angle;
        // }

        // if(x2<x1&&y2==y1){//鼠标在x轴负方向
        // 	angle = 270;
        // }

        // if(x2<x1&&y2<y1){//鼠标在第二象限
        // 	angle = 360 - angle;
        // }
        return angle;
    }

    randomString() {
        let len = 10,
			$chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678',
			maxPos = $chars.length,
			pwd = '';
        for (let i = 0; i < len; i++) {
			pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
		}
        return pwd;
    }
}
Vue.directive("tap",{
	bind:function(el,binding,vnode){
		new vueTouch(el,binding,"tap",vnode);
	}
});
Vue.directive("swipe",{
	bind:function(el,binding,vnode){
		new vueTouch(el,binding,"swipe",vnode);
	}
});
Vue.directive("swipeleft",{
	bind:function(el,binding,vnode){
		new vueTouch(el,binding,"swipeleft",vnode);
	}
});
Vue.directive("swiperight",{
	bind:function(el,binding,vnode){
		new vueTouch(el,binding,"swiperight",vnode);
	}
});
Vue.directive("swipedown",{
	bind:function(el,binding,vnode){
		new vueTouch(el,binding,"swipedown",vnode);
	}
});
Vue.directive("swipeup",{
	bind:function(el,binding,vnode){
		new vueTouch(el,binding,"swipeup",vnode);
	}
});
Vue.directive("longtap",{
	bind:function(el,binding,vnode){
		new vueTouch(el,binding,"longtap",vnode);
	}
});