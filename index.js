const argv = require("yargs").argv;
console.log(argv);
const contacts = require("./db/contacts");

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
