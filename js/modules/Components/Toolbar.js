/**
 * Created by Valerio Bartolini
 */

/***************************************************************************************************
 *                                         EVENT MANAGER                                           *
 * Registers events from the gui and call ToolBarService module in order to manipulate the bookstore.
 * **************************************************************************************************/

(function () {
    'use strict';

    function init() {
        createSubMenu();
        evtCreate();
        evtSortBy();
        evtFilterBy();
        evtIndicate();
    }

    /**
     *
     * @returns {boolean}
     */
    function createSubMenu() {
        var node = document.querySelector('.menuGenres');
        var row = document.createElement('li');
        row.classList.add('list-genre');
        row.id = '';
        var col = document.createElement('a');
        col.innerHTML = 'All';
        row.appendChild(col);
        node.appendChild(row);
        genre.forEach(function (item) {
            var row = document.createElement('li');
            row.classList.add('list-genre');
            row.id = item.name;
            var col = document.createElement('a');
            col.innerHTML = item.name;
            row.appendChild(col);
            node.appendChild(row);
        });

        node = document.querySelector('.menuMore');
        special.forEach(function (item) {
            var row = document.createElement('li');
            row.classList.add('list-genre');
            row.classList.add(item.key);
            var col = document.createElement('a');
            col.innerHTML = item.title;
            row.appendChild(col);
            node.appendChild(row);
        });
        return true;
    }

    /**
     * Component Generate Book
     */
    function evtCreate() {
        var node = document.querySelector('#btnGenerateListBook');
        node.addEventListener('click', function (e) {
            e.stopPropagation && e.stopPropagation();
            BookStore.create()
                .then(function () {
                    refreshContainer(0);
                })
        }, false);
    }

    /**
     * Component sort by book name (DESC and ASC)
     */
    function evtSortBy() {
        var node = document.querySelector('#btnSortListBookByName');
        node.addEventListener('click', function (e) {
            e.stopPropagation && e.stopPropagation();
            ToolBarService.query('sort', 'name')
                .then(function () {
                    refreshContainer(0);
                })
        }, false);

        node = document.querySelector('#btnSortListBookByAuthorName');
        node.addEventListener('click', function (e) {
            e.stopPropagation && e.stopPropagation();
            ToolBarService.query('sort', 'author.name')
                .then(function () {
                    refreshContainer(0);
                })
        }, false);
    }

    /**
     * Component filter books by Genre.
     */
    function evtFilterBy() {
        var nodes = document.querySelectorAll('.list-genre');
        for (var i = 0; i < nodes.length; i++) {
            nodes[i].addEventListener('click', function (e) {
                e.stopPropagation && e.stopPropagation();
                ToolBarService.query('filter', 'genre', this.id)
                    .then(function () {
                        refreshContainer(0);
                    })
            }, false);
        }

        var node = document.querySelector('#btnGenerateFilterByAuthorGenderM');
        node.addEventListener('click', function (e) {
            e.stopPropagation && e.stopPropagation();
            document.querySelector('#btnGenerateFilterByAuthorGenderF').checked = false;
            var value = this.checked ? 0 : undefined;
            ToolBarService.query('filter', 'author.gender', value)
                .then(function () {
                    refreshContainer(0);
                })
        }, false);

        node = document.querySelector('#btnGenerateFilterByAuthorGenderF');
        node.addEventListener('click', function (e) {
            e.stopPropagation && e.stopPropagation();
            document.querySelector('#btnGenerateFilterByAuthorGenderM').checked = false;
            var value = this.checked ? 1 : undefined;
            ToolBarService.query('filter', 'author.gender', value)
                .then(function () {
                    refreshContainer(0);
                })
        }, false);
    }

    /**
     * Component indicate horror books published during halloween
     */
    function evtIndicate() {
        //SUB-MENU
        var node = document.querySelector('.finance');
        node.addEventListener('click', function (e) {
            e.stopPropagation && e.stopPropagation();
            ToolBarService.query('indicate', 'genre', 'finance')
                .then(function () {
                    refreshContainer(0);
                })
        }, false);
        //SUB-MENU
        node = document.querySelector('.horror');
        node.addEventListener('click', function (e) {
            e.stopPropagation && e.stopPropagation();
            ToolBarService.query('indicate', 'genre', 'horror')
                .then(function () {
                    refreshContainer(0);
                })
        }, false);
    }

    /**
     *
     * @returns {boolean}
     */
    function refreshContainer(topPos) {
        List.getTemplate(topPos);
        return true
    }

    init();
})();
