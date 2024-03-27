const contactForm = document.getElementById("contactForm");
const nameInput = document.getElementById("nameInput");
const phoneInput = document.getElementById("phoneInput");
const emailInput = document.getElementById("emailInput");
const contactList = document.getElementById("contactList");

function getContactsFromStorage() {
    const contactsJSON = localStorage.getItem("contacts");
    return contactsJSON ? JSON.parse(contactsJSON) : [];
}

function saveContactsToStorage(contacts) {
    localStorage.setItem("contacts", JSON.stringify(contacts));
}

function loadContacts() {
    const contacts = getContactsFromStorage();
    contacts.forEach((contact) => {
        const listItem = createContactListItem(contact);
        contactList.appendChild(listItem);
    });
}

function createContactListItem(contact) {
    const listItem = document.createElement("li");
    const nameSpan = document.createElement("span");
    nameSpan.textContent = "Nombre: " + contact.name;
    const phoneSpan = document.createElement("span");
    phoneSpan.textContent = "Teléfono: " + contact.phone;
    const emailSpan = document.createElement("span");
    emailSpan.textContent = "Correo electrónico: " + contact.email;
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Eliminar contacto";
    deleteBtn.classList.add("deleteBtn");

    listItem.appendChild(nameSpan);
    listItem.appendChild(phoneSpan);
    listItem.appendChild(emailSpan);
    listItem.appendChild(deleteBtn);

    deleteBtn.addEventListener("click", function () {
        deleteContact(contact);
    });

    return listItem;
}

function addContact(name, phone, email) {

    if (!/^\d+$/.test(phone)) {
        alert("El campo de teléfono solo puede contener números. Verifique y vuelva a intentarlo, por favor");
        return;
    }


    if (!email.includes('@')) {
        alert("Ingrese un correo electrónico válido. Verifique y vuelva a intentarlo, por favor");
        return;
    }

    const contact = { name, phone, email };


    const contacts = getContactsFromStorage();
    const contactExists = contacts.some(c => c.name === name && c.phone === phone && c.email === email);
    if (contactExists) {
        alert("Este contacto ya está agregado.");
        return;
    }

    const listItem = createContactListItem(contact);
    contactList.appendChild(listItem);

    contacts.push(contact);
    saveContactsToStorage(contacts);
}

function deleteContact(contact) {
    const contacts = getContactsFromStorage();

    const updatedContacts = contacts.filter(
        (c) =>
            c.name !== contact.name ||
            c.phone !== contact.phone ||
            c.email !== contact.email
    );

    saveContactsToStorage(updatedContacts);

    contactList.innerHTML = "";

    loadContacts();
}

window.addEventListener("load", loadContacts);

contactForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const name = nameInput.value;
    const phone = phoneInput.value;
    const email = emailInput.value;
    if (name && phone && email) {
        addContact(name, phone, email);
        nameInput.value = "";
        phoneInput.value = "";
        emailInput.value = "";
    } else {
        alert("Por favor, completa todos los campos.");
    }
});



