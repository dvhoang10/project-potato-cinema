import { Form } from "antd";
import styled from "styled-components";

export const AntdForm = styled(Form)`
  margin: 0rem auto;
  padding: 1rem;
  max-width: 1000px;
  background-color: transparent;
`;

export const AntdFormItem = styled(Form.Item)`
  label {
    color: var(--light) !important;
    font-size: 1.3rem !important;
  }
  .ant-form-item-control-input {
    color: var(--light);
  }
  .ant-input,
  .ant-input-password {
    font-size: 1.3rem;
  }
`;
