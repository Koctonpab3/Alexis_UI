import React from 'react';

// antd
import {
  Table, Input, InputNumber, Button, Popconfirm, Form, Icon, Divider,
} from 'antd';


const FormItem = Form.Item;
const EditableContext = React.createContext();
const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);
const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
    getInput = () => {
      if (this.props.inputType === 'number') {
        return <InputNumber />;
      }
      return <Input />;
    };

    render() {
      const {
        editing,
        dataIndex,
        title,
        inputType,
        record,
        index,
        ...restProps
      } = this.props;
      return (
        <EditableContext.Consumer>
          {(form) => {
            const { getFieldDecorator } = form;
            return (
              <td {...restProps}>
                {editing ? (
                  <FormItem style={{ margin: 0 }}>
                    {getFieldDecorator(dataIndex, {
                      rules: [{
                        required: true,
                        message: `Please Input ${title}!`,
                      }],
                      initialValue: record[dataIndex],
                    })(this.getInput())}
                  </FormItem>
                ) : restProps.children}
              </td>
            );
          }}
        </EditableContext.Consumer>
      );
    }
}

export default class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    const statusIcons = {
      enabledIcon: <Icon type="smile" style={{ fontSize: 24, color: '#52c41a' }} />,
      disabledIcon: <Icon type="frown" style={{ fontSize: 24, color: '#fa541c' }} />,
    };
    this.columns = [{
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: '10%',
      className: 'wordsStatus',
      editable: false,
      render: (text, record) => (
        <div>
          {
                        record.active === true ? (
                          statusIcons.enabledIcon
                        ) : (
                          statusIcons.disabledIcon
                        )
                    }
        </div>
      ),
      filters: [{
        text: 'Show enabled',
        value: 'enabled',
      }, {
        text: 'Show disabled',
        value: 'disabled',
      }],
      onFilter: (value, record) => record.activation.indexOf(value) === 0,

    }, {
      title: 'Word Group',
      dataIndex: 'group',
      key: 'group',
      width: '70%',
      filterDropdown: ({
        setSelectedKeys, selectedKeys, confirm, clearFilters,
      }) => (
        <div className="custom-filter-dropdown">
          <Input
            ref={ele => this.searchInput = ele}
            placeholder="Search Word Group"
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={this.handleSearch(selectedKeys, confirm)}
          />
          <Button type="primary" onClick={this.handleSearch(selectedKeys, confirm)}>Search</Button>
          <Button onClick={this.handleReset(clearFilters)}>Reset</Button>
        </div>
      ),
      filterIcon: filtered => <Icon type="search" style={{ color: filtered ? '#108ee9' : '#aaa' }} />,
      onFilter: (value, record) => record.group.toLowerCase().includes(value.toLowerCase()),
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          setTimeout(() => {
            this.searchInput.focus();
          });
        }
      },
      render: (text) => {
        const { searchText } = this.state;
        return searchText ? (
          <span>
            {text.split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i')).map((fragment, i) => (
              fragment.toLowerCase() === searchText.toLowerCase()
                    ? <span key={i} className="highlight">{fragment}</span> : fragment // eslint-disable-line
            ))}
          </span>
        ) : text;
      },
      defaultSortOrder: 'ascend',
      sorter: (a, b) => a.group.localeCompare(b.group),
      editable: true,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => {
        const editable = this.isEditing(record);
        // const activeState = this.isActive(record);
        return (
          <div>
            {
                  record.active === true ? (
                    <span>
                      <a
                        href="javascript:;"
                      >

                          Deactivate
                      </a>
                      <Divider type="vertical" />
                    </span>
                  ) : (
                    <span>
                      <a href="javascript:;"> Activate </a>
                      <Divider type="vertical" />
                    </span>
                  )
              }
            {editable ? (
              <span>
                <EditableContext.Consumer>
                  {form => (
                    <a
                      href="javascript:;"
                      onClick={() => this.save(form, record.key)}
                      style={{ marginRight: 8 }}
                    >
                          Save
                    </a>
                  )}
                </EditableContext.Consumer>
                <Popconfirm
                  title="Sure to cancel?"
                  onConfirm={() => this.cancel(record.key)}
                >
                  <a>Cancel</a>
                </Popconfirm>
              </span>
            ) : (
              <a onClick={() => this.edit(record.key)}>Edit</a>
            )}
            <span>
              <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
                <Divider type="vertical" />
                <a href="javascript:;"> Delete </a>
              </Popconfirm>
            </span>
          </div>
        );
      },
    }];

    this.state = {
      searchText: '',
      editingKey: '',
      dataSource:
                [{
                  key: '0',
                  active: true,
                  group: 'Irregular verbs',
                }, {
                  key: '1',
                  active: false,
                  group: 'Animals',
                }, {
                  key: '2',
                  active: true,
                  group: 'Birds',
                }, {
                  key: '3',
                  active: true,
                  group: 'Insects',
                }, {
                  key: '4',
                  active: false,
                  group: 'Snakes',
                }, {
                  key: '5',
                  active: false,
                  group: 'Human body',
                },
                {
                  key: '6',
                  active: true,
                  group: 'Business English nouns',
                },
                {
                  key: '7',
                  active: true,
                  group: 'Business English verbs',

                },
                {
                  key: '8',
                  active: true,
                  group: 'Clothes',
                },
                {
                  key: '9',
                  active: true,
                  group: 'Appearance',
                },
                {
                  key: '10',
                  active: false,
                  group: 'Nature',
                },
                {
                  key: '11',
                  active: true,
                  group: 'Education',
                }],
      count: 12,
    };
  }

  // editing word groups

  isEditing = record => record.key === this.state.editingKey;

  edit(key) {
    this.setState({ editingKey: key });
  }

  save(form, key) {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      const newData = [...this.state.dataSource];
      const index = newData.findIndex(item => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        this.setState({ dataSource: newData, editingKey: '' });
      } else {
        newData.push(row);
        this.setState({ dataSource: newData, editingKey: '' });
      }
    });
  }

    cancel = () => {
      this.setState({ editingKey: '' });
    };

    // searching wordgroups

    handleSearch = (selectedKeys, confirm) => () => {
      confirm();
      this.setState({ searchText: selectedKeys[0] });
    };

    handleReset = clearFilters => () => {
      clearFilters();
      this.setState({ searchText: '' });
    };

    // deleting wordgroups

    handleDelete = (key) => {
      const dataSource = [...this.state.dataSource];
      this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
    }

    // adding new row

    handleAdd = () => {
      const { count, dataSource } = this.state;
      const newData = {
        key: count,
        status: <Icon type="smile" style={{ fontSize: 24, color: '#52c41a' }} />,
        active: true,
        group: ' Click to enter the name of word group',
      };
      this.setState({
        dataSource: [...dataSource, newData],
        count: count + 1,
      });
    }

    // saving new row

    handleSave = (row) => {
      const newData = [...this.state.dataSource];
      const index = newData.findIndex(item => row.key === item.key);
      const item = newData[index];
      newData.splice(index, 1, {
        ...item,
        ...row,
      });
      this.setState({ dataSource: newData });
    }

    // rendering

    render() {
      const { dataSource } = this.state;
      const components = {
        body: {
          row: EditableFormRow,
          cell: EditableCell,
        },
      };
      const columns = this.columns.map((col) => {
        if (!col.editable) {
          return col;
        }
        return {
          ...col,
          onCell: record => ({
            record,
            inputType: col.dataIndex === 'age' ? 'number' : 'text',
            dataIndex: col.dataIndex,
            title: col.title,
            handleSave: this.handleSave,
            editing: this.isEditing(record),
          }),
        };
      });
      return (
        <div>
          <Button onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}>
                    + Add new word group
          </Button>
          <Table
            components={components}
            rowClassName={() => 'editable-row'}
            bordered
            dataSource={dataSource}
            columns={columns}
          />
        </div>
      );
    }
}
