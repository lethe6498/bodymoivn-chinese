import BaseAlert from './BaseAlert'
import React from 'react'
import {connect} from 'react-redux'
import {clearCacheConfirmed, clearCacheCancelled} from '../../redux/actions/compositionActions'

class CacheAlerts extends React.Component {

	render() {
		return (<BaseAlert
      buttons={[
        {
          text: '确认（Confirm）',
          action: this.props.clearCacheConfirmed,
          type: 'green',
        },
        {
          text: '取消（Cancel）',
          action: this.props.clearCacheCancelled,
          type: 'gray',
        },
      ]}
      pars={[
        '您确定要清除缓存吗？（Are you sure you want to clear the caché?）',
        '您将丢失所有项目的设置（You will lose the settings for all projects）',
        '仅在出现问题时使用此功能（Use this only if something is not working correctly）',
      ]}
    />)
	}
}

function mapStateToProps(state) {
  return {alerts: state.alerts}
}

const mapDispatchToProps = {
  clearCacheConfirmed: clearCacheConfirmed,
  clearCacheCancelled: clearCacheCancelled,
}

export default connect(mapStateToProps, mapDispatchToProps)(CacheAlerts)