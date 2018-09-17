import React from 'react';
import axios from 'axios';
import {
  Form, Icon, Input, Button,
} from 'antd';
import { Link } from 'react-router-dom';

const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
  state = {
    email: '',
    password: '',
  }

  handleChangeEmail = (event) => {
    this.setState({ email: event.target.value });
    console.log(this.state.email);
  }

  handleChangePass = (event) => {
    this.setState({ password: event.target.value });
    console.log(this.state.password);
  }


  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);

        const user = {
          ...this.state,
        };
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);

            axios.post('http://1a54339c.ngrok.io/user_login', { ...user })
              .then((res) => {
                console.log(res);
                console.log(res.data);
                console.log(res.status);
              });
          }
        });
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <h4 className="login-form__title">
Login
        </h4>
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your email!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="E-mail" onChange={this.handleChangeEmail} />,
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" onChange={this.handleChangePass} />,
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or <Link to="/registration">
register now!
          </Link>
        </FormItem>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

export default WrappedNormalLoginForm;
