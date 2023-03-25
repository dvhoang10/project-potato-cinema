import { Form, Input, Table } from "antd";
import styled from "styled-components";
import { Breakpoints } from "./Breakpoint";

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
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
  }
  .ant-input,
  .ant-input-password,
  .ant-picker-input input,
  .ant-input-number {
    font-size: 1rem;
    border: none;
  }
  .ant-picker {
    border: none;
  }
  .ant-switch,
  .ant-switch:hover:not(.ant-switch-disabled) {
    background: var(--dark-gray);
  }
  .ant-switch.ant-switch-checked {
    background: #ca4242;
  }
  .ant-switch.ant-switch-checked:hover:not(.ant-switch-disabled) {
    background: #d66d69;
  }
  .ant-input-number {
    width: 3.75rem;
  }
`;

export const AntdSearch = styled(Input.Search)`
  margin-right: 0.5rem;
  .ant-btn-primary {
    border-color: var(--blue-magenta);
    background: var(--blue-magenta);
  }
  .ant-btn-primary:hover {
    border-color: var(--blue-magenta);
    background: var(--blue-magenta);
  }
`;

export const AntdTable = styled(Table)`
  max-width: 1440px;
  margin: 0 auto;
  .ant-table-tbody > tr.ant-table-row > td {
    background: var(--color-lumber);
    color: var(--dark);
    font-size: 1rem;
    ${Breakpoints.sm} {
      font-size: 0.875rem;
      padding: 0.5rem;
    }
  }
  .ant-table-column-title {
    font-size: 1.25rem;
  }
  .ant-table-thead tr th {
    background: var(--color-primary);
    color: var(--light);
    font-size: 1.25rem;
    ${Breakpoints.md} {
      font-size: 1.125rem;
    }
    ${Breakpoints.sm} {
      font-size: 1rem;
      padding: 0.5rem;
    }
  }
  .ant-table-cell {
    border-start-end-radius: 0 !important;
    border-start-start-radius: 0 !important;
  }
  .ant-dropdown-menu-title-content {
    color: var(--dark);
  }
  .ant-table {
    background: unset;
  }
  .ant-table-tbody > tr.ant-table-row:hover > td {
    background: var(--light-red);
    color: var(--dark);
  }
  .ant-table-content {
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
  }
  a {
    color: var(--dark);
  }
  .anticon > svg {
    color: var(--color-red);
  }
  .ant-checkbox-checked.ant-checkbox-inner {
    background-color: var(--color-primary);
    border-color: var(--color-primary);
  }
  .ant-dropdown-menu-item-selected {
    color: var(--color-primary);
  }
  .ant-table-thead th.ant-table-column-has-sorters:hover {
    background-color: var(--color-primary);
  }
  .ant-table-thead
    th.ant-table-cell-fix-left.ant-table-cell-fix-left-last:hover {
    background-color: var(--color-primary);
  }
  ant-tag {
    font-size: 1rem;
    padding: 0.25rem 0.5rem;
    text-transform: uppercase;
    min-width: 100px;
    text-align: center;
    ${Breakpoints.sm} {
      font-size: 0.875rem;
    }
  }
`;
