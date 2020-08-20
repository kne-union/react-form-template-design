import React, { useState, useContext, useMemo, useEffect, useRef, memo, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { Slider, Button, TextField, Select as MSelect, FormControl, InputLabel, Chip, RadioGroup, FormControlLabel, Radio, FormLabel } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { FormItem, ImageComponent, TextComponent, StaticComponent } from './utils/formItem';
import event from './utils/event'
import DeleteSelf from './Components/DeleteSelf'
import { canEditOptions } from './utils/config'
import { useEffectExpectFirst, useCallbackState } from './utils/hoc'
import context from './context'

const useStyles = makeStyles( theme => ( {
    chips: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    chip: {
        margin: 2
    },
    upload_btn: {
        position: 'relative',
        minWidth: '40vpx',
        overflow: 'hidden',
        margin: 'auto'
    },
    upload_input: {
        position: 'absolute',
        left: '0',
        top: '0',
        width: '100%',
        height: '100%',
        opacity: 0,
        zIndex: 100
    },
    upload_img: {
        display: 'block',
        width: '200px'
    },
    sliderValue: {
        color: theme.primary
    },
    config_filed: {
        padding: theme.space
    }
} ) );

export default memo( ( { itm, ...props } ) => {
    const { configTarget } = useContext( context )
    if ( itm !== configTarget ) return null

    const type = configTarget instanceof FormItem ? 'FormItem' : configTarget instanceof ImageComponent ? 'ImageComponent' : configTarget instanceof TextComponent ? 'TextComponent' : configTarget instanceof StaticComponent ? 'StaticComponent' : ''

    switch ( type ) {
        case 'FormItem':
            return <FormItemConfig  { ...props } />;

        case 'ImageComponent':
            return <ImageConfig  { ...props } />;

        case 'TextComponent':
            return <TextConfig  { ...props } />;

        case 'StaticComponent':
            return <StaticConfig  { ...props } />;
        default:
            return null;
    }
} )

const TextConfig = memo( ( { onChange, onSubmit } ) => {
    const { configTarget } = useContext( context )
    const classes = useStyles()
    return (
        <>
            { configTarget && (
                <div>
                    <div className={classes.config_filed}>
                        <TextField
                            fullWidth={ true }
                            variant="outlined"
                            label="文字颜色"
                            // value={ color }
                            defaultValue={ configTarget.style.color || '#000' }
                            onChange={ e => onChange( { style: style => ( { ...style, color: e.target.value } ) } ) }
                            size="medium"
                        />
                    </div>

                    <div className={classes.config_filed}>
                        <TextField
                            fullWidth={ true }
                            variant="outlined"
                            label="文字大小"
                            defaultValue={ configTarget.style.fontSize ? parseInt( configTarget.style.fontSize ) : '14' }
                            onChange={ e => {
                                const value = parseInt( e.target.value );
                                const finalVal = Number.isNaN( value ) ? '' : value + '';
                                onChange( { style: style => ( { ...style, fontSize: `${finalVal}px` } ) } );
                            } }
                            size="medium"
                        />
                    </div>

                    <div className={classes.config_filed}>
                        <TextField
                            multiline
                            fullWidth={ true }
                            variant="outlined"
                            label="文字内容"
                            // value={ text }
                            defaultValue={ configTarget.text || '' }
                            onChange={ e => onChange( { text: e.target.value } ) }
                            size="medium"
                        />
                    </div>
                    <div className={classes.config_filed}>
                        <FormControl>
                            <FormLabel>文字位置</FormLabel>
                            <RadioGroup
                                defaultValue={ configTarget.style.textAlign || 'left' }
                                // onChange={ e => onChange( style => console.log( { ...style, textAlign: e.target.value } ) ) }
                                onChange={ e => {
                                    onChange( { style: style => ( { ...style, textAlign: e.target.value } ) } );
                                } }
                                // onChange={ e => console.log() }
                                row>
                                <FormControlLabel control={ <Radio /> } label="左对齐" value={ 'left' } />
                                <FormControlLabel control={ <Radio /> } label="局中" value={ 'center' } />
                            </RadioGroup>
                        </FormControl>
                    </div>
                    <DeleteSelf id={ configTarget.id } />
                </div>
            ) }
        </>
    );
}, ( prev, next ) => prev.configTarget.id === next.configTarget.id );

const ImageConfig = memo( ( { onChange, onSubmit } ) => {
    const { configTarget } = useContext( context )
    const classes = useStyles();
    const [slider, modSlider] = useState( configTarget.height || 100 );
    const [img, modImg] = useState( configTarget.url || '' );
    const ref = useRef();

    useEffect( () => {
        onChange( { style: style => ( { ...style, height: `${slider}%` } ) } );
        onChange( { height: slider } );
    }, [slider] );

    useEffect( () => {
        onChange( { url: img } );
    }, [img] );

    const imgRef = useRef()

    return (
        <>
            { configTarget && (
                <div>
                    <div>
                        <div className={ classes.sliderValue }>高度百分比:{ slider }</div>
                        <Slider style={ { flex: 1 } } getAriaValueText={ str => str } value={ slider } onChange={ ( _, value ) => modSlider( value ) } />
                    </div>

                    <div className={classes.config_filed}>
                        <TextField
                            multiline
                            fullWidth={ true }
                            variant="outlined"
                            label="图片链接"
                            // value={ text }
                            defaultValue={ configTarget.img || '' }
                            onChange={ e => imgRef.current = e.target.value }
                            size="medium"
                        />
                    </div>
                    {/* <Button variant="contained" onClick={ () => modImg( imgRef.current ) } color="primary">
						确定
					</Button> */}
                    <DeleteSelf id={ configTarget.id } />
                </div>
            ) }
        </>
    );
}, ( prev, next ) => prev.configTarget.id === next.configTarget.id );

const FormItemConfig = memo( ( { onChange, onSubmit } ) => {
    const { configTarget } = useContext( context )
    const classes = useStyles();
    const [chipList, modChipList] = useCallbackState( configTarget.options || [] );

    const handleChipListChange = chipList => onChange( { options: chipList } )

    const { register, handleSubmit, setValue, getValues, reset, errors } = useForm( {
        defaultValues: {
            label: '',
            placeholder: '',
            options: [],
            required: 'false'
        }
    } );

    useEffect( () => {
        reset( { ...getValues(), options: chipList } );
    }, [chipList, getValues, reset] );

    useEffect( () => {
        if ( !configTarget ) return;
        modChipList( configTarget.options || [] );
        reset( {
            label: configTarget.label,
            placeholder: configTarget.placeholder || configTarget.name,
            options: configTarget.options || [],
            required: String( configTarget.required )
        } );
    }, [configTarget] );

    return (
        <>
            { configTarget && (
                <div>
                    <form onSubmit={ handleSubmit( onSubmit ) }>
                        <div className={classes.config_filed}>
                            <TextField
                                inputRef={ register( { required: true } ) }
                                onChange={ e => {
                                    const { value } = e.target
                                    onChange( { label: value || configTarget.name } )
                                } }
                                required fullWidth={ true } variant="outlined" label="label" name="label" size="medium" />
                        </div>
                        <div className={classes.config_filed}>
                            <TextField
                                onChange={ e => {
                                    const { value } = e.target
                                    onChange( { placeholder: value || configTarget.name } )
                                } }
                                fullWidth={ true } variant="outlined" label="placeholder" name="placeholder" inputRef={ register( {} ) } size="medium" />
                        </div>

                        <HiddenText name="options" register={ register } />


                        { chipList.length > 0 && canEditOptions( configTarget.name ) && (
                            <div className={classes.config_filed}>
                                <FormControl variant="standard" name="options">
                                    <div className={ classes.chips }>
                                        { chipList.map( ( itm, idx ) => (
                                            <Chip key={ idx } color="primary" label={ itm } />
                                        ) ) }
                                    </div>
                                </FormControl>
                            </div>
                        ) }

                        { canEditOptions( configTarget.name ) && (
                            <div className={classes.config_filed}>
                                <FormControl fullWidth={ true }>
                                    <TextField
                                        onKeyPress={ e => {
                                            if ( e.charCode === 13 ) {
                                                e.preventDefault();
                                                const value = e.target.value;
                                                modChipList( chipList => Array.from( new Set( [...chipList, value] ) ), handleChipListChange );
                                                setValue( '__options', '', { shouldDirty: true } );
                                                // onChange()
                                            }
                                        } }
                                        fullWidth={ true }
                                        variant="outlined"
                                        label="可选项"
                                        name="__options"
                                        inputRef={ register( {} ) }
                                        size="medium"
                                    />
                                </FormControl>
                            </div>
                        ) }
                        <div className={classes.config_filed}>
                            <FormControl name="required">
                                <FormLabel>是否必填</FormLabel>
                                <RadioGroup row name="required" onChange={ e => {
                                    const { value } = e.target
                                    onChange( { required: value } )
                                } } defaultValue={ String( configTarget.required ) }>
                                    <FormControlLabel control={ <Radio /> } label="是" value={ "true" } />
                                    <FormControlLabel control={ <Radio /> } label="否" value={ "false" } />
                                </RadioGroup>
                            </FormControl>
                        </div>
                    </form>
                    <DeleteSelf id={ configTarget.id } />
                </div>
            ) }
        </>
    );
},
    ( prev, next ) => prev.configTarget.id === next.configTarget.id
);

const StaticConfig = ( { configTarget } ) => <DeleteSelf id={ configTarget.id } />


const HiddenText = ( { name, register } ) => {
    return (
        <div style={ { display: 'none' } }>
            <TextField fullWidth={ true } variant="outlined" label="placeholder" name={ name } inputRef={ register( {} ) } size="medium" />
        </div>
    );
};
