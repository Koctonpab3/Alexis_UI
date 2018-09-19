import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import { connect } from 'react-redux';
import { history } from '../../Base/routers/AppRouter';
import { login } from '../actions/auth';

import {
  RegistrationText, NicknameText, RegisterBtnText, BackToLoginText,
} from '../constants/constanst';

const FormItem = Form.Item;

class RegistrationForm extends React.Component {
    state = {
      name: '',
      email: '',
      password: '',
    }

    handleChangeEmail = (event) => {
      this.setState({ email: event.target.value });
    }

    handleChangePass = (event) => {
      this.setState({ password: event.target.value });
    }

    handleChangeName = (event) => {
      this.setState({ name: event.target.value });
    }

    handleSubmit = (e) => {
      e.preventDefault();

      const { form, login } = this.props;

      const user = {
        ...this.state,
      };

      form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);

          axios.post('https://formula-test-api.herokuapp.com/contact', { ...user })
            .then((res) => {
              if (res.status) {
                localStorage.setItem('userInfo', JSON.stringify({ ...user }));
                login({ ...user });
                history.push('/wordgroups');
              }
            });
        }
      });
    };

    compareToFirstPassword = (rule, value, callback) => {
      const { form } = this.props;
      if (value && value !== form.getFieldValue('password')) {
        callback('Two passwords that you enter is inconsistent!');
      } else {
        callback();
      }
    }

    render() {
      const { form } = this.props;
      return (
        <Form onSubmit={this.handleSubmit}>

          <h4 className="login-form__title">
            {RegistrationText}
          </h4>
          <FormItem
            label={(
              <span>
                {NicknameText}
              </span>
          )}
          >
            {form.getFieldDecorator('nickname', {
              rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
            })(
              <Input onChange={this.handleChangeName} />,
            )}
          </FormItem>
          <FormItem
            label="E-mail"
          >
            {form.getFieldDecorator('email', {
              rules: [{
                type: 'email', message: 'The input is not valid E-mail!',
              }, {
                required: true, message: 'Please input your E-mail!',
              }],
            })(
              <Input name="email" onChange={this.handleChangeEmail} />,
            )}
          </FormItem>
          <FormItem
            label="Password"
          >
            {form.getFieldDecorator('password', {
              rules: [{
                required: true, message: 'Please input your password!',
              }, {
                validator: this.validateToNextPassword,
              }],
            })(
              <Input type="password" name="password" onChange={this.handleChangePass} />,
            )}
          </FormItem>
          <FormItem
            label="Confirm Password"
          >
            {form.getFieldDecorator('confirm', {
              rules: [{
                required: true, message: 'Please confirm your password!',
              }, {
                validator: this.compareToFirstPassword,
              }],
            })(
              <Input type="password" onBlur={this.handleConfirmBlur} />,
            )}
          </FormItem>
          <FormItem>
            <div className="space-between">
              <Link to="/">
                { BackToLoginText }
              </Link>
              <Button type="primary" htmlType="submit">
                {RegisterBtnText}
              </Button>
            </div>
          </FormItem>
        </Form>
      );
    }
}
const mapStateToProps = state => ({
  userInfo: state.userInfo,
});
const mapDispatchToProps = dispatch => ({
  login: (name) => {
    dispatch(login(name));
  },
});

const WrappedRegistrationForm = Form.create()(RegistrationForm);

export default connect(mapStateToProps, mapDispatchToProps)(WrappedRegistrationForm);
