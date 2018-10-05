import React from 'react';
import { Modal, Button, notification } from 'antd';
import alexisPasswordApi from '../../Base/api/alexisPasswordApi/alexisPasswordApi';
import { getAlexisPass, okText, errServerConnection } from '../constants/constants';

class AlexisPassword extends React.Component {
    state = {
      password: '',
      visible: false,
    }

    getAlexisPass = () => {
      const user = JSON.parse(localStorage.getItem('userInfo'));
      alexisPasswordApi(user.token).then((res) => {
        this.setState({
          password: res,
          visible: true,
        });
      }).catch(() => {
        notification.open({
          type: 'error',
          message: errServerConnection,
        });
      });
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
      return (
        <div className="alexis-pass">
          <p onClick={this.getAlexisPass}>
            {getAlexisPass}
          </p>
          <Modal
            title="Basic Modal"
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
