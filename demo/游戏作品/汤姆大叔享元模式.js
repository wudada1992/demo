/*享元模式优化代码*/
var Book = function(title, author, genre, pageCount, publisherID, ISBN) {
	this.title = title;
	this.author = author;
	this.genre = genre;
	this.pageCount = pageCount;
	this.publisherID = publisherID;
	this.ISBN = ISBN;
};
/* Book工厂 单例 */
var BookFactory = (function() {
	var existingBooks = {};
	return {
		createBook: function(title, author, genre, pageCount, publisherID, ISBN) {
			/*查找之前是否创建*/
			var existingBook = existingBooks[ISBN];
			if(existingBook) {
				return existingBook;
			} else {
				/* 如果没有，就创建一个，然后保存*/
				var book = new Book(title, author, genre, pageCount, publisherID, ISBN);
				existingBooks[ISBN] = book;
				return book;
			}
		}
	}
});
/*BookRecordManager 借书管理类 单例*/
var BookRecordManager = (function() {
	var bookRecordDatabase = {};
	return {
		/*添加借书记录*/
		addBookRecord: function(id, title, author, genre, pageCount, publisherID, ISBN, checkoutDate, checkoutMember, dueReturnDate, availability) {
			var book = bookFactory.createBook(title, author, genre, pageCount, publisherID, ISBN);
			bookRecordDatabase[id] = {
				checkoutMember: checkoutMember,
				checkoutDate: checkoutDate,
				dueReturnDate: dueReturnDate,
				availability: availability,
				book: book;

			};
		},
		updateCheckoutStatus: function(bookID, newStatus, checkoutDate, checkoutMember, newReturnDate) {
			var record = bookRecordDatabase[bookID];
			record.availability = newStatus;
			record.checkoutDate = checkoutDate;
			record.checkoutMember = checkoutMember;
			record.dueReturnDate = newReturnDate;
		},
		extendCheckoutPeriod: function(bookID, newReturnDate) {
			bookRecordDatabase[bookID].dueReturnDate = newReturnDate;
		},
		isPastDue: function(bookID) {
			var currentDate = new Date();
			return currentDate.getTime() > Date.parse(bookRecordDatabase[bookID].dueReturnDate);
		}
	};
});