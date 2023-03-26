const fsp = require('fs').promises;
const { nanoid } = require('nanoid');
const path = require('path')

const contactsPath = path.join(__dirname, 'db/contacts.json');


async function listContacts() {
    const contacts = await fsp.readFile(contactsPath)
    const parsed = JSON.parse(contacts)

    return(parsed)
}

async function getContactById(contactId) {
    const contacts = await listContacts()
    const desired = contacts.find(contact => contact.id === contactId)

    return desired
}

async function removeContact(contactId) {
    const contacts = await listContacts()
    const filtered = contacts.filter(contact => contact.id !== contactId)
    fsp.writeFile(contactsPath, JSON.stringify(filtered, null, 2))

    return filtered
}

async function addContact(name, email, phone) {
    const contacts = await listContacts()
    const newContact = {
        id: nanoid(),
        name,
        email,
        phone
    }
    contacts.push(newContact)
    fsp.writeFile(contactsPath, JSON.stringify(contacts, null, 2))

    return contacts
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}