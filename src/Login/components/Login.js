import React from 'react';
import axios from 'axios';
import {
  Form, Icon, Input, Button,
} from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../actions/auth';
import { history } from '../../Base/routers/AppRouter';
import {
  LoginTextBnt, RegisterNowText, LoginText, Or,
} from '../constants/constanst';

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
        console.log('Received values of form: ', values);

        const user = {
          ...this.state,
        };

        const basicAuth = 'Basic ' + btoa(user.email + ':' + user.password);
        // Basic bWVkaW5za2l5bUBnbWFpbC5jb206MTIzMTIz
        // 15:56:15.961 Login.js?2e65:51 {name: "Mikhail", email: "medinskiym@gmail.com", awsExist: false}
        console.log(basicAuth)
        axios.defaults.headers.common['Authorization'] = basicAuth;
        axios.get('http://587ec09b.ngrok.io/home', {})
          .then((res) => {
            localStorage.setItem('userInfo', JSON.stringify({ ...res.data }));
            login({ ...res.data });
            console.log(res.data)
            history.push('/wordgroups');
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
            rules: [{ required: true, message: 'Please input your email!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="E-mail" onChange={this.handleChangeEmail} />,
          )}
        </FormItem>
        <FormItem>
          {form.getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" onChange={this.handleChangePass} />,
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
