import React from 'react';

import {
  Form, Icon, Input, Button, Table, Popconfirm,
} from 'antd';

const FormItem = Form.Item;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class HorizontalLoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: 'English Words',
        dataIndex: 'engWord',
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
        dataIndex: 'rusWord',
        className: 'group-name-col',
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
        title: 'Remove Word',
        className: 'remove-word-col-name',
        render: record => (
          <div className="removeWordCol">
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => this.removeWord(record.id)}
            >
              <Icon type="close-circle" theme="filled" />
              {/* color: #f35e5e; */}
              {/* font-size: 21px; */}
            </Popconfirm>
          </div>
        ),
      },
    ];
  }

    state = {
      dataSource: [],
    };

    componentDidMount() {
    // To disabled submit button at the beginning.
      this.props.form.validateFields();
    }

    handleSubmit = (e) => {
      e.preventDefault();
      const { dataSource } = this.state;
      this.props.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
        // const newWord = values;
        this.setState({
          dataSource: [...dataSource, values],
        });
        // console.log(this.state);
        // console.log(this.props);
        // console.log(this);
        // console.log(words);
      });
    };

    removeWord = () => {
      console.log('ok');
    };

    render() {
      const {
        getFieldDecorator, getFieldsError, getFieldError, isFieldTouched,
      } = this.props.form;

      const { dataSource } = this.state;
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

      // Only show error after a field is touched.
      const engWordError = isFieldTouched('engWord') && getFieldError('engWord');
      const rusWordError = isFieldTouched('rusWord') && getFieldError('rusWord');
      return (
        <Form layout="inline" onSubmit={this.handleSubmit}>
          <FormItem
            validateStatus={engWordError ? 'error' : ''}
            help={engWordError || ''}
          >
            {getFieldDecorator('engWord', {
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
            validateStatus={rusWordError ? 'error' : ''}
            help={rusWordError || ''}
          >
            {getFieldDecorator('rusWord', {
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
            >
              <Icon type="plus" theme="outlined" />
                       Add Word
            </Button>
          </FormItem>
          <Table
            className="wordsInGroups-table"
            columns={columns}
            rowClassName={() => 'words-editable-row'}
            dataSource={dataSource}
          />
        </Form>
      );
    }
}

export const WrappedHorizontalLoginForm = Form.create()(HorizontalLoginForm);
