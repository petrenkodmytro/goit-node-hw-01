const argv = require("yargs").argv;
// властивість process.argv містить масив аргументів командного рядка. Нульовим елементом буде ім'я програми, що виконується. node, другим ім'я самого сценарію, що виконується, і тільки потім самі параметри.
console.log(argv);
// contacts - це об'єкт з експортованими методами
const contacts = require("./db/contacts");

// на зразок редюсера в реакті
const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await contacts.getListContacts();
      return console.table(allContacts);

    case "getById":
      const contact = await contacts.getContactById(id);
      return console.table(contact);

    case "add":
      const newContact = await contacts.addContact({ name, email, phone });
      return console.table(newContact);

    case "updateById":
      const updateContact = await contacts.updateById(id, { name, email, phone });
      return console.table(updateContact);

    case "remove":
      const delContact = await contacts.removeContact(id);
      return console.table(delContact);

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(argv);

// invokeAction({ action: "list" });
// invokeAction({ action: "getById", id: "AeHIrLTr6JkxGE6SN-0Rw" });
// invokeAction({ action: "add", name: "ddd", email: "dfnjkdjfk", phone: "2656526526" });
// invokeAction({ action: "updateById", id: "NzYbwWfoYAjNPH-IAJniK", name: "QQQQQQQ", email: "dfnjkdjfk", phone: "2656526526" });
// invokeAction({ action: "remove", id: "rsKkOQUi80UsgVPCcLZZW" });

// Запусти команди в терміналі і зроби окремі скріншоти результату виконання кожної команди.
// #1 Отримуємо і виводимо весь список контактів у вигляді таблиці (console.table)
// node index.js --action="list"

// #2 Отримуємо контакт по id і виводимо у консоль об'єкт контакту або null, якщо контакту з таким id не існує.
// node index.js --action="get" --id 05olLMgyVQdWRwgKfg5J6

// #3 Додаємо контакт та виводимо в консоль об'єкт новоствореного контакту
// node index.js --action="add" --name Mango --email mango@gmail.com --phone 322-22-22

// #4 Видаляємо контакт та виводимо в консоль об'єкт видаленого контакту або null, якщо контакту з таким id не існує.
// node index.js --action="remove" --id qdggE76Jtbfd9eWJHrssH