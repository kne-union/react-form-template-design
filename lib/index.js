import React, { useState, useMemo, useEffect, useRef, memo, useCallback } from 'react';
import { FormOption, SimpleOption, getComponent } from './utils/config';
import { getItem, getItemFromObj, FormItem, ImageComponent, TextComponent, StaticComponent } from './utils/formItem';
import AutoReposition from './Components/AutoReposition';
import { Button, TextField } from '@material-ui/core';
import Theme from './Components/Theme';
import ConfigForm from './Components/ConfigForm';
import useEventInside from 'use-event-inside';
import _FormRender, { FormItemRender } from './Components/FormRender';
import Form from '@kne/react-form-antd'
import './main.scss';
import event from './utils/event'
import GridLayout from './Components/Grid'

export const FormRender = _FormRender;

export default ( { onOver = console.log, handleSuccessEdit = console.log, defaultLayout = {} } ) => {
    const layoutRef = useRef();

    const [formList, modFormList] = useState( defaultLayout._form ? defaultLayout._form.map( getItemFromObj ) : [] );
    const [configTarget, modConfigTarget] = useState( null );
    const [grid, modGrid] = useState( defaultLayout.gird || {} );
    const [title, modTitle] = useState( defaultLayout.title || '' );

    useEffect( () => {
        const f = id => {
            modFormList( currentFormList => {
                const newFormList = currentFormList.filter( itm => itm.id !== id )
                return  newFormList
            } )
            modConfigTarget( null )
        }
        event.on( 'delete_self', f )
        
        return () => event.rm( 'delete_self', f )
    },[])

    const getFormJson = () => ( {
        title,
        _form: formList.map( itm => itm.formItemInfo ),
        grid
    } );

    const handleFormSubmit = data => {
        Object.keys( data )
            .filter( key => key !== '__options' )
            .map( key => ( key === 'options' ? ( configTarget[key] = data[key].split( ',' ) ) : key === 'style' ? ( configTarget[key] = JSON.parse( data[key] ) ) : ( configTarget[key] = data[key] ) ) );

        modFormList( list => list.map( itm => ( itm.id === configTarget.id ? configTarget : itm ) ) );
    };

    const handleFormChange = data => {
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

    const formOptionRender = useMemo( () => {
        return FormOption.map( itm => (
            <AutoReposition onStop={ e => handleDragOver( itm, e ) } key={ itm }>
                <div className='example_form_itm' >
                    <div className='example_form_label'>{ itm }</div>
                    { getComponent( itm, { disabled: true } ) }
                </div>
            </AutoReposition>
        ) );
    }, [handleDragOver] );

    const simpleOptionRender = useMemo( () => {
        return SimpleOption.map( itm => (
            <AutoReposition onStop={ e => handleDragOver( itm, e ) } key={ itm }>
                <div className='example_form_itm'>
                    <div className='example_form_label'>{ itm }</div>
                    { getComponent( itm, { disabled: true } ) }
                </div>
            </AutoReposition>
        ) );
    }, [handleDragOver] );

    return (
        <div className="react_form_templete_design">
            <Theme>
                <div className='content'>
                    <div className='left'>
                        <TextField fullWidth={ true } variant="outlined" label="表单名" value={ title } onChange={ e => modTitle( e.target.value ) } />
                        { formOptionRender }
                        { simpleOptionRender }
                        <div className='bottom'>
                            <Button variant="contained" color="primary" onClick={ () => {
                                onOver && onOver( getFormJson() )
                                handleSuccessEdit && handleSuccessEdit( getFormJson() )
                            } }>
                                配置完成
						</Button>
                        </div>
                    </div>

                    <div className='center' ref={ layoutRef }>
                        <Form type="inner">
                            <GridLayout isDraggable={ true } grid={ grid } modGrid={ modGrid }>
                                { formList.map( ( itm, idx ) => (
                                    <div key={ itm.id } data-grid={ { x: 0, y: idx, w: 16, h: 1 } }>
                                        <FormItemView itm={ itm } modConfigTarget={ modConfigTarget } configTarget={ configTarget } />
                                    </div>
                                ) ) }
                            </GridLayout>
                        </Form>
                    </div>
                    <div className='right'>{
                        formList.map( itm => <ConfigForm key={ itm.id } itm={ itm } configTarget={ configTarget } onChange={ handleFormChange } onSubmit={ handleFormSubmit } /> )
                    }</div>
                </div>
            </Theme>
        </div>
    );
};

const FormItemView = ( { itm, configTarget, modConfigTarget } ) => {
    const type = useMemo( () => ( itm instanceof FormItem ? 'FormItem' : itm instanceof ImageComponent ? 'ImageComponent' : itm instanceof TextComponent ? 'TextComponent' : itm instanceof StaticComponent ? 'StaticComponent' : '' ), [itm] );
    const onClick = useCallback( () => {
        configTarget !== itm && modConfigTarget( itm );
    }, [modConfigTarget, configTarget, itm] );
    switch ( type ) {
        case 'FormItem':
            return (
                <div onClick={ onClick } className={ 'form_itm_warp' + ` ${itm.id === ( configTarget || {} ).id ? 'form_itm_outline' : ''}` }>
                    {/* <div className='form_itm_label'>{ itm.label }</div>
                    <div className='form_itm_content'>{ itm.component }</div> */}
                    { itm.formComponent }
                </div>
            );
        case 'ImageComponent':
            return (
                <div onClick={ onClick } className={ 'view_image_warp' + ` ${itm.id === ( configTarget || {} ).id ? 'form_itm_outline' : ''}` }>
                    { itm.component }
                </div>
            );

        case 'TextComponent':
            return (
                <div onClick={ onClick } className={ 'view_text_warp' + ` ${itm.id === ( configTarget || {} ).id ? 'form_itm_outline' : ''}` }>
                    { itm.component }
                </div>
            );

        case 'StaticComponent':
            return <div onClick={ onClick } className={ 'view_text_warp' + ` ${itm.id === ( configTarget || {} ).id ? 'form_itm_outline' : ''}` }>
                { itm.component }
            </div>
        default:
            return null;
    }
};
