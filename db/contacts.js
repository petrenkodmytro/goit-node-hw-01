// Модуль FileSystem відповідає за роботу з файлами в Node.js. Сучасна ініціалізація модуля з промісами відбувається наступним чином:
const fs = require("fs/promises");
// fs.readFile(filename, [options]) - читання файлу
// fs.writeFile(filename, data, [options]) - запис файлу
// fs.appendFile(filename, data, [options])- додавання у файл
// fs.rename(oldPath, newPath) - перейменування файлу.
// fs.unlink(path, callback) - видалення файлу.
const { nanoid } = require("nanoid");
// path - пакет вбудований в Node.js для створення шляхів, нормалізує шлях
const path = require("path");
// __dirname - абсолютний шлях до папки
const contactsPath = path.join(__dirname, "contacts.json");

const getListContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const allContacts = await getListContacts();
  const result = allContacts.find((item) => item.id === contactId);
  return result || nul;
};

const removeContact = async (contactId) => {
  const allContacts = await getListContacts();
  const index = allContacts.findIndex((item) => item.id === contactId);

  if (index === -1) {
    return null;
  }

  // деструктуризація массиву, що повертає splice
  const [result] = allContacts.splice(index, 1);
  // повністю перезаписуємо файл
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return result;
};

const addContact = async (data) => {
  const allContacts = await getListContacts();
  const newContact = {
    id: nanoid(),
    ...data,
  };
  allContacts.push(newContact);
  // перезаписуємо JSON
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return newContact;
};

const updateById = async (contactId, data) => {
  const allContacts = await getListContacts();
  const index = allContacts.findIndex((item) => item.id === contactId);

  if (index === -1) {
    return null;
  }

  allContacts[index] = { id: contactId, ...data };
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return allContacts[index];
};

// експорт функцій
// Дві головні ідеї CommonJS-модулів: об'єкт exports, що містить те, що модуль хоче зробити доступним для інших частин системи, та функцію require, яка використовується одними модулями для імпорту об'єкта exports з інших.
module.exports = {
  getListContacts,
  getContactById,
  removeContact,
  addContact,
  updateById,
};
// Конструкція module — спеціальний об'єкт, який введено в Node.js заради реалізації модулів Common.js. Все те, що буде надано його властивості exports, буде експортуватися з цього модуля.
