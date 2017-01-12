/**
 * Created by Valerio Bartolini
 */

/**
 *
 * @type {{isMobile, indexSortArray, indexSortArrayObj, bindItemProperty}}
 */
var Utils = function () {
    /**
     *
     * @type {{Android: isMobile.Android, BlackBerry: isMobile.BlackBerry, iOS: isMobile.iOS, Opera: isMobile.Opera, Windows: isMobile.Windows, any: isMobile.any}}
     */
    var isMobile = {
        Android: function () {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function () {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function () {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function () {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function () {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };

    /*******************************
     *       UTILITIES             *
     *******************************/
    /**
     * Utility used to generate and merge array (ex.bookName) and create index for sorting research
     * @param array
     * @returns {Array}
     */
    function indexSortArray(array) {
        return array.sort(function (a, b) {
                return (a > b ? 1 : a < b ? -1 : 0);
            })
            .map(function (item, index) {
                return {
                    id: index,
                    name: item
                };
            })
    }

    /**
     * Utility used to generate and concatenate array OF OBJECTS and create index for sorting research
     * @param array
     * @param prop
     * @returns {Array}
     */
    function indexSortArrayObj(array, prop) {
        return array.sort(function (a, b) {
                return (a[prop] > b[prop] ? 1 : a[prop] < b[prop] ? -1 : 0);
            })
            .map(function (item, index) {
                item.id = index;
                return item;
            })
    }

    /**
     *
     * @param item
     * @param prop
     * @returns {*}
     */
    function bindItemProperty(item, prop) {
        function index(obj, i) {
            return obj[i]
        }
        return prop.split('.').reduce(index, item);
    }

    return{
        isMobile:isMobile,
        indexSortArray:indexSortArray,
        indexSortArrayObj:indexSortArrayObj,
        bindItemProperty:bindItemProperty

    }
}();