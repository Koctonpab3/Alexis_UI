import React from 'react';
import 'antd/dist/antd.css';
import {
  Table, Input, Button, Popconfirm, Form, Icon, Divider, notification,
} from 'antd';
import axios from 'axios';

import { mainUrl } from '../../Base/api/auth/constants';

export default class Words extends React.Component {
    // viewProp =() => {
    //   console.log(this);
    // }

    loadWords = () => {
      // console.log(this);
      // const wordGroupsId = 10;
      const wordGroupsId = this.props.match.params.id;
      console.log(this.props.match.params.id);
      console.log(wordGroupsId);
      const wordsApi = async (token) => {
        const response = await axios({
          method: 'get',
          url: `${mainUrl}/home/wordgroups/${wordGroupsId}/words`,
          data: {},
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        });

        if (response.status <= 400) {
          return response.data;
        }
        throw new Error(response.status);
      };
      const user = JSON.parse(localStorage.getItem('userInfo'));
      wordsApi(user.token).then((data) => {
        // const dataNew = data;
        // const pagination = { ...this.state.pagination };
        // this.setState({
        //   loading: false,
        //   pagination,
        // });
        // this.props.loadData(dataNew);
        console.log(data);
      }).catch((error) => {
        console.log(error);
      });
    };

    addWord = () => {
      const addWordReq = async (token) => {
        const response = await axios({
          method: 'put',
          url: `${mainUrl}/home/wordgroups/`,
          data: {
            name: 'New',
            id: 10,
          },
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        });
        if (response.status <= 400) {
          return response.data;
        }
        throw new Error(response.status);
      };
      const user = JSON.parse(localStorage.getItem('userInfo'));
      addWordReq(user.token).then((res) => {
        // const newWordGroup = res;
        // this.props.addWordGroup(newWordGroup);
      }).catch((error) => {
        notification.open({
          type: 'error',
          message: errServerConnection,
        });
      });
    };


    render() {
      return (
        <div className="words-table">
          <Button
            className="loadWordsBtn"
            id="loadWord-Btn"
            onClick={() => this.loadWords()}
            type="primary"
          >
                    +Load words
          </Button>
          <Button
            className="addWordBtn"
            id="addWord-Btn"
            onClick={() => this.viewProp()}
            type="primary"
          >
                +Add new word
          </Button>
          {/* <Table */}
          {/* className="WordGroupTable" */}
          {/* components={components} */}
          {/* columns={columns} */}
          {/* rowKey={record => record.id} */}
          {/* rowClassName={() => 'editable-row'} */}
          {/* bordered */}
          {/* dataSource={dataSource} */}
          {/* pagination={this.state.pagination} */}
          {/* loading={this.state.loading} */}
          {/* onChange={this.handleTableChange} */}
          {/* /> */}
        </div>
      );
    }
}
