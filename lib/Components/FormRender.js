import React, { memo, useRef, useEffect, useState, useMemo } from 'react';
import { getItemFromObj } from '../utils/formItem';
import GridLayout from './Grid';
import { Typography, Divider } from 'antd';
import Form, { SubmitButton } from '@kne/react-form-antd';
import moment from 'moment'


export default memo( ( {  data = {}, defaultData = {}, onSubmit = console.log, submitText = '确定' } ) => {
	const { _form = [], grid = {} } = data;
	console.log( grid )

	const formList = _form.map( getItemFromObj ).map( itm => {
		const currentGridKeys = Object.keys( grid )
		
		console.log( 'currentGridKeys', currentGridKeys )
		console.log( 'itm.id', itm.id )
		const targetGrid = grid[currentGridKeys[0]].find( grid => grid.i === itm.id );

		return new Proxy( itm, {
			get ( itm, key ) {
				return key === 'grid' ? targetGrid : itm[key];
			},
			set () { }
		} );
	} );

	const ref = useRef();

	const _defaultData = useMemo( () => {
		const target = { ...defaultData }

		formList.filter( itm => itm.isDateFormItem && target[itm.id] ).forEach( itm => target[itm.id] = moment( target[itm.id] ) )

		return target

	}, [defaultData, formList] )
	useEffect( () => {
		ref.current.data = _defaultData;

	}, [_defaultData] );

	return (
		<div className="form_render react_form_templete_design">
			<Typography>
				{/* { title && <Title level={ 2 }>{ title }</Title> } */ }
				{/* { description && <Paragraph>{ description }</Paragraph> } */ }
				<Form type="inner" ref={ ref } onSubmit={ onSubmit } data={ _defaultData }>
					<GridLayout isDraggable={ false } isResizable={ false } grid={ grid }>
						{ formList.map( itm => (
							<FormItemRender key={ itm.id } itm={ itm } />
						) ) }
					</GridLayout>
					{ submitText && <SubmitButton style={ { margin: '20px auto', display: 'block' } } type="primary">
						{ submitText }
					</SubmitButton> }
				</Form>
			</Typography>
		</div>
	);
} );

// export const FormItemRender = memo( ( { itm, ...props } ) => (
	
// 	<div className='form_itm_warp' data-grid={ itm.grid } { ...props }>
// 		{/* <div className='form_itm_label'>{itm.label}</div>
// 		<div className='form_itm_content'>{itm.formComponent}</div> */}
// 		{ itm.formComponent }
// 	</div>
// ) );

export const FormItemRender = memo( ( { itm, ...props } ) => {
	console.log( itm.grid )
	return <div className='form_itm_warp' data-grid={ itm.grid } { ...props }>
	{/* <div className='form_itm_label'>{itm.label}</div>
	<div className='form_itm_content'>{itm.formComponent}</div> */}
	{ itm.formComponent }
</div>
})
	
	

