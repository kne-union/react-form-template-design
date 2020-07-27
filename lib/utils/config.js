import React from 'react';
import { Input as FInput, Select as FSelect, DatePicker as FDatePicker, TextArea as FTextArea } from '@kne/react-form-antd';
import { Input, Select, DatePicker } from 'antd';
const { TextArea } = Input;

export const FormOption = ['Input', 'Select', 'Textarea', 'DatePicker', 'DateTimePicker'];

export const SimpleOption = ['Img', 'Text'];

export const getFormComponent = (name, props = {}) => {
	switch (name) {
		case 'Input':
			return <FInput {...props} />;
		case 'Textarea':
			return <FTextArea className='full_width' {...props} />;
		case 'Select':
			return <FSelect className='full_width' {...props} />;
		case 'DatePicker':
			return <FDatePicker className='full_width' {...props} />;
		case 'DateTimePicker':
			return <FDatePicker showTime className='full_width' {...props} />;
		case 'Img':
			return <img className='full' {...props} />;
		case 'Text':
			return <div className='full' {...props} />;
		default:
			return null;
	}
};

export const getComponent = (name, props = {}) => {
	switch (name) {
		case 'Input':
			return <Input {...props} />;
		case 'Textarea':
			return <TextArea className='full_width' {...props} />;
		case 'Select':
			return <Select className='full_width' {...props} />;
		case 'DatePicker':
			return <DatePicker className='full_width' {...props} />;
		case 'DateTimePicker':
			return <DatePicker showTime className='full_width' {...props} />;
		case 'Img':
			return <img className='full' {...props} />;
		case 'Text':
			return (
				<div className='full' {...props}>
					{props.text ? props.children : '一段可有可无的文字'}
				</div>
			);

		// return <pre className='full { ...props } >{ props.text ? props.text : '一段可有可无的文字' }</pre>
		default:
			return null;
	}
};
