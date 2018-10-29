import React from 'react';
import { connect } from 'react-redux';
import {
  Select, Button, Icon, notification,
} from 'antd';
import axios from 'axios';
import { mainUrl } from '../../Base/api/auth/constants';
import {
  loadActiveWordGroups, getSetupConfig, setApproach, setDefaultWGroup,
} from '../actions/setupActions';
import {
  failApproaches, wGroupMessage, mainSetupText, selectClasses, selectOnSelectClass,
} from '../constans/setup';
import { findObjectByKey } from '../utils/setupUtils';
// import thunk from 'redux-thunk';
// import { configApi } from '../../Base/api/setup/setupApi';
import {
  errServerConnection,
} from '../../WordGroups/constans/constants';

const Option = Select.Option;

export class Setup extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);
  }

    state = {
      fApproach: '',
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
      // console.log(value);
      const val = Number(value);
      // console.log(this.approachBtn);
      // console.log(this.approachBtn.props.disabled);
      // this.approachBtn.props.disabled = false;
      this.setState({
        approach: val,
        approachBtnState: false,
      });
      // console.log(this.state.approach);
    };

    setWordGroup = (value, wordGroupInfo) => {
      // console.log(wordGroupInfo);
      const wordGroupId = wordGroupInfo.props.wordGroupInfo;
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

    sendConfig() {
      const { defaultWordGroup, userFailApproaches } = this.props;
      // const { userFailApproaches } = this.props;
      // console.log(defaultWordGroup);
      console.log(userFailApproaches);
      const configApi = async (token) => {
        const response = await axios({
          method: 'post',
          url: `${mainUrl}/api/alexa/configuration `,
          data: {
            failApproach: userFailApproaches,
            defaultGroupId: defaultWordGroup,
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

    saveApproach = () => {
      const approach = this.state.approach;
      const resolveSaveApproach = () => new Promise((resolve, reject) => {
        resolve();
      });
      resolveSaveApproach()
        .then(() => {
          this.props.setApproach(approach);
        })
        .then(
          () => {
            this.sendConfig();
          },
        )
        .then(
          () => {
            this.setState({
              approachBtnState: true,
            });
          },
        )
        .catch(err => console.log(err));
    };

    saveWordGroup = () => {
      const wGroup = this.state.defaultWordGroup;
      const resolveSaveWordGroup = () => new Promise((resolve, reject) => {
        resolve();
      });
      resolveSaveWordGroup()
        .then(() => {
          this.props.setDefaultWGroup(wGroup);
        })
        .then(
          () => {
            this.sendConfig();
          },
        )
        .then(
          () => {
            this.setState({
              wordGroupBtnState: true,
            });
          },
        )
        .catch(err => console.log(err));
    };


    render() {
      const { activeWordGroups } = this.props;
      const { defaultWordGroup } = this.props;
      const { userFailApproaches } = this.props;
      const defaultWordGroupName = findObjectByKey(activeWordGroups, 'wordGroupId', defaultWordGroup);
      return (
        <div className="select-block">
          <div className="select-block-text">
            <div className="setup-page-name">
              <Icon id="setup-text-icon" type="setting" theme="outlined" />
              <span id="setup-page-name-text">SETUP</span>
            </div>
            <div>
              <span id="additional-text">{mainSetupText}</span>
            </div>
          </div>
          <div className="select-wrapper">
            <div className="select-block-item-wrap">
              <div className="select-block-item select-label">
                <span className="label-text">Fail Approach: </span>
              </div>
              <Select
                className={this.state.approachBtnState === true ? selectOnSelectClass : selectClasses}
                // className="select-block-item select-item select-input fail-num-select"
                placeholder={userFailApproaches}
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
    dispatch(getSetupConfig(resConfig));
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
  userFailApproaches: state.setup.userFailApproaches,
});

export default connect(mapStateToProps, mapDispatchToProps)(Setup);
