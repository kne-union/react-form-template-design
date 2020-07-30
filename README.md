# react-form-templete-design

```shell script
yarn add react-form-templete-design
```

# 使用示例
```jsx
import FormDesign,{FormRender} from 'react-form-templete-design'


//编辑器  获取编辑完成json
<FormDesign onOver={handleFunc} />


<FormRender 
    submitText="确定"
    defaultData={{form_item:"render"}}
    data={"json"}  
/>


```

# API

#### FormDesign

|属性名|说明|类型|默认值|
|  ---  | ---  | --- | --- |
|onOver|处理编辑完成状态|function|- |

#### FormRender

|属性名|说明|类型|默认值|
|  ---  | ---  | --- | --- |
|submitText|表单提交文字|string| 确定 |
|defaultData|表单默认数据|object|{}|
|data|FormDesign onOver 返回结果|string json||

#### 图片编辑功能待补充
