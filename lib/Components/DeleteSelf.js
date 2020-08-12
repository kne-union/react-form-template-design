import React, { useMemo } from 'react';
import event from '../utils/event'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

export default ( { id } ) => <AlertDialogSlide buttonType="simple" title="删除确认" content="删除该组件将无法找回" confirmText="确定" onConfirm={ () => event.emit( 'delete_self', id ) }>
    <Button style={ { marginTop: '10px' } } color="secondary" variant="contained" >删除这个组件</Button>
</AlertDialogSlide>


const Transition = React.forwardRef( function Transition ( props, ref ) {
    return <Slide direction="up" ref={ ref } { ...props } />;
} );

const AlertDialogSlide = ( { buttonType, title, content, cancelText, confirmText, children, onConfirm, onClose } ) => {
    const [open, setOpen] = React.useState( false );

    const handleClickOpen = () => {
        setOpen( true );
    };

    const handleClose = () => {
        setOpen( false );
    };

    const clickBtn = useMemo( () => {
        switch ( buttonType ) {
            case "simple":
                return <div onClick={ handleClickOpen }> { children } </div>
            default:
                return <Button variant="outlined" color="primary" onClick={ handleClickOpen }>
                    { children }
                </Button>

        }

    }, [handleClickOpen, buttonType, children] )

    return (
        <div>
            { clickBtn }
            <Dialog
                maxWidth="sm"
                fullWidth={ true }
                open={ open }
                TransitionComponent={ Transition }
                keepMounted
                onClose={ handleClose }
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle >{ title }</DialogTitle>
                <DialogContent>
                    { content }
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={ () => {
                            handleClose()
                            onConfirm && onConfirm()
                        } }
                        variant="contained"
                        color="primary"
                    > { confirmText || '同意' } </Button>
                    <Button
                        onClick={ () => {
                            handleClose()
                            onClose && onClose()
                        } }
                        variant="outlined"
                        color="primary"> { cancelText || '取消' }</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
