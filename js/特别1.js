	 /*
  * 
  * 特别1
  * 在html中同时引用jq 2.1.4与本文件
  * 附带用$(function (){lunbo(//这里写你想要的速度)});触发插件
  * 要求：
  * <div class="imgLun">
    <div class="list" >//图片放置区，图片的title属性将会被自动添加为时光轴的标题
       <!-- <img src="img/5.jpg" alt="1"/>-->
        <img src="img/1.jpg" alt="1" title="123"/>
        <img src="img/2.jpg" alt="2" title="456"/>
        <img src="img/3.jpg" alt="3" title="678"/>
        <img src="img/4.jpg" alt="4" title="890"/>
        <img src="img/5.jpg" alt="5" title="1243"/>
        
       <!-- <img src="img/1.jpg" alt="5"/>-->
    </div>
   <div class="timeLine">//时光轴，其中的点插件自动添加，不需要手动
   	<ul>
   
   	</ul>
   </div>
</div>//轮播图的位置
参考css：
.timeLine {
        	background-color: #464445;
        	width:3px;
        	height:300px;
        	position: absolute;
        	right: 50px;
        	top: 45px;
        	border-radius: 5px;
        	z-index: 2;
        	overflow: visible;
        }
        .timeLine ul li {
        	position: absolute;
        	left: -3.5px;
        	width: 10px;
        	height: 10px;
        	border-radius: 100%;
        	background-color: #0b0c0c;
        	list-style: none;
        	text-align: center;
        	font-size: 5px;
        	overflow: visible;
        }
        .timeLine ul li span {
        position: absolute;
        left: -45px;
        font-size: 10px;
        font-family: "微软雅黑";
        color: white;
        opacity: 0.9;
        }
        .timeLine ul li div {
        	width: 20px;
        	height: 20px;
        	background-color: black;
        	opacity: 0.6;
        	position: absolute;
        	top: -5px;
        	left: -5px;
        	visibility: hidden;
        	border-radius: 100%;
        }
  */
	
	
	function lunbo (speed) {
            var container = $('.imgLun');
            var list = $('.list');
            var miniPic = $('.miniPic img');
            var prev = $("#prev");
            var next = $('#next');
            var index = 1;
            var imgList = $('.list img');
            var len = parseInt($(".list img").length);
            var timer;   
            var myIndex; 
            var i = createPoint();
			var picPoint = $(".timeLine ul li");
			var imgWid = parseInt(imgList.eq(0).css("width")) ;
		   
		    var j = $(".list img").eq(0).css("display","block");
			
			function createPoint (){
				heightline = parseInt($(".timeLine").css("height"));
				for (var m = 0; m<len; m++)
				{	
					$("<li><span>"+$(".list img").eq(m).attr("title")+"</span><div></div></li>").css("top",(m+1/2)*heightline/(len)+"px").appendTo($(".timeLine ul"));
				
				}
			}
			picPoint.each(function () {
                 $(this).bind("mouseover" ,function () {
              	
                     $(".list img").eq($(this).index()).show(speed).siblings().css("display","none");
                 	 for (var q = 0;q<len;q++  ) {
                 	 	if (q == $(this).index()) {
                 	 		$(".timeLine ul span ").eq(q).css('font-size',15+"px").css('opacity','1');
                 	 		$(".timeLine ul div ").eq(q).css('visibility',"visible");
                 	 	} else{
                 	 		$(".timeLine ul span ").eq(q).css('font-size',10+"px").css('opacity','0.9');
                 	 		$(".timeLine ul div ").eq(q).css('visibility',"hidden");
                 	 	}
                 	 	
                 	 }
                 	 
                 })
            });
        


        };