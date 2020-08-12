export class Event {
    constructor() {
        this.registerFunction = {};
    }

    on ( name, f, once = false ) {
        const functionType = ['[object Function]', '[object AsyncFunction]', '[object GeneratorFunction]'];

        if ( functionType.indexOf( Object.prototype.toString.call( f ) ) <= -1 ) return;

        if ( !this.registerFunction[name] ) this.registerFunction[name] = [];

        this.registerFunction[name].push( { func: f, once } );

        return this;
    }

    emit ( name, ...params ) {
        if ( !this.registerFunction[name] ) return;

        const result = this.registerFunction[name].map( ( { func } ) => func( ...params ) );

        this.registerFunction[name] = this.registerFunction[name].filter( ( { once } ) => !once );

        return result;
    }

    rm ( name, _f ) {
        if ( !this.registerFunction[name] ) return;

        this.registerFunction[name] = this.registerFunction[name].filter( ( { f } ) => f !== _f );
    }

    clear_event ( name ) {
        delete this.registerFunction[name];
    }
}

const _default_event = new Event

export default _default_event;
