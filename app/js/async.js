var require = window.require
var sqlite3 = require('sqlite3');

const { dialog} = require('electron').remote
const { webContents } = require('electron').remote
const ipc = require('electron').ipcRenderer
const fs = require('fs');

const {
  sort,
  sortByProp,
  cyrillic
} = window.reqAppJs("sort.js");



//Выбор БД и обработка ошибок выбора БД
const getDBPath = () => {
  let dbPath = fs.readFileSync('./path.txt', "utf8").trim();
  if (dbPath == "") {
    openDevice()
  } else {
    return dbPath
  }
}

const openDevice = () => {
  const devicePath = dialog.showOpenDialogSync({
    properties: ['openDirectory'],
    defaultPath: "G:\\",
    title: "Укажите путь к устройству",
    buttonLabel: "Выбрать устройство"
  });
  if (devicePath != undefined) {
    fs.writeFileSync('./path.txt', devicePath[0] + "/system/explorer-3/explorer-3.db")
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
  const dbPath = dialog.showOpenDialogSync({
    properties: ['openFile'],
    defaultPath: "G:\\",
    title: "Укажите путь к базе данных",
    buttonLabel: "Выбрать базу данных"
  });
  if (dbPath != undefined) {
    fs.writeFileSync('./path.txt', dbPath[0])
    ipc.send("reload")
  } else {
    DBpathError()
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

/*
  //Очищаем данные об удалённых книгах
  let files = await db.allAsync("SELECT book_id as bookId FROM files ORDER BY book_id");
  let booksIds = files.map(a => a.bookId)
  books = books.filter(a => booksIds.indexOf(a.bookId) != -1)
  booksOnShelfs = booksOnShelfs.filter(a => booksIds.indexOf(a.bookId) != -1)
  tagsInBooks = tagsInBooks.filter(a => booksIds.indexOf(a.bookId) != -1)
  let tagsIds = tagsInBooks.map(a => a.tagId)
  tags = tags.filter(a => tagsIds.indexOf(a.tagId) != -1)
  */

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


//Добавить книгу в БД
const addBookToDB = async(bookId, shelfId) => {
  let checkExiting = await db.allAsync('SELECT bookid FROM bookshelfs_books WHERE bookid = ' + bookId + ' AND bookshelfid = ' + shelfId);
  if (checkExiting.length === 0) {
    let insertData = await db.run('INSERT INTO bookshelfs_books(bookid, bookshelfid, is_deleted, ts) VALUES('+bookId+', '+ shelfId+', 0, 1588495194)');
  }
}

//Удалить книгу из БД
const removeBookFromDB = async(bookId, shelfId) => {
  let deleteData = await db.run('DELETE FROM bookshelfs_books WHERE bookid = ' + bookId + ' AND bookshelfid = ' + shelfId);
}

//Найти id полки с максимальным значением. Требуется для добавления новых полок с уникальным id.
const findLastShelfId = async() => {
  let lastId = await db.allAsync('SELECT id as shelfId FROM bookshelfs WHERE id = (SELECT MAX(id) FROM bookshelfs)');
  lastId = lastId[0].shelfId;
  return lastId;
}

//Добавить полку в ДБ
const addNewShelfToDB = async(newShelfName, newShelfId) => {
  let insertData = await db.run('INSERT INTO bookshelfs(id, name, is_deleted) VALUES('+ newShelfId +', "'+ newShelfName +'", 0)');
}

//Удалить полку из ДБ
const deleteShelfFromDB = async(shelfId) => {
  let deleteShelfs = await db.run('DELETE FROM bookshelfs WHERE id = ' + shelfId);
  let deleteBooksOnShelfs = await db.run('DELETE FROM bookshelfs_books WHERE bookshelfid = ' + shelfId);
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
  let clearTagsWithoutBooks = await db.run('DELETE FROM genres WHERE id NOT IN (SELECT genreid FROM booktogenre)');
  let clearBooksSettingsWithoutFiles = await db.run('DELETE FROM books_settings WHERE bookid NOT IN (SELECT book_id FROM files)');
  let setAuthors = await db.run('UPDATE books_impl SET author = "Автор Неизвестен" WHERE author = ""');
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
  updateSettingsInDB
}
