import React from 'react'
import {connect} from 'react-redux'
import { StyleSheet, css } from 'aphrodite'
import BaseButton from '../../components/buttons/Base_button'
import SettingsListItem from './list/SettingsListItem'
import SettingsListDropdown from './list/SettingsListDropdown'
import SettingsExportMode from './SettingsExportMode'
import SettingsCollapsableItem from './collapsable/SettingsCollapsableItem'
import SettingsAssets from './SettingsAssets'
import SettingsMetadata from './SettingsMetadata'
import {
  setCurrentCompId,
  cancelSettings,
  toggleSettingsValue,
  updateSettingsValue,
  toggleExtraComp,
  goToComps,
  rememberSettings,
  applySettings,
  addMetadataCustomProp,
  deleteMetadataCustomProp,
	metadataCustomPropTitleChange,
	metadataCustomPropValueChange,
} from '../../redux/actions/compositionActions'
import settings_view_selector from '../../redux/selectors/settings_view_selector'
import Variables from '../../helpers/styles/variables'
import audioBitOptions from '../../helpers/enums/audioBitOptions'
import SettingsTemplate from './SettingsTemplate'

const styles = StyleSheet.create({
    wrapper: {
      width: '100%',
      height: '100%',
      padding: '10px',
      backgroundColor: '#161616'
    },
    container: {
      width: '100%',
      height: '100%',
      fontSize: '12px',
      color: '#eee',
      marginBottom: '10px',
      display: 'flex',
      flexDirection: 'column'
    },
    header: {
      width: '100%',
      height: '60px',
      alignItems: 'center',
      display: 'flex',
      flexGrow: 0,
      padding: '10px 0',
      justifyContent: 'space-between'
    },
    headerTitle: {
      flexGrow: 0,
      fontSize: '18px',
    },
    headerButtons: {
      flexGrow: 0,
      display: 'inline-block',
      verticalAlign: 'top',
    },
    headerButtonsButton: {
      backgroundColor: 'transparent',
      borderRadius:'4px',
      color: Variables.colors.green,
      cursor: 'pointer',
      display: 'inline-block',
      marginLeft: '4px',
      padding: '4px 1px',
      textDecoration: 'underline',
      verticalAlign: 'top',
    },
    headerSpacer: {
      width: '100%',
      flexGrow: 0,
      fontSize: '18px',
      padding: '12px 4px'
    },
    compsList: {
      width: '100%',
      flexGrow: 1,
      overflowY: 'auto',
      overflowX: 'hidden'
    },
    bottomNavigation: {
      borderRadius:'4px',
      width: '100%',
      flexGrow: 0,
      height: '40px',
      marginBottom: '20px',
      marginTop: '20px',
      textAlign: 'center'
    },
    bottomNavigationSeparator: {
      width: '10px',
      display: 'inline-block'
    },
    extraCompsWrapper: {
      width: '100%',
      background: Variables.colors.gray_darkest
    },
    extraCompsContainer: {
      padding: '10px 10px 10px 60px',
      display: 'flex',
      flexWrap: 'wrap',
      height: '100%',
      width: '100%',
      background: Variables.gradients.blueGreen
    },
    extraCompsItem: {
      padding: '6px 4px',
      borderRadius: '4px',
      border: '1px solid white',
      color: '#fff',
      marginRight: '4px',
      marginBottom: '4px',
      cursor: 'pointer',
      textAlign: 'center',
      flexGrow: 1,
      textOverflow: 'ellipsis',
      overflow: 'hidden'

    },
    extraCompsItemSelected: {
      backgroundColor: '#fff',
      color: '#333'
    }
})

class Settings extends React.PureComponent {

  constructor() {
    /*demo: false
    extraComps: Object
    active: false
    list: Array
    glyphs: false
    guideds: falsehiddens: falsesegmentTime: 10segmented: falsestandalone: false*/
    super()
    this.storedSettings = null
    this.cancelSettings = this.cancelSettings.bind(this)
    this.toggleValue = this.toggleValue.bind(this)
    this.toggleGlyphs = this.toggleValue.bind(this,'字形（glyphs）')
    this.toggleExtraChars = this.toggleValue.bind(this,'includeExtraChars')
    this.toggleGuideds = this.toggleValue.bind(this,'guideds')
    this.toggleHiddens = this.toggleValue.bind(this,'hiddens')
    this.toggleOriginalNames = this.toggleValue.bind(this,'original_names')
    this.toggleOriginalAssets = this.toggleValue.bind(this,'original_assets')
    this.toggleCompressImages = this.toggleValue.bind(this,'should_compress')
    this.toggleEncodeImages = this.toggleValue.bind(this,'should_encode_images')
    this.toggleSkipImages = this.toggleValue.bind(this,'should_skip_images')
    this.toggleReuseImages = this.toggleValue.bind(this,'should_reuse_images')
    this.toggleIncludeVideo = this.toggleValue.bind(this,'should_include_av_assets')
    this.toggleExpressionProperties = this.toggleValue.bind(this,'ignore_expression_properties')
    this.toggleJsonFormat = this.toggleValue.bind(this,'export_old_format')
    this.toggleSourceNames = this.toggleValue.bind(this,'use_source_names')
    this.toggleTrimData = this.toggleValue.bind(this,'shouldTrimData')
    this.toggleSkipDefaultProperties = this.toggleValue.bind(this,'skip_default_properties')
    this.toggleNotSupportedProperties = this.toggleValue.bind(this,'not_supported_properties')
    this.togglePrettyPrint = this.toggleValue.bind(this,'pretty_print')
    this.toggleAudioLayers = this.toggleValue.bind(this,'audio:isEnabled')
    this.toggleRasterizeWaveform = this.toggleValue.bind(this,'audio:shouldRaterizeWaveform')
    this.toggleExtraComps = this.toggleValue.bind(this,'extraComps')
    this.qualityChange = this.qualityChange.bind(this)
    this.sampleSizeChange = this.sampleSizeChange.bind(this)
    this.toggleBakeExpressionProperties = this.toggleValue.bind(this,'expressions:shouldBake')
    this.toggleCacheExpressionProperties = this.toggleValue.bind(this,'expressions:shouldCacheExport')
    this.toggleExtendBakeBeyondWorkArea = this.toggleValue.bind(this,'expressions:shouldBakeBeyondWorkArea')
    this.toggleCompNamesAsIds = this.toggleValue.bind(this,'useCompNamesAsIds')
    this.toggleEssentialPropertiesActive = this.toggleValue.bind(this,'essentialProperties:active')
    this.toggleEssentialPropertiesAsSlots = this.toggleValue.bind(this,'essentialProperties:useSlots')
    this.toggleEssentialPropertiesCompSkip = this.toggleValue.bind(this,'essentialProperties:skipExternalComp')
    this.toggleBundleFonts = this.toggleValue.bind(this,'bundleFonts')
    this.toggleInlineFonts = this.toggleValue.bind(this,'inlineFonts')
  }

  componentDidMount() {
    if (this.props.settings) {
      this.storedSettings = this.props.settings
    } else {
      this.props.setCurrentCompId(this.props.params.id)
    }
	}

  componentWillReceiveProps(props) {
    if(!this.storedSettings && props.settings) {
      this.storedSettings = props.settings
    }
  }

  cancelSettings() {
    this.props.cancelSettings(this.storedSettings)
    //browserHistory.push('/')
  }

  saveSettings() {
    //browserHistory.push('/')
    this.props.goToComps()
  }

  toggleValue(name) {
    this.props.toggleSettingsValue(name)
  }

  qualityChange(ev) {
    let segments = parseInt(ev.target.value, 10)
    if(ev.target.value === '') {
      this.props.updateSettingsValue('compression_rate', 0)
    }
    if(isNaN(segments) || segments < 0) {
      return
    }
    this.props.updateSettingsValue('compression_rate', segments)
  }

  sampleSizeChange(ev) {
    let sampleSize = parseInt(ev.target.value, 10)
    if(ev.target.value === '') {
      this.props.updateSettingsValue('expressions:sampleSize', 1)
    }
    if(isNaN(sampleSize) || sampleSize < 0) {
      return
    }
    this.props.updateSettingsValue('expressions:sampleSize', sampleSize)
  }

  handleBitRateChange = value => {
    this.props.updateSettingsValue('audio:bitrate', value)
  }

  getExtraComps() {
    return this.props.extraCompsList.map(function(item){
      return (<div 
                key={item.id}
                className={css(styles.extraCompsItem, item.selected ? styles.extraCompsItemSelected : '')}
                onClick={()=>this.props.toggleExtraComp(item.id)}>
                {item.name}
              </div>)
    }.bind(this))
  }

  render() {

    return (
    	<div className={css(styles.wrapper)}>
        <div className={css(styles.container)}>
          <div className={css(styles.header)}>
            <div className={css(styles.headerTitle)}>设置（Settings）</div>
              <div className={css(styles.headerButtons)}>
                <button 
                  className={css(styles.headerButtonsButton)}
                  onClick={this.props.onRememberSettings}
                >
                  记住设置（Remember Settings）
                </button>
                <button 
                  className={css(styles.headerButtonsButton)}
                  onClick={this.props.onApplySettings}
                >
                  应用设置（Apply Settings）
                </button>
              </div>
          </div>
          <ul className={css(styles.compsList)}>
            <SettingsListItem 
              title='字形（Glyphs）'
              description='如果选中，将字体转换为形状（If selected it converts fonts to shapes）'
              toggleItem={this.toggleGlyphs}
              active={this.props.settings ? this.props.settings['字形（glyphs）'] : false} />
            <SettingsListItem 
              title='用合成替换字符（Replace Characters with Comps）'
              description='用文件夹中的自定义合成替换字符（Replaces characters with custom compositions from folder）'
              toggleItem={this.toggleExtraChars}
              active={this.props.settings ? this.props.settings.includeExtraChars : false} />
            {!this.props.settings['字形（glyphs）'] && 
              <SettingsListItem 
                title='打包字体（Bundle Fonts）'
                description='如果字体在文件系统中可访问，它们将与包一起导出（仅适用于 Skottie 播放器）（if fonts are reachable on the file system. They will get exported with the bundle. (Works with Skottie player only)）'
                toggleItem={this.toggleBundleFonts}
                active={this.props.settings ? this.props.settings.bundleFonts : false} 
              />
            }
            {this.props.settings.bundleFonts && 
              <SettingsListItem 
                title='内联字体（Inline Fonts）'
                description='在 json 文件中内联字体（Inline fonts on the json file）'
                toggleItem={this.toggleInlineFonts}
                active={this.props.settings ? this.props.settings.inlineFonts : false} 
              />
            }
            <SettingsListItem 
              title='隐藏（Hidden）'
              description='选择是否需要导出隐藏图层（Select if you need HIDDEN layers to be exported）'
              toggleItem={this.toggleHiddens}
              active={this.props.settings ? this.props.settings.hiddens : false}  />
            <SettingsListItem 
              title='参考线（Guides）'
              description='选择是否需要导出参考线图层（Select if you need GUIDED layers to be exported）'
              toggleItem={this.toggleGuideds}
              active={this.props.settings ? this.props.settings.guideds : false}  />
            <SettingsListItem 
              title='额外合成（Extra Comps）'
              description='检查表达式是否指向外部合成（Select if expressions are pointing to external comps）'
              toggleItem={this.toggleExtraComps}
              active={this.props.settings ? this.props.settings.extraComps.active : false}  />
              {this.props.settings && this.props.settings.extraComps.active && 
            <li className={css(styles.extraCompsWrapper)}>
              <div className={css(styles.extraCompsContainer)}>
                {this.getExtraComps()}
              </div>
            </li>}
            <SettingsAssets
              settings={this.props.settings}
              canCompressAssets={this.props.canCompressAssets}
              toggleOriginalNames={this.toggleOriginalNames}
              toggleSourceNames={this.toggleSourceNames}
              toggleOriginalAssets={this.toggleOriginalAssets}
              toggleCompressImages={this.toggleCompressImages}
              qualityChange={this.qualityChange}
              toggleEncodeImages={this.toggleEncodeImages}
              toggleSkipImages={this.toggleSkipImages}
              toggleReuseImages={this.toggleReuseImages}
              toggleIncludeVideo={this.toggleIncludeVideo}
            />
            
            <SettingsExportMode />
            <SettingsCollapsableItem 
              title='表达式选项（Expression options）'
              description='将表达式转换为关键帧。这可能是一个缓慢的过程。（Converts expressions to keyframes. This might be a slow process.）'
              >
              <SettingsListItem 
                title='将表达式转换为关键帧（Convert expressions to keyframes）'
                description='将表达式导出为关键帧（可能会显著增加文件大小）（Exports expressions as keyframes (can increase file size significantly)）'
                toggleItem={this.toggleBakeExpressionProperties}
                active={this.props.settings ? this.props.settings.expressions.shouldBake : false}
              />
              <SettingsListItem 
                title='扩展转换超出工作区（Extend conversion beyond work area）'
                description='当您需要在工作区之外转换关键帧时使用它。例如，当使用时间重映射时。（Use it when you need to convert keyframes beyond the workarea. For example when using time remapping.）'
                toggleItem={this.toggleExtendBakeBeyondWorkArea}
                active={this.props.settings ? this.props.settings.expressions.shouldBakeBeyondWorkArea : false}
              />
              <SettingsListItem 
                title='移除表达式属性（减小文件大小）（Remove expression properties (Reduces filesize)）'
                description='移除仅用于表达式的属性。如果您的动画不使用表达式或您的表达式不使用特殊属性，请选择此项。（Removes properties that are only used for expressions. Select if your animation is not using expressions or your expressions are not using special properties.）'
                toggleItem={this.toggleExpressionProperties}
                active={this.props.settings ? this.props.settings.ignore_expression_properties : false}  />
            </SettingsCollapsableItem>
            <SettingsCollapsableItem 
              title={'高级导出设置（Advanced export settings）'}
              description={'Advanced export features'}
              >
              <SettingsListItem 
                title='导出旧版 json 格式（用于向后兼容）（Export old json format (for backwards compatibility)）'
                description='导出旧版 json 格式，以防您使用较旧的播放器（Exports old json format in case you are using it with older players）'
                toggleItem={this.toggleJsonFormat}
                active={this.props.settings ? this.props.settings.export_old_format : false}  />
              <SettingsListItem 
                title='修剪未使用的关键帧和图层（Trim unused keyframes and layers）'
                description='移除工作区之外的图层和关键帧（Removes layers and keyframes beyond the workarea）'
                toggleItem={this.toggleTrimData}
                active={this.props.settings ? this.props.settings.shouldTrimData : false}  />
              <SettingsListItem 
                title='跳过默认属性（减小文件大小）（Skip default properties (Reduces filesize)）'
                description='跳过默认属性。如果您不使用最新的 iOS、Android 或 Web 播放器，请取消选中（Skips default properties. Uncheck if you are not using the latest Ios, Android or web players）'
                toggleItem={this.toggleSkipDefaultProperties}
                active={this.props.settings ? this.props.settings.skip_default_properties : false}  />
              <SettingsListItem 
                title='包含不支持的属性（Include non supported properties）'
                description='仅当您需要播放器以外的特定属性时才选中此项（Only check this if you need specific properties for uses other that the player）'
                toggleItem={this.toggleNotSupportedProperties}
                active={this.props.settings ? this.props.settings.not_supported_properties : false}  />
              <SettingsListItem 
                title='美化 JSON 输出（Pretty print JSON）'
                description='以更易读的格式导出。不要用于最终文件，因为文件大小会显著增加（Export in a more human readable format. Do not use for final file since filesize gets significantly larger）'
                toggleItem={this.togglePrettyPrint}
                active={this.props.settings ? this.props.settings.pretty_print : false}  />
              <SettingsListItem 
                title='使用合成名称作为ID'
                description='使用合成名称作为ID（Use composition names as ids）'
                toggleItem={this.toggleCompNamesAsIds}
                active={this.props.settings ? this.props.settings.useCompNamesAsIds : false}  />
            </SettingsCollapsableItem>
            <SettingsCollapsableItem 
              title={'必要属性（Essential properties）'}
              description={'必要属性（Essential properties）'}
              >
                
                <SettingsListItem
                  title='导出必要属性'
                  description='从根合成导出必要属性（Export essential properties from the root composition）'
                  toggleItem={this.toggleEssentialPropertiesActive}
                  active={this.props.settings ? this.props.settings.essentialProperties.active : false}
                />
                {this.props.settings.essentialProperties.active &&
                  <SettingsListItem
                    title='将必要属性导出为插槽'
                    description='将必要属性导出为插槽（Export essential properties as slots）'
                    toggleItem={this.toggleEssentialPropertiesAsSlots}
                    active={this.props.settings ? this.props.settings.essentialProperties.useSlots : false}
                  />
                }
                {this.props.settings.essentialProperties.active && this.props.settings.essentialProperties.useSlots &&
                  <SettingsListItem
                    title='Skip outermost external composition'
                    description='Usually essential comps are applied to the outermost composition. This will skip that composition, but still include the slots in the final JSON'
                    toggleItem={this.toggleEssentialPropertiesCompSkip}
                    active={this.props.settings ? this.props.settings.essentialProperties.skipExternalComp : false}
                  />
                }

              </SettingsCollapsableItem>
            <SettingsMetadata
              data={this.props.settings.metadata}
              toggle={this.toggleValue}
              onTitleChange={this.props.onMetadataTitleChange}
              onValueChange={this.props.onMetadataValueChange}
              onDeleteCustomProp={this.props.onMetadataDeleteCustomProp}
              addProp={this.props.addCustomProp}
            />
            <SettingsTemplate/>
            <SettingsCollapsableItem 
              title={'音频（Audio）'}
              description={'音频设置（Audio Settings）'}
              >
              <SettingsListItem 
                title='启用（Enabled）'
                description='导出音频图层（这将处理音频图层并将它们导出为 mp3 文件）（Export audio layers (this will process audio layers and export them as mp3 files)）'
                toggleItem={this.toggleAudioLayers}
                active={this.props.settings ? this.props.settings.audio.isEnabled : false}  />
              <SettingsListItem 
                title='栅格化波形（Rasterize Waveforms）'
                description='它栅格化波形而不是导出关键帧（未选中选项仅在 Skottie 中有效）（It rasterizes waveform instead of exporting keyframes (unchecked option only works in Skottie)）'
                toggleItem={this.toggleRasterizeWaveform}
                active={this.props.settings ? this.props.settings.audio.shouldRaterizeWaveform : false}  />
              <SettingsListDropdown 
                title='音频质量（Audio quality）'
                description='选择导出音频质量（Select audio quality for export）'
                onChange={this.handleBitRateChange}
                current={this.props.settings.audio.bitrate}
                options={audioBitOptions}  
              />
            </SettingsCollapsableItem>
          </ul>
          <div className={css(styles.bottomNavigation)}>
            <BaseButton text='取消（Cancel）' type='gray' onClick={this.cancelSettings}></BaseButton>
            <div className={css(styles.bottomNavigationSeparator)}></div>
            <BaseButton text='保存（Save）' type='green' onClick={this.props.goToComps}></BaseButton>
          </div>
        </div>
    	</div>
    	);
  }
}

function mapStateToProps(state) {
  return settings_view_selector(state)
}

const mapDispatchToProps = {
  setCurrentCompId: setCurrentCompId,
  onRememberSettings: rememberSettings,
  onApplySettings: applySettings,
  cancelSettings: cancelSettings,
  goToComps: goToComps,
  toggleSettingsValue: toggleSettingsValue,
  addCustomProp: addMetadataCustomProp,
  onMetadataDeleteCustomProp: deleteMetadataCustomProp,
  onMetadataTitleChange: metadataCustomPropTitleChange,
  onMetadataValueChange: metadataCustomPropValueChange,
  updateSettingsValue: updateSettingsValue,
  toggleExtraComp: toggleExtraComp,
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
