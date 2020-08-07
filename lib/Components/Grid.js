import React, { useEffect, useState, useMemo } from 'react';
import { WidthProvider, Responsive } from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);
export default ({ children, isDraggable = true, grid, modGrid, rowHeight, cols, breakpoints, ...props }) => (
	<ResponsiveReactGridLayout onLayoutChange={ ( _, layouts ) => modGrid && modGrid( layouts ) } isDraggable={ isDraggable } layouts={ grid } breakpoints={ { lg: 128, md: 128, sm: 128, xs: 128, xxs: 128 } } cols={ cols || { lg: 16, md: 12, sm: 8, xs: 4, xxs: 4 } } rowHeight={ rowHeight || 80 } margin={ [0, 0] } containerPadding={ [0, 0] } { ...props }>
		{children}
	</ResponsiveReactGridLayout>
);


