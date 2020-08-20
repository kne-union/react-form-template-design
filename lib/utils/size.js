export const getStyle = ( type, defaultWidth ) => {
    switch ( type ) {
        case 'pc':
            return {}
        case 'mobile':
            return {
                width: '375px',
                margin: 'auto',
                border: '1px solid #fff',
                minHeight: '240px'
            }
        default:
            return getWidth( 'pc' )
    }
}

export const getWidth = type => {
    switch ( type ) {
        case 'pc':
            return '1280px'
        case 'mobile':
            return 375
        default:
            return getWidth( 'pc' )
    }
}

export const calcStyle = ( { containWidth, targetWidth } ) => {
    console.log( containWidth, targetWidth )
    const zoom = containWidth / targetWidth
    console.log( '_____', zoom )
    // return { transform: `scale(${zoom})`, width: `${targetWidth}px`, transformOrigin: '0 0' }
    return { width: `${targetWidth}px` }
}


