import React from 'react'
import {
  getPositionMessageCount
} from '../../../helpers/reports/counter'
import RowContainer from './RowContainer'
import Property from '../Property'

class Position extends React.Component {

  buildContent = shouldAutoExpand => {
    const property = this.props.property
    return [
      <Property
        name={'X 位置（Position X）'}
        key={'X'}
        messages={property.positionX}
        renderers={this.props.renderers}
        messageTypes={this.props.messageTypes}
        builders={this.props.builders}
        shouldAutoExpand={shouldAutoExpand}
      />,
      <Property
        name={'Y 位置（Position Y）'}
        key={'Y'}
        messages={property.positionY}
        renderers={this.props.renderers}
        messageTypes={this.props.messageTypes}
        builders={this.props.builders}
        shouldAutoExpand={shouldAutoExpand}
      />,
      property.positionZ && 
        <Property
          name={'Z 位置（Position Z）'}
          key={'Z'}
          messages={property.positionZ}
          renderers={this.props.renderers}
          messageTypes={this.props.messageTypes}
          builders={this.props.builders}
          shouldAutoExpand={shouldAutoExpand}
        />
    ]    
  }

  render() {
    const property = this.props.property
    if (!property.dimensionsSeparated) {
      return (
        <Property
          name={'位置（Position）'}
          messages={property.position}
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
          name={'位置（Position）'}
          content={this.buildContent}
          messageCount={messageCount}
          shouldAutoExpand={this.props.shouldAutoExpand}
        />
      );
    }
  }
}

export default Position
