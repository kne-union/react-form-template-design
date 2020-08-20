import { useState, useEffect, useRef, useCallback } from 'react';

export default () => {
    const [_, refresh] = useState();

    return refresh;
};


export const useCallbackState = props => {
    const [state, setState] = useState( props );
    const callbackList = useRef( [] );
    
    useEffect( () => {
        callbackList.current.forEach( ( callback ) => callback( state ) );
        callbackList.current = [];
    }, [state] );

    const setCallbackState = useCallback( ( newProps, callback ) => {
        setState( newProps );
        callback && callbackList.current.push( callback );
    }, [setState] );

    return [state, setCallbackState];
};

export const useEffectExpectFirst = (f,dp) => {
    const timer = useRef( -1 )
    
    useEffect( () => {
        timer.current -= -1
        if ( timer.current === 0 ) return 
        return f()
    } ,dp)
}