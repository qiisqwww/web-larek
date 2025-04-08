import { IContacts } from '../types';
import { IEvents } from './base/events';
import { Form } from './common/Form';

export class Contacts extends Form<IContacts> {
	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);
	}

	set email(val: string) {
		(this.container.elements.namedItem('email') as HTMLSelectElement).value = val;
	}

	set phone(val: string) {
		(this.container.elements.namedItem('phone') as HTMLSelectElement).value = val;
	}
}
