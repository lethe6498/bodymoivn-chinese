import React from 'react'
import {connect} from 'react-redux'
import { StyleSheet, css } from 'aphrodite'
import BaseButton from '../../../components/buttons/Base_button'
import SettingsListItem from '../../settings/list/SettingsListItem'
import SettingsListFile from '../../settings/list/SettingsListFile'
import global_settings_selector from '../../../redux/selectors/global_settings_selector'
import {
	toggleCompNameAsDefault,
	toggleCompNameAsFolder,
	toggleAEAsPath,
	toggleSaveInProjectFile,
	toggleDefaultPathAsFolder,
	defaultFolderFileChange,
	toggleCopySettings,
	settingsCopyPathChange,
	loadSettings,
	toggleSkipDoneView,
	toggleReuseFontData,
} from '../../../redux/actions/compositionActions'
import GlobalTemplateSettings from './GlobalTemplateSettings'

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: '100%',
    padding: '10px',
  },
  background: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#161616',
  },
  modal: {
    width: '80%',
    height: '80%',
    padding: '2px',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },
  content: {
    width: '100%',
    flex: '1 1 auto',
    padding: '10px 0',
    'overflow-y': 'auto',
  },
  settingsList: {
    background: 'green',
  },
})

class GlobalSettings extends React.Component {
  
  render() {
    return (
      <div className={css(styles.wrapper)}>
        <div className={css(styles.background)} />
        <div className={css(styles.modal)}>
          <div className={css(styles.header)}>
            <BaseButton
                text='加载设置（Load Settings）'
                type='gray'
                classes={styles.button}
                onClick={this.props.onSettingsLoad}
            />
            <BaseButton
                text='关闭（Close）'
                type='gray'
                classes={styles.button}
                onClick={this.props.onClose}
            />
          </div>
          <div className={css(styles.content)}>
            <ul className={css(styles.settingsList)}>
              <SettingsListItem 
                title='使用合成名称（Use comp name）'
                description='默认使用合成名称作为文件导出名称（Default to composition name for file export）'
                toggleItem={this.props.onCompNameAsDefaultToggle}
                active={this.props.shouldUseCompNameAsDefault}
              />
              {<SettingsListItem 
                title='将合成名称作为文件夹（include comp name as folder）'
                description='在保存路径中包含合成名称（includes composition name in the saving path）'
                toggleItem={this.props.onIncludeCompNameAsFolderToggle}
                active={this.props.shouldIncludeCompNameAsFolder}
              />}
              <SettingsListItem 
                title='使用 AE 位置（Use AE location）'
                description='默认使用 AE 位置作为目标文件夹（defaults to AE location as destination folder）'
                toggleItem={this.props.onAEAsPathToggle}
                active={this.props.shouldUseAEPathAsDestinationFolder}
              />
              {!this.props.shouldUseAEPathAsDestinationFolder && <SettingsListItem 
                  title='使用自定义保存位置（Use custom saving location）'
                  description='默认保存到选定位置（defaults saving folder to selected location）'
                  toggleItem={this.props.onDefaultPathAsFolder}
                  active={this.props.shouldUsePathAsDefaultFolder}
                />
              }
              {!this.props.shouldUseAEPathAsDestinationFolder &&
                this.props.shouldUsePathAsDefaultFolder &&
                <SettingsListFile
                  title='设置默认文件夹位置（Set Location of default folder）'
                  description='设置文件夹路径（Set the folder path）'
                  value={this.props.defaultFolderPath}
                  onChange={this.props.onDefaultPathChange}
                />
              }
              <SettingsListItem 
                title='保持设置的实时副本（Keep live copy of settings）'
                description='以防 AE 更新导致设置丢失（In case AE updates and settings are lost）'
                toggleItem={this.props.onCopySettingsToggle}
                active={this.props.shouldKeepCopyOfSettings}
              />
              {this.props.shouldKeepCopyOfSettings &&
                <SettingsListFile
                  title='设置实时设置的位置（Set Location of live settings）'
                  description='设置文件夹路径（Set the folder path）'
                  value={this.props.settingsDestinationCopy}
                  onChange={this.props.onSettingsCopyChange}
                />
              }
              <SettingsListItem 
                title='在 AE 文件中保存设置（Save settings in AE file）'
                description='在 aep 项目文件中保存设置。这允许在多个设备和 AE 版本中使用相同的项目（Saves settings within the aep project file. This allows to use the same project in multiple devices and versions of AE）'
                toggleItem={this.props.onSaveInProjectFile}
                active={this.props.shouldSaveInProjectFile}
              />
              <SettingsListItem 
                title='跳过完成视图（Skip Done view）'
                description='渲染完成后返回合成列表（Go back to composition list when render is done）'
                toggleItem={this.props.onSkipDoneViewToggle}
                active={this.props.shouldSkipDoneView}
              />
              <SettingsListItem 
                title='重用字体数据（Reuse font data）'
                description='如果可用，重用字体数据（If available, reuse font data）'
                toggleItem={this.props.onReuseFontDataToggle}
                active={this.props.shouldReuseFontData}
              />
            </ul>
            <GlobalTemplateSettings />
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = {
	onCompNameAsDefaultToggle: toggleCompNameAsDefault,
	onIncludeCompNameAsFolderToggle: toggleCompNameAsFolder,
	onAEAsPathToggle: toggleAEAsPath,
	onDefaultPathAsFolder: toggleDefaultPathAsFolder,
	onDefaultPathChange: defaultFolderFileChange,
	onCopySettingsToggle: toggleCopySettings,
	onSettingsCopyChange: settingsCopyPathChange,
	onSettingsLoad: loadSettings,
	onSaveInProjectFile: toggleSaveInProjectFile,
	onSkipDoneViewToggle: toggleSkipDoneView,
	onReuseFontDataToggle: toggleReuseFontData,
}

export default connect(global_settings_selector, mapDispatchToProps)(GlobalSettings)
