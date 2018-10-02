import React from 'react';
import { Modal } from 'antd';

export default class modalWindow extends React.Component {
  constructor(props) {
    super(props);
    this.showModal = this.showModal.bind(this);
  }

    state = { visible: false };

     showModal = () => {
       this.setState({
         visible: true,
       });
     }

    handleOk = (e) => {
      console.log(e);
      this.setState({
        visible: false,
      });
    }

    handleCancel = (e) => {
      console.log(e);
      this.setState({
        visible: false,
      });
    }

    render() {
      this.showModal = this.props;
      return (
        <div>
          <Modal
            title="Basic Modal"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <p>There was a problem with the connection</p>
          </Modal>
        </div>
      );
    }
}
