import React, { forwardRef, useImperativeHandle } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

const styles = theme => ( {
    root: {
        margin: 0,
        padding: theme.spacing( 2 )
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing( 1 ),
        top: theme.spacing( 1 ),
        color: theme.palette.grey[500]
    }
} );

const DialogTitle = withStyles( styles )( props => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={ classes.root } { ...other }>
            <Typography variant="h6">{ children }</Typography>
            { onClose ? (
                <IconButton aria-label="close" className={ classes.closeButton } onClick={ onClose }>
                    <CloseIcon />
                </IconButton>
            ) : null }
        </MuiDialogTitle>
    );
} );

const DialogContent = withStyles( theme => ( {
    root: {
        padding: theme.spacing( 2 )
    }
} ) )( MuiDialogContent );

const DialogActions = withStyles( theme => ( {
    root: {
        margin: 0,
        padding: theme.spacing( 1 )
    }
} ) )( MuiDialogActions );

const CustomizedDialogs = forwardRef( ( { maxWidth = "xs", style = {}, handleClose: _handleClose, title, children, bottom, headerStyle = {} }, ref ) => {
    console.log( style )
    const [open, setOpen] = React.useState( false );

    const handleClickOpen = () => {
        setOpen( true );
        window.dispatchEvent( new window.Event( 'resize' ) )
    };
    const handleClose = () => {
        setOpen( false );
        _handleClose && _handleClose()
    };

    useImperativeHandle( ref, () => {
        return {
            close: handleClose,
            open: handleClickOpen
        };
    } );

    return (
        <div >
            <Dialog maxWidth={maxWidth} style={ { zIndex: 1000, ...style } } fullWidth={ true } maxWidth={ maxWidth } onClose={ handleClose } aria-labelledby="customized-dialog-title" open={ open }>
                <DialogTitle onClose={ handleClose } style={ headerStyle }>
                    { title }
                </DialogTitle>
                <DialogContent dividers>{ children }</DialogContent>
                { bottom && <DialogActions>{ bottom }</DialogActions> }
            </Dialog>
        </div>
    );
} );

export default CustomizedDialogs;
