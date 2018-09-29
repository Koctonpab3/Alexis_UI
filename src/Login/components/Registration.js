import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Form, Input, Button, message,
} from 'antd';
import { history } from '../../Base/routers/AppRouter';
import { login } from '../actions/auth';
import { registrationApi } from '../../Base/api/auth/authApi';

import {
  RegistrationText, NicknameText, RegisterBtnText, BackToLoginText, SuccsedRegistrationPopUp, ErroUserEmailExist, ErrorInputName, WrongPasswordTwo, EmailNotValid, ErrorEmailInput, ErrorPasswordInput, ErrorConfirmPassword,
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

      const { form } = this.props;

      const user = {
        ...this.state,
      };

      form.validateFieldsAndScroll((err) => {
        if (!err) {
          registrationApi(user).then((res) => {
            if (res) {
              message.success(SuccsedRegistrationPopUp);
              history.push('/');
            }
          }).catch(() => {
            message.error(ErroUserEmailExist);
          });
        }
      });
    };

    compareToFirstPassword = (rule, value, callback) => {
      const { form } = this.props;
      if (value && value !== form.getFieldValue('password')) {
        callback(WrongPasswordTwo);
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
              rules: [{ required: true, message: ErrorInputName, whitespace: true }],
            })(
              <Input onChange={this.handleChangeName} />,
            )}
          </FormItem>
          <FormItem
            label="E-mail"
          >
            {form.getFieldDecorator('email', {
              rules: [{
                type: 'email', message: EmailNotValid,
              }, {
                required: true, message: ErrorEmailInput,
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
                required: true, message: ErrorPasswordInput,
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
                required: true, message: ErrorConfirmPassword,
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
