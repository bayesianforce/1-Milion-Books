/**
 * Created by Valerio Bartolini
 */

/***************************************************************************************************
 *                                        BookStore                                                *
 *              Model that contains all book and operation to get and retrieve them                *
 *                                                                                                 *
 *                                                                                                 *
 **************************************************************************************************/

/**
 *
 * @type {{create, getAll, getView}}
 */
var BookStore = (function () {

    'use strict';
    /**
     *
     * @type {Array.<Book>}
     */
    const bookStore = [];
    /**
     *
     * @type {Array.<Book>}
     */
    var view = [];
    /**
     *
     * @type {number}
     */
    var numBooksView = 0,
        /**
         *
         * @type {Element}
         */
        progressBar = document.querySelector('.live');

    /**
     *
     * @returns {Promise}
     */
    function create() {
        const percentage = (NUM_BOOK / 100);
        updateProgressBar(0);

        return new Promise(function (resolve) {
            function createRow(index) {
                setTimeout(function () {
                    for (var i = 0; i < percentage; i++) {
                        bookStore[index] =  new Book(index);
                        index++;
                    }
                    updateProgressBar(index);
                    index === percentage && List.getTemplate(0);
                    index === NUM_BOOK ? resolve(bookStore) : createRow(index);
                }, 50);
            }
            createRow(0);
        });
    }

    /**
     *
     * @param index
     * @returns {boolean}
     */
    function updateProgressBar(index) {
        progressBar.style.width = (index / NUM_BOOK) * 100 + '%';
        return true;
    }

    /**
     *
     * @returns {Array.<Book>}
     */
    function getAll() {
        return bookStore;
    }

    /**
     *
     * @returns {Array.<Book>}
     */
    function getView() {
        return view;
    }

    /**
     *
     * @param list
     * @returns {Promise.<Array.<Book>>}
     */
    function updateView(list) {
        view = getNumBooksView() ? list : bookStore;
        numBooksView = view.length;
        return Promise.resolve(view);
    }

    /**
     *
     * @returns {Number}
     */
    function getNumBooksView() {
        return view.length;
    }

    /**
     *
     * @param start
     * @param end
     * @returns {Array.<Book>}
     */
    function getPage(start, end) {
        view = view.length ? view : bookStore;
        end = end > view.length ? view.length : end;
        return view.slice(start, end + 1);
    }

    return {
        create: create,
        getAll: getAll,
        getView: getView,
        updateView: updateView,
        getPage: getPage,
        getNumBooksView: getNumBooksView
    };
})();
