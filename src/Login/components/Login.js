import React from 'react';
import {
  Form, Icon, Input, Button, message,
} from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  ErroLoginPopUp, ErrorEmailInput, ErrorPasswordInput, PlaceholderEmail, PlaceholderPassword,
} from '../constants/constanst';
import { login } from '../actions/auth';
import { history } from '../../Base/routers/AppRouter';
import {
  LoginTextBnt, RegisterNowText, LoginText, Or,
} from '../constants/constanst';
import { loginApi } from '../../Base/api/auth/authApi';

const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
    state = {
      email: '',
      password: '',
    }

    handleChangeEmail = (event) => {
      this.setState({ email: event.target.value });
    }

    handleChangePass = (event) => {
      this.setState({ password: event.target.value });
    }

    handleSubmit = (e) => {
      e.preventDefault();

      const { login, form } = this.props;

      form.validateFields((err, values) => {
        if (!err) {
          const user = {
            ...this.state,
          };

          const basicAuth = `Basic ${btoa(`${user.email}:${user.password}`)}`;

          loginApi(basicAuth).then((userInfo) => {
            localStorage.setItem('userInfo', JSON.stringify({ ...userInfo }));
            login({ ...userInfo });
            history.push('/wordgroups');
          }).catch((error) => {
            message.error(ErroLoginPopUp);
          });
        }
      });
    }

    render() {
      const { form } = this.props;
      return (
        <Form onSubmit={this.handleSubmit} className="login-form">
          <h4 className="login-form__title">
            { LoginText }
          </h4>
          <FormItem>
            {form.getFieldDecorator('userName', {
              rules: [{ required: true, message: ErrorEmailInput }],
            })(
              <Input prefix={<Icon type="user" />} placeholder={PlaceholderEmail} onChange={this.handleChangeEmail} />,
            )}
          </FormItem>
          <FormItem>
            {form.getFieldDecorator('password', {
              rules: [{ required: true, message: ErrorPasswordInput }],
            })(
              <Input prefix={<Icon type="lock" />} type="password" placeholder={PlaceholderPassword} onChange={this.handleChangePass} />,
            )}
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit" className="login-form-button">
              { LoginTextBnt }
            </Button>
            {Or}
            <Link to="/registration">
              { RegisterNowText }
            </Link>
          </FormItem>
        </Form>
      );
    }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

const mapDispatchToProps = dispatch => ({
  login: (name) => {
    dispatch(login(name));
  },
});

const mapStateToProps = state => ({
  userInfo: state.userInfo,
});

export default connect(mapStateToProps, mapDispatchToProps)(WrappedNormalLoginForm);
