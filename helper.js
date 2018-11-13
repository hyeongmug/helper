function Helper() {
    var cls = this;

    cls.polyfill = function() {
        // https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf
        if (!Array.prototype.indexOf) {
            Array.prototype.indexOf = function(searchElement, fromIndex) {
                var k;
                if (this == null) {
                    throw new TypeError('"this" is null or not defined');
                }
                var o = Object(this);
                var len = o.length >>> 0;
                if (len === 0) {
                    return -1;
                }
                var n = fromIndex | 0;
                if (n >= len) {
                    return -1;
                }
                k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
                while (k < len) {
                    if (k in o && o[k] === searchElement) {
                        return k;
                    }
                    k++;
                }
                return -1;
            };
        }

        // https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/find
        if (!Array.prototype.find) {
            Array.prototype.find = function(predicate) {
                'use strict';
                if (this == null) {
                    throw new TypeError('Array.prototype.find called on null or undefined');
                }
                if (typeof predicate !== 'function') {
                    throw new TypeError('predicate must be a function');
                }
                var list = Object(this);
                var length = list.length >>> 0;
                var thisArg = arguments[1];
                var value;

                for (var i = 0; i < length; i++) {
                    value = list[i];
                    if (predicate.call(thisArg, value, i, list)) {
                        return value;
                    }
                }
                return undefined;
            };
        }
    }

    cls.debounce = function() {
        var timer = null;
        return function(func, wait) {
            clearTimeout(timer);
            timer = setTimeout(function() {
                func()
            }, wait);
        }
    }

    cls.getParameters = function(paramName) {
        var returnValue;
        var url = location.href;
        var parameters = (url.slice(url.indexOf('?') + 1, url.length)).split('&');
        for (var i = 0; i < parameters.length; i++) {
            var varName = parameters[i].split('=')[0];
            if (varName.toUpperCase() == paramName.toUpperCase()) {
                returnValue = parameters[i].split('=')[1];
                return decodeURIComponent(returnValue);
            }
        }
    };

    cls.pad = function(n, width) {
        n = n + '';
        return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
    }

    cls.sortObject = function(_object, _target) {
        return _object.sort(function(a, b) {
            return a[_target] < b[_target] ? -1 : a[_target] > b[_target] ? 1 : 0;
        });
    }

    cls.isPC = function() {
        if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i) || navigator.userAgent.match(/Opera Mini/i) || navigator.userAgent.match(/IEMobile/i)) {
            return false;
        } else {
            return true;
        }
    }

    cls.escapeHTML = function(string) {
        var entityMap = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;',
            '/': '&#x2F;',
            '`': '&#x60;',
            '=': '&#x3D;'
        };
        return String(string).replace(/[&<>"'`=\/]/g, function(s) {
            return entityMap[s];
        });
    }

    cls.isMobile = function() {
        if (typeof cls.device.mobile != undefined) {
            if ($(window).width() <= cls.device.mobile) {
                return true;
            } else {
                return false;
            }
        } else {
            if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i) || navigator.userAgent.match(/Opera Mini/i) || navigator.userAgent.match(/IEMobile/i)) {
                return true;
            } else {
                return false;
            }
        }
    }

    cls.groupBy = function(collection, property) {
        var i = 0,
            val, index,
            values = [],
            result = [];
        for (; i < collection.length; i++) {
            val = collection[i][property];
            index = values.indexOf(val);
            if (index > -1)
                result[index].push(collection[i]);
            else {
                values.push(val);
                result.push([collection[i]]);
            }
        }
        return result;
    }

    cls.findObject = function(_array, _searchKey, _searchValue) {

        var inventory = _array;

        var result = inventory.find(function(object) {
            return object[_searchKey] === _searchValue;
        });
        return result;
    }

    cls.customInterval = function(_selector, _callback) {
        var interval = setInterval(function() {
            if ($(_selector).length > 0) {
                _callback();
                clearInterval(interval);
            }
        });
    }

    cls.imagePreload = function() {
        // variables
        var image_cache_array = new Array(),
            i = 0;

        // termination condition
        if (!document.images) {
            return false;
        }

        for (key in arguments) {
            image_cache_array[i] = new Image();
            image_cache_array[i].src = arguments[key];
            i++;
        }

        return i;
    }

    cls.closeWindow = function() {
        if (navigator.userAgent.match(/MSIE ([0-9]+)\./)) {
            window.opener = 'Self';
            window.open('', '_parent', '');
            window.close();
        } else {
            window.close(); // 일반적인 현재 창 닫기
            window.open('about:blank', '_self').self.close(); // IE에서 묻지 않고 창 닫기
        }
    }

    cls.mouseWheel = function(el, downFunction, upFunction) {
        var $el = $(el);
        $el.on("mousewheel DOMMouseScroll", function(e) {
            var event = e.originalEvent;
            var delta = 0;

            e.preventDefault();

            // detail은 파이어폭스, wheelDelta은 익스,크롬
            delta = event.detail ? event.detail * -40 : event.wheelDelta;

            if (delta < 0 && downFunction != undefined) {
                downFunction();
            } else if (delta > 0 && upFunction != undefined) {
                upFunction();
            }

        });
    }

    cls.polyfill();
}