 /*
  * 
  * 轮播2
  * 在html中同时引用jq 2.1.4与本文件
  * 附带用$(function (){lunbo(//这里写你想要的速度)});触发插件
  * 要求：
  * <div class="imgLun">//轮播图的位置
    <div class="list" style="left: -600px;//轮播图的宽度">
        <img src="img/1.jpg" alt="1"/>
        <img src="img/2.jpg" alt="2"/>
        <img src="img/3.jpg" alt="3"/>
        <img src="img/4.jpg" alt="4"/>
        <img src="img/5.jpg" alt="5"/>
        
       <!-- <img src="img/1.jpg" alt="5"/>-->
    </div>//所有图片都应按顺序修改文件名，放在img文件夹中
   <div class="banner">
   	<div class="miniPic">
        
        <img src="img/1.jpg" alt="1" title="hi"/>
        <img src="img/2.jpg" alt="2" title="i'm'"/>
        <img src="img/3.jpg" alt="3" title="fine"/>
        <img src="img/4.jpg" alt="4" title="thank"/>
        <img src="img/5.jpg" alt="5" title="you"/>
    
   	 </div> //底部导航栏，通过修改title属性修改显示在右侧的标题
   	 <div class="picTitle">
   	 	
   	 </div>
   	  
   </div>
    <a href="javascript:;" id="prev" class="arrow">&lt;</a>
    <a href="javascript:;" id="next" class="arrow">&gt;</a>
</div>//左右箭头必须按照以上命名规则。位置形态可以修改。

  */
 
 
 
 
 function lunbo (speed) {
            var container = $('.imgLun');
            var list = $('.list');
            var miniPic = $('.miniPic img');
            var prev = $("#prev");
            var next = $('#next');
            var index = 1;
            var imgList = $('.list img');
            var len = $(".list img").length;
            var timer;   
            var myIndex;
			var buttonsLen = $(".buttons span").length;
			var imgWid = parseInt(imgList.eq(0).css("width")) ;
		    var i = combine();
		    var j = $(".picTitle").text(miniPic.eq(index-1).attr("title"));
			function combine (){
				Lcloned = imgList.eq(len-1).clone();			
				Fcloned = imgList.eq(0).clone();
				Lcloned.insertBefore(imgList.eq(0));
				Fcloned.insertAfter(imgList.eq(len-1));
			}
			//自动加入第一张与最后一张的过度图片
            function animate (offset) {
                var left = parseInt(list.css('left')) + offset;
                if (offset>0) {
                    offset = '+=' + offset;
                }
                else {
                    offset = '-=' + Math.abs(offset);
                }
                list.animate({'left': offset}, speed, function () {
                 
                    if(left > -200){
                        list.css('left', -imgWid* len);
                    }
                    if(left < (-imgWid * len)) {
                        list.css('left', -imgWid);
                    }
                  	if(myIndex != index && myIndex !=undefined )
                  	{
                  		 var offset = -imgWid * (myIndex - index);
                          index = myIndex;
                  		animate(offset);
                  		return;
                  	}
                });
               miniPic.eq(index-1).css("border-color","orange"/*底部导航栏选定图片边框颜色*/).siblings().css("border-color","white");
                $(".picTitle").text(miniPic.eq(index-1).attr("title"));//标题获取
            }

			
            next.click(function () {
            	
                if (list.is(':animated')) {
                    return;
                }
                if (index == len) {
                    index = 1;
                }
                else {
                    index += 1;
                }
                myIndex = index;
                animate(-imgWid);
              	
            });

            prev.click( function () {
                if (list.is(':animated')) {
                    return;
                }
                if (index == 1) {
                    index = len;
                }
                else {
                    index -= 1;
                }
                myIndex = index;
                animate(imgWid);
                //showButton();
               
            });

            miniPic.each(function () {
                 $(this).bind('mouseover', function () {
                     if((list.is(':animated') ||$(this).attr('class')=='on')) {
                       myIndex = parseInt($(this).index())+1;
                        return;
                     }
                     
                     $(".picTitle").text($(this).attr("title"));
                      myIndex = parseInt($(this).index())+1;
                     var offset = -imgWid * (myIndex - index);
                      index = myIndex;
                     animate(offset);
                 })
            });//底部导航栏鼠标移上去自动切换。


        };
   