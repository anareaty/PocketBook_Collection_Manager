var require = window.require
var sqlite3 = require('sqlite3');

const { dialog} = require('electron').remote
const ipc = require('electron').ipcRenderer
const fs = require('fs');

const { sort, sortByProp, cyrillic } = window.reqAppJs("sort.js");

const {localize} = window.reqAppJs("localization.js");


//Локализация
const getLocale = () => {
  let locale = fs.readFileSync('./locale.txt', "utf8").trim();
  if (locale == "ru" || locale == "en") {
    return locale
  } else {
    saveLocale("en")
    return "en"
  }
}

const saveLocale = (locale) => {
  fs.writeFileSync('./locale.txt', locale)
}



//Выбор БД и обработка ошибок выбора БД
const getDBPath = () => {
  let dbPath = fs.readFileSync('./path.txt', "utf8").trim();
  if (dbPath == "") {
    return openDevice()
  } else {
    return dbPath
  }
}

const openDevice = () => {
  let locale = getLocale()
  const devicePath = dialog.showOpenDialogSync({
    properties: ['openDirectory'],
    defaultPath: "G:\\",
    title: localize(locale).showPathToDevice,
    buttonLabel: localize(locale).selectDevice
  });
  if (devicePath != undefined) {
    let dbPath = devicePath[0] + "/system/explorer-3/explorer-3.db"
    fs.writeFileSync('./path.txt', dbPath)
    return dbPath;
  } else {
      return DBpathError()
  }
}

const DBpathError = () => {
  let locale = getLocale()
  let chooseButton = dialog.showMessageBoxSync({
    title: localize(locale).dbErrorTitle,
    message: localize(locale).dbErrorMessage,
    buttons: [localize(locale).selectDeviceButton, localize(locale).selectDbButton, localize(locale).closeProgramButton]
  });
    if (chooseButton == 0) {
      return openDevice()
    }
    if (chooseButton == 1) {
      return manualOpenDB()
    }
    if (chooseButton == 2) {
      ipc.send("close")
    }
}

const manualOpenDB = () => {
  let locale = getLocale()
  const dbPathArr = dialog.showOpenDialogSync({
    properties: ['openFile'],
    defaultPath: "G:\\",
    title: localize(locale).showPathToDB,
    buttonLabel: localize(locale).selectDB
  });
  if (dbPathArr != undefined) {
    let dbPath = dbPathArr[0]
    fs.writeFileSync('./path.txt', dbPath)
    return dbPath;
  } else {
    return DBpathError()
  }
}


//Открытие БД и запросы к БД

var db = new sqlite3.Database(getDBPath(), (err, res) => {
  if (err) {
    DBpathError()
  } else {
    console.log("db opened")
  }
})

//Асинхронный запрос к БД
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

//Получить данные из БД
const getFromDB = async() => {
  //Извлекаем данные из таблиц
  let booksOnShelfs = await db.allAsync('SELECT bookshelfid as shelfId, bookid as bookId FROM bookshelfs_books ORDER BY bookid')
  let books = await db.allAsync('SELECT id as bookId, title as bookName, series, numinseries, author FROM books_impl ORDER BY title');
  let shelfs = await db.allAsync('SELECT id as shelfId, name as shelfName FROM bookshelfs ORDER BY name');
  let tags = await db.allAsync('SELECT id as tagId, name as tagName FROM genres ORDER BY name');
  let tagsInBooks = await db.allAsync('SELECT bookid as bookId, genreid as tagId FROM booktogenre ORDER BY genreid');
  let booksSettings = await db.allAsync('SELECT bookid as bookId, completed, favorite FROM books_settings');

  //Добавляем свойства в книги
  booksSettingsIds = booksSettings.map(a => a.bookId)
  books = books.map((a) => {
    if (booksSettingsIds.indexOf(a.bookId) == -1) {
      a.completed = 0;
      a.favorite = 0;
    } else {
      booksSettings.forEach((b) => {
        if (a.bookId == b.bookId) {
          a.completed = b.completed;
          a.favorite = b.favorite;
        }
      });
    }
    return a;
  })

  //Сортируем данные по названиям
  books = sortByProp(books, "bookName", cyrillic)
  shelfs = sortByProp(shelfs, "shelfName", cyrillic)
  tags = sortByProp(tags, "tagName", cyrillic)


  return {books, shelfs, booksOnShelfs, tags, tagsInBooks, booksSettings};
}


//Добавить книгу на полку в БД
const addBookToDB = async(bookId, shelfId) => {
  let checkExiting = await db.allAsync('SELECT bookid FROM bookshelfs_books WHERE bookid = ' + bookId + ' AND bookshelfid = ' + shelfId);
  if (checkExiting.length === 0) {
    let insertData = await db.run('INSERT INTO bookshelfs_books(bookid, bookshelfid, is_deleted, ts) VALUES('+bookId+', '+ shelfId+', 0, 1588495194)');
  }
}

//Добавить тэг к книге
const addTagToBookInDB = async(bookId, tagId) => {
  let checkExiting = await db.allAsync('SELECT bookid FROM booktogenre WHERE bookid = ' + bookId + ' AND genreid = ' + tagId);
  if (checkExiting.length === 0) {
    let insertData = await db.run('INSERT INTO booktogenre(bookid, genreid) VALUES(' + bookId + ', '+ tagId + ')');
  }
}

//Удалить книгу с полки в БД
const removeBookFromDB = async(bookId, shelfId) => {
  let deleteData = await db.run('DELETE FROM bookshelfs_books WHERE bookid = ' + bookId + ' AND bookshelfid = ' + shelfId);
}

//Удалить тэг из книги в БД
const removeTagFromBookInDB = async(bookId, tagId) => {
  let deleteData = await db.run('DELETE FROM booktogenre WHERE bookid = ' + bookId + ' AND genreid = ' + tagId);
}

//Найти id тега с максимальным значением. Требуется для добавления новых тегов с уникальным id.
const findLastTagId = async() => {
  let lastIds = await db.allAsync('SELECT id as tagId FROM genres WHERE id = (SELECT MAX(id) FROM genres)');
  let lastId = 0;
  if (lastIds.length > 0) {
    lastId = lastIds[0].tagId;
  }
  return lastId;
}

//Найти id полки с максимальным значением. Требуется для добавления новых полок с уникальным id.
const findLastShelfId = async() => {
  let lastIds = await db.allAsync('SELECT id as shelfId FROM bookshelfs WHERE id = (SELECT MAX(id) FROM bookshelfs)');
  let lastId = 0;
  if (lastIds.length > 0) {
    lastId = lastIds[0].shelfId;
  }
  return lastId;
}

//Добавить полку в ДБ
const addNewShelfToDB = async(newShelfName, newShelfId) => {
  let insertData = await db.run('INSERT INTO bookshelfs(id, name, is_deleted) VALUES('+ newShelfId +', "'+ newShelfName +'", 0)');
}

//Добавить тег в ДБ
const addNewTagToDB = async(newTagName, newTagId) => {
  let insertData = await db.run('INSERT INTO genres(id, name) VALUES('+ newTagId +', "'+ newTagName +'")');
}

//Удалить полку из ДБ
const deleteShelfFromDB = async(shelfId) => {
  let deleteShelfs = await db.run('DELETE FROM bookshelfs WHERE id = ' + shelfId);
  let deleteBooksOnShelfs = await db.run('DELETE FROM bookshelfs_books WHERE bookshelfid = ' + shelfId);
}

//Удалить тег из ДБ
const deleteTagFromDB = async(tagId) => {
  let deleteTags = await db.run('DELETE FROM genres WHERE id = ' + tagId);
  let deleteTagsFromBooks = await db.run('DELETE FROM booktogenre WHERE genreid = ' + tagId);
}

//Добавить новую запись о свойствах
const addSettingsToDB = async(bookId, completed, favorite) => {
  let insertSettings = await db.run('INSERT INTO books_settings(bookid, profileid, completed, favorite) VALUES('+ bookId +', 1, '+ completed +', '+ favorite + ')');
}

//Обновить запись о свойствах
const updateSettingsInDB = async(bookId, completed, favorite) => {
  let updateSettings = await db.run('UPDATE books_settings SET completed = ' + completed + ', favorite = ' + favorite + ' WHERE bookid = ' + bookId);
}

//Очистка БД от записей об удалённых книгах и полках
const clearDB = async() => {
  let clearShelfs = await db.run('DELETE FROM bookshelfs WHERE is_deleted = 1');
  let clearBooksOnShelfs = await db.run('DELETE FROM bookshelfs_books WHERE is_deleted = 1');
  let clearBooksWithoutFiles = await db.run('DELETE FROM books_impl WHERE id NOT IN (SELECT book_id FROM files)');
  let clearBooksOnShelfsWithoutFiles = await db.run('DELETE FROM bookshelfs_books WHERE bookid NOT IN (SELECT book_id FROM files)');
  let clearBooksOnShelfsWithoutShelfs = await db.run('DELETE FROM bookshelfs_books WHERE bookshelfid NOT IN (SELECT id FROM bookshelfs)');
  let clearTagsInBooksWithoutFiles = await db.run('DELETE FROM booktogenre WHERE bookid NOT IN (SELECT book_id FROM files)');
  //let clearTagsWithoutBooks = await db.run('DELETE FROM genres WHERE id NOT IN (SELECT genreid FROM booktogenre)');
  let clearBooksSettingsWithoutFiles = await db.run('DELETE FROM books_settings WHERE bookid NOT IN (SELECT book_id FROM files)');
  //let setAuthors = await db.run('UPDATE books_impl SET author = "Автор Неизвестен" WHERE author = ""');
  let setProfile = await db.run('UPDATE books_settings SET profileid = 1 WHERE profileid IS NULL');

}

module.exports = {
  getFromDB,
  addBookToDB,
  removeBookFromDB,
  addNewShelfToDB,
  findLastShelfId,
  clearDB,
  deleteShelfFromDB,
  addSettingsToDB,
  updateSettingsInDB,
  getLocale,
  saveLocale,
  addTagToBookInDB,
  removeTagFromBookInDB,
  findLastTagId,
  addNewTagToDB,
  deleteTagFromDB,
}
