'use strict';

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
        Android: function Android() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function BlackBerry() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function iOS() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function Opera() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function Windows() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function any() {
            return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows();
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
            return a > b ? 1 : a < b ? -1 : 0;
        }).map(function (item, index) {
            return {
                id: index,
                name: item
            };
        });
    }

    /**
     * Utility used to generate and concatenate array OF OBJECTS and create index for sorting research
     * @param array
     * @param prop
     * @returns {Array}
     */
    function indexSortArrayObj(array, prop) {
        return array.sort(function (a, b) {
            return a[prop] > b[prop] ? 1 : a[prop] < b[prop] ? -1 : 0;
        }).map(function (item, index) {
            item.id = index;
            return item;
        });
    }

    /**
     *
     * @param item
     * @param prop
     * @returns {*}
     */
    function bindItemProperty(item, prop) {
        function index(obj, i) {
            return obj[i];
        }
        return prop.split('.').reduce(index, item);
    }

    return {
        isMobile: isMobile,
        indexSortArray: indexSortArray,
        indexSortArrayObj: indexSortArrayObj,
        bindItemProperty: bindItemProperty

    };
}();
/**
 * Created by Valerio Bartolini
 */

/**************************************************************************************************
 *                                            DATA BUILDER                                        *
 *                       It contains all basic data structures to build the main app              *
 *                                                                                                *
 **************************************************************************************************/

/*******************************
 *        SETUP DATA TABLES    *
 *******************************/
/**
 * Num of books to display
 * @type {number}
 */
var NUM_BOOK = 1000000,

/**
 * Set items numbers to display
 * @type {number}
 */
ITEM_NUM_PER_PAGE = 6;

/**
 *
 * @type {Array}
 */
var authorName = Utils.indexSortArrayObj([{ name: 'William Shakespeare', gender: 0 }, { name: 'George Orwell', gender: 0 }, { name: 'George Elliot', gender: 1 }, { name: 'Friedrich Nietzsche', gender: 0 }, { name: 'Jane Austen', gender: 1 }, { name: 'Virginia Wolf', gender: 1 }, { name: 'Agatha Christie', gender: 1 }, { name: 'George R.R. Martin', gender: 0 }, { name: 'Edgard Allan Poe', gender: 0 }, { name: 'Angela Carter', gender: 1 }, { name: 'Oscar Wilde', gender: 0 }, { name: 'Marcel Proust', gender: 0 }, { name: 'Anne Frank', gender: 1 }, { name: 'Charlotte Bronte', gender: 1 }, { name: 'Giovanni Pascoli', gender: 0 }, { name: 'Juan Goytisolo', gender: 0 }, { name: 'J.K Rowling', gender: 1 }, { name: 'Zadie Smith', gender: 1 }, { name: 'Jack Kerouac', gender: 0 }, { name: 'Margaret Atwood', gender: 1 }, { name: 'J.R.R. Tolkien', gender: 0 }, { name: 'Shirley Jackson', gender: 1 }], 'name'),

/**
 *
 * @type {Array}
 */
genre = Utils.indexSortArray(['adventure', 'mystery', 'horror', 'fantasy', 'children', 'romance', 'finance', 'manga', 'sport', 'computer science']),


/**
 *
 * @type {{adventure: string, mystery: string, horror: string, fantasy: string, children: string, romance: string, finance: string, manga: string, sport: string, computer science: string}}
 */
genreCover = {
    'adventure': '/img/book5.jpg',
    'mystery': '/img/book8.jpg',
    'horror': '/img/book4.jpg',
    'fantasy': '/img/book7.jpg',
    'children': '/img/book6.jpg',
    'romance': '/img/book9.jpg',
    'finance': '/img/book2.jpg',
    'manga': '/img/book3.jpg',
    'sport': '/img/book1.jpg',
    'computer science': '/img/book0.jpg'
},


/**
 *
 * @type {Array}
 */
special = Utils.indexSortArrayObj([{ title: 'Finance books published Last Friday any month', key: 'finance' }, { title: 'Horror books published on Halloween', key: 'horror' }]),

/**
 *
 * @type {{firstPart: Array, secondPart: Array}}
 */
bookName = {
    firstPart: Utils.indexSortArray(['No one like', 'Vorrei dirlo in italiano ma ', 'Lord of the ring to ', 'If you don t try maybe', 'The Coldness of', 'The Journey to', 'Altered by', 'A Parallel of', 'Broken Mind by', 'Assassin Creed in', 'Wind of the Winter and', 'Queen of', 'Play hard and', 'Tequila Boom boom of', 'My point of view is ', 'Mazinga fight for', 'Jeeg Robot win against', 'One two three for ', 'Zorro animal and', 'One Piece beat all for', 'Zoolander beat you in', 'Legends of tomorrow for']),
    secondPart: Utils.indexSortArray([' the Coming Order', ' quanto mi piace il calcio', ' the relationship of command', ' funny androids', ' rest in peace', ' winter is coming', ' the crazy town', ' tomato war', ' the art of war', ' banana split', ' peter griffin', ' miri mari muuuu', ' forza milan', ' surfers', ' ice and flames', ' dragon age', ' game of thrones', ' time traveller', ' el pepita', ' wanna be', ' children of the light', ' vida'])
};

/**
 * Created by Valerio Bartolini
 */

/**************************************************************************************************
 *                                            BOOK CLASS                                          *
 * It contains books data and function to generate data                                           *
 * Prototype style to reduce  memory when objects are created (1 million of times)                *
 **************************************************************************************************/

/**
 *
 * @constructor
 */
var Book = function Book(index) {
    this.id = index;
    this.idOrderName = 0; //sorting by book name. Sorting by name could be very slow!
    this.name = '';
    this.author = '';
    this.genre = '';
    this.pdate = '';

    this.init();
};
/**
 *
 * @returns {Book}
 */
Book.prototype.init = function () {
    this.generatorName();
    this.generatorAuthor();
    this.generatorGenre();
    this.generatorPublishDate();

    return this;
};
/**
 * Creates a new book name at random  and the index for sorting research. It used two data structures.
 */
Book.prototype.generatorName = function () {
    var bookNameFirstPart = bookName.firstPart[Math.floor(Math.random() * bookName.firstPart.length)];
    var bookNameSecondPart = bookName.secondPart[Math.floor(Math.random() * bookName.secondPart.length)];
    this.idOrderName = parseInt((bookNameFirstPart.id + 100).toString() + bookNameSecondPart.id.toString());
    this.name = bookNameFirstPart.name + ' ' + bookNameSecondPart.name;
};

Book.prototype.generatorAuthor = function () {
    this.author = authorName[Math.floor(Math.random() * authorName.length)];
};

Book.prototype.generatorGenre = function () {

    var genObj = genre[Math.floor(Math.random() * genre.length)];
    this.genre = genObj.name;
};

Book.prototype.generatorPublishDate = function () {
    var start = new Date("1700-01-01");
    var end = new Date();
    this.pdate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString().substr(0, 10);
};
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
var ToolBarService = function () {
    'use strict';

    /**
     *
     * @type {{idOrderName: {value: string, op: string, indicate: string, order: boolean}, name: {value: string, indicate: string, order: boolean}, genre: {value: string, indicate: string, order: boolean}, [author.id]: {value: string, order: boolean}, [author.name]: {value: string, order: boolean}, [author.gender]: {value: undefined, order: boolean}, default: boolean}}
     */

    var filters = {
        'idOrderName': { value: '', op: '', indicate: '', order: false },
        'name': { value: '', indicate: '', order: false },
        'genre': { value: '', indicate: '', order: false },
        'author.id': { value: '', order: false },
        'author.name': { value: '', order: false },
        'author.gender': { value: undefined, order: false },
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
            return a - b;
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
                return genre(item) && authorGender(item);
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
        }, {});
    }

    return {
        query: query
    };
}();

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
var List = function () {
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
        var startIndex = Math.floor(Math.abs(yTopPos) / ITEM_HEIGHT),
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

        for (var i = 0; i < length; i++) {
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
        return "" + "<div class='box-book'>" + "<div style='float:left;width:100px;'>" + "<img style='height:" + bookImgHeight + "px' src='" + genreCover[item.genre] + "' />" + "</div>" + "<div>" + "<p><a>" + (item.id + 1) + ". " + item.name + " </a><label><em>" + item.pdate + "</em></label></p>" + "<p><label>by " + item.author.name + "</label>" + "<mark> " + item.genre + "</mark></p>" + "</div>" + "</div>";
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
            mouseUp = 'touchend';
        }
        var node = document.querySelector('#scrollDown');
        node.addEventListener(mouseDown, function (e) {
            var totalSpace = BookStore.getNumBooksView() * ITEM_HEIGHT;

            scrollDown = setInterval(function () {
                top = top + delta > totalSpace ? totalSpace - ITEM_HEIGHT : top + delta;
                if (top <= totalSpace) {
                    List.getTemplate(top);
                }
                delta = delta + count;
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
                delta = delta + count;
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
}();
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
            BookStore.create().then(function () {
                refreshContainer(0);
            });
        }, false);
    }

    /**
     * Component sort by book name (DESC and ASC)
     */
    function evtSortBy() {
        var node = document.querySelector('#btnSortListBookByName');
        node.addEventListener('click', function (e) {
            e.stopPropagation && e.stopPropagation();
            ToolBarService.query('sort', 'name').then(function () {
                refreshContainer(0);
            });
        }, false);

        node = document.querySelector('#btnSortListBookByAuthorName');
        node.addEventListener('click', function (e) {
            e.stopPropagation && e.stopPropagation();
            ToolBarService.query('sort', 'author.name').then(function () {
                refreshContainer(0);
            });
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
                ToolBarService.query('filter', 'genre', this.id).then(function () {
                    refreshContainer(0);
                });
            }, false);
        }

        var node = document.querySelector('#btnGenerateFilterByAuthorGenderM');
        node.addEventListener('click', function (e) {
            e.stopPropagation && e.stopPropagation();
            document.querySelector('#btnGenerateFilterByAuthorGenderF').checked = false;
            var value = this.checked ? 0 : undefined;
            ToolBarService.query('filter', 'author.gender', value).then(function () {
                refreshContainer(0);
            });
        }, false);

        node = document.querySelector('#btnGenerateFilterByAuthorGenderF');
        node.addEventListener('click', function (e) {
            e.stopPropagation && e.stopPropagation();
            document.querySelector('#btnGenerateFilterByAuthorGenderM').checked = false;
            var value = this.checked ? 1 : undefined;
            ToolBarService.query('filter', 'author.gender', value).then(function () {
                refreshContainer(0);
            });
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
            ToolBarService.query('indicate', 'genre', 'finance').then(function () {
                refreshContainer(0);
            });
        }, false);
        //SUB-MENU
        node = document.querySelector('.horror');
        node.addEventListener('click', function (e) {
            e.stopPropagation && e.stopPropagation();
            ToolBarService.query('indicate', 'genre', 'horror').then(function () {
                refreshContainer(0);
            });
        }, false);
    }

    /**
     *
     * @returns {boolean}
     */
    function refreshContainer(topPos) {
        List.getTemplate(topPos);
        return true;
    }

    init();
})();

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
var BookStore = function () {

    'use strict';
    /**
     *
     * @type {Array.<Book>}
     */

    var bookStore = [];
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
        var percentage = NUM_BOOK / 100;
        updateProgressBar(0);

        return new Promise(function (resolve) {
            function createRow(index) {
                setTimeout(function () {
                    for (var i = 0; i < percentage; i++) {
                        bookStore[index] = new Book(index);
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
        progressBar.style.width = index / NUM_BOOK * 100 + '%';
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
}();

/**
 * Created by Valerio Bartolini
 */

/**************************************************************************************************
 *                                     LIST   CHALLENGE                                           *
 *This app provides functionality to:                                                             *
 *Manage internal status of Gui and internal Dom hidden to the user                               *
 *Creates a book store,                                                                           *
 *filters date by sort by book name and author name,                                              *
 *filter book by genre and author gender                                                          *
 *Indicates book in horror genre published on halloween, and in finance last friday of any month  *
 **************************************************************************************************/
window.onload = function () {};