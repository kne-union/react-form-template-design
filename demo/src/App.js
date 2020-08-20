import React, { useState } from 'react';
import 'react-form-templete-design/dist/style.scss'
import FormDesign, { FormRender } from 'react-form-templete-design'

function App () {

    const [formDesignData, setFormDesignData] = useState( {} )
    return (
        <div className="App">
            <FormDesign  />
        </div>
    );
}

export default App;
