/*
 *  Project:fixedTableHeader
 *  Description:fixed table header
 *  Author:zhangbiaoguang
 *  License:MIT
 */
;(function ($, window, document, undefined) {
    var pluginName = 'fixedTableHeader',
        defaults = {};

    function Plugin (element, options) {
        this.element = element;
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._pluginName = pluginName;
        this.init();
    }
    
    Plugin.prototype = {
        init : function () {
        
        }
    };
    
    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
            }
        });
    };
})($, window, document);