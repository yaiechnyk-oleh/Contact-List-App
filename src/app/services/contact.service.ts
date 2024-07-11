import { Injectable } from '@angular/core';
import { Contact } from '../models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private contactsKey = 'contacts';

  constructor() {
    this.initializeContacts();
  }

  private initializeContacts() {
    if (!localStorage.getItem(this.contactsKey)) {
      const initialContacts: Contact[] = [
        {
          id: 1,
          firstName: 'Alice',
          lastName: 'Smith',
          phoneNumber: '111-222-3333',
          dateOfBirth: '1985-05-15',
          email: 'alice.smith@example.com',
          address: '456 Oak St'
        },
        {
          id: 2,
          firstName: 'Bob',
          lastName: 'Johnson',
          phoneNumber: '444-555-6666',
          dateOfBirth: '1978-03-22',
          email: 'bob.johnson@example.com',
          address: '789 Pine St'
        },
        {
          id: 3,
          firstName: 'Carol',
          lastName: 'Williams',
          phoneNumber: '777-888-9999',
          dateOfBirth: '1992-12-11',
          email: 'carol.williams@example.com',
          address: '101 Maple Ave'
        },
        {
          id: 4,
          firstName: 'David',
          lastName: 'Brown',
          phoneNumber: '222-333-4444',
          dateOfBirth: '1980-07-30',
          email: 'david.brown@example.com',
          address: '202 Birch St'
        },
        {
          id: 5,
          firstName: 'Eve',
          lastName: 'Davis',
          phoneNumber: '555-666-7777',
          dateOfBirth: '1988-09-18',
          email: 'eve.davis@example.com',
          address: '303 Cedar Ln'
        }
      ];
      localStorage.setItem(this.contactsKey, JSON.stringify(initialContacts));
    }
  }

  getContacts(): Contact[] {
    return JSON.parse(localStorage.getItem(this.contactsKey) || '[]');
  }

  getContact(id: number): Contact {
    return this.getContacts().find(contact => contact.id === id) || {} as Contact;
  }

  addContact(contact: Contact): void {
    const contacts = this.getContacts();
    contact.id = contacts.length > 0 ? Math.max(...contacts.map(c => c.id)) + 1 : 1;
    contacts.push(contact);
    localStorage.setItem(this.contactsKey, JSON.stringify(contacts));
  }

  updateContact(contact: Contact): void {
    const contacts = this.getContacts();
    const index = contacts.findIndex(c => c.id === contact.id);
    if (index !== -1) {
      contacts[index] = contact;
      localStorage.setItem(this.contactsKey, JSON.stringify(contacts));
    }
  }

  deleteContact(id: number): void {
    const contacts = this.getContacts();
    const updatedContacts = contacts.filter(contact => contact.id !== id);
    localStorage.setItem(this.contactsKey, JSON.stringify(updatedContacts));
  }
}
