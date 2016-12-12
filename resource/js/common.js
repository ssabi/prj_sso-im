$(document).ready(function(){
	//Layer Popup
	hasDataAttr("[data-layer-popup]", function($ele){
		$ele.each(function(){
			$(this).bind({
				"click" : function(e){
					e.preventDefault();

					var $this = $(this), data = $(this).data("layer-popup");
					//console.log(e.currentTarget.href);
					var href = e.currentTarget.href;
					var name = data.name;
					var width = data.width;
					var height = data.height;
					var left = ($(window).width() - width) /2 + 'px';
					var top = ($(window).height() - height) /2 + 'px';

					var settings = resizePop(width, height, left, top);
					var tw = settings.tmpWidth;
					var th = settings.tmpHeight;
					var tl = settings.tmpLeft;
					var tt = settings.tmpTop;

					//$("body").css("overflow", "hidden");
					$("body").addClass("ovf_hdn");

					//BlockUI ifrmae
					$.blockUI({
						message : $('<iframe src="'+href+'" width="100%" height="100%" style="border:0"></iframe>'),
						draggable: true,
						css:{
							padding:0,
							margin:0,
							/*
							width:width,
							height:height,
							top: top,
							left: left,
							*/
							width:tw,
							height:th,
							top: tt,
							left: tl,
							textAlign:'left',
							color:'#000',
							border:'0',
							backgroundColor:'#fff',
							cursor:'default',
							overflow:'hidden'
						},
						// styles for the overlay
						overlayCSS:{
							backgroundColor: '#000',
							opacity:0.5,
							cursor:'auto'
						},
						fadeIn:200,
						fadeOut:100,
						onUnblock: function(){
							//$("body").css({"overflow":"visible", "overflow-y":"scroll"});
							$("body").removeClass("ovf_hdn");
						},
						onOverlayClick: $.unblockUI
					});
				}
			});
		});
	});

	//팝업창 닫기
	hasDataAttr("[data-pop-close]", function($ele){
		$ele.each(function(idx){
			var $this = $(this), val = $(this).data("pop-close");

			$this.on({
				"click" : function(e){
					e.preventDefault();

					//console.log(val);
					if(val == "popup"){
						//window.close();
						parent.$.unblockUI();
						//$("body", window.parent.document).css({"overflow":"visible", "overflow-y":"scroll"});
						$("body", window.parent.document).removeClass("ovf_hdn");
					}
				}
			});
		});
	});
	hasDataAttr("[data-pop-close]", function($ele){
		$ele.each(function(idx){
			var $this = $(this), data = $(this).data("pop-close");

			$this.on({
				"click" : function(e){
					e.preventDefault();

					var txt = data.txt;
					var val = data.val;

					if(txt == null || txt == ""){
						txt = "팝업을 닫으시겠습니까?";
					}
					//console.log(val);
					if(val == "popup"){
						//window.close();
						if(confirm(txt)){
							parent.$.unblockUI();
							//$("body", window.parent.document).css({"overflow":"visible", "overflow-y":"scroll"});
							$("body", window.parent.document).removeClass("ovf_hdn");
						}
					}
				}
			});
		});
	});

	//사용자 유형
	$(".user").bind({
		"click" : function(){
			var val = $(this).data("user");
			var showObj = val.show;
			var hideObj = val.hide;

			$(showObj).show();
			$(hideObj).hide();
		}
	});

	//추가정보
	$(".add_info").bind({
		"click" : function(){
			var val = $(this).val();
			var val = $(this).data("type");
			var showObj = val.show;
			var hideObj = val.hide;

			$(showObj).show();
			$(hideObj).hide();
			$(".tel").selectOrDie("destroy").selectOrDie({customClass: 'tel',size: 10});
		}
	});

	//인증 번호 요청 - selectbox
	$(".agency").selectOrDie({placeholder: "이동통신사를 선택하세요.",customClass: 'w100',size: 10});
	$(".gender").selectOrDie({placeholder: "성별을 선택하세요.",customClass: 'w100',size: 10});
	$(".inex").selectOrDie({placeholder: "내외국인을 선택하세요.",customClass: 'w100',size: 10});

	//loadFrame();
});

//HasData
var hasDataAttr = function(ctx, func){
	if($(ctx).length){
		var $ctx = $(ctx);
		if(func !== undefined){
			func($ctx);
		}else{
			console.log('callback function is not defined.');
		}
	}
}

//Layer Popup Resizing
var resizePop = function(width, height, left, top){
	ww = $(window).width();
	hh  = $(window).height();
	var tmpWidth, tmpHeight, tmpLeft, tmpTop;
	var dW = width, dH = height, dL = left, dT = top;

	tmpWidth = dW;
	tmpHeight = dH;
	tmpLeft = (ww - dW) / 2;
	tmpTop = (hh - dH) / 2;

	$("div.blockPage").css({"width" : tmpWidth, "height" : tmpHeight, "top" : tmpTop, "left" : tmpLeft, "-webkit-overflow-scrolling":"touch"});

	$(window).on('resize',function(){
		ww = $(window).width();
		hh  = $(window).height();

		tmpWidth = dW;
		tmpHeight = dH;
		tmpLeft = (ww - dW) / 2;
		tmpTop = (hh - dH) / 2;
	
		$("div.blockPage").css({"width" : tmpWidth, "height" : tmpHeight, "top" : tmpTop, "left" : tmpLeft, "-webkit-overflow-scrolling":"touch"});
	});

	return {tmpWidth:tmpWidth, tmpHeight:tmpHeight, tmpLeft:tmpLeft, tmpTop:tmpTop};
}

/*
$(window).load(function(){
	loadFrame();
});
$(window).resize(function(){
	loadFrame();
});

var loadFrame = function(){
	$(".login_box iframe").load(function(){
		var height = this.contentWindow.document.body.scrollHeight;
		$(".login_box iframe").attr("height", height).css("height", height);
		var boxHeight = $("#wrapper .login_box .inner").outerHeight(true);

		$("#wrapper .login_box").css({
			"height" : boxHeight,
			"margin-top": ((boxHeight + 92)  / 2) * -1
		});
	});
}
*/