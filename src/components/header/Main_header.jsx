import React from 'react'
import { StyleSheet, css } from 'aphrodite'
import BaseButton from '../buttons/Base_button'
import Variables from '../../helpers/styles/variables'
import BaseHeader from './Base_Header'

const styles = StyleSheet.create({
    container: {
      width: '100%',
      marginBottom: '10px'
    },
    right: {
      marginRight:'7px',
    },
    links_container: {
    	width: '100%',
        display: 'flex',
        alignItems:'center',
        justifyContent: 'flex-start',
    },
    buttons_container: {
    	width: '100%',
    	height: '50px',
        display: 'flex',
        alignItems:'center',
        justifyContent: 'space-between',
    },
    buttons_group: {
        display: 'inline-block',
    },
    button: {
        marginRight:'7px',
        flex: '0 0 auto',
    },
    buttons_separator: {
        flex: '1 1 auto',
    },
    separator: {
    	width: '100%',
    	height: '1px',
    	backgroundColor: Variables.colors.gray2,
    	marginTop: '10px',
    	marginBottom: '10px'
    }
})

function Main_header(props) {
	return (<div className={css(styles.container)}>
				<div className={css(styles.links_container)}>
                    <BaseHeader />
				</div>
                <div className={css(styles.buttons_container)}>
                    <BaseButton text='渲染（Render）' type='green' classes={styles.button} disabled={!props.canRender} onClick={props.startRender} />
                    <div className={css(styles.buttons_group)}>
                        <BaseButton
                            text='应用设置（Apply Settings）'
                            alt='将设置应用到选定的合成（Apply Settings to Selected Comps）'
                            type='gray'
                            classes={styles.button}
                            onClick={props.applySettings}
                        />
                        <BaseButton
                            text='刷新列表（Refresh list）'
                            type='gray'
                            classes={styles.button}
                            onClick={props.refresh}
                        />
                        <BaseButton
                            text='项目设置（Project Settings）'
                            type='gray'
                            classes={styles.button}
                            onClick={props.openGlobalSettings}
                        />
                    </div>
                </div>
			</div>)
}

export default Main_header