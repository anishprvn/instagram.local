/*!
 * jScroll - jQuery Plugin for Infinite Scrolling / Auto-Paging
 * http://jscroll.com/
 *
 * Copyright 2011-2013, Philip Klauzinski
 * http://klauzinski.com/
 * Dual licensed under the MIT and GPL Version 2 licenses.
 * http://jscroll.com/#license
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl-2.0.html
 *
 * @author Philip Klauzinski
 * @version 2.3.0
 * @requires jQuery v1.4.3+
 * @preserve
 */
!function(a){"use strict";a.jscroll={defaults:{debug:!1,autoTrigger:!0,autoTriggerUntil:!1,loadingHtml:"<small>Loading...</small>",padding:0,nextSelector:"a:last",contentSelector:"",pagingSelector:"",callback:!1}};var b=function(b,c){var d=b.data("jscroll"),e="function"==typeof c?{callback:c}:c,f=a.extend({},a.jscroll.defaults,e,d||{}),g="visible"===b.css("overflow-y"),h=b.find(f.nextSelector).first(),i=a(window),j=a("body"),k=g?i:b,l=a.trim(h.attr("href")+" "+f.contentSelector),m=function(){var b=a(f.loadingHtml).filter("img").attr("src");if(b){var c=new Image;c.src=b}},n=function(){b.find(".jscroll-inner").length||b.contents().wrapAll('<div class="jscroll-inner" />')},o=function(a){var b;f.pagingSelector?a.closest(f.pagingSelector).hide():(b=a.parent().not(".jscroll-inner,.jscroll-added").addClass("jscroll-next-parent").hide(),b.length||a.wrap('<div class="jscroll-next-parent" />').parent().hide())},p=function(){return k.unbind(".jscroll").removeData("jscroll").find(".jscroll-inner").children().unwrap().filter(".jscroll-added").children().unwrap()},q=function(){n();var a=b.find("div.jscroll-inner").first(),c=b.data("jscroll"),d=parseInt(b.css("borderTopWidth"),10),e=isNaN(d)?0:d,h=parseInt(b.css("paddingTop"),10)+e,i=g?k.scrollTop():b.offset().top,j=a.length?a.offset().top:0,l=Math.ceil(i-j+k.height()+h);return!c.waiting&&l+f.padding>=a.outerHeight()?(u("info","jScroll:",a.outerHeight()-l,"from bottom. Loading next request..."),t()):void 0},r=function(a){return a=a||b.data("jscroll"),a&&a.nextHref?(s(),!0):(u("warn","jScroll: nextSelector not found - destroying"),p(),!1)},s=function(){var a=b.find(f.nextSelector).first();f.autoTrigger&&(f.autoTriggerUntil===!1||f.autoTriggerUntil>0)?(o(a),j.height()<=i.height()&&q(),k.unbind(".jscroll").bind("scroll.jscroll",function(){return q()}),f.autoTriggerUntil>0&&f.autoTriggerUntil--):(k.unbind(".jscroll"),a.bind("click.jscroll",function(){return o(a),t(),!1}))},t=function(){var c=b.find("div.jscroll-inner").first(),d=b.data("jscroll");return d.waiting=!0,c.append('<div class="jscroll-added" />').children(".jscroll-added").last().html('<div class="jscroll-loading">'+f.loadingHtml+"</div>"),b.animate({scrollTop:c.outerHeight()},0,function(){c.find("div.jscroll-added").last().load(d.nextHref,function(c,e){if("error"===e)return p();var g=a(this).find(f.nextSelector).first();d.waiting=!1,d.nextHref=g.attr("href")?a.trim(g.attr("href")+" "+f.contentSelector):!1,a(".jscroll-next-parent",b).remove(),r(),f.callback&&f.callback.call(this),u("dir",d)})})},u=function(a){if(f.debug&&"object"==typeof console&&("object"==typeof a||"function"==typeof console[a]))if("object"==typeof a){var b=[];for(var c in a)"function"==typeof console[c]?(b=a[c].length?a[c]:[a[c]],console[c].apply(console,b)):console.log.apply(console,b)}else console[a].apply(console,Array.prototype.slice.call(arguments,1))};return b.data("jscroll",a.extend({},d,{initialized:!0,waiting:!1,nextHref:l})),n(),m(),s(),a.extend(b.jscroll,{destroy:p}),b};a.fn.jscroll=function(c){return this.each(function(){var d,e=a(this),f=e.data("jscroll");f&&f.initialized||(d=new b(e,c))})}}(jQuery);



$('.scroll').jscroll({
            
            debug: true,
            autoTrigger: true,
            loadingHtml: '<h1>Loading...</h1>',
            nextSelector: '.pagination li.active + li a',
            contentSelector: 'div.scroll',
            callback: function() {
 
                //again hide the paginator from view
                $('ul.pagination:visible:first').hide();
 
            }
});