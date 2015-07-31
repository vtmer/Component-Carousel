/*
 * 特别2
 * 
  * 在html中同时引用jq 2.1.4与本文件
  * 附带用$(function (){lunbo(speed//动画速度，imgCount//总共图片数量，imgRoad//图片所在路径，buttonheight//底部导航块选定时高度)});触发插件
  * 要求：
  *<div class="lunbo">//轮播图位置
			<div class="imgList">//图片放置区（只需要放置三幅图片，剩余插件会从文件夹中自动获取，命名一定要按照轮播顺序排列）
				<img src="img/特别/5.jpg"/>
				<img src="img/特别/1.jpg"/>
				<img src="img/特别/2.jpg"/>
				
			</div>
			<div class="banner">
				<ul>
					
				</ul>
			</div>//底部导航栏，导航块个数由插件自动添加
		</div>
 * 参考css：
 * 	.lunbo {
				width: 1200px;
				height: 500px;
				background-color: black;
				position: relative;
				overflow: hidden;
			}
			.imgList {
				overflow: hidden; 	
			}
			.imgList img {
				position: absolute;
				width: 800px;
				height: 400px;
				top: 50px;
				opacity: 0.7;
			}
			.imgList img:nth-child(2) {
				position: absolute;
				top: 0px;
				width: 1000px;
				height: 500px;
				opacity: 1;
			}
			.banner ul li {
				width: 40px;
				height: 20px;
				background-color: white;
				opacity: 0.6;
				
			}
			.banner {
				position: absolute;
				width: 100%;
				bottom: 27px;
				z-index: 2;
				height: 20px;
				overflow: visible;
			}
			.banner ul {
				text-align: center;
			}
			.banner li {
				float: left;
				list-style: none;
				position: relative;
			}
			.banner ul:first-child {
				margin-left:480px ;
			}
			.banner li+li {
				margin-left: 20px;
			}
 * 
 */




function lunbo (speed,imgCount,imgRoad,buttonheight){
				var container = $(".lunbo");
				var banner = $('.banner');
				var imgList = $('.imgList img');
				var p = createBanner();
				var index = 1;
				var imgWid = parseInt(imgList.css('width'));
				var o = imgList.eq(index).css('display','block');
				var y = picPos();
				var buttons = $('.banner li');
				var w = buttons.eq(0).css('opacity',1).animate({top: -5+'px',height:buttonheight*1.25+'px' });
				
				function createBanner (){
					for (var i = 1;i<=imgCount; i++) {
						$("<li>"+i+"</li>").appendTo($('.banner ul'));						
					}
				}
				function picPos (){
					imgList.eq(0).css('left',-imgWid*7/8 +"px");
					imgList.eq(1).css('left',imgWid/8 +"px");
					imgList.eq(2).css('left',imgWid*11/8+"px");
				}
				imgList.eq(0).hover(function (){
					imgList.eq(1).animate({
						left: imgWid/8+100+'px',
						height: '400px',
						width: '900px',
						top:'50px'
					},speed);
					
					imgList.eq(0).animate({
						left:-imgWid*7/8+100+'px',
						height:'450px',
						top:'25px'
					},speed)
				},function (){
					imgList.eq(1).animate({
						left: imgWid/8+'px',
						height: '500px',
						width: '1000px',
						top:'0px'
					},speed);
					
					imgList.eq(0).animate({
						left:-imgWid*7/8+'px',
						height:'400px',
						top:'50px'
					},speed)
				})
				imgList.eq(2).hover(function (){
					imgList.eq(1).animate({
						//left: imgWid/8+100+'px',
						height: '400px',
						width: '900px',
						top:'50px'
					},speed);
					
					imgList.eq(2).animate({
						left:imgWid*11/8-100+'px',
						height:'450px',
						top:'25px'
					},speed)
				},function (){
					imgList.eq(1).animate({
						left: imgWid/8+'px',
						height: '500px',
						width: '1000px',
						top:'0px'
					},speed)
					;
					imgList.eq(2).animate({
						left:imgWid*11/8+'px',
						height:'400px',
						top:'50px'
					},speed)
				})
				imgList.eq(0).bind('click',function (){
					index--;
					index = luoji(index);
					animate (index,'l');
					}
				);
				function luoji (index){
					var  picIndex = index;
					if (index < 1) {
						picIndex = imgCount;
					}
					if (index > imgCount) {
						picIndex = 1;
					}
					return picIndex;
				}
				imgList.eq(2).bind('click',function (){
					index++;
					index = luoji(index);
					animate (index,'r');
					}
					
				);
				function animate (picindex,direct){
					var num;
					var pos;
					var next;
					if(direct == 'l')
					{
						num=0;
						next =-1;
						pos = -imgWid*7/8;
					}
					else
					{
						num = 2;
						next = 1;
						pos = imgWid*11/8;
					}
					if ( parseInt(imgList.eq(1).css('height')) == 500) {
						imgList.eq(1).animate({
						left: imgWid/8+100+'px',
						height: '400px',
						width: '900px',
						top:'50px'
					},speed);
					
					imgList.eq(num).animate({
						left:pos+'px',
						height:'450px',
						top:'25px'
					},speed)
					}
						imgList.eq(num).css('z-index',1);
						imgList.eq(num).animate({
						left:imgWid/8+100+"px",
						height: '500px',
						width: '1000px',
						opacity: 1
					},speed,function (){
						imgList.eq(1).attr('src',imgRoad+picindex+".jpg");
						picindex--;
						//console.log(index);
						
						imgList.eq(0).attr('src',imgRoad+luoji(picindex)+".jpg");
						picindex++;
						picindex++;
						imgList.eq(2).attr('src',imgRoad+luoji(picindex)+".jpg");
						picindex--;
						imgList.eq(1).css('left',imgWid/8 +'px').css('width','1000px').css('height','500px').css('top','0px');
						imgList.eq(num).css('width','800px').css('opacity',0.7).css('left',pos+"px").css('height','400px').css('top','50px');
						buttons.eq(picindex-1).css('opacity',1).animate({top: -5+'px',height:buttonheight*1.25+'px' }).siblings().css('top',0+'px').css('height',buttonheight+'px').css('opacity',0.6);
					}
					)
						
				}
				 buttons.each(function () {
                 $(this).hover(function (){
                 	$(this).animate({'opacity':1},10);
                 },function(){
                 	$(this).animate({'opacity':0.6},10);
                 } )
            });
            buttons.each(function(){
            	$(this).bind('click',function (){
            		console.log($(this).index());
            		console.log("nidex="+index);
            		if ($(this).index()+1>index) {
            			animate($(this).index()+1,'r');
            			index = $(this).index()+1;
            		}
            		if ($(this).index()+1<index) {
            			animate($(this).index()+1,'l');
            			index = $(this).index()+1;
            		}
            	})
            })
			}