import React from 'react';
import { connect } from 'react-redux';
import {
  Select, Button, Form, notification,
} from 'antd';
import axios from 'axios';
import { mainUrl } from '../../Base/api/auth/constants';
import {
  loadActiveWordGroups, getSetupCongig, setApproach, setDefaultWGroup,
} from '../actions/setupActions';
import {
  failApproaches, wGroupMessage,mainSetupText, selectClasses, selectOnSelectClass,
} from '../constans/setup';
import { findObjectByKey } from '../utils/setupUtils';
import {
  errServerConnection,
} from '../../WordGroups/constans/constants';

const Option = Select.Option;

export class Setup extends React.Component {
    state = {
      approach: '',
      defaultWordGroup: '',
      approachBtnState: true,
      wordGroupBtnState: true,
    };


    componentDidMount() {
      this.loadActiveWordGroups();
      this.getConfig();
    }

    getConfig() {
      const configApi = async (token) => {
        const response = await axios({
          method: 'get',
          url: `${mainUrl}/api/alexa/configuration`,
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
      configApi(user.token).then((data) => {
        const resConfig = data;
        console.log(resConfig);
        this.setState({
          defaultWordGroup: resConfig.defaultGroupId,
          approach: resConfig.failApproach,
        });
        this.props.getSetupConfig(resConfig);
      }).catch((error) => {
        console.log(error);
      });
    }


    setVal = (value) => {
      // console.log(this.approachBtn);
      // console.log(this.approachBtn.props.disabled);
      // this.approachBtn.props.disabled = false;
      this.setState({
        approach: value,
        approachBtnState: false,
      });
    };

    setWordGroup = (value, wordGroupInfo) => {
      const wordGroupId = wordGroupInfo.props.wordGroupInfo;
      // const wGroupId = idW.id;
      this.setState({
        defaultWordGroup: wordGroupId,
        wordGroupBtnState: false,
      });
    };


    loadActiveWordGroups = () => {
      // const { activeWordGroups } = this.props;
      const activeWordGroupsApi = async (token) => {
        const response = await axios({
          method: 'get',
          url: `${mainUrl}/api/alexa/configuration/groups`,
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
      activeWordGroupsApi(user.token).then((data) => {
        const resObj = data;
        // console.log(resObj);
        const resData = [];
        const toArr = () => {
          for (const value of resObj.values()) {
            const wordGroupName = value.name;
            const wordGroupId = value.id;
            const newGroupObj = { wordGroupId, wordGroupName };
            resData.push(newGroupObj);
          }
        };
        toArr();
        this.props.loadActiveWordGroups(resData);
        this.setState({
          aW: resData,
        });
      }).catch((error) => {
        console.log(error);
      });
    };

    saveApproach = () => {
      const approach = this.state.approach;
      this.setState({
        approachBtnState: true,
      });
      this.props.setApproach(approach);
      this.sendConfig();
    };

    saveWordGroup = () => {
      const wGroup = this.state.defaultWordGroup;
      this.setState({
        wordGroupBtnState: true,
      });
      this.sendConfig();
      this.props.setDefaultWGroup(wGroup);
    };

    sendConfig() {
      const failAppr = this.state.approach;
      const defaultWGroup = this.state.defaultWordGroup;
      const configApi = async (token) => {
        const response = await axios({
          method: 'post',
          url: `${mainUrl}/api/alexa/configuration `,
          data: {
            failApproach: failAppr,
            defaultGroupId: defaultWGroup,
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
      configApi(user.token).then((data) => {
        // console.log(data);
      }).catch((error) => {
        console.log(error);
      });
    }

    render() {
      const { activeWordGroups } = this.props;
      const { defaultWordGroup } = this.props;
      const { failApproach } = this.props;
      const defaultWordGroupName = findObjectByKey(activeWordGroups, 'wordGroupId', defaultWordGroup);
      return (
        <div className="select-block">
          <div className="select-block-text">
            <span>{mainSetupText}</span>
          </div>
          <div className="select-wrapper">
            <div className="select-block-item-wrap">
              <div className="select-block-item select-label">
                <span className="label-text">Fail Approach: </span>
              </div>
              <Select
                className={this.state.approachBtnState === true ? selectOnSelectClass : selectClasses}
                // className="select-block-item select-item select-input fail-num-select"
                placeholder={failApproach}
                onChange={this.setVal}
              >
                {failApproaches.map(fnum => <Option key={fnum}>{fnum}</Option>)}
              </Select>
              <Button
                id="save-approach"
                className="save-select-btn"
                type="primary"
                onClick={this.saveApproach}
                disabled={this.state.approachBtnState}
              >
                Save
              </Button>
            </div>
            <div className="select-block-item-wrap">
              <div className="select-block-item select-label">
                <span className="label-text">Default Word Group: </span>
              </div>
              <Select
                className={this.state.wordGroupBtnState === true ? selectOnSelectClass : selectClasses}
                onChange={this.setWordGroup}
                showSearch
                placeholder={(defaultWordGroupName !== null ? defaultWordGroupName : wGroupMessage)}
                // style ={color:blue}
                // style={{ color:d9d9d9 }}
              >
                {activeWordGroups.map(d => <Option wordGroupInfo={d.wordGroupId} key={d.wordGroupName}>{d.wordGroupName}</Option>)}

              </Select>
              <Button
                id="save-default-group"
                className="save-select-btn"
                type="primary"
                onClick={this.saveWordGroup}
                disabled={this.state.wordGroupBtnState}
              >
Save
              </Button>
            </div>
          </div>
        </div>
      );
    }
}

const mapDispatchToProps = dispatch => ({
  loadActiveWordGroups: (resData) => {
    dispatch(loadActiveWordGroups(resData));
  },
  getSetupConfig: (resConfig) => {
    dispatch(getSetupCongig(resConfig));
  },
  setApproach: (approach) => {
    dispatch(setApproach(approach));
  },
  setDefaultWGroup: (wGroup) => {
    dispatch(setDefaultWGroup(wGroup));
  },
});

const mapStateToProps = state => ({
  setup: state.setup,
  activeWordGroups: state.setup.activeWordGroups,
  defaultWordGroup: state.setup.defaultWordGroup,
  failApproach: state.setup.failApproach,
});

export default connect(mapStateToProps, mapDispatchToProps)(Setup);
