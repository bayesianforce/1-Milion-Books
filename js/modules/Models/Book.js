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
var Book = function (index) {
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
    this.idOrderName = parseInt((bookNameFirstPart.id+100).toString() + bookNameSecondPart.id.toString());
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