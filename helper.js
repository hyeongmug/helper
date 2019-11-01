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

    cls.findObject = function(array, searchKey, searchValue) {

        var inventory = array;

        var result = inventory.find(function(object) {
            return object[searchKey] === searchValue;
        });
        return result;
    }

    cls.waitLoad = function(selector, callback) {
        var interval = setInterval(function() {
            if ($(selector).length > 0) {
                callback();
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

    cls.min = function(array) {
        return Math.min.apply({}, array)
    }

    cls.max = function(array) {
        return Math.max.apply({}, array)
    }

    cls.shuffle = function(array) {
        var currentIndex = array.length,
            temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    // 0 (포함) and 1 (불포함) 난수를 반환
    cls.getRandom = function() {
        return Math.random();
    }
    // min (포함) 과 max (불포함) 사이의 난수를 반환
    cls.getRandomArbitrary = function(min, max) {
        return Math.random() * (max - min) + min;
    }
    // min (포함) 과 max (불포함) 사이의 임의 정수를 반환
    // Math.round() 를 사용하면 고르지 않은 분포를 얻게된다!
    cls.getRandomInt = function(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
    // min (포함) 과 max (포함) 사이의 임의 정수를 반환
    // Math.round() 를 사용하면 고르지 않은 분포를 얻게된다!
    cls.getRandomIntInclusive = function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    cls.imageResize = function(img, ratio) {
        var width = img.width;
        var height = img.height;
        var img_ratio = width / height;

        if (!ratio) {
            ratio = img.parentElement.offsetHeight;
        }

        if (ratio < img_ratio) {
            resizeWidth = 'auto';
            resizeHeight = '100%'
        } else {
            resizeWidth = '100%';
            resizeHeight = 'auto';
        }

        // 리사이즈한 크기로 이미지 크기 다시 지정
        img.style.width = resizeWidth;
        img.style.height = resizeHeight;
        img.style.maxWidth = 'none';
        img.style.maxHeight = 'none';
    }

    cls.centerVideo = function(wrapSelector, innerSelector) {
        // 동영상 비율이 16대 9일때 

        var videoW, videoH, videoM_value;
        var svl_outW = $(wrapSelector).outerWidth();
        var svl_outH = $(wrapSelector).outerHeight();
        var wrap = $(wrapSelector);
        var inner = $(innerSelector);

        if (svl_outH / svl_outW > 0.5617989417) {
            //세로고정
            videoW = (svl_outH / 9) * 16;
            videoH = svl_outH;
            videoM_value = (videoW - svl_outW) / 2;

            inner.css({
                "width": videoW,
                "height": videoH,
                "margin-top": 0,
                "margin-left": -videoM_value
            });
        } else {
            //가로고정
            videoW = svl_outW;
            videoH = (svl_outW / 16) * 9;
            videoM_value = (videoH - svl_outH) / 2;

            inner.css({
                "width": videoW,
                "height": videoH,
                "margin-top": -videoM_value,
                "margin-left": 0
            });
        }

    }

    cls.unTargetEvent = function(unTarget, currentNode, callback) {
        if (currentNode != unTarget) {
            currentNode = currentNode.parentNode;
            if (currentNode.tagName == "HTML") {
                if (callback) {
                    callback();
                }
                return;
            }
            cls.unTargetEvent(unTarget, currentNode, (callback ? callback : ""));
        } else {
            return;
        }
    }

    cls.polyfill();
}