import React, { useEffect, useState, useMemo } from 'react';
import { WidthProvider, Responsive } from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);
export default ({ children, isDraggable = true, grid, modGrid, rowHeight, cols, breakpoints, ...props }) => (
	<ResponsiveReactGridLayout onLayoutChange={ ( _, layouts ) => modGrid && modGrid( layouts ) } isDraggable={ isDraggable } layouts={ grid } breakpoints={ { lg: 2400, md: 2400, sm: 2400, xs: 640, xxs: 0 } } cols={ cols || { lg: 16, md: 16, sm: 16, xs: 16, xxs: 16 } } rowHeight={ rowHeight || 20 } margin={ [0, 0] } containerPadding={ [0, 0] } { ...props }>
		{children}
	</ResponsiveReactGridLayout>
);


