/*
 *  Project:fixedTableHeader
 *  Description:fixed table header
 *  Author:zhangbiaoguang
 *  License:MIT
 */
;(function ($, window, document, undefined) {
    var pluginName = 'fixedTableHeader',
        defaults = {
            enableHScroll : false
        };

    function Plugin (element, options) {
        this.element = element;
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._pluginName = pluginName;
        this.init();
    }
    
    Plugin.prototype = {
        init : function () {
           var $table = $(this.element), $parent = $table.parent(), tableContent = this.element.outerHTML,
                scrollBarWidth = this.scrollBarHW ? this.scrollBarHW.width : this.getScrollBarHW().width, //16,
                containerHtml = [
                    '<div class="fixedTBContainer">',
                        '<div class="fixedTBHeader">',
                            tableContent,
                        '</div>',
                        '<div class="fixedTBBody">',
                            tableContent,
                        '</div>',
                    '</div>'
                ].join('');
            
            $parent.empty();
            // containerHtml = containerHtml.replace(/<tableContent>/g, tableContent);
            $parent.html(containerHtml);
            
            $fixedTBBody = $('.fixedTBContainer .fixedTBBody', $parent);
            $fixedTBBody.scroll(function (e) { //horizontal scrollBar event for fixed header
                $('.fixedTBContainer .fixedTBHeader', $parent)[0].scrollLeft = $(this)[0].scrollLeft;
            });
            if ($fixedTBBody[0].scrollHeight > $fixedTBBody.innerHeight()) { //detect exists vertical scrollbar
                $('.fixedTBContainer .fixedTBHeader', $parent).width(function () {
                    return $(this).width() - scrollBarWidth; //16
                });
            }
            console.log('done========>>');
        },
        getScrollBarHW : function () { //获取浏览器的宽度和高度对象
            if (this.scrollBarHW) {
                return this.scrollBarHW;
            }
            var div = document.createElement('div');
            div.style.overflow = 'scroll';
            div.style.visibility = 'hidden';
            div.style.position = 'absolute';
            div.style.width = '100px';
            div.style.height = '100px';
            //div.style.cssText = 'overflow:scroll;width:100px;height:100px;';
            document.body.appendChild(div);

            this.scrollBarHW = {
                width : div.offsetWidth - div.clientWidth,
                height : div.offsetHeight - div.clientHeight
            };
            div.parentNode.removeChild(div);
            return this.scrollBarHW;
        }
    };
    
    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName) && this.nodeName === 'TABLE') {
                $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
            }
        });
    };
})($, window, document);