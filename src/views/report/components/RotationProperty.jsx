import React from 'react'
import {
  getPositionMessageCount
} from '../../../helpers/reports/counter'
import Property from '../Property'
import RowContainer from './RowContainer'

class Rotation extends React.Component {

  buildContent = shouldAutoExpand => {
    const property = this.props.property
    return [
      <Property
        name={'X 旋转（Rotation X）'}
        key={'X'}
        messages={property.rotationX}
        renderers={this.props.renderers}
        messageTypes={this.props.messageTypes}
        builders={this.props.builders}
        shouldAutoExpand={shouldAutoExpand}
      />,
      <Property
        name={'Y 旋转（Rotation Y）'}
        key={'Y'}
        messages={property.rotationY}
        renderers={this.props.renderers}
        messageTypes={this.props.messageTypes}
        builders={this.props.builders}
        shouldAutoExpand={shouldAutoExpand}
      />,
      <Property
        name={'Z 旋转（Rotation Z）'}
        key={'Z'}
        messages={property.rotationZ}
        renderers={this.props.renderers}
        messageTypes={this.props.messageTypes}
        builders={this.props.builders}
        shouldAutoExpand={shouldAutoExpand}
      />,
      <Property
        name={'方向（Orientation）'}
        key={'Orientation'}
        messages={property.orientation}
        renderers={this.props.renderers}
        messageTypes={this.props.messageTypes}
        builders={this.props.builders}
        shouldAutoExpand={shouldAutoExpand}
      />
    ]
  }

  render() {
    const property = this.props.property
    if (!property.isThreeD) {
      return (
        <Property
          name={'旋转（Rotation）'}
          messages={property.rotation}
          renderers={this.props.renderers}
          messageTypes={this.props.messageTypes}
          builders={this.props.builders}
          shouldAutoExpand={this.props.shouldAutoExpand}
        />
      )
    } else {
      const messageCount = getPositionMessageCount(this.props.property, this.props.renderers, this.props.messageTypes, this.props.builders)
      return (
        <RowContainer
          name={'旋转（Rotation）'}
          content={this.buildContent}
          messageCount={messageCount}
          shouldAutoExpand={this.props.shouldAutoExpand}
        />
      )
    }
  }
}

export default Rotation
