import React from 'react'
import {connect} from 'react-redux'
import SettingsListItem from './list/SettingsListItem'
import SettingsListDropdown from './list/SettingsListDropdown'
import SettingsCollapsableItem from './collapsable/SettingsCollapsableItem'
import selector from '../../redux/selectors/settings_template_view_selector'
import {
  toggleSettingsValue,
  updateSettingsValue, 
} from '../../redux/actions/compositionActions'

class SettingsTemplate extends React.PureComponent {

  namespace = 'template:'

  

  handleTemplateChange = (value) => {
    this.props.updateSettingsValue(`${this.namespace}id`, value)
  }

  render() {
    return (
    	<SettingsCollapsableItem 
        title={'蓝图（Blueprint）'}
        description={'使用蓝图附加到动画以验证导出（Use a blueprint to attach to the animation to validate export）'}
        >
        <SettingsListItem 
          title='激活蓝图验证（Activate blueprint validation）'
          description='如果激活，渲染后，结果将验证所选蓝图（if active, after render, the result will be validated against the selected blueprint）'
          toggleItem={() => this.props.toggle(`${this.namespace}active`)}
          active={this.props.data ? this.props.data.active : false}  />
        <SettingsListDropdown 
          title='选择蓝图（Select blueprint）'
          description='选择一个蓝图以用于验证（Select a blueprint to use for validation）'
          onChange={this.handleTemplateChange}
          current={this.props.data.id}
          options={this.props.templates}  
        />
      </SettingsCollapsableItem>
    	);
  }
}

function mapStateToProps(state) {
  return selector(state)
}

const mapDispatchToProps = {
  toggle: toggleSettingsValue,
  updateSettingsValue: updateSettingsValue,
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsTemplate)
