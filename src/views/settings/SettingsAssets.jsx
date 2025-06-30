import React from 'react'
import SettingsListItem from './list/SettingsListItem'
import SettingsCollapsableItem from './collapsable/SettingsCollapsableItem'

class SettingsAssets extends React.PureComponent {


  render() {

    const isUsingOriginalAssets = this.props.settings.original_assets

    return (
    	<SettingsCollapsableItem 
        title={'资源（Assets）'}
        description={'栅格化资源设置（jpg, png）（Rasterized assets settings (jpg, png)）'}
        >
        <SettingsListItem 
          title='原始资源名称（Original Asset Names）'
          description='使用原始项目名称导出资源（Export assets with their original project names）'
          toggleItem={this.props.toggleOriginalNames}
          active={this.props.settings ? this.props.settings.original_names : false}  />
        <SettingsListItem 
          title='使用源名称作为资源 ID（Use Source names as asset ids）'
          description='使用项目源名称作为资源 ID（uses project source names as asset ids）'
          toggleItem={this.props.toggleSourceNames}
          active={this.props.settings ? this.props.settings.use_source_names : false}  />
        <SettingsListItem 
          title='复制原始资源（Copy Original Assets）'
          description='使用实际项目源文件（不适用于 AI 图层）（Uses actual project source files (does not work with AI layers)）'
          toggleItem={this.props.toggleOriginalAssets}
          active={this.props.settings ? this.props.settings.original_assets : false}  />
        {this.props.canCompressAssets &&
        !isUsingOriginalAssets &&  
        <SettingsListItem 
          title='启用压缩（Enable compression）'
          description='使用Tinify.cn智能压缩图像，无损压缩质量更高（Use Tinify.cn smart compression for better quality）'
          toggleItem={this.props.toggleCompressImages}
          needsInput={true} 
          inputValue={this.props.settings ? this.props.settings.compression_rate : 0} 
          inputValueChange={this.props.qualityChange}
          active={this.props.settings ? this.props.settings.should_compress : false}  />
        }
        <SettingsListItem 
          title='包含在 json 中（Include in json）'
          description='在 json 中包含编码的栅格化图像（Include rasterized images encoded in the json）'
          toggleItem={this.props.toggleEncodeImages}
          active={this.props.settings ? this.props.settings.should_encode_images : false}  />
        <SettingsListItem 
          title='跳过图像导出（Skip images export）'
          description='将完全忽略任何类型的资源先前资源数据（这将在未来版本中弃用，因为它没有太多价值）（it will fully ignore any type of asset previous assets data (this will be deprecated in a future release since there is not much value to it)）'
          toggleItem={this.props.toggleSkipImages}
          active={this.props.settings ? this.props.settings.should_skip_images : false}  />
        <SettingsListItem 
          title='使用先前导出的图像数据（Use image data from previous export）'
          description='使用先前数据以加速导出并防止替换资源（To accelerate export and prevent replacing assets, use previous data）'
          toggleItem={this.props.toggleReuseImages}
          active={this.props.settings ? this.props.settings.should_reuse_images : false}  />
        <SettingsListItem 
          title='包含视频和音频资源（Include video and audio assets）'
          description='播放器尚未支持此功能。仅用于实验目的（This is not yet supported by players. Only available for experimantal purposes）'
          toggleItem={this.props.toggleIncludeVideo}
          active={this.props.settings ? this.props.settings.should_include_av_assets : false}  />
      </SettingsCollapsableItem>
    	);
  }
}

export default SettingsAssets
