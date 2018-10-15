import React from 'react';
import { Modal, Button, notification, } from 'antd';
import alexisPasswordApi from '../../Base/api/alexisPasswordApi/alexisPasswordApi';
import { getAlexisPass, okText, errServerConnection } from '../constants/constants';

class AlexisPassword extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      password: '',
      visible: false,
    };
  }

    getAlexisPass = async () => {
      console.log(this.props.isOnline)
      const user = JSON.parse(localStorage.getItem('userInfo'));
      try {
        const res = await alexisPasswordApi(user.token);
        this.setState({
          password: res,
          visible: true,
        });
      } catch (err) {
        notification.open({
          type: 'error',
          message: errServerConnection,
        });
      }
    }

    handleOk = (e) => {
      this.setState({
        visible: false,
      });
    }

    handleCancel = (e) => {
      this.setState({
        visible: false,
        password: '',
      });
    }

    render() {
      const { isOnline } = this.props;
      return (
        <div className="alexis-pass">
        
          <Button type="primary" disabled={isOnline ? true : false} onClick={this.getAlexisPass}>
            {getAlexisPass}
          </Button>
          <Modal
            title="Alexis Code"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={[
              <Button key="submit" type="primary" onClick={this.handleOk}>
                {okText}
              </Button>,
            ]}
          >
            <h4 className="alexis-pass__code">
              {this.state.password}
            </h4>
          </Modal>
        </div>
      );
    }
}

export default AlexisPassword;
