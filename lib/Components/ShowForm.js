// import FormRender from '@kne/react-form-render';
// import '@kne/react-form-render/dist/style.scss';
import React from 'react';
import FormItem from '../utils/formItem';

export default ({ data = {} }) => {
	const { title, _form = [] } = data;

	const formList = _form.map(itm => FormItem.newFromObject(itm));

	return (
		<div>
			{formList.map(itm => (
				<div className='form_itm_warp' key={itm.id} data-grid={{ x: 0, y: 0, w: 16, h: 1 }}>
					<div className='form_itm_label'>{itm.label}</div>
					<div className='form_itm_content'>{itm.component}</div>
				</div>
			))}
		</div>
	);
};
