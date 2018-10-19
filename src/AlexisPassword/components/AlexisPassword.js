import React from 'react';
import { connect } from 'react-redux';
import { Modal, Button, notification } from 'antd';
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
  componentWillUnmount() {
    clearInterval(this.awsStatus)
  }

    getAlexisPass = async () => {
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
      this.awsStatus = setInterval(() => {

        const { isOnline } = this.props;
        if (isOnline){
          this.setState({ visible: false })
        }
      }, 5000);
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

          <Button type="primary" disabled={!!isOnline} onClick={this.getAlexisPass}>
            {getAlexisPass}
          </Button>
          <Modal
            title={getAlexisPass}
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

const mapStateToProps = state => ({
  userInfo: state.userInfo,
});

export default connect(mapStateToProps)(AlexisPassword);
