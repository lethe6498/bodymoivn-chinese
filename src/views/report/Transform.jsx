import React from 'react'
import {
  getTransformMessageCount,
} from '../../helpers/reports/counter'
import Property from './Property'
import PositionProperty from './components/PositionProperty'
import RotationProperty from './components/RotationProperty'
import RowContainer from './components/RowContainer'

class Transform extends React.Component {

  buildContent = shouldAutoExpand => {
    return ([
        <Property
          key={'anchorPoint'}
          name={'锚点（Anchor Point）'}
          messages={this.props.transform.anchorPoint}
          renderers={this.props.renderers}
          messageTypes={this.props.messageTypes}
          builders={this.props.builders}
          shouldAutoExpand={shouldAutoExpand}
        />,
        <PositionProperty
          key={'position'}
          property={this.props.transform.position}
          renderers={this.props.renderers}
          messageTypes={this.props.messageTypes}
          builders={this.props.builders}
          shouldAutoExpand={shouldAutoExpand}
        />,
        <Property
          key={'scale'}
          name={'缩放（Scale）'}
          messages={this.props.transform.scale}
          renderers={this.props.renderers}
          messageTypes={this.props.messageTypes}
          builders={this.props.builders}
          shouldAutoExpand={shouldAutoExpand}
        />,
        <RotationProperty
          key={'rotation'}
          property={this.props.transform.rotation}
          renderers={this.props.renderers}
          messageTypes={this.props.messageTypes}
          builders={this.props.builders}
          shouldAutoExpand={shouldAutoExpand}
        />,
        <Property
          key={'opacity'}
          name={'不透明度（Opacity）'}
          messages={this.props.transform.opacity}
          renderers={this.props.renderers}
          messageTypes={this.props.messageTypes}
          builders={this.props.builders}
          shouldAutoExpand={shouldAutoExpand}
        />,
        <Property
          key={'skew'}
          name={'倾斜（Skew）'}
          messages={this.props.transform.skew}
          renderers={this.props.renderers}
          messageTypes={this.props.messageTypes}
          builders={this.props.builders}
          shouldAutoExpand={shouldAutoExpand}
        />,
        <Property
          key={'skewAxis'}
          name={'倾斜轴（Skew Axis）'}
          messages={this.props.transform.skewAxis}
          renderers={this.props.renderers}
          messageTypes={this.props.messageTypes}
          builders={this.props.builders}
          shouldAutoExpand={shouldAutoExpand}
        />,
        <Property
          key={'startOpacity'}
          name={'起始不透明度（Start Opacity）'}
          messages={this.props.transform.startOpacity}
          renderers={this.props.renderers}
          messageTypes={this.props.messageTypes}
          builders={this.props.builders}
          shouldAutoExpand={shouldAutoExpand}
        />,
        <Property
          key={'endOpacity'}
          name={'结束不透明度（End Opacity）'}
          messages={this.props.transform.endOpacity}
          renderers={this.props.renderers}
          messageTypes={this.props.messageTypes}
          builders={this.props.builders}
          shouldAutoExpand={shouldAutoExpand}
        />
      ]
    )
  }

  render() {
    const messageCount = getTransformMessageCount(this.props.transform, this.props.renderers, this.props.messageTypes, this.props.builders)
    return (
      <RowContainer
        name={'变换（Transform）'}
        content={this.buildContent}
        messageCount={messageCount}
        shouldAutoExpand={this.props.shouldAutoExpand}
      />
    );
  }
}

export default Transform
