
const localize = (locale) => {
  if (locale == "en") {
    return {
      newShelf: "New shelf",
      booksWithoutShelfs: "Books without shelves",
      addShelf: "Add shelf",
      newShelfName: "New shelf name",
      deleteShelf: "Delete shelf",
      allBooks: "All books",
      allShelfs: "All shelves",
      delFromShelf: "Delete from shelf",
      delFromAnotherShelf: "Delete from another shelf",
      delFromThisShelf: "Delete from this shelf",
      addToShelf: "Add to shelf",
      selectAllBooks: "Select all books",
      clearSelected: "Clear selected",
      filterByTags: "Filter by tags",
      filterBySeries: "Filter by series",
      filterByAuthors: "Filter by authors",
      sort: "Sort: ",
      byName: "By name",
      byAuthor: "By author",
      byNumInSeries: "By number in series",
      shelfs: "Shelves",
      changeShelfsForBook: "(change shelves)",
      close: "Close",
      clear: "Clear",
      selectTags: "Select tags",
      selectSeries: "Select series",
      selectAuthor: "Select author",
      loading: "Loading...",
      showPathToDevice: "Select path to device",
      selectDevice: "Select device",
      dbErrorTitle: "Database opening error",
      dbErrorMessage: "The program was unable to access the database. What this may be related to: \n - Check if your device is connected. \n - Check if the path to the device is correct.",
      selectDeviceButton: "Select path to device (recommended)",
      selectDbButton: "Select path to database manually",
      closeProgramButton: "Close program",
      showPathToDB: "Select path to database",
      selectDB: "Select database"
    }
  } else if (locale == "ru") {
    return {
      newShelf: "Новая полка",
      booksWithoutShelfs: "Книги без полок",
      addShelf: "Добавить полку",
      newShelfName: "Название новой полки",
      deleteShelf: "Удалить полку",
      allBooks: "Все книги",
      allShelfs: "Все полки",
      delFromShelf: "Удалить с полки",
      delFromAnotherShelf: "Удалить с другой полки",
      delFromThisShelf: "Удалить с этой полки",
      addToShelf: "Добавить на полку",
      selectAllBooks: "Выбрать все книги",
      clearSelected: "Очистить выбранные",
      filterByTags: "Фильтр по тeгам",
      filterBySeries: "Фильтр по сериям",
      filterByAuthors: "Фильтр по авторам",
      sort: "Сортировка: ",
      byName: "По названию",
      byAuthor: "По автору",
      byNumInSeries: "По номеру в серии",
      shelfs: "Полки",
      changeShelfsForBook: "(редактировать полки)",
      close: "Закрыть",
      clear: "Очистить",
      selectTags: "Выбрать теги",
      selectSeries: "Выбрать серию",
      selectAuthor: "Выбрать автора",
      loading: "Загрузка...",
      showPathToDevice: "Укажите путь к устройству",
      selectDevice: "Выбрать устройство",
      dbErrorTitle: "Ошибка открытия базы данных",
      dbErrorMessage: "Программе не удалось получить доступ к базе данных. С чем это может быть связано: \n - Проверьте, подключено ли ваше устройство. \n - Проверьте, верно ли указан путь к устройству.",
      selectDeviceButton: "Выбрать путь к устройству (рекомендуется)",
      selectDbButton: "Указать путь к базе данных вручную",
      closeProgramButton: "Закрыть программу",
      showPathToDB: "Укажите путь к базе данных",
      selectDB: "Выбрать базу данных"
    }
  }
}

module.exports = {
  localize
}
