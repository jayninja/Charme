function ui_attachmentform()
{


}
function delAttachment(a)
{

$(a).parent().remove();
}



function ui_attach(x)
{




if (window.File && window.FileReader && window.FileList && window.Blob) {
  // Great success! All the File APIs are supported.



$(x).siblings("input").unbind('change').change(function(h)
{  
var files = h.target.files; // FileList object
var output = [];


    for (var i = 0, f; f = files[i]; i++) {

	var reader = new FileReader();
	reader.file = f; //http://stackoverflow.com/questions/4404361/html5-file-api-get-file-object-within-filereader-callback

	reader.onload = function(e) {

      $('.attachmentContainer').append("<div><a  class='delete' style='float:right' onclick='delAttachment(this)'> </a>"+ escape(this.file.name)+ "</div>");
		$('.attachmentContainer div').last().data("filecontent", reader);
    }
     reader.readAsDataURL(f) ;

    }

});
$(x).siblings("input").trigger("click");


//Access the files:
 

 	//.trigger('change', function(h){}, false);

} else {
  alert('The File APIs are not fully supported in this browser.');
}

//

}



function ui_userselect()
{
	$('.userSelectSwitcher').change(function() {
	  

	  if ($(this).val() == 3)
	$(this).siblings(".spec").show();
	else
	$(this).siblings(".spec").hide();

	});




		$('.userSelect2').each (function(index)
	{
	$(this).tokenInput("ui/actions/auto_people.php", {hintText: "Typ in a person or a list"} );
	});

	$('.userSelect').each (function(index)
	{

	if ($(this).data("styp") != 3)
	$(this).parent().hide();


    jsonp = $(this).data("json");//jquery automatically converts string to json :) 


	console.log(jsonp);
	$(this).tokenInput("ui/actions/auto_people.php", {hintText: "Typ in a person or a list"} );
	var x = this;
	jQuery.each(jsonp, function(i, val) {
	
       $(x).tokenInput("add", val);
    });


	});

}

function ui_switch()
{
//...to data-switch


}

function ui_block(content)
{
	if (!$("body .uiBlock").length)
	$("body").prepend("<div class='uiBlock'></div>");
	
	$("body .uiBlock").fadeIn(400);
	
}
function ui_unblock(content)
{
	$("body .uiBlock").fadeOut(400);

}

function ui_showBox(content, func)
{
	ui_block();
	if (!$("body .fixedBox").length)
	$("body").prepend("<div class='fixedBox'></div>");
	
	
	$("body .fixedBox").html(content);
	 	ui_userselect();

 	 $("body .fixedBox").css("margin-left", -$("body .fixedBox").width() / 2);


	$("body .fixedBox").animate({
    top: '150px',
  }, 400, function() {

 
$("body .fixedBox input:first").focus();
  	if (func)
  		func
  	
 

  });
	
}
function ui_closeBoxButton()
{
return "<a href='javascript:ui_closeBox();'>Close</a>";	
}
function ui_Button(name, func)
{
return "<a class='button' href='javascript:"+func+";'>"+name+"</a>";	
}

function ui_closeBox(content)
{
	$("body").focus();//Because if not then problem when auto complete focused 
	ui_unblock();
	var h = $("body .fixedBox").height()+100;

	$("body .fixedBox").animate({
    top: '-'+h+'px',
  }, 400, function() {
	  
	 $("body .fixedBox"). html("");
	  
  });
	
	
}

/*
Plugins
*/

//Nanoscroller
(function(c,f,g){var j,h,k,l,m;l={paneClass:"pane",sliderClass:"slider",contentClass:"content",iOSNativeScrolling:!1,preventPageScrolling:!1,disableResize:!1,alwaysVisible:!1,flashDelay:1500,sliderMinHeight:20,sliderMaxHeight:null};j="Microsoft Internet Explorer"===f.navigator.appName&&/msie 7./i.test(f.navigator.appVersion)&&f.ActiveXObject;h=null;m=function(){var b,a;b=g.createElement("div");a=b.style;a.position="absolute";a.width="100px";a.height="100px";a.overflow="scroll";a.top="-9999px";g.body.appendChild(b);
a=b.offsetWidth-b.clientWidth;g.body.removeChild(b);return a};k=function(){function b(a,b){this.el=a;this.options=b;h||(h=m());this.$el=c(this.el);this.doc=c(g);this.win=c(f);this.generate();this.createEvents();this.addEvents();this.reset()}b.prototype.preventScrolling=function(a,b){this.isActive&&("DOMMouseScroll"===a.type?("down"===b&&0<a.originalEvent.detail||"up"===b&&0>a.originalEvent.detail)&&a.preventDefault():"mousewheel"===a.type&&a.originalEvent&&a.originalEvent.wheelDelta&&("down"===b&&
0>a.originalEvent.wheelDelta||"up"===b&&0<a.originalEvent.wheelDelta)&&a.preventDefault())};b.prototype.updateScrollValues=function(){var a;a=this.content[0];this.maxScrollTop=a.scrollHeight-a.clientHeight;this.contentScrollTop=a.scrollTop;this.maxSliderTop=this.paneHeight-this.sliderHeight;this.sliderTop=this.contentScrollTop*this.maxSliderTop/this.maxScrollTop};b.prototype.createEvents=function(){var a=this;this.events={down:function(b){a.isBeingDragged=!0;a.offsetY=b.pageY-a.slider.offset().top;
a.pane.addClass("active");a.doc.bind("mousemove",a.events.drag).bind("mouseup",a.events.up);return!1},drag:function(b){a.sliderY=b.pageY-a.$el.offset().top-a.offsetY;a.scroll();a.updateScrollValues();a.contentScrollTop>=a.maxScrollTop?a.$el.trigger("scrollend"):0===a.contentScrollTop&&a.$el.trigger("scrolltop");return!1},up:function(){a.isBeingDragged=!1;a.pane.removeClass("active");a.doc.unbind("mousemove",a.events.drag).unbind("mouseup",a.events.up);return!1},resize:function(){a.reset()},panedown:function(b){a.sliderY=
(b.offsetY||b.originalEvent.layerY)-0.5*a.sliderHeight;a.scroll();a.events.down(b);return!1},scroll:function(b){a.isBeingDragged||(a.updateScrollValues(),a.sliderY=a.sliderTop,a.slider.css({top:a.sliderTop}),null!=b&&(a.contentScrollTop>=a.maxScrollTop?(a.options.preventPageScrolling&&a.preventScrolling(b,"down"),a.$el.trigger("scrollend")):0===a.contentScrollTop&&(a.options.preventPageScrolling&&a.preventScrolling(b,"up"),a.$el.trigger("scrolltop"))))},wheel:function(b){if(null!=b)return a.sliderY+=
-b.wheelDeltaY||-b.delta,a.scroll(),!1}}};b.prototype.addEvents=function(){var a;this.removeEvents();a=this.events;this.options.disableResize||this.win.bind("resize",a.resize);this.slider.bind("mousedown",a.down);this.pane.bind("mousedown",a.panedown).bind("mousewheel DOMMouseScroll",a.wheel);this.content.bind("scroll mousewheel DOMMouseScroll touchmove",a.scroll)};b.prototype.removeEvents=function(){var a;a=this.events;this.win.unbind("resize",a.resize);this.slider.unbind();this.pane.unbind();this.content.unbind("scroll mousewheel DOMMouseScroll touchmove",
a.scroll).unbind("keydown",a.keydown).unbind("keyup",a.keyup)};b.prototype.generate=function(){var a,b,i,c,d;i=this.options;c=i.paneClass;d=i.sliderClass;a=i.contentClass;!this.$el.find(""+c).length&&!this.$el.find(""+d).length&&this.$el.append('<div class="'+c+'"><div class="'+d+'" /></div>');this.content=this.$el.children("."+a);this.content.attr("tabindex",0);this.slider=this.$el.find("."+d);this.pane=this.$el.find("."+c);h&&(b={right:-h},this.$el.addClass("has-scrollbar"));i.iOSNativeScrolling&&
(null==b&&(b={}),b.WebkitOverflowScrolling="touch");null!=b&&this.content.css(b);i.alwaysVisible&&this.pane.css({opacity:1,visibility:"visible"});return this};b.prototype.restore=function(){this.stopped=!1;this.pane.show();return this.addEvents()};b.prototype.reset=function(){var a,b,c,f,d,g,e;this.$el.find("."+this.options.paneClass).length||this.generate().stop();this.stopped&&this.restore();a=this.content[0];c=a.style;f=c.overflowY;j&&this.content.css({height:this.content.height()});b=a.scrollHeight+
h;g=this.pane.outerHeight();e=parseInt(this.pane.css("top"),10);d=parseInt(this.pane.css("bottom"),10);d=g+e+d;e=Math.round(d/b*d);e<this.options.sliderMinHeight?e=this.options.sliderMinHeight:null!=this.options.sliderMaxHeight&&e>this.options.sliderMaxHeight&&(e=this.options.sliderMaxHeight);"scroll"===f&&"scroll"!==c.overflowX&&(e+=h);this.maxSliderTop=d-e;this.contentHeight=b;this.paneHeight=g;this.paneOuterHeight=d;this.sliderHeight=e;this.slider.height(e);this.events.scroll();this.pane.show();
this.isActive=!0;this.pane.outerHeight(!0)>=a.scrollHeight&&"scroll"!==f?(this.pane.hide(),this.isActive=!1):this.el.clientHeight===a.scrollHeight&&"scroll"===f?this.slider.hide():this.slider.show();return this};b.prototype.scroll=function(){this.sliderY=Math.max(0,this.sliderY);this.sliderY=Math.min(this.maxSliderTop,this.sliderY);this.content.scrollTop(-1*((this.paneHeight-this.contentHeight+h)*this.sliderY/this.maxSliderTop));this.slider.css({top:this.sliderY});return this};b.prototype.scrollBottom=
function(a){this.reset();this.content.scrollTop(this.contentHeight-this.content.height()-a).trigger("mousewheel");return this};b.prototype.scrollTop=function(a){this.reset();this.content.scrollTop(+a).trigger("mousewheel");return this};b.prototype.scrollTo=function(a){this.reset();a=c(a).offset().top;a>this.maxSliderTop&&(a/=this.contentHeight,this.sliderY=a*=this.maxSliderTop,this.scroll());return this};b.prototype.stop=function(){this.stopped=!0;this.removeEvents();this.pane.hide();return this};
b.prototype.flash=function(){var a=this;this.pane.addClass("flashed");setTimeout(function(){a.pane.removeClass("flashed")},this.options.flashDelay);return this};return b}();c.fn.nanoScroller=function(b){return this.each(function(){var a;if(!(a=this.nanoscroller))a=c.extend({},l),b&&"object"===typeof b&&(a=c.extend(a,b)),this.nanoscroller=a=new k(this,a);if(b&&"object"===typeof b){c.extend(a.options,b);if(b.scrollBottom)return a.scrollBottom(b.scrollBottom);if(b.scrollTop)return a.scrollTop(b.scrollTop);
if(b.scrollTo)return a.scrollTo(b.scrollTo);if("bottom"===b.scroll)return a.scrollBottom(0);if("top"===b.scroll)return a.scrollTop(0);if(b.scroll&&b.scroll instanceof c)return a.scrollTo(b.scroll);if(b.stop)return a.stop();if(b.flash)return a.flash()}return a.reset()})}})(jQuery,window,document);