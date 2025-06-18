import React from 'react'
import {connect} from 'react-redux'
import { StyleSheet, css } from 'aphrodite'
import SettingsListItem from './list/SettingsListItem'
import {
  handleModeToggle, 
} from '../../redux/actions/compositionActions'
import settings_selector from '../../redux/selectors/settings_blueprint_selector'

const styles = StyleSheet.create({
    wrapper: {
      width: '100%'
    },
    wrapperActive: {
      border: '1px solid #666',
    },
    compsList: {
      width: '100%',
      flexGrow: 1,
      overflowY: 'auto',
      overflowX: 'hidden',
      padding: '0 0 0 10px',
    },
})

class SettingsExportModeBlueprint extends React.PureComponent {

  handleModeToggle = () => {
    this.props.handleModeToggle('blueprint');
  }

	render(){ 
		return (
      <div className={css(styles.wrapper, this.props._isActive && styles.wrapperActive)}>
        <ul>
          <SettingsListItem 
            title='蓝图导出'
            description='使用蓝图来验证动画导出'
            toggleItem={this.handleModeToggle}
            active={this.props._isActive} />
        </ul>
      </div>
    )
	}
}

function mapStateToProps(state) {
  return settings_selector(state)
}

const mapDispatchToProps = {
  handleModeToggle: handleModeToggle,
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsExportModeBlueprint) 