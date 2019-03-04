window.addEventListener('load',function(){
	(function(){
	  class bannerFade {
			constructor(containerElement,imgList,prevElement,nextElement,navList,speed,delay) {
				this.containerElement=containerElement;
				this.imgList=imgList;
				this.prevElement=prevElement;
				this.nextElement=nextElement;
				this.navList=navList;
				this.speed=speed;
				this.delay=delay;
				this.length=this.imgList.length;  //图片数量
				this.time=null;  //轮播定时器
				this.index=0;  //当前图片位置
				this.nextIndex=1;  //下一张图片位置
			}
			init() {
				let _this=this;
				_this.time=setInterval(function(){
					_this.next();
		    },_this.delay);
			}
			fade(index,nextIndex) {
				this.imgList[index].style.WebkitAnimation='hide '+this.speed/1000+'s 1 forwards';
				this.imgList[nextIndex].style.WebkitAnimation='show '+this.speed/1000+'s 1 forwards';
				this.imgList[index].style.zIndex=0;
			  this.imgList[nextIndex].style.zIndex=1;
				this.navList[index].className='';
				this.navList[nextIndex].className='active';
				this.index=this.nextIndex;
			}
			prev() {
				if(this.index==0){
				  this.nextIndex=this.length-1;
			  }else{
			  	this.nextIndex=this.index-1;
			  }
			  this.fade(this.index,this.nextIndex);
			}
			next() {
				if(this.index==this.length-1){
					this.nextIndex=0;
				}else{
					this.nextIndex=this.index+1;
				}
				this.fade(this.index,this.nextIndex);
			}
			turn(nextIndex) {
	  		this.nextIndex=nextIndex;
	  		this.fade(this.index,this.nextIndex);
			}
			clearTime() {
				clearInterval(this.time);
			}
		};
		let bannerObjArray=new Array();
		let bannerLength=document.getElementsByClassName('banner-container').length;
		for(let i=0; i<bannerLength; i++){
			let bannerContainer=document.getElementsByClassName('banner-container')[i];  //banner容器元素
		  let bannerImg=bannerContainer.getElementsByClassName('banner-img')[0].getElementsByTagName('img');  //图片元素
		  let bannerPrev=bannerContainer.getElementsByClassName('banner-prev')[0];  //左箭头元素
		  let bannerNext=bannerContainer.getElementsByClassName('banner-next')[0];  //右箭头元素
		  let bannerNav=bannerContainer.getElementsByClassName('banner-nav')[0].getElementsByTagName('span');  //banner导航元素
		  let speed=bannerContainer.dataset.speed;  //动画速度
		  let delay=bannerContainer.dataset.delay;  //时间间隔

		  bannerObjArray[i]=new bannerFade(bannerContainer,bannerImg,bannerPrev,bannerNext,bannerNav,speed,delay);
			bannerObjArray[i].prevElement.onclick=function(){
				bannerObjArray[i].prev();
			};
			bannerObjArray[i].nextElement.onclick=function(){
				bannerObjArray[i].next();
			};
			for(let j=0; j<bannerObjArray[i].navList.length; j++){
				bannerObjArray[i].navList[j].onclick=function(){
					bannerObjArray[i].turn(j);
				}
			}
			bannerObjArray[i].containerElement.onmouseover=function(){
				bannerObjArray[i].clearTime();
			}
			bannerObjArray[i].containerElement.onmouseout=function(){
				bannerObjArray[i].init();
			}
			bannerObjArray[i].init();
		}
		document.addEventListener('visibilitychange', function(){
	  	if(document.visibilityState=='hidden'){
	  		for(let i=0; i<bannerObjArray.length; i++){
	  			bannerObjArray[i].clearTime();
	  		}
	  	}else{
	  		for(let i=0; i<bannerObjArray.length; i++){
	  			bannerObjArray[i].init();
	  		}
	  	}
	  }, false);
		/*function fade(index,nextIndex,imgList,navList,speed) {
			imgList[index].style.WebkitAnimation='hide '+speed/1000+'s 1 forwards';
			imgList[nextIndex].style.WebkitAnimation='show '+speed/1000+'s 1 forwards';
			imgList[index].style.zIndex=0;
		  imgList[nextIndex].style.zIndex=1;
			navList[index].className='';
			navList[nextIndex].className='active';
		}
		function next(index,nextIndex,bannerImg,bannerNav,speed){
			fade(index,nextIndex,bannerImg,bannerNav,speed);
			index=nextIndex;
			if(index==bannerImg.length-1){
				nextIndex=0;
			}else{
				nextIndex=index+1;
			}
			return {
				_index: index,
				_nextIndex: nextIndex
			};
		}
		let bannerLength=document.getElementsByClassName('banner-container').length;
		for(let i=0; i<bannerLength; i++){
			let bannerContainer=document.getElementsByClassName('banner-container')[i];  //banner容器元素
		  let bannerImg=bannerContainer.getElementsByClassName('banner-img')[0].getElementsByTagName('img');  //图片元素
		  let bannerPrev=bannerContainer.getElementsByClassName('banner-prev')[0];  //左箭头元素
		  let bannerNext=bannerContainer.getElementsByClassName('banner-next')[0];  //右箭头元素
		  let bannerNav=bannerContainer.getElementsByClassName('banner-nav')[0].getElementsByTagName('span');  //banner导航元素
		  let speed=bannerContainer.dataset.speed;  //动画速度
		  let delay=bannerContainer.dataset.delay;  //时间间隔

			let index=0;
			let nextIndex=1;
			let time=null;

			time=setInterval(function(){
				let {_index,_nextIndex}=next(index,nextIndex,bannerImg,bannerNav,speed);
				index=_index;
				nextIndex=_nextIndex;
			},delay);
			bannerContainer.onmouseover=function(){
				clearInterval(time);
			};
			bannerContainer.onmouseout=function(){
				time=setInterval(function(){
					let {_index,_nextIndex}=next(index,nextIndex,bannerImg,bannerNav,speed);
					index=_index;
					nextIndex=_nextIndex;
				},delay);
			};
			bannerPrev.onclick=function(){
			  if(index==0){
				  nextIndex=bannerImg.length-1;
			  }else{
			  	nextIndex=index-1;
			  }
			  fade(index,nextIndex,bannerImg,bannerNav,speed);
			  index=nextIndex;
			};
			bannerNext.onclick=function(){
				if(index==bannerImg.length-1){
					nextIndex=0;
				}else{
					nextIndex=index+1;
				}
				fade(index,nextIndex,bannerImg,bannerNav,speed);
				index=nextIndex;
			};
			for(let j=0; j<bannerNav.length; j++){
				bannerNav[j].onclick=function(){
					nextIndex=j;
	  		  fade(index,nextIndex,bannerImg,bannerNav,speed);
	  		  index=nextIndex;
				}
			}
			document.addEventListener('visibilitychange', function(){
		  	if(document.visibilityState=='hidden'){
		  		clearInterval(time);
		  	}else{
			  	time=setInterval(function(){
						let {_index,_nextIndex}=next(index,nextIndex,bannerImg,bannerNav,speed);
				    index=_index;
				    nextIndex=_nextIndex;
				  },delay);
		  	}
		  }, false);
		}*/
	})();
},false);