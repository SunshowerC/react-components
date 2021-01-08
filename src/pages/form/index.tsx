import React from 'react';
import styles from './index.less';
import {
  ProForm,
  ProFormProps,
  ProFormItemProps,
} from '../../../packages/pro-form';
import Button from 'antd/lib/button';
import Form from 'antd/lib/form';

interface FormObj {
  name: string;
  sex: string;
}

export default () => {
  const [form] = Form.useForm();

  const formProp: ProFormProps<FormObj> = {
    // labelCol: { span: 6 },
    // wrapperCol: { span: 12 },

    layout: 'vertical',
    onFinish(values) {
      console.log('values', values);
    },
  };

  const onReset = () => {
    form.resetFields();
  };

  const items: ProFormItemProps<FormObj>[] = [
    {
      label: 'Name',
      name: 'name',
      type: 'input',
      fieldProps: {
        allowClear: true,
        addonAfter: '同学',
      },
      // required: true, 该属性只有 样式，没有校验，用 rules 替代
      rules: [
        {
          required: true,
          message: 'required field',
        },
      ],
    },
    {
      label: 'Sex',
      name: 'sex',
      type: 'input',
    },
  ];

  const style: React.CSSProperties = {
    padding: '0 20px',
  };
  return (
    <div style={{ width: 500 }}>
      <h1 className={styles.title}>Page Form</h1>

      <ProForm {...formProp} items={items} form={form} style={style}>
        <Button onClick={onReset}>Reset</Button> &nbsp;&nbsp;
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </ProForm>
    </div>
  );
};
