# react-form-templete-design

```shell script
yarn add react-form-templete-design
```

# 使用示例

```jsx
import 'react-form-templete-design/dist/style.scss'

import FormDesign,{FormRender} from 'react-form-templete-design'



//编辑器  获取编辑完成json
<FormDesign handleSuccessEdit={handleFunc} />


<FormRender
    submitText="确定"
    defaultData={{form_item:"render"}}
/>


```

# API

#### FormDesign

| 属性名            | 说明                                       | 类型     | 默认值 |
| ----------------- | ------------------------------------------ | -------- | ------ |
| handleSuccessEdit | 处理编辑完成状态                           | function |        |
| defaultLayout     | 表单默认内容,来源:handleSuccessEdit 返回值 | Object   |        |

#### FormRender

| 属性名      | 说明                                | 类型     | 默认值 |
| ----------- | ----------------------------------- | -------- | ------ |
| submitText  | 表单提交文字                        | string   | 确定   |
| defaultData | 表单默认数据                        | object   | {}     |
| data        | FormDesign handleSuccessEdit 返回值 | Object   |        |
| onSubmit    | 表单提交                            | fundtion |        |


