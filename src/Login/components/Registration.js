import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { history } from '../../Base/routers/AppRouter';

import { Form, Input, Button } from 'antd';

const FormItem = Form.Item;

class RegistrationForm extends React.Component {
    state = {
      name: '',
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

    handleChangeName = (event) => {
      this.setState({ name: event.target.value });
      console.log(this.state.name);
    }

    handleSubmit = (e) => {
      const user = {
        ...this.state,
      };
      e.preventDefault();
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);

          axios.post('https://formula-test-api.herokuapp.com/contact', { ...user })
            .then((res) => {
              if(res.status === res.status){ 

                localStorage.setItem('userInfo', JSON.stringify(user));

              }
            });
        }
      });
    };

    compareToFirstPassword = (rule, value, callback) => {
      const form = this.props.form;
      if (value && value !== form.getFieldValue('password')) {
        callback('Two passwords that you enter is inconsistent!');
      } else {
        callback();
      }
    }

    render() {
      const { getFieldDecorator } = this.props.form;
      return (
        <Form onSubmit={this.handleSubmit}>

          <h4 className="login-form__title">
Registration
          </h4>
          <FormItem
            label={(
              <span>
              Nickname&nbsp;
              </span>
          )}
          >
            {getFieldDecorator('nickname', {
              rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
            })(
              <Input onChange={this.handleChangeName} />,
            )}
          </FormItem>
          <FormItem
            label="E-mail"
          >
            {getFieldDecorator('email', {
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
            {getFieldDecorator('password', {
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
            {getFieldDecorator('confirm', {
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
            <Button type="primary" htmlType="submit">
Register
            </Button>
          </FormItem>
        </Form>
      );
    }
}
const mapStateToProps = state => ({
  userInfo: state.userInfo,
});

const WrappedRegistrationForm = Form.create()(RegistrationForm);

/* const RegisterConnect = connect(mapStateToProps)(RegistrationForm); */

export default WrappedRegistrationForm;