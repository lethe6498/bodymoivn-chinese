import React from 'react'
import {
  getDropShadowStyleMessageCount,
} from '../../../helpers/reports/counter'
import RowContainer from '../components/RowContainer'
import Property from '../Property'

class StrokeStyle extends React.Component {

  styleProperties = [
    {
      key: 'color',
      name: '颜色（Color）',
    },
    {
      key: 'opacity',
      name: '不透明度（Opacity）',
    },
    {
      key: 'size',
      name: '大小（Size）',
    },
    {
      key: 'blendMode',
      name: '混合模式（Blend Mode）',
    },
    {
      key: 'position',
      name: '位置（Position）',
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

export default StrokeStyle
