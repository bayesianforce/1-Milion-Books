/**
 * Created by Valerio Bartolini
 */

/**************************************************************************************************
 *                                         QUERY MANAGER                                          *
 * Receive  params from the Listener                                                              *
 * Creates and manipulates data structures creating a new view of the list                        *
 * Send a promise as a result to View  module.                                                    *
 **************************************************************************************************/

/**
 *
 * @type {{createList, sortBy, filterBy, indicateBy}}
 */
var ToolBarService = (function () {
    'use strict';

    /**
     *
     * @type {{idOrderName: {value: string, op: string, indicate: string, order: boolean}, name: {value: string, indicate: string, order: boolean}, genre: {value: string, indicate: string, order: boolean}, [author.id]: {value: string, order: boolean}, [author.name]: {value: string, order: boolean}, [author.gender]: {value: undefined, order: boolean}, default: boolean}}
     */
    var filters = {
        'idOrderName': {value: '', op: '', indicate: '', order: false},
        'name': {value: '', indicate: '', order: false},
        'genre': {value: '', indicate: '', order: false},
        'author.id': {value: '', order: false},
        'author.name': {value: '', order: false},
        'author.gender': {value: undefined, order: false},
        default: false
    };
    /**
     *
     * @type {{sort: sort, filter: filter, indicate: indicate, default: boolean}}
     */
    var services = {
        sort: sort,
        filter: filter,
        indicate: indicate,
        default: false
    };

    /**
     *
     * @param op
     * @param prop
     * @param value
     * @returns {Promise.<Array.<Book>>}
     */
    function query(op, prop, value) {
        var list = services[op](prop, value);
        return BookStore.updateView(list);
    }

    /**
     *
     * @param prop
     * @returns {Array.<Book>}
     */
    function sort(prop) {
        /**
         *
         * @param a
         * @param b
         * @returns {number}
         */
        function compare(a, b) {
            return (a - b);
        }

        /**
         *
         * @param first
         * @param second
         * @returns {number}
         */
        function title(first, second) {
            return filters[prop].order ? compare(first.idOrderName, second.idOrderName) : compare(second.idOrderName, first.idOrderName);
        }

        /**
         *
         * @returns {number}
         */
        function authorName(first, second) {
            return filters[prop].order ? compare(first.author.id, second.author.id) : compare(second.author.id, first.author.id);
        }

        /**
         *
         * @type {{name: title, [author.name]: authorName, default: boolean}}
         */
        var op = {
            'name': title,
            'author.name': authorName,
            default: false
        };

        /**
         *
         * @param list
         * @returns {Array.<Book>}
         */
        function by(list) {
            return list.sort(function (first, second) {
                return op[prop](first, second);
            });
        }

        filters[prop].order = !filters[prop].order;
        return by(BookStore.getView());
    }

    /**
     *
     * @param prop
     * @param value
     * @returns {Array.<Book>}
     */
    function filter(prop, value) {
        /**
         *
         * @returns {boolean}
         */
        function genre(item) {
            return item.genre.indexOf(filters['genre'].value.toLowerCase()) != -1;
        }

        /**
         *
         * @returns {boolean}
         */
        function authorGender(item) {
            return filters['author.gender'].value === undefined ? true : item.author.gender == filters['author.gender'].value;
        }

        /**
         *
         * @returns {Array.<Book>}
         */
        function by() {
            return BookStore.getAll().filter(function (item) {
                return genre(item) && authorGender(item)
            });
        }

        filters[prop].value = value;
        return by();
    }

    /**
     *
     * @param prop
     * @param value
     * @returns {Array.<Book>}
     */
    function indicate(prop, value) {
        /**
         *
         * @param pDate
         * @returns {boolean}
         */
        function isHorrorHalloween(pDate) {
            return pDate.getMonth() == 9 && pDate.getDate() == 31;
        }

        /**
         *
         * @param pDate
         * @returns {boolean}
         */
        function isFinanceLastDayMonth(pDate) {
            var lastDayMonth = new Date(pDate.getFullYear(), pDate.getMonth() + 1, 0); //Month start from 0 with getMonth()
            return pDate.getDay() == 5 && lastDayMonth.getDate() - pDate.getDate() < 7;
        }

        /**
         *
         * @type {{horror: isHorrorHalloween, finance: isFinanceLastDayMonth, default: boolean}}
         */
        var conditions = {
            horror: isHorrorHalloween,
            finance: isFinanceLastDayMonth,
            default: false
        };

        /**
         *
         * @returns {Array.<Book>}
         */
        function by() {
            return (group(BookStore.getAll(), prop)[value] || []).filter(function (item) {
                return conditions[filters[prop].indicate](new Date(item.pdate));
            });
        }

        filters[prop].indicate = filters[prop].value = value;
        return by();
    }

    /**
     *
     * @param list
     * @param prop
     * @returns {Array.<Book>}
     */
    function group(list, prop) {
        return list.reduce(function (group, item) {
            (group[item[prop]] = group[item[prop]] || []).push(item);
            return group;
        }, {})
    }

    return {
        query: query
    };
})();
