import React, { ReactNode } from 'react';
import { Form, Input } from 'antd';
import { FormItemProps, FormProps, Rule } from 'antd/lib/form';
import { InputProps } from 'antd/lib/input';
import { SelectProps } from 'antd/lib/select';
type RenderReturn = JSX.Element | false | null;

type CustomFormItemProps<Values = any> =
  | {
      type: 'input';
      fieldProps?: InputProps;
    }
  | {
      type: 'select';
      fieldProps?: SelectProps<any>;
    };

export type ProFormItemProps<Values = any> = FormItemProps<Values> & {
  renderFormItem?: (
    formItemProp: FormItemProps<Values>,
    fieldProps: any,
  ) => ReactNode;
} & CustomFormItemProps<Values>;

export interface ProFormProps<Values = any> extends FormProps<Values> {
  items?: ProFormItemProps<Values>[];

  footer?: RenderReturn;
}

/**
 * 默认的表单属性
 */
const DEFAULT_PROPS = {
  input: {
    fieldProps: {
      placeholder: 'please input',
    },
  },
  select: {
    fieldProps: {
      placeholder: 'please select',
    },
  },
};

const DEFAULT_FORM_PROPS: FormProps = {
  layout: 'horizontal',
  labelCol: { span: 6 },
};

const renderFormItem = (proFormItemProps: ProFormItemProps, index: number) => {
  let { type, renderFormItem, ...restFormItemProp } = proFormItemProps;

  const fieldProps: any = Object.assign(
    {},
    DEFAULT_PROPS[type]?.fieldProps,
    proFormItemProps.fieldProps,
  );

  if (renderFormItem) {
    return renderFormItem(restFormItemProp, fieldProps);
  }
  if (type === 'input') {
    return (
      <Form.Item {...restFormItemProp} key={index}>
        <Input {...fieldProps} />
      </Form.Item>
    );
  }
};

export const ProForm = (props: ProFormProps) => {
  let { items, ...rest } = props;
  rest = Object.assign(DEFAULT_FORM_PROPS, rest);

  let footerLayout: FormItemProps = {};
  if (rest.layout === 'horizontal' && rest.labelCol?.span) {
    footerLayout = {
      wrapperCol: {
        offset: rest.labelCol.span,
      },
    };
  }
  console.log('rest.labelCol', rest.labelCol, footerLayout);

  return (
    <Form {...rest}>
      {items?.map(renderFormItem)}

      <Form.Item {...footerLayout}>{props.children}</Form.Item>
    </Form>
  );
};
