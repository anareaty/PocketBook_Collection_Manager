//Методы сортировки
const sort = (arr, sortMethod) => {
  arr.sort(sortMethod)
  return arr;
}


const sortByProp = (arr, prop, sortMethod) => {
  if (sortMethod == undefined) {
    sortMethod = simpleCompare
  }
  arr.sort((a, b) => sortMethod(a[prop], b[prop]))
  return arr;
}

//Обычная сортировка
const simpleCompare = (a, b) => {
  if (typeof(a) == "string") {
    a = a.toLowerCase()
  }
  if (typeof(b) == "string") {
    b = b.toLowerCase()
  }
  if (a < b) {
    return -1
  } else if (a > b) {
    return 1
  } else {
    return 0}
}

//Сортировка массива, чтобы кириллица была в начале, цифры и кавычки — после, а латиница — в конце.
const cyrillic = (a, b) => {
  if (typeof(a) == "string") {
    a = a.toLowerCase()
  }
  if (typeof(b) == "string") {
    b = b.toLowerCase()
  }
  let index = (x) => {
    if (/_/.test(x)) return 0
    else if (/[А-Яа-я]/.test(x)) return 2
    else if (/\d/.test(x)) return 3
    else if (/["'(]/.test(x)) return 4
    else if (/[A-Za-z]/.test(x)) return 5
    else return 1
  }

  if (index(a[0]) < index(b[0])) return -1
  else if (index(a[0]) > index(b[0])) return 1
  else if (index(a[0]) == 4) {
    if (index(a[1]) < index(b[1])) return -1
    else if (index(a[1]) > index(b[1])) return 1
  }
  else if (a < b) return -1
  else if (a > b) return 1
  else return 0
}

module.exports = {
  sort,
  sortByProp,
  cyrillic
}
