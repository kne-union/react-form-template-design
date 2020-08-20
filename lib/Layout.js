import React, { useState, useMemo, useEffect, useRef, memo, useCallback, useContext } from 'react';
import { getItem, getItemFromObj, FormItem, ImageComponent, TextComponent, StaticComponent } from './utils/formItem';
import Form from '@kne/react-form-antd'
import event from './utils/event'
import GridLayout from './Components/Grid'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { useRefresh, useCallbackState, useEffectExpectFirst } from './utils/hoc'
import { getStyle } from './utils/size'
import { Button } from '@material-ui/core';
import context from './context'
import Dialog from './Components/Dialog'
import FormRender from './Components/FormRender'

const Styles = makeStyles( ( theme ) => ( {
    formItem: {
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        border: '1px solid #000'
    },
    imageComponent: {
        backgroundColor: theme.defaultGrey,
        height: '100%',
        overflow: 'hidden',
        border: '1px solid #000'
    },
    textComponent: {
        backgroundColor: theme.secondaryPrimary,
        height: '100%',
        overflow: 'hidden',
        border: '1px solid #000'
    },
    editComponent: {
        border: `1px solid ${theme.primary}`,
        overflow: 'hidden',
        background: theme.simpleOrange
    },
    previewBtn: {
        color: theme.simpleRed,
    },
    outputBtn: {
        color: theme.simpleGreen
    }

} ) )

export default memo( ( { defaultLayout = {} } ) => {
    const { formList, handleSuccessEdit } = useContext( context )
    const [grid, modGrid] = useState( defaultLayout.gird || {} );

    const [containCom, setContainCom] = useState( 'pc' )
    const [containStyle, setContainStyle] = useCallbackState( {} )
    useEffectExpectFirst( () => {
        // setContainStyle( getStyle( containCom ), () => setTimeout( () => window.dispatchEvent( new window.Event( 'resize' ) ), 300 ) )
        setContainStyle( getStyle( containCom ), () => window.dispatchEvent( new window.Event( 'resize' ) ) )
    }, [containCom, setContainStyle] )

    const getFormJson = () => ( {
        _form: formList.map( itm => itm.formItemInfo ),
        grid
    } );

    const dialogRef = useRef()

    const [previewData, setPreviewData] = useCallbackState( null )

    const prevStyle = useMemo( () => {
        let Style = { ...getStyle( containCom ) }
        delete Style.border
        delete Style.width
        return Style

    }, [containCom] )

    const preview = () => {
        setPreviewData( getFormJson(), () => dialogRef.current.open() )
    }




    return <>
        <div >
            <div className="header">
                <div className="header_btn_warp">
                    <Button color={ containCom === 'pc' ? "primary" : "default" } variant="contained" onClick={ () => setContainCom( 'pc' ) }>Pc版本</Button>
                    <Button color={ containCom === 'mobile' ? "primary" : "default" } variant="contained" onClick={ () => setContainCom( 'mobile' ) }>移动版</Button>
                </div>
                <div  className="header_btn_warp">
                    <Button color='secondary' variant="contained" onClick={ preview }>预览</Button>
                    <Button color='secondary' variant="contained" onClick={ handleSuccessEdit }>Pc版本</Button>
                </div>
            </div>
            <div style={ containStyle }>
                <Form type="inner" >
                    <GridLayout isDraggable={ true } grid={ grid } modGrid={ modGrid }>
                        { formList.map( ( itm, idx ) => (
                            <div key={ itm.id } data-grid={ { x: 0, y: idx * 4, w: 16, h: 4 } }>
                                <FormItemView itm={ itm } />
                            </div>
                        ) ) }
                    </GridLayout>
                </Form>
            </div>
            <Dialog maxWidth={ containCom === "mobile" ? 'xs' : "md" } title="表单预览" ref={ dialogRef } style={ prevStyle } >
                { previewData && <FormRender data={ previewData }></FormRender> }
            </Dialog>
        </div>
    </>
} )


const FormItemView = ( { itm } ) => {
    const { configTarget, modConfigTarget, formList } = useContext( context )
    const Style = Styles()
    const type = useMemo( () => ( itm instanceof FormItem ? 'FormItem' : itm instanceof ImageComponent ? 'ImageComponent' : itm instanceof TextComponent ? 'TextComponent' : itm instanceof StaticComponent ? 'StaticComponent' : '' ), [itm] );
    const onClick = useCallback( () => {
        configTarget !== itm && modConfigTarget( itm );
    }, [modConfigTarget, configTarget, itm] );

    switch ( type ) {
        case 'FormItem':
            return (
                <div onClick={ onClick } className={ Style.formItem + ` ${itm.id === ( configTarget || {} ).id ? Style.editComponent : ''}` }>
                    { itm.formComponent }
                </div>
            );
        case 'ImageComponent':
            return (
                <div onClick={ onClick } className={ Style.imageComponent + ` ${itm.id === ( configTarget || {} ).id ? Style.editComponent : ''}` }>
                    { itm.component }
                </div>
            );

        case 'TextComponent':
            return (
                <div onClick={ onClick } className={ Style.textComponent + ` ${itm.id === ( configTarget || {} ).id ? Style.editComponent : ''}` }>
                    { itm.component }
                </div>
            );

        case 'StaticComponent':
            return <div onClick={ onClick } className={ Style.textComponent + ` ${itm.id === ( configTarget || {} ).id ? Style.editComponent : ''}` }>
                { itm.component }
            </div>
        default:
            return null;
    }
} 
