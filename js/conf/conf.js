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
const NUM_BOOK = 1000000,
    /**
     * Set items numbers to display
     * @type {number}
     */
    ITEM_NUM_PER_PAGE = 6;

/**
 *
 * @type {Array}
 */
const authorName = Utils.indexSortArrayObj([
        {name: 'William Shakespeare', gender: 0},
        {name: 'George Orwell', gender: 0},
        {name: 'George Elliot', gender: 1},
        {name: 'Friedrich Nietzsche', gender: 0},
        {name: 'Jane Austen', gender: 1},
        {name: 'Virginia Wolf', gender: 1},
        {name: 'Agatha Christie', gender: 1},
        {name: 'George R.R. Martin', gender: 0},
        {name: 'Edgard Allan Poe', gender: 0},
        {name: 'Angela Carter', gender: 1},
        {name: 'Oscar Wilde', gender: 0},
        {name: 'Marcel Proust', gender: 0},
        {name: 'Anne Frank', gender: 1},
        {name: 'Charlotte Bronte', gender: 1},
        {name: 'Giovanni Pascoli', gender: 0},
        {name: 'Juan Goytisolo', gender: 0},
        {name: 'J.K Rowling', gender: 1},
        {name: 'Zadie Smith', gender: 1},
        {name: 'Jack Kerouac', gender: 0},
        {name: 'Margaret Atwood', gender: 1},
        {name: 'J.R.R. Tolkien', gender: 0},
        {name: 'Shirley Jackson', gender: 1}], 'name'),
    /**
     *
     * @type {Array}
     */
    genre = Utils.indexSortArray(['adventure', 'mystery', 'horror', 'fantasy', 'children', 'romance',
        'finance', 'manga', 'sport', 'computer science']),

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
    }
    ,

    /**
     *
     * @type {Array}
     */
    special = Utils.indexSortArrayObj([
        {title: 'Finance books published Last Friday any month', key: 'finance'},
        {title: 'Horror books published on Halloween', key: 'horror'}]),
    /**
     *
     * @type {{firstPart: Array, secondPart: Array}}
     */
    bookName = {
        firstPart: Utils.indexSortArray(['No one like', 'Vorrei dirlo in italiano ma ', 'Lord of the ring to ', 'If you don t try maybe', 'The Coldness of', 'The Journey to', 'Altered by', 'A Parallel of', 'Broken Mind by', 'Assassin Creed in', 'Wind of the Winter and', 'Queen of', 'Play hard and', 'Tequila Boom boom of', 'My point of view is ', 'Mazinga fight for', 'Jeeg Robot win against', 'One two three for ', 'Zorro animal and', 'One Piece beat all for', 'Zoolander beat you in', 'Legends of tomorrow for']),
        secondPart: Utils.indexSortArray([' the Coming Order', ' quanto mi piace il calcio', ' the relationship of command', ' funny androids', ' rest in peace', ' winter is coming', ' the crazy town', ' tomato war', ' the art of war', ' banana split', ' peter griffin', ' miri mari muuuu', ' forza milan', ' surfers', ' ice and flames', ' dragon age', ' game of thrones', ' time traveller', ' el pepita', ' wanna be', ' children of the light', ' vida'])
    };

