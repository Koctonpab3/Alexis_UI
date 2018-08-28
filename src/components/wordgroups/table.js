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
  width: '70%',
  defaultSortOrder: 'ascend',
  sorter: (a, b) => a.group.localeCompare(b.group),
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
  width: '18%',
}];

const data = [{
  key: '1',
  status: <Icon type="smile" style={{ fontSize: 24, color: '#52c41a' }} />,
  activation: 'enabled',
  group: 'Irregular verbs',
}, {
  key: '2',
  status: <Icon type="frown" style={{ fontSize: 24, color: '#fa541c' }} />,
  activation: 'disabled',
  group: 'Animals',
}, {
  key: '4',
  status: <Icon type="smile" style={{ fontSize: 24, color: '#52c41a' }} />,
  activation: 'enabled',
  group: 'Birds',
}, {
  key: '5',
  status: <Icon type="smile" style={{ fontSize: 24, color: '#52c41a' }} />,
  activation: 'enabled',
  group: 'Insects',
}, {
  key: '6',
  status: <Icon type="frown" style={{ fontSize: 24, color: '#fa541c' }} />,
  activation: 'disabled',
  group: 'Snakes',
}, {
  key: '7',
  status: <Icon type="smile" style={{ fontSize: 24, color: '#52c41a' }} />,
  activation: 'disabled',
  group: 'Human body',
},
{
  key: '8',
  status: <Icon type="smile" style={{ fontSize: 24, color: '#52c41a' }} />,
  activation: 'enabled',
  group: 'Business English nouns',
},
{
  key: '9',
  status: <Icon type="smile" style={{ fontSize: 24, color: '#52c41a' }} />,
  activation: 'enabled',
  group: 'Business English verbs',

},
{
  key: '10',
  status: <Icon type="smile" style={{ fontSize: 24, color: '#52c41a' }} />,
  activation: 'enabled',
  group: 'Clothes',
},
{
  key: '11',
  status: <Icon type="smile" style={{ fontSize: 24, color: '#52c41a' }} />,
  activation: 'enabled',
  group: 'Appearance',
},
{
  key: '12',
  status: <Icon type="frown" style={{ fontSize: 24, color: '#fa541c' }} />,
  activation: 'disabled',
  group: 'Nature',
},
{
  key: '13',
  status: <Icon type="smile" style={{ fontSize: 24, color: '#52c41a' }} />,
  activation: 'enabled',
  group: 'Education',
}];

const WordTable = () => (
  <div className="tableWrap">
    <div className="wordTable">
      <Table columns={columns} dataSource={data} pagination={{ pageSize: 9 }} />
    </div>
  </div>
);
export default WordTable;
