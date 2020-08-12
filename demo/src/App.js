import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'react-form-templete-design/dist/style.scss'
import FormDesign, {FormRender } from 'react-form-templete-design'

function App () {
    const demoData = {"title":"测试表单2","_form":[{"name":"Input","component":"Input","style":{},"id":"11595497055266","label":"姓名","options":[""],"required":"false","placeholder":"姓名"},{"name":"Input","component":"Input","style":{},"id":"21595497067259","label":"年龄","options":[""],"required":"false","placeholder":""},{"name":"Text","component":"Text","style":{"color":"#648def"},"id":"31595497087688","text":"这是一段很长很长的文字，这是一段很长很长的文字，这是一段\n这是一段很长很长的文字，这是一段很长很长的文字，\n\n这是一段很长很长的文字，\n\n这是一段很长很长的文字，\n\n这是一段很长很长的文字，\n\n这是一段很长很长的文字，\n\n这是一段很长很长的文字，\n\n这是一段很长很长的文字，"}],"grid":{"xxs":[{"w":4,"h":1,"x":0,"y":0,"i":"11595497055266","moved":false,"static":false},{"w":4,"h":1,"x":0,"y":1,"i":"21595497067259","moved":false,"static":false},{"w":4,"h":1,"x":0,"y":2,"i":"31595497087688","moved":false,"static":false}]}}
    return (
        <div className="App">
            { <FormDesign defaultLayout={ demoData } />  }
            {/* <FormRender data={ demoData } /> */}
        </div>
    );
}

export default App;
