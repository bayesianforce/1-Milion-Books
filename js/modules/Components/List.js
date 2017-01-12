/**
 * Created by Valerio Bartolini
 */

/**************************************************************************************************
 *                                            VIEW                                                *
 *Receive data from Service module                                                                *
 *Manage internal status of Gui and internal Dom hidden to the user                               *
 *Creates partial pages to view during the navigation (scroll) of the list                        *
 *Calculate new positions of the scroll bar in order to display partials page from the view       *
 **************************************************************************************************/

/**
 *
 * @type {{refresh}}
 */
var List = (function () {
    'use strict';

    /**
     *
     * @type {number}
     */
    var top = 0,
        /**
         *
         * @type {Element}
         */
        container = document.querySelector('.virtual-container'),
        /**
         *
         * @type {Element}
         */
        containerChild = document.querySelector('.virtual-list'),
        /**
         *
         * @type {number}
         */
        ITEM_HEIGHT = Math.floor(container.offsetHeight / ITEM_NUM_PER_PAGE);

    /**
     * Get data from the view (we need to normalize the position for items) and then ask for the html content
     * @param yTopPos
     * @returns {boolean}
     */
    function getTemplate(yTopPos) {
        var startIndex = Math.floor((Math.abs(yTopPos) / ITEM_HEIGHT)),
            lastIndex = startIndex + ITEM_NUM_PER_PAGE;

        containerChild.innerHTML = '';
        containerChild.appendChild(getContent(BookStore.getPage(startIndex, lastIndex + 1)));
        return true;
    }

    /**
     *
     * @param data
     * @returns {DocumentFragment}
     */
    function getContent(data) {
        var fragment = document.createDocumentFragment(),
            length = data.length;

        for (let i = 0; i < length; i++) {
            var node = document.createElement('li');
            node.innerHTML = getDom(data[i]);
            node.style.height = ITEM_HEIGHT + 'px';
            fragment.appendChild(node);
        }
        return fragment;
    }

    /**
     * build each row of the page
     * @param item
     * @returns {string}
     */
    function getDom(item) {
        var bookImgHeight = ITEM_HEIGHT - 10;
        return "" +
            "<div class='box-book'>" +
            "<div style='float:left;width:100px;'>" +
            "<img style='height:" + bookImgHeight + "px' src='" + genreCover[item.genre] + "' />" +
            "</div>" +
            "<div>" +
            "<p><a>" + (item.id + 1) + ". " + item.name + " </a><label><em>" + item.pdate + "</em></label></p>" +
            "<p><label>by " + item.author.name + "</label>" +
            "<mark> " + item.genre + "</mark></p>" +
            "</div>" +
            "</div>";
    }

    function evtScrollPage() {
        var scrollDown;
        var scrollUp;
        var delta = 1;
        var count = 0;
        var mouseDown = 'mousedown';
        var mouseUp = 'mouseup';

        if (Utils.isMobile.any()) {
            mouseDown = 'touchstart';
            mouseUp = 'touchend'
        }
        var node = document.querySelector('#scrollDown');
        node.addEventListener(mouseDown, function (e) {
            var totalSpace = BookStore.getNumBooksView() * ITEM_HEIGHT;

            scrollDown = setInterval(function () {
                top = top + delta > totalSpace ? totalSpace - ITEM_HEIGHT : top + delta;
                if (top <= (totalSpace)) {
                    List.getTemplate(top);
                }
                delta = delta + (count);
                count++;
            }, 6);
            e.stopPropagation && e.stopPropagation();
        }, false);
        node.addEventListener(mouseUp, function (e) {
            clearInterval(scrollDown);
            delta = 1;
            count = 0;
            e.stopPropagation && e.stopPropagation();
        }, false);

        node = document.querySelector('#scrollUp');
        node.addEventListener(mouseDown, function (e) {
            scrollUp = setInterval(function () {
                top = top - delta < 0 ? 0 : top - delta;
                if (top > -ITEM_HEIGHT) {
                    List.getTemplate(top);
                }
                delta = delta + (count);
                count++;
            }, 6);
            e.stopPropagation && e.stopPropagation();
        }, false);
        node.addEventListener(mouseUp, function (e) {
            clearInterval(scrollUp);
            delta = 1;
            count = 0;
            e.stopPropagation && e.stopPropagation();
        }, false);
    }

    evtScrollPage();

    return {
        getTemplate: getTemplate
    };
})();