import React, { useState, useMemo, useEffect, useRef, memo, useCallback } from 'react';
import { getItem, getItemFromObj } from './utils/formItem';
import Theme from './Components/Theme';
import useEventInside from 'use-event-inside';
import { Provider } from './context';
import event from './utils/event'
import Example from './Example'
import Layout from './Layout'
import ConfigForm2 from './ConfigForm'
import './main.scss';

import _FormRender from './Components/FormRender';
export const FormRender = _FormRender;

export default ( { handleSuccessEdit = console.log, defaultLayout = {} } ) => {

    const layoutRef = useRef();

    const [formList, modFormList] = useState( defaultLayout._form ? defaultLayout._form.map( getItemFromObj ) : [] );
    const [configTarget, modConfigTarget] = useState( null );

    useEffect( () => {
        const f = id => {
            modFormList( currentFormList => {
                const newFormList = currentFormList.filter( itm => itm.id !== id )
                return newFormList
            } )
            modConfigTarget( null )
        }
        event.on( 'delete_self', f )

        return () => event.rm( 'delete_self', f )
    }, [] )

   

    const handleFormSubmit = data => {
        Object.keys( data )
            .filter( key => key !== '__options' )
            .map( key => ( key === 'options' ? ( configTarget[key] = data[key].split( ',' ) ) : key === 'style' ? ( configTarget[key] = JSON.parse( data[key] ) ) : ( configTarget[key] = data[key] ) ) );

        modFormList( list => list.map( itm => ( itm.id === configTarget.id ? configTarget : itm ) ) );
    };

    const handleFormChange = data => {
        if ( !configTarget ) return

        Object.keys( data ).map( key => ( configTarget[key] = data[key] ) );

        modFormList( list => list.map( itm => ( itm.id === configTarget.id ? configTarget : itm ) ) );
    };

    const dragHit = useEventInside( layoutRef );

    const handleDragOver = useCallback( ( formItem, position ) => {
        if ( dragHit( position ) ) {
            const target = getItem( formItem );
            modFormList( list => [...list, target] );
            modConfigTarget( target );
        }
    }, [dragHit, modFormList] );


    return (
        <Provider value={ {
            configTarget,
            modConfigTarget,
            formList,
            handleDragOver,
            handleFormChange,
            handleFormSubmit,
            handleSuccessEdit
        } }>
            <div className="react_form_templete_design">
                <Theme>
                    <div className='content'>
                        <div className='left'>
                            <Example />
                        </div>
                        <div className='center' ref={ layoutRef }>
                            <Layout />
                        </div>
                        <div className='right'>{
                            formList.map( itm => <ConfigForm2 configTarget={ configTarget } key={ itm.id } itm={ itm } onChange={ handleFormChange } onSubmit={ handleFormSubmit } /> )
                        }</div>
                    </div>
                </Theme>
            </div>
        </Provider>
    );
};
