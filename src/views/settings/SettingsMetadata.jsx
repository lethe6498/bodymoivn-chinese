import React from 'react'
import { StyleSheet, css } from 'aphrodite'
import SettingsListItem from './list/SettingsListItem'
import SettingsListCustomProp from './list/SettingsListCustomProp'
import SettingsCollapsableItem from './collapsable/SettingsCollapsableItem'
import BaseButton from '../../components/buttons/Base_button'

const styles = StyleSheet.create({
  customProps: {
    padding: '10px 0 10px 24px',
  },
  customPropsTitle: {
    fontSize: '14px',
    padding: '4px 0',
  },
  customPropsButton: {
    padding: '4px 0',
  }
})

class SettingsMetadata extends React.PureComponent {

  namespace = 'metadata:'

  renderCustomProps(propsList) {
    return propsList.map((item) =>
    <SettingsListCustomProp
      key={item.id}
      title={item.name}
      description=''
      toggleItem={() => this.props.toggle(`${this.namespace}[CUSTOM_PROP]:${item.id}`)}
      titleValueChange={(value) => this.props.onTitleChange(value, item.id)}
      inputValueChange={(value) => this.props.onValueChange(value, item.id)}
      onDelete={() => this.props.onDeleteCustomProp(item.id)}
      active={item.active}
      needsInput={true}
      inputValue={item.value}
    />)
  }

  render() {
    return (
    	<SettingsCollapsableItem 
        title={'元数据（Metadata）'}
        description={'导出元数据（Export metadata data）'}
        >
        <SettingsListItem 
          title='包含项目文件名（Include project filename）'
          description='将 .aep 文件名添加到导出的 json 文件中（adds the .aep file name to the exported json file）'
          toggleItem={() => this.props.toggle(`${this.namespace}includeFileName`)}
          active={this.props.data ? this.props.data.includeFileName : false}  />
        <div className={css(styles.customProps)}>
          <div className={css(styles.customPropsTitle)}>自定义属性（Custom Properties）</div>
          {this.renderCustomProps(this.props.data.customProps)}
          <div className={css(styles.customPropsButton)}>
            <BaseButton text='添加自定义属性（Add Custom Prop）' type='green' onClick={this.props.addProp}></BaseButton>
          </div>
        </div>
        
      </SettingsCollapsableItem>
    	);
  }
}

export default SettingsMetadata
