import React from 'react';
import { getComponent, getFormComponent } from './config';
let id = 0;

const getId = () => ++id;

class Item {
	constructor(name) {
		this.id = '' + getId() + Date.now();
		this.name = name;
		this._component = name;
		this._style = {};
	}

	get formComponent() {
		return getFormComponent(this._component, this.props);
	}

	get component() {
		return getComponent(this._component, this.props);
	}

	get style() {
		return this._style;
	}

	set style(style = {}) {
		typeof style === 'function' ? (this._style = style(this._style)) : (this._style = style);
	}

	get _formItemInfo() {
		return {
			name: this.name,
			component: this._component,
			style: this._style,
			id: this.id
		};
	}

	get props() {
		return { name: this.id };
	}
}

export class FormItem extends Item {
	constructor(name) {
		super(name);
		this.label = name;
		this._options = [];
		this.required = 'false';
		this.placeholder = '';
		this.style = _style => ( { ..._style, width: '100%' } )
	}

	static newFromObject(obj) {
		const target = new FormItem(obj.name);

		target.label = obj.label;
		target.options = obj.options;
		target.style = obj.style;
		target.required = obj.required;
		target.placeholder = obj.placeholder;
		target.id = obj.id;

		return target;
	}

	get formItemInfo() {
		return {
			...this._formItemInfo,
			label: this.label,
			options: this._options,
			required: this.required,
			placeholder: this.placeholder
		};
	}

	get props() {
		return {
			...super.props,
			style: this._style,
			options: this._options.map(itm => ({ label: itm, value: itm })),
			placeholder: this.placeholder,
			label: this.label,
			required: Boolean( this.required )
		};
	}

	set options(options = []) {
		typeof options === 'function' ? (this._options = options(this._options)) : (this._options = options);
	}

	addOption(option) {
		this._options = [...this._options, option];
	}
}

export class ImageComponent extends Item {
	constructor(name) {
		super(name);
		this.url = '';
	}

	get props() {
		return {
			...super.props,
			src: this.url,
			style: this._style
		};
	}

	set src(url) {
		this.url = url;
	}

	get src() {
		return this.url;
	}

	get formItemInfo() {
		return {
			...this._formItemInfo,
			src: this.src
		};
	}

	static newFromObject(obj) {
		const target = new ImageComponent(obj.name);

		target.style = obj.style;
		target.id = obj.id;
		target.src = obj.src;

		return target;
	}
}

export class TextComponent extends Item {
	constructor(name) {
		super(name);
		this.text = '';
	}

	get props() {
		const text = this.text;
		// const _text = text.replace( /\r\n/g, '<br/>' ).replace( /\n/g, '<br/>' ).replace( /\s/g, '&nbsp;' )
		// const splitTextByBr = _text.split( '<br/>' )
		// const splitTextByNbsp = splitTextByBr.map( itm => {
		//     const splitItm = itm.split( '&nbsp;' )
		//     return splitItm.map( ( itm, key ) => itm === '' ? <span key={ key }>&nbsp;&nbsp;</span> : <span key={ key }>{ itm }&nbsp;</span> )
		// } ).map( ( domList, key ) => <p key={ key }>{ domList }</p> )

		return {
			...super.props,
			style: this._style,
			text: this.text,
			// children: <div >{ splitTextByNbsp }</div>
			children: <pre style={{ whiteSpace: 'pre-wrap' }}>{text}</pre>
		};
	}

	get formItemInfo() {
		return {
			...this._formItemInfo,
			text: this.text
		};
	}

	static newFromObject(obj) {
		const target = new TextComponent(obj.name);

		target.style = obj.style;
		target.id = obj.id;
		target.text = obj.text;

		return target;
	}

	// static formatText ( text ) {
	//     // .replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>').replace(/\s/g, ' ')
	//     const splitrn = text.split('')
	// }
}

export const getItem = name => {
	switch (name) {
		case 'Text':
			return new TextComponent(name);
		case 'Img':
			return new ImageComponent(name);
		default:
			return new FormItem(name);
	}
};

export const getItemFromObj = obj => {
	switch (obj.name) {
		case 'Text':
			return TextComponent.newFromObject(obj);
		case 'Img':
			return new ImageComponent.newFromObject(obj);
		default:
			return new FormItem.newFromObject(obj);
	}
};









