import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, css } from 'aphrodite'
import Range from '../../../components/range/Range'
import BaseButton from '../../../components/buttons/Base_button'
import Variables from '../../../helpers/styles/variables'
import snapshot from '../../../assets/animations/snapshot.json'
import BodymovinCheckbox from '../../../components/bodymovin/bodymovin_checkbox'
import checkbox from '../../../assets/animations/checkbox.json'

const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: '100px'
    },
    navContainer: {
      width: '100%',
      height: '36px',
      display: 'flex',
      alignItems: 'center',
    },
    playButton: {
      width: '40px',
      height: '36px',
      lineHeight: '36px',
      color: Variables.colors.blue,
      flexGrow: 0,
      cursor: 'pointer'
    },
    playPauseButton: {
      width: '100%',
      height: '100%',
    },
    progressNumberContainer: {
      fontSize: '20px',
      lineHeight: '28px',
      color: Variables.colors.blue,
      flexGrow: 0,
      cursor: 'pointer'
    },
    progressNumber: {
      fontSize: '20px',
      lineHeight: '28px',
      color: Variables.colors.blue,
      display: 'inline-block'
    },
    inputNumber: {
      backgroundColor: Variables.colors.gray,
      border: '2px solid ' + Variables.colors.gray2,
      width: 'auto',
      ':focus' :{
        outline: 'none'
      }
    },
    emptySpace: {
      flexGrow: 1,
      backgroundColor: 'transparent'
    },
    button: {
      flexGrow: 0
    },
    previewOption: {
        fontSize: '14px',
        marginLeft: '10px',
        cursor: 'pointer',
        color: Variables.colors.white,
    },
    'previewOption-checkbox': {
        width: '20px',
        display: 'inline-block',
        verticalAlign: 'middle',
        marginRight: '4px',
    },
})

class PreviewScrubber extends React.Component {

  constructor() {
    super()
    this.state = {
      numberFocused: false,
      inputValue:0,
      isPlaying: false,
      initialValue:0,
      initialTime: 0,
    }
    this.focusNumber = this.focusNumber.bind(this)
    this.updateValue = this.updateValue.bind(this)
    this.setInitialValue = this.setInitialValue.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.handleKey = this.handleKey.bind(this)
    this._isMounted = true
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.isPlaying === false
      && this.state.isPlaying === true) {
      this.play()
    }
  }

  togglePlay = () => {
    if (this.props.progress === 1 && !this.state.isPlaying) {
      this.props.updateProgress(0)
      this.setState({
        isPlaying: !this.state.isPlaying,
        initialValue: 0,
        initialTime: Date.now(),
      })
    } else {
      this.setState({
        isPlaying: !this.state.isPlaying,
        initialValue: this.props.totalFrames * this.props.progress,
        initialTime: Date.now(),
      })
    }
  }

  play() {
    requestAnimationFrame(this.tick)
  }

  tick = () => {
    if (!this.state.isPlaying || !this._isMounted) {
      return;
    }
    const currentTime = Date.now()
    const currentFrame = Math.min(this.props.totalFrames , this.state.initialValue + (currentTime - this.state.initialTime) * 0.001 * this.props.frameRate)

    this.props.updateProgress(currentFrame / this.props.totalFrames)
    if (currentFrame < this.props.totalFrames) {
      requestAnimationFrame(this.tick)
      this.setState({
        inputValue: currentFrame
      })
    } else if(this.props.shouldLoop) {
      requestAnimationFrame(this.tick)
      this.setState({
        initialValue: currentFrame - this.props.totalFrames,
        initialTime: Date.now() + currentFrame - this.props.totalFrames,
        inputValue: 0,
      })
    } else {
      this.togglePlay()
    }
  }

  focusNumber(){
    if(this.props.totalFrames === 0){
      //return
    }
    this.setState({
      numberFocused: true,
      isPlaying: false,
    })
  }

  updateValue(ev) {
    if(ev.target.value === ''){
      this.setState({
        inputValue: ''
      })
      return
    }
    let newValue = parseInt(ev.target.value, 10)
    if(isNaN(newValue) || newValue < 0 || newValue > this.props.totalFrames){
      return
    }
    this.setState({
      inputValue: newValue
    })
    this.props.updateProgress(newValue/this.props.totalFrames)
  }

  setInitialValue() {
    this.setState({
      inputValue: Math.round(this.props.totalFrames * this.props.progress)
    })
  }

  handleBlur() {
    this.setState({
      numberFocused: false
    })
  }

  handleKey(ev){
    if(ev.keyCode === 40 && this.state.inputValue > 0){
      let newValue = this.state.inputValue - 1
      this.setState({
        inputValue: newValue
      })
      this.props.updateProgress(newValue/this.props.totalFrames)
      ev.preventDefault()
    }else if(ev.keyCode === 38 && this.state.inputValue < this.props.totalFrames){
      let newValue = this.state.inputValue + 1
      this.setState({
        inputValue: newValue
      })
      this.props.updateProgress(newValue/this.props.totalFrames)
      ev.preventDefault()
    }
  }

  renderPlayButton() {
    return (
        <svg
          className={css(styles.playPauseButton)}
          width="36"
          height="36"
          viewBox="0 0 36 36"
        >
          <path d="M10,10 L26,18 L10,26z" fill={Variables.colors.blue}/>
        </svg>
      )
  }

  renderPauseButton() {
    return (
        <svg
          className={css(styles.playPauseButton)}
          width="36"
          height="36"
          viewBox="0 0 36 36"
        >
          <path d="M10,10 H16, V26, H10z M20,10 H26, V26, H20z" fill={Variables.colors.blue}/>
        </svg>
      )
  }

  renderPlayPauseButton() {
    return this.state.isPlaying 
      ? this.renderPauseButton()
      : this.renderPlayButton()
  }

  onRangeUpdate = (value) => {
    if (this.state.isPlaying) {
      this.togglePlay()
    }
    this.props.updateProgress(value)
  }

  render() {

    let inputLength = this.props.totalFrames.toString().length

    return (
      <div className={css(styles.container)}>
        <Range updateProgress={this.onRangeUpdate} canScrub={this.props.totalFrames !== 0} progress={this.props.progress}/>
        <div className={css(styles.navContainer)}>
          <div className={css(styles.playButton)} onClick={this.togglePlay}>
            {this.renderPlayPauseButton()}
          </div>
          <div className={css(styles.progressNumberContainer)} onClick={this.focusNumber}>
            {this.state.numberFocused ? 
              <input 
                className={css(styles.inputNumber)} 
                    type="text" 
                    value={this.state.inputValue}
                onChange={this.updateValue} 
                    onBlur={this.handleBlur} 
                    onKeyDown={this.handleKey} 
                onFocus={this.setInitialValue}
                style={{width: inputLength * 10 + 'px'}}
              /> : 
              <span className={css(styles.progressNumber)}>{Math.round(this.props.totalFrames * this.props.progress)}</span>
            }
          </div>
          <div className={css(styles.emptySpace)}></div>
          <div className={css(styles.previewOption)}>
            <BodymovinCheckbox
              animationData={checkbox}
              animate={this.props.shouldLockTimelineToComposition}
              onClick={this.props.toggleLockTimeline}
          >
              <div className={css(styles['previewOption-checkbox'])} />
              </BodymovinCheckbox>
            <span>锁定时间轴（Lock Timeline）</span>
          </div>
          <div className={css(styles.previewOption)}>
              <BodymovinCheckbox
                  animationData={checkbox}
                  animate={this.props.shouldLoop}
              onClick={this.props.toggleLoop}
              >
              <div className={css(styles['previewOption-checkbox'])} />
              </BodymovinCheckbox>
            <span>循环（Loop）</span>
          </div>
          {this.props.canSaveFile && 
            <div className={css(styles.button)}>
              <BaseButton text='保存快照（Save Snapshot）' type='green' onClick={this.props.saveFile} />
            </div>
          }
        </div>
      </div>
      );
  }

  componentWillUnmount() {
    this._isMounted = false
  }
}

PreviewScrubber.propTypes = {
  totalFrames: PropTypes.number,
  frameRate: PropTypes.number,
  progress: PropTypes.number,
  max: PropTypes.number,
  canSaveFile: PropTypes.bool,
}

PreviewScrubber.defaultProps = {
  totalFrames: 0,
  frameRate: 1,
  progress: 0,
  max: 1,
  canSaveFile: false,
}

export default PreviewScrubber
