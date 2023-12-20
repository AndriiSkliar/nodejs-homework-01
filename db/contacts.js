
const fs = require('fs/promises');
const path = require('path');
const {nanoid} = require("nanoid");

const contactsPath = path.join(__dirname, 'contacts.json');

async function listContacts() {
  const data = await fs.readFile(contactsPath);

  return JSON.parse(data);
}

async function getContact(contactId) {
  const contacts = await listContacts();
  const contact = contacts.find(contact => contact.id === contactId);

  return contact || null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex(item => item.id === contactId);
  if (index === -1){
        return null;
  }
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  
  return result;
}

async function addContact(data) {
  const contacts = await listContacts();
  const newContact = {
      id: nanoid(),
      ...data
  }
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  
  return newContact;
}

const updateContact = async(id, name, email, phone) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(item => item.id === id);
  if (index === -1){
      return null;
  }
  contacts[index] = {id, name, email, phone};
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  
  return contacts[index];
}

module.exports = {
  listContacts,
  getContact,
  removeContact,
  addContact,
  updateContact,
}