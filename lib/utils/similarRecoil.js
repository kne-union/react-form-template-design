import { useState, useEffect } from 'react'

import event from './event'
const store = new Map()

export const initAtom = ( key, defaultValue ) => {
    if ( !store.get( key ) ) store.set( key, defaultValue )

    return { key }
}

export const useValue = atom => {
    const { key } = atom

    const [data, modData] = useState( store.get( key ) )

    useEffect( () => {
        const f = modData

        event.on( `store${key}`, f )

        return () => event.rm( `store${key}`, f )
    }, [] )

    return data

}

export const useSet = atom => {
    const { key } = atom

    const setF = params => {

        const newValue = typeof params === "function" ? params( store.get( key ) ) : params

        store.set( key, newValue )
        event.emit( `store${key}`, newValue )

    }

    return setF
}

export const useStore = atom => {

    const _useValue = useValue( atom )

    const _useSet = useSet( atom )

    return [_useValue, _useSet]
}
