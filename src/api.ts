import { Contact } from "./models/Contact";

const apiUrl = process.env.REACT_APP_API_URL;

export const getAllContacts = async () => {
  try {
    const response = await fetch(`${apiUrl}/contacts`, {
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());

    return response;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const deleteContact = async (guid: string) => {
  try {
    const response = await fetch(`${apiUrl}/contacts/${guid}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "DELETE",
    }).then((res) => res.json());

    return response;
  } catch (err) {
    console.error(err);
    return err;
  }
};


export const searchContact = async (searchText: string) => {
  try {
    const response = await fetch(`${apiUrl}/contacts/search/${searchText}`, {
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());

    return response;
  } catch (err) {
    console.error(err);
    return err;
  }
};


export const updateContact = async (contact: Contact) => {
  try {
    const response = await fetch(`${apiUrl}/contacts/${contact.id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(contact)
    }).then((res) => res.json());

    return response;
  } catch (err) {
    console.error(err);
    return err;
  }
};


export const addContact = async (firstName: string, lastName: string, email: string, phone: string) => {
  try {
    const response = await fetch(`${apiUrl}/contacts`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        phone,
      })
    }).then((res) => res.json());

    return response;
  } catch (err) {
    console.error(err);
    return err;
  }
};
