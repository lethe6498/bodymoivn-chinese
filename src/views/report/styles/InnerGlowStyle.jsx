import React from 'react'
import {
  getDropShadowStyleMessageCount,
} from '../../../helpers/reports/counter'
import RowContainer from '../components/RowContainer'
import Property from '../Property'

class InnerGlowStyle extends React.Component {

  styleProperties = [
    {
      key: 'blendMode',
      name: '混合模式（Blend Mode）',
    },
    {
      key: 'opacity',
      name: '不透明度（Opacity）',
    },
    {
      key: 'noise',
      name: '噪点（Noise）',
    },
    {
      key: 'colorChoice',
      name: '颜色类型（Color Type）',
    },
    {
      key: 'color',
      name: '颜色（Color）',
    },
    {
      key: 'gradient',
      name: '颜色（Colors）',
    },
    {
      key: 'gradientSmoothness',
      name: '渐变平滑度（Gradient Smoothness）',
    },
    {
      key: 'glowTechnique',
      name: '技术（Technique）',
    },
    {
      key: 'source',
      name: '源（Source）',
    },
    {
      key: 'chokeMatte',
      name: '扩散（Spread）',
    },
    {
      key: 'blur',
      name: '大小（Size）',
    },
    {
      key: 'inputRange',
      name: '范围（Range）',
    },
    {
      key: 'shadingNoise',
      name: '抖动（Jitter）',
    },
  ]

  buildProperties = shouldAutoExpand => (
    this.styleProperties.map(propertyData => (
      <Property
        key={propertyData.key}
        name={propertyData.name}
        messages={this.props.style[propertyData.key]}
        renderers={this.props.renderers}
        messageTypes={this.props.messageTypes}
        builders={this.props.builders}
        shouldAutoExpand={shouldAutoExpand}
      />
    ))
  )

  buildMessages = shouldAutoExpand => (
    <Property
      name={'样式消息（Style Messages）'}
      key={'styles'}
      messages={this.props.style.messages}
      renderers={this.props.renderers}
      messageTypes={this.props.messageTypes}
      builders={this.props.builders}
      shouldAutoExpand={shouldAutoExpand}
    />
  )

  buildContent = shouldAutoExpand => {
    return (
      [
        this.buildMessages(shouldAutoExpand),
        this.buildProperties(shouldAutoExpand),
      ]
    )
  }

  render() {
    const messageCount = getDropShadowStyleMessageCount(
      this.props.style,
      this.props.renderers,
      this.props.messageTypes,
      this.props.builders,
    )
    return (
      <RowContainer
        name={this.props.style.name}
        content={this.buildContent}
        messageCount={messageCount}
        shouldAutoExpand={this.props.shouldAutoExpand}
      />
    );
  }
}

export default InnerGlowStyle
