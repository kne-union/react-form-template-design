import React, { useMemo, useEffect, useRef, memo, useCallback, useContext } from 'react';
import { FormOption, SimpleOption, getLabel } from './utils/config';
import AutoReposition from './Components/AutoReposition';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import context from './context'

const Styles = makeStyles( ( theme ) => ( {
    formItem: {
        border: `1px solid ${theme.primary}`,
        borderRadius: theme.radius,
        padding: theme.space,
        margin: theme.space
    }
} ) )


export default memo( (  ) => {
    const { handleDragOver } = useContext( context )
    
    const Style = Styles()
    const formOptionRender = useMemo( () => {
        return FormOption.map( itm => (
            <AutoReposition onStop={ e => handleDragOver( itm, e ) } key={ itm }>
                <div className={ Style.formItem }>
                    <div >{ getLabel( itm ) }</div>
                </div>
            </AutoReposition>
        ) );
    }, [handleDragOver] );

    const simpleOptionRender = useMemo( () => {
        return SimpleOption.map( itm => (
            <AutoReposition onStop={ e => handleDragOver( itm, e ) } key={ itm }>
                <div className={ Style.formItem }>
                    <div >{ getLabel( itm ) }</div>
                </div>
            </AutoReposition>
        ) );
    }, [handleDragOver] );
    return <div>
        {/* <TextField fullWidth={ true } variant="outlined" label="表单名" value={ title } onChange={ e => modTitle( e.target.value ) } /> */ }
        { formOptionRender }
        { simpleOptionRender }
    </div>
} )
