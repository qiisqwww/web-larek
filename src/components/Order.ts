import { IOrderForm } from '../types';
import { ensureElement } from '../utils/utils';
import { IEvents } from './base/events';
import { Form } from './common/Form';

export class Order extends Form<IOrderForm> {
	protected _online: HTMLButtonElement;
	protected _offline: HTMLButtonElement;

	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);

		this._online = ensureElement<HTMLButtonElement>('[name=card]', this.container);
		this._offline = ensureElement<HTMLButtonElement>('[name=cash]', this.container);

		this._online.addEventListener('click', () => {
			this._online.classList.add('button_alt_active');
			this._online.classList.remove('button_alt');
			this._offline.classList.add('button_alt');
			this._offline.classList.remove('button_alt_active');
			this.events.emit('order:change', { field: 'payment', value: 'online' });
		});

		this._offline.addEventListener('click', () => {
			this._online.classList.remove('button_alt_active');
			this._online.classList.add('button_alt');
			this._offline.classList.remove('button_alt');
			this._offline.classList.add('button_alt_active');
			this.events.emit('order:change', { field: 'payment', value: 'offline' });
		});
	}

	set address(val: string) {
		(this.container.elements.namedItem('address') as HTMLSelectElement).value = val;
	}
}
