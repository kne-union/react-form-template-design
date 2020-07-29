import React, { memo, useRef, useEffect, useState } from 'react';
import { getItemFromObj } from '../utils/formItem';
import GridLayout from './Grid';
import { Typography, Divider } from 'antd';
import Form, { SubmitButton } from '@kne/react-form-antd';

const { Title, Paragraph, Text } = Typography;

export default memo(({ data = {}, defaultData, onSubmit = console.log, submitText = '确定' }) => {
	console.log(defaultData);
	const { title, description, _form = [], grid = {} } = data;

	const formList = _form.map(getItemFromObj).map(itm => {
		const targetGrid = grid.xxs.find(grid => grid.i === itm.id);

		return new Proxy(itm, {
			get(itm, key) {
				return key === 'grid' ? targetGrid : itm[key];
			},
			set() {}
		});
	});

	const ref = useRef();
	const [_, refresh] = useState([]);
	useEffect(() => {
		ref.current.data = defaultData;
		// ref.current.reset()
		// refresh( [] )
	}, [defaultData]);

	return (
		<div className="form_render react_form_templete_design">
			<Typography>
				{/* { title && <Title level={ 2 }>{ title }</Title> } */}
				{/* { description && <Paragraph>{ description }</Paragraph> } */}
				<Form ref={ref} onSubmit={onSubmit} data={defaultData}>
					<GridLayout isDraggable={false} isResizable={false} grid={grid}>
						{formList.map(itm => (
							<FormItemRender key={itm.id} itm={itm} />
						))}
					</GridLayout>
					<SubmitButton style={{ margin: 'auto', display: 'block' }} type="primary">
						{submitText}
					</SubmitButton>
				</Form>
			</Typography>
		</div>
	);
});

export const FormItemRender = memo(({ itm, ...props }) => (
	<div className='form_itm_warp' data-grid={itm.grid} {...props}>
		{/* <div className='form_itm_label'>{itm.label}</div>
		<div className='form_itm_content'>{itm.formComponent}</div> */}
		{itm.formComponent}
	</div>
));
