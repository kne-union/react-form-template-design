import React from 'react';

export default domRef => {
	return React.useCallback((event = { x: 0, y: 0 }) => {
		const dom = domRef.current || document.body;

		const { left, top, right, bottom } = dom.getBoundingClientRect();

		return event.x > left && event.x < right && event.y > top && event.y < bottom;
	}, []);
};
