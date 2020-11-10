var require = window.require
var sqlite3 = require('sqlite3');

const { dialog} = require('electron').remote
const { webContents } = require('electron').remote
const ipc = require('electron').ipcRenderer
const fs = require('fs');


const sortByProp = (arr, prop) => {
    let lat = /[A-Za-z]/
    let qw = /["'(]/
    let dig = /\d/
    let down = /_/
    arr.sort((a, b) => {
      let a0 = a[prop][0]
      let b0 = b[prop][0]

      if (!lat.test(a0) & lat.test(b0)) {
        return -1;
      } else if (!qw.test(a0) & !lat.test(a0) & qw.test(b0)) {
        return -1;
      } else if (!qw.test(a0) & !dig.test(a0) & !lat.test(a0) & dig.test(b0)) {
        return -1;
      } else if (down.test(a0) & !down.test(b0)) {
        return -1;
      } else if(a[prop] < b[prop]) {
	      return -1;
	    } else {
	      return 1;
	    }
	  })
	  return arr;
  }

  const sortCyrillic = (arr) => {
      let lat = /[A-Za-z]/
      let cyr = /[А-Яа-я]/
      let qw = /["'(]/
      let dig = /\d/
      let down = /_/
      arr.sort((a, b) => {

        if (!lat.test(a[0]) & lat.test(b[0])) {

          return -1;
        } else if (lat.test(a[0]) & lat.test(b[0]) & (a < b)) {
          return -1;
        } else if (!lat.test(a[0]) & !lat.test(b[0]) & (a < b)) {
          return -1;
        } else {
  	      return 1;
  	    }
  	  })
  	  return arr;
    }


const getDBPath = () => {
  let dbPath = fs.readFileSync('./path.txt', "utf8").trim();
  if (dbPath == "") {
    openDevice()
  } else {
    return dbPath
  }
}

const openDevice = () => {
  const devicePathArr = dialog.showOpenDialogSync({
    properties: ['openDirectory'],
    defaultPath: "G:\\",
    title: "Укажите путь к устройству",
    buttonLabel: "Выбрать устройство"
  });
  if (devicePathArr != undefined) {
    let devicePath = devicePathArr[0];
    fs.writeFileSync('./path.txt', devicePath + "/system/explorer-3/explorer-3.db")
    ipc.send("reload")
  } else {
    DBpathError()
  }
}

const DBpathError = () => {
  dialog.showMessageBox({
    title: "Ошибка открытия базы данных",
    message: "Программе не удалось получить доступ к базе данных. С чем это может быть связано: \n - Проверьте, подключено ли ваше устройство. \n - Проверьте, верно ли указан путь к устройству.",
    buttons: ["Выбрать путь к устройству (рекомендуется)", "Указать путь к базе данных вручную", "Закрыть программу"]
  }).then(result => {
    if (result.response == 0) {
      openDevice()
    }
    if (result.response == 1) {
      manualOpenDB()
    }
    if (result.response == 2) {
      ipc.send("close")
    }
  })
}

const manualOpenDB = () => {
  const dbPathArr = dialog.showOpenDialogSync({
    properties: ['openFile'],
    defaultPath: "G:\\",
    title: "Укажите путь к базе данных",
    buttonLabel: "Выбрать базу данных"
  });
  if (dbPathArr != undefined) {
    let dbPath = dbPathArr[0];
    fs.writeFileSync('./path.txt', dbPath)
    ipc.send("reload")
  } else {
    DBpathError()
  }
}



var db = new sqlite3.Database(getDBPath(), (err, res) => {
  if (err) {
    DBpathError()
  } else {
    console.log("db opened")
  }
})



db.allAsync = function (sql) {
    var that = this;
    return new Promise(function (resolve, reject) {
        that.all(sql, function (err, row) {
            if (err) {
              DBpathError()
            } else {
              resolve(row)
            };
        });
    });
};


const getFromDB = async() => {

  let booksOnShelfs = await db.allAsync('SELECT bookshelfid as shelfId, bookid as bookId FROM bookshelfs_books ORDER BY bookid')
  let books = await db.allAsync('SELECT id as bookId, title as bookName, series, numinseries, author FROM books_impl ORDER BY title');

  let shelfs = await db.allAsync('SELECT id as shelfId, name as shelfName FROM bookshelfs ORDER BY name');

  let tags = await db.allAsync('SELECT id as tagId, name as tagName FROM genres ORDER BY name');

  let tagsInBooks = await db.allAsync('SELECT bookid as bookId, genreid as tagId FROM booktogenre ORDER BY genreid');

  let files = await db.allAsync("SELECT book_id as bookId FROM files ORDER BY book_id");
  let booksIds = files.map(a => a.bookId)
  books = books.filter(a => booksIds.indexOf(a.bookId) != -1)
  tagsInBooks = tagsInBooks.filter(a => booksIds.indexOf(a.bookId) != -1)

  tagsIds = tagsInBooks.map(a => a.tagId)
  tags = tags.filter(a => tagsIds.indexOf(a.tagId) != -1)

  books = sortByProp(books, "bookName")
  shelfs = sortByProp(shelfs, "shelfName")
  tags = sortByProp(tags, "tagName")


  return {books, shelfs, booksOnShelfs, tags, tagsInBooks};
}






const addBookToDB = async(bookId, shelfId) => {
  let checkExiting = await db.allAsync('SELECT bookid FROM bookshelfs_books WHERE bookid = ' + bookId + ' AND bookshelfid = ' + shelfId);
  if (checkExiting.length === 0) {
    let insertData = await db.run('INSERT INTO bookshelfs_books(bookid, bookshelfid, is_deleted, ts) VALUES('+bookId+', '+ shelfId+', 0, 1588495194)');
  }
}


const removeBookFromDB = async(bookId, shelfId) => {
  let deleteData = await db.run('DELETE FROM bookshelfs_books WHERE bookid = ' + bookId + ' AND bookshelfid = ' + shelfId);
}

const findLastShelfId = async() => {
  let lastId = await db.allAsync('SELECT id as shelfId FROM bookshelfs WHERE id = (SELECT MAX(id) FROM bookshelfs)');
  lastId = lastId[0].shelfId;
  return lastId;
}

const addNewShelfToDB = async(newShelfName, newShelfId) => {
  let insertData = await db.run('INSERT INTO bookshelfs(id, name, is_deleted) VALUES('+ newShelfId +', "'+ newShelfName +'", 0)');
}

const deleteShelfFromDB = async(shelfId) => {
  let deleteShelfs = await db.run('DELETE FROM bookshelfs WHERE id = ' + shelfId);
  let deleteBooksOnShelfs = await db.run('DELETE FROM bookshelfs_books WHERE bookshelfid = ' + shelfId);
}

const clearDB = async() => {
  let clearShelfs = await db.run('DELETE FROM bookshelfs WHERE is_deleted = 1');
  let clearBooksOnShelfs = await db.run('DELETE FROM bookshelfs_books WHERE is_deleted = 1');
}

module.exports = {
  getFromDB,
  addBookToDB,
  removeBookFromDB,
  addNewShelfToDB,
  findLastShelfId,
  clearDB,
  deleteShelfFromDB,
  sortByProp,
  sortCyrillic
}
