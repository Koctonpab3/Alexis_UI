import React from 'react';
import axios from 'axios';
import { Form, Input, Button } from 'antd';

const FormItem = Form.Item;

class RegistrationForm extends React.Component {
    state = {
        name: '',
        password: '',
      }

    handleChangeEmail = event => {
        this.setState({ name: event.target.value });
        console.log(this.state.email)
      }
    handleChangePass = event => {
        this.setState({ password: event.target.value });
        console.log(this.state.password)
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
            .then(res => {
                console.log(res);
                console.log(res.data)
                
            })
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
        <h4 className="login-form__title">Registration</h4>
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
              <Input name="email" onChange={this.handleChangeEmail} />
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
              <Input type="password" name="password" />
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
              <Input type="password" onBlur={this.handleConfirmBlur} />
            )}
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit">Register</Button>
          </FormItem>
        </Form>
      );
    }
  }
  
  const WrappedRegistrationForm = Form.create()(RegistrationForm);
  
  export default WrappedRegistrationForm