import React, { useState, useMemo, useEffect, useRef, memo } from 'react';
import Draggable from 'react-draggable';
import useRefresh from '../utils/hoc';

export default memo(({ children, onStop, ...props }) => {
	const ref = useRef();
	const refresh = useRefresh();

	const autoReposition = ({ clientX, clientY }) => {
		onStop && onStop({ x: clientX, y: clientY });
		ref.current.state.x = 0;
		ref.current.state.y = 0;
		refresh();
	};

	return (
		<Draggable ref={ref} onStop={autoReposition} {...props}>
			{children}
		</Draggable>
	);
});
