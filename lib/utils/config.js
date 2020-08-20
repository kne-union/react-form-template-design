import React from 'react';
import { CheckboxGroup, RadioGroup, Input as FInput, Select as FSelect, DatePicker as FDatePicker, TextArea as FTextArea } from '@kne/react-form-antd';
import { Input, Select, DatePicker, Checkbox, Radio } from 'antd';
const { TextArea } = Input;

export const canEditOptions = name => ['Select', 'Checkbox', 'Radio'].some( itm => itm === name )

export const FormOption = ['Input', 'Select', 'Textarea', 'DatePicker', 'DateTimePicker', 'Checkbox', 'Radio'];

export const SimpleOption = ['Img', 'Text', "StaticCom"];

export const getFormComponent = ( name, props = {} ) => {
	switch ( name ) {
		case 'Input':
			return <FInput { ...props } />;
		case 'Textarea':
			return <FTextArea className='full_width' { ...props } />;
		case 'Select':
			return <FSelect className='full_width' { ...props } />;
		case 'DatePicker':
			return <FDatePicker className='full_width' { ...props } />;
		case 'DateTimePicker':
			return <FDatePicker showTime className='full_width' { ...props } />;
		case "Checkbox":
			return <CheckboxGroup { ...props } />
		case "Radio":
			return <RadioGroup { ...props } />
		case 'Img':
			return <img className='full' { ...props } />;
		case 'Text':
			return <div className='full' { ...props } />;
		case "StaticCom":
			return <div className='full static_component' { ...props } ></div>
		default:
			return null;
	}
};

export const getComponent = ( name, props = {} ) => {
	switch ( name ) {
		case 'Input':
			return <Input { ...props } />;
		case 'Textarea':
			return <TextArea className='full_width' { ...props } />;
		case 'Select':
			return <Select className='full_width' { ...props } />;
		case 'DatePicker':
			return <DatePicker className='full_width' { ...props } />;
		case 'DateTimePicker':
			return <DatePicker showTime className='full_width' { ...props } />;
		case "Checkbox":
			return <Checkbox.Group { ...props } />
		case "Radio":
			return <Radio.Group { ...props } />
		case 'Img':
			return <img className='full' { ...props } />;
		case 'Text':
			return (
				<div className='full' { ...props }>
					{ props.text ? props.children : '一段可有可无的文字' }
				</div>
			);
		case "StaticCom":
			return <div className='full static_component_black' { ...props } ></div>
		default:
			return null;
	}
};



export const getLabel = name => {
	switch ( name ) {
		case 'Input':
			return "Input 文本框"

		case "Select":
			return "Select 选择器"

		case "Radio":
			return "Radio 单选框"

		case "Checkbox":
			return "CheckBox 多选框"

		case "Textarea":
			return "Textarea 多行文本"

		case "DatePicker":
			return "DatePicker 日期选择器"

		case "DateTimePicker":
			return "DateTimePicker 日期和时间选择器"

		case "Img":
			return "Img 图片"

		case "Text":
			return "Text 段落文本展示"

		case "StaticCom":
			return "StaticComponent 占位器"
		
		default: return ""
	}
}