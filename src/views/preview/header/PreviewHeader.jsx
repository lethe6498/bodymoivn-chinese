import React, {PureComponent} from 'react'
import { StyleSheet, css } from 'aphrodite'
import Variables from '../../../helpers/styles/variables'
import BaseButton from '../../../components/buttons/Base_button'
import {previewTypes} from '../viewer/PreviewViewer'
import BodymovinCheckbox from '../../../components/bodymovin/bodymovin_checkbox'
import checkbox from '../../../assets/animations/checkbox.json'
import { SketchPicker } from 'react-color'
import BaseHeader from '../../../components/header/Base_Header'

const styles = StyleSheet.create({
    container: {
      width: '100%',
      marginBottom: '10px'
    },
    right: {
      float: 'right'
    },
    buttons_container: {
    	width: '100%',
    	height: '50px',
        display: 'flex',
        alignItems:'center'
    },
    button: {
        marginRight:'5px',
        flexGrow: 0
    },
    buttons_separator: {
        flexGrow: 1
    },
    refresh: {
    	width: '40px',
    	height: '34px',
    	backgroundColor: 'transparent',
      	verticalAlign:'middle'
    },
    refresh_image: {
    	maxWidth: '100%',
    	maxHeight: '100%'
    },
    separator: {
        width: '100%',
        height: '1px',
        backgroundColor: Variables.colors.gray2,
        marginTop: '10px',
        marginBottom: '10px'
    },
    renderersContainer: {
        display: 'flex',
        alignItems: 'baseline',
    },
    renderersLabel: {
        flex: '0 0 auto',
        marginRight: '5px',
        color: Variables.colors.white,
    },
    renderersButton: {
        marginRight:'5px',
    	flex: '0 0 auto',
    },
    previewOption: {
        fontSize: '14px',
        marginRight: '10px',
        cursor: 'pointer',
        color: Variables.colors.white,
    },
    'previewOption-checkbox': {
        width: '20px',
        display: 'inline-block',
        verticalAlign: 'middle',
        marginRight: '4px',
    },
    flexExtender: {
        flex: '1 1 auto',
    },
    colorPicker: {
        position: 'relative',
    },
    'colorPicker-box': {
        position: 'absolute',
        zIndex: 10,
        right: 0,
        top: '30px',
    },
    'colorPicker-thumb': {
        display: 'inline-block',
        width: '20px',
        height: '20px',
        border: `1px solid ${Variables.colors.white}`,
        outline: `1px solid ${Variables.colors.gray}`,
        verticalAlign: 'middle',
        cursor: 'pointer',
    },
    'colorPicker-label': {
        color: Variables.colors.white,
        fontSize: '14px',
        paddingRight: '4px',
    }
})

class PreviewHeader extends PureComponent {

    state = {
        isColorPickerEnabled: false,
    }

    toggleColorPicker = () => {
        this.setState({
            isColorPickerEnabled: !this.state.isColorPickerEnabled,
        })
    }

    updateColor = colorData => {
        this.props.updateColor(colorData.hex)
    }

    render() {
        const props = this.props
    	return (
            <div className={css(styles.container)}>
                <BaseHeader />
				<div className={css(styles.buttons_container)}>
                    <BaseButton text='浏览本地文件（Browse Local Files）' type='green' classes={styles.button} onClick={props.browseFiles}/>
                    <BaseButton text='当前渲染（Current Renders）' type='green' classes={styles.button} onClick={props.selectCurrentRenders}/>
				</div>
                <div className={css(styles.separator)}></div>
                    <div className={css(styles.renderersContainer)}>
                        <div className={css(styles.renderersLabel)}>预览器（Previewer）:
                        </div>
                        <div
                            className={css(styles.previewOption)}
                            onClick={()=>props.onRendererSelected(previewTypes.BROWSER)}
                        >
                            <BodymovinCheckbox
                                animationData={checkbox}
                                animate={props.selectedTypes.includes(previewTypes.BROWSER)}
                            >
                                <div
                                    className={css(styles['previewOption-checkbox'])}
                                    
                                />
                            </BodymovinCheckbox>
                            <span>浏览器（Browser）</span>
                        </div>
                        <div
                            className={css(styles.previewOption)}
                            onClick={()=>props.onRendererSelected(previewTypes.SKOTTIE)}
                        >
                            <BodymovinCheckbox
                                animationData={checkbox}
                                animate={props.selectedTypes.includes(previewTypes.SKOTTIE)}
                            >
                                <div
                                    className={css(styles['previewOption-checkbox'])}
                                    
                                />
                            </BodymovinCheckbox>
                            <span>Skottie</span>
                        </div>
                        <div
                            className={css(styles.flexExtender)}
                        />

                        <div className={css(styles.colorPicker)}>
                            <span
                                className={css(styles['colorPicker-label'])}
                            >背景颜色（Background color）</span>
                            <div
                                onClick={this.toggleColorPicker}
                                className={css(styles['colorPicker-thumb'])}
                                style={{backgroundColor: props.backgroundColor}}
                            />
                            {this.state.isColorPickerEnabled && 
                                <div className={css(styles['colorPicker-box'])}>
                                    <SketchPicker 
                                        color={ props.backgroundColor }
                                        onChangeComplete={ this.updateColor }
                                    />
                                </div>
                            }
                        </div>
                    </div>
            </div>)
    }
}

export default PreviewHeader