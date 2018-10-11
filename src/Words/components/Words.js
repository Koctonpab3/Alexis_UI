import React from 'react';

import {
  Form, Icon, Input, Button, Table, Popconfirm, notification,
} from 'antd';
import { connect } from 'react-redux';
import axios from 'axios';
import {
  loadWordsData, addWord, deleteWord, clearWordsState,
} from '../actions/wordsActions';
import {
  errServerConnection,
} from '../../WordGroups/constans/constants';
import { mainUrl } from '../../Base/api/auth/constants';

const FormItem = Form.Item;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class WordsTable extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: 'English Words',
        dataIndex: 'enWord',
        className: 'engWord-col',
        render: text => (
          <div>
            <span>
              {' '}
              {text}
              {' '}
            </span>
          </div>
        ),
      },
      {
        title: 'Russian Word',
        dataIndex: 'ruWord',
        className: 'rus-name-col',
        render: text => (
          <div>
            <span>
              {' '}
              {text}
              {' '}
            </span>
          </div>

        ),
      },
      {
        title: '',
        className: 'remove-word-col-name',
        render: (text, record) => (
          <div className="removeWordCol">
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => this.removeWord(record.id)}
            >
              <Icon className="remove-word-icon" type="close-circle" theme="filled" />
            </Popconfirm>
          </div>
        ),
      },
    ];
  }

    state = {
      // dataSource: [],
      loading: true,
      pagination: {},
    };

    componentDidMount() {
      // To disabled submit button at the beginning.
      this.props.form.validateFields();
      const { clearWordsState } = this.props;
      clearWordsState();
      this.loadWords();
    }


    handleAddWord = (e) => {
      e.preventDefault();
      // const { dataSource } = this.state;
      const wordGroupsId = this.props.match.params.id;

      this.props.form.validateFields((err, values) => {
        if (!err) {
          // console.log('Received values of form: ', values);
        }
        const newWord = { ...values };
        // console.log(values);

        const addWordReq = async (token) => {
          const response = await axios({
            method: 'put',
            url: `${mainUrl}/home/wordgroups/${wordGroupsId}/words`,
            data: {
              enWord: newWord.enWord,
              ruWord: newWord.ruWord,
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
          const newAddedWord = res;
          this.props.addWord(newAddedWord);
          // this.props.addWordGroup(newWordGroup);
          console.log(res);
          this.handleReset();
        }).catch((error) => {
          notification.open({
            type: 'error',
            message: errServerConnection,
          });
          console.log(error);
        });

        // this.setState({
        //   dataSource: [...dataSource, newWord],
        // });
        // this.props.addWord(newWord);
      });
    };

    handleReset = () => {
      this.props.form.resetFields();
    }

    removeWord = (id) => {
      // console.log(id);
      const wordGroupsId = this.props.match.params.id;
      const user = JSON.parse(localStorage.getItem('userInfo'));
      axios(
        {
          method: 'delete',
          url: `${mainUrl}/home/wordgroups/${wordGroupsId}/words/${id}`,
          headers:
                    {
                      'Content-Type': 'application/json',
                      Authorization: user.token,
                    },
          data: {
          },
        },
      ).then((response) => {
        this.props.deleteWord(id);
      })
        .catch((error) => {
          notification.open({
            type: 'error',
            message: errServerConnection,
          });
          console.log(error);
        });
    };

    loadWords = () => {
      // console.log(this);
      // const wordGroupsId = 10;
      const wordGroupsId = this.props.match.params.id;
      // console.log(this.props.match.params.id);
      // console.log(wordGroupsId);
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
        const dataNew = data;
        const pagination = { ...this.state.pagination };
        this.setState({
          loading: false,
          pagination,
        });
        this.props.loadWordsData(dataNew);
        // console.log(data);
      }).catch((error) => {
        notification.open({
          type: 'error',
          message: errServerConnection,
        });
        this.setState({
          loading: false,
        });
        console.log(error);
      });
    };

    // addWord = () => {
    //   const wordGroupsId = this.props.match.params.id;
    //   // console.log(wordGroupsId);
    //   const addWordReq = async (token) => {
    //     const response = await axios({
    //       method: 'put',
    //       url: `${mainUrl}/home/wordgroups/${wordGroupsId}/words`,
    //       data: {
    //         enWord: 'Cow',
    //         ruWord: 'Корова',
    //         fileName: 'filename',
    //       },
    //       headers: {
    //         'Content-Type': 'application/json',
    //         Authorization: token,
    //       },
    //     });
    //     if (response.status <= 400) {
    //       return response.data;
    //     }
    //     throw new Error(response.status);
    //   };
    //   const user = JSON.parse(localStorage.getItem('userInfo'));
    //   addWordReq(user.token).then((res) => {
    //     // const newWordGroup = res;
    //     // this.props.addWordGroup(newWordGroup);
    //     console.log(res);
    //   }).catch((error) => {
    //     // notification.open({
    //     //   type: 'error',
    //     //   message: errServerConnection,
    //     // });
    //     console.log(error);
    //   });
    // };

    handleTableChange = (pagination, filters, sorter) => {
      const pager = { ...this.state.pagination };
      pager.current = pagination.current;
      this.setState({
        pagination: pager,
      });
      this.loadWordGroups({
        results: pagination.pageSize,
        page: pagination.current,
        sortField: sorter.field,
        sortOrder: sorter.order,
        ...filters,
      });
    }


    render() {
      const {
        getFieldDecorator, getFieldsError, getFieldError, isFieldTouched,
      } = this.props.form;

      // const { dataSource } = this.state;
      const { dataSource } = this.props;

      const columns = this.columns.map((col) => {
        if (!col.editable) {
          return col;
        }
        return {
          ...col,
          onCell: record => ({
            record,
            dataIndex: col.dataIndex,
            title: col.title,
            save: this.save,
            escFunction: this.escFunction,
            editing: this.isEditing(record),
            cancel: this.cancel,
          }),
        };
      });

      const enWordError = isFieldTouched('enWord') && getFieldError('enWord');
      const ruWordError = isFieldTouched('ruWord') && getFieldError('ruWord');
      return (
        <div className="words-table">
          <Form layout="inline" onSubmit={this.handleAddWord}>
            <FormItem
              validateStatus={enWordError ? 'error' : ''}
              help={enWordError || ''}
            >
              {getFieldDecorator('enWord', {
                rules: [{
                  required: true,
                  whitespace: true,
                  pattern: '^[A-Za-z -]+$',
                  message: 'Please input valid english word!',
                }],
              })(
                <Input placeholder="English Word" />,
              )}
            </FormItem>
            <FormItem
              validateStatus={ruWordError ? 'error' : ''}
              help={ruWordError || ''}
            >
              {getFieldDecorator('ruWord', {
                rules: [{
                  required: true,
                  whitespace: true,
                  pattern: '^[А-Яа-яЁё]+$',
                  message: 'Please input valid russian word!',
                }],
              })(
                <Input placeholder="Russian Word" />,
              )}
            </FormItem>
            <FormItem>
              <Button
                type="primary"
                htmlType="submit"
                disabled={hasErrors(getFieldsError())}
                className="addWordsBtn"
              >
                <Icon type="plus" theme="outlined" />
                        Add Word
              </Button>
            </FormItem>
            <Table
              className="wordsInGroups-table"
              columns={columns}
              rowClassName={() => 'words-editable-row'}
              rowKey={record => record.id}
              dataSource={dataSource}
              bordered
              pagination={this.state.pagination}
              loading={this.state.loading}
              onChange={this.handleTableChange}
            />
          </Form>
        </div>
      );
    }
}

const WrappedWordsTable = Form.create()(WordsTable);

const mapDispatchToProps = dispatch => ({
  loadWordsData: (dataNew) => {
    dispatch(loadWordsData(dataNew));
  },
  addWord: (newWord) => {
    dispatch(addWord(newWord));
  },
  deleteWord: (id) => {
    dispatch(deleteWord(id));
  },
  clearWordsState: () => {
    dispatch(clearWordsState());
  },
});

const mapStateToProps = state => ({
  dataSource: state.words.dataSource,
});

export default connect(mapStateToProps, mapDispatchToProps)(WrappedWordsTable);
