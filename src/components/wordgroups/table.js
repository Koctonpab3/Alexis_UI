import React from 'react';

// antd
import { Table, Divider, Icon } from 'antd';

const columns = [{
  title: 'Status',
  dataIndex: 'status',
  key: 'status',
  width: '10%',
  render: text => <a href="#">{text}</a>,

}, {
  title: 'Word Group',
  dataIndex: 'group',
  key: 'group',
  width: '30%',
}, {
  title: 'Actions',
  key: 'actions',
  render: text => (
    <span>
      <a href="#">Deactivate</a>
      <Divider type="vertical" />
      <a href="#">Edit</a>
      <Divider type="vertical" />
      <a href="#">Delete</a>
    </span>
  ),
  width: '60%',
}];

const data = [{
  key: '1',
  status: <Icon type="smile" style={{ fontSize: 24, color: '#52c41a' }} />,
  group: 'irregular verbs',
}, {
  key: '2',
  status: <Icon type="frown" style={{ fontSize: 24, color: '#fa541c' }} />,
  group: 'irregular verbs',
}, {
  key: '4',
  status: <Icon type="smile" style={{ fontSize: 24, color: '#52c41a' }} />,
  group: 'irregular verbs',
}, {
  key: '5',
  status: <Icon type="smile" style={{ fontSize: 24, color: '#52c41a' }} />,
  group: 'irregular verbs',
}, {
  key: '6',
  status: <Icon type="frown" style={{ fontSize: 24, color: '#fa541c' }} />,
  group: 'irregular verbs',
}, {
  key: '7',
  status: <Icon type="smile" style={{ fontSize: 24, color: '#52c41a' }} />,
  group: 'irregular verbs',
},
{
  key: '8',
  status: <Icon type="smile" style={{ fontSize: 24, color: '#52c41a' }} />,
  group: 'irregular verbs',
},
{
  key: '9',
  status: <Icon type="smile" style={{ fontSize: 24, color: '#52c41a' }} />,
  group: 'irregular verbs',

},
{
  key: '10',
  status: <Icon type="smile" style={{ fontSize: 24, color: '#52c41a' }} />,
  group: 'irregular verbs',
},
{
  key: '11',
  status: <Icon type="smile" style={{ fontSize: 24, color: '#52c41a' }} />,
  group: 'irregular verbs',
},
{
  key: '12',
  status: <Icon type="frown" style={{ fontSize: 24, color: '#fa541c' }} />,
  group: 'irregular verbs',
},
{
  key: '13',
  status: <Icon type="smile" style={{ fontSize: 24, color: '#52c41a' }} />,
  group: 'irregular verbs',
}];

const WordTable = () => (
  <div className="tableWrap">
    <div className="wordTable">
      <Table columns={columns} dataSource={data} pagination={{ pageSize: 9 }} />
    </div>
  </div>
);
export default WordTable;
