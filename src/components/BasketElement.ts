import { Component } from './base/Component';
import { EventEmitter } from './base/events';

export interface IBasketElement {
	id: string;
	index: number;
	title: string;
	price: number;
}

export class BasketElement extends Component<IBasketElement> {
	protected _index: HTMLElement;
	protected _title: HTMLElement;
	protected _price: HTMLElement;
	protected _button: HTMLButtonElement;

	constructor(container: HTMLElement, protected events: EventEmitter) {
		super(container);

		this._index = this.container.querySelector('.basket__item-index');
		this._price = this.container.querySelector('.card__price');
		this._title = this.container.querySelector('.card__title');
		this._button = this.container.querySelector('.basket__item-delete');

		if (this._button) {
			this._button.addEventListener('click', () => {
				this.events.emit('basket:delete', { index: Number(this._index.textContent) });
			});
		}
	}

	set index(val: number) {
		this.setText(this._index, val);
	}

	set title(title: string) {
		this.setText(this._title, title);
	}
	set price(val: number) {
		this.setText(this._price, `${val} синапсов`);
	}
}
