import React from 'react'
import { StyleSheet, css } from 'aphrodite'
import Variables from '../../../helpers/styles/variables'
import errorIcon from '../../../assets/svg/error.svg'
import warningIcon from '../../../assets/svg/warning.svg'
import {
  countMessageByTypeAndRenderer,
} from '../../../helpers/reports/counter'
import {openInBrowser} from '../../../helpers/CompositionsProvider'

const styles = StyleSheet.create({
    wrapper: {
      width: '100%',
      backgroundColor: Variables.colors.gray_lightest,
      color: Variables.colors.gray_more_darkest,
      fontSize: '14px',
      marginTop: '10px',
      overflow: 'hidden',
      padding: '6px',
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      borderBottom: `1px solid ${Variables.colors.gray_more_darkest}`,
      paddingBottom: '4px',
    },
    icon: {
      width: '12px',
      height: '12px',
      marginRight: '4px',
    },
    renderers: {
      display: 'flex',
    },
    renderers_title: {
      flex: '0 0 auto',
      color: Variables.colors.gray_darkest,
      whiteSpace: 'pre',
    },
    renderer: {
      paddingRight: '4px',
      color: Variables.colors.blue,
    },
    renderer_separator: {
      color: Variables.colors.gray_darkest,
    },
    content: {
      paddingTop: '10px',
    },
    missing_error: {
      color: Variables.colors.red,
    }
})

class Message extends React.Component {

  icons = {
    error: errorIcon,
    warning: warningIcon,
  }
  labels = {
    error: '错误（Error）',
    warning: '警告（Warning）',
  }
  renderers = {
    android: '安卓（Android）',
    ios: 'iOS',
    browser: '浏览器（Browser）',
    skottie: 'Skottie',
  }

  buildIcon = type => (
    <img
      className={css(styles.icon)}
      src={this.icons[type]}
      alt={this.labels[type]}
    />
  )

  buildRenderers = renderers => (
    <div className={css(styles.renderers)}>
      <span className={css(styles.renderers_title)}>渲染器（Renderers）: </span>
      {renderers.map((renderer, index) => 
        (<div key={renderer} className={css(styles.renderer)}>
          {index > 0 && <span className={css(styles.renderer_separator)}> | </span>}
          {this.renderers[renderer]}
        </div>)
      )}
    </div>
  )

  buildHeader = () => (
    <div className={css(styles.header)}>
      {this.buildIcon(this.props.message.type)}
      {this.buildRenderers(this.props.message.renderers)}
    </div>
  )

  buildExpressionMessage = () => (
    <div>表达式不受支持（Expressions are not supported）</div>
  )

  buildWiggleMessage = () => (
    <div>wiggle 表达式不受支持（wiggle expressions is not supported）</div>
  )

  buildSepareteDimensionsMessage = () => (
    <div>分离尺寸不受支持（Separate dimensions are not supported）</div>
  )

  buildOrientAlongPathMessage = () => (
    <div>沿路径定向不受支持（Orient along path is not supported）</div>
  )

  buildUnhandleLayer = () => (
    <div>此图层尚未有报告（This layer doesn't have reports yet）</div>
  )

  buildThreeDLayer = () => (
    <div>3D 图层部分支持或不支持（3D layers have partial or no support）</div>
  )

  buildMotionBlur = () => (
    <div>运动模糊不受支持（Motion blur is not supported）</div>
  )

  buildDisabledLayer = () => (
    <div>隐藏和引导图层不受这些渲染器支持（Hidden and Guided layers are not supported by these renderers）</div>
  )

  buildUnhandledShape = () => (
    <div>此形状属性不受支持（This shape property is not supported）</div>
  )

  buildUnhandledShape = () => (
    <div>此形状属性不受支持（This shape property is not supported）</div>
  )

  buildPuckerAndBloatProperties = () => (
    <div>这些渲染器不支持收缩和膨胀（Pucker and bloat is not supported by these renderers）</div>
  )

  buildEffects = (payload) => {
    const effects = payload.effects;
    return (
      <div>这些效果不受支持（These effects are not supported）:
        <div>
          {effects.map((effect, index) => (
            <div key={index}>{effect}</div>
          ))}
        </div>
      </div>
    )
  }

  buildAnimatorProperties = (payload) => {
    const properties = payload.properties;
    return (
      <div>这些文本动画器属性不受支持（These text animator properties are not supported）:
        <div>
          {properties.map(animator => (
            <div key={animator}>{animator}</div>
          ))}
        </div>
      </div>
    )
  }

  buildTextSelectorProperties = (payload) => {
    const properties = payload.properties;
    return (
      <div>这些文本动画器选择器属性不受支持（These text animator selector properties are not supported）:
        <div>
          {properties.map(animator => (
            <div key={animator}>{animator}</div>
          ))}
        </div>
      </div>
    )
  }

  buildMergePaths = () => (
    <div>合并路径不受支持（Merge paths are not supported）</div>
  )

  buildTextAnimators = () => (
    <div>文本动画器不受支持（Text animators are not supported）</div>
  )

  buildLargeImage = () => (
    <div>此图层源尺寸较大，可能影响性能。建议使用较小的图像（This layer source size is large and can affect performance. Consider using smaller images）</div>
  )

  buildIllustratorAsset = () => (
    <div>看起来您正在使用来自 Illustrator 的资源。建议将其转换为形状，以便作为矢量而不是光栅图像导出（It seems you are using an asset coming from illustrator. Consider converting it to shapes so it gets exported as vectors instead of a raster image）</div>
  )

  buildCameraLayer = () => (
    <div>相机类型的图层不受支持（Layers of type camera are not supported）</div>
  )

  buildNotSupportedLayer = () => (
    <div>此类型的图层不受支持（This type of layer is not supported）</div>
  )

  buildAdjustmentLayer = () => (
    <div>调整图层将作为空图层导出（Adjustment layers get exported as null layers）</div>
  )

  buildFailedLayer = () => (
    <div>创建报告时此图层失败（this layer failed while creating the report）</div>
  )

  buildUnsupportedStyle = () => (
    <div>此图层样式不受支持（this layer style is not supported）</div>
  )

  buildLargeMask = () => (
    <div>大型蒙版可能会影响性能（Large masks can have an impact on performance）</div>
  )

  buildLargeEffect = () => (
    <div>带有效果的大型图层可能会影响性能（Large layers with effects can have an impact on performance）</div>
  )

  buildUnsupportedProperty = () => (
    <div>此属性不受支持（This property is not supported）</div>
  )

  buildUnsupportedMaskMode = () => (
    <div>此蒙版模式不受支持（This mask mode is not supported）</div>
  )

  buildFilterSize = () => (
    <div>您可能需要设置 rendererSettings 的 filterSize 属性
      <div>查看
        <span> </span>
        <a
          onClick={() => openInBrowser('https://github.com/airbnb/lottie-web/wiki/Renderer-Settings#filtersize-svg-renderer')}
          href='#'>
          这里
        </a>
        <span> </span>
        获取更多信息
      </div>
    </div>
  )

  buildUnhandledMessageType = type => (
    <div>此错误类型：
      <span className={css(styles.missing_error)}> {type}</span> 不受读取器支持。
    </div>
  )

  builders = {
    expressions: this.buildExpressionMessage,
    wiggle: this.buildWiggleMessage,
    separateDimensions: this.buildSepareteDimensionsMessage,
    orientAlongPath: this.buildOrientAlongPathMessage,
    'unhandled layer': this.buildUnhandleLayer,
    'three d layer': this.buildThreeDLayer,
    'motion blur': this.buildMotionBlur,
    'disabled layer': this.buildDisabledLayer,
    'effects': this.buildEffects,
    'unhandled shape': this.buildUnhandledShape,
    'merge paths': this.buildMergePaths,
    'text animators': this.buildTextAnimators,
    'animator properties': this.buildAnimatorProperties,
    'large image': this.buildLargeImage,
    'illustrator asset': this.buildIllustratorAsset,
    'camera layer': this.buildCameraLayer,
    'audio layer': this.buildNotSupportedLayer,
    'light layer': this.buildNotSupportedLayer,
    'adjustment layer': this.buildAdjustmentLayer,
    'failed layer': this.buildFailedLayer,
    'unsupported style': this.buildUnsupportedStyle,
    'large mask': this.buildLargeMask,
    'filter size': this.buildFilterSize,
    'unsupported property': this.buildUnsupportedProperty,
    'unsupported mask mode': this.buildUnsupportedMaskMode,
    'large effects': this.buildLargeEffect,
    'text selector properties': this.buildTextSelectorProperties,
    'pucker and bloat': this.buildPuckerAndBloatProperties,
  }

  buildMessage = (builder, payload) => {
    if (this.builders[builder]) {
      return this.builders[builder](payload)
    } else {
      return this.buildUnhandledMessageType(builder)
    }
  }

  buildContent = () => (
    <div className={css(styles.content)}>
      {this.buildMessage(this.props.message.builder, this.props.message.payload)}
    </div>
  )

  render() {
    const messageCount = countMessageByTypeAndRenderer(this.props.message, this.props.renderers, this.props.messageTypes, this.props.builders)
    if (messageCount === 0) {
      return null
    } else {
      return (
        <div className={css(styles.wrapper)}>
          {this.buildHeader()}
          {this.buildContent()}
        </div>
      );
    }
  }
}

export default Message
