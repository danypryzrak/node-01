const argv = require("yargs").argv;
const { listContacts, getContactById, removeContact, addContact } = require('./contacts')


async function invokeAction({ action, id, name, email, phone }) {
switch (action) {
    case "list":
        console.table(await listContacts())
    break;

    case "get":
        console.log(await getContactById(id))
    break;

    case "add":
        console.log('New user added successfully')
        console.table(await addContact(name, email, phone))

    break;

    case "remove":
        console.log('This user removed successfully')
        console.table(await removeContact(id))
    default:
        console.warn("\x1B[31m Unknown action type!");
    }
}

invokeAction(argv);