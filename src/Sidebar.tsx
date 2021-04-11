import React, {useEffect, useRef} from 'react'
import './Sidebar.css'
import {SideBarProps, TabPaneProps, TabProps} from './index'

/** Toolbar tab-button */
const Tab: React.FC<TabProps> = (props: TabProps) => {

    const onClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault()
        props.open(event)
    }

    return(
        <li key={props.id}>
            <a role="tab" href={`#${props.id}`} onClick={onClick}>{ props.icon || <i className="fa fa-bars"/> }</a>
        </li>
    )
}

/** Tab content */
const TabPane: React.FC<TabPaneProps> = (props: TabPaneProps) => {
    return(
        <div className="sidebar-pane" id={props.id}>
            <h1 className="sidebar-header">
                {props.headerText}
                <span onClick={props.close} className="sidebar-close"><i className="fa fa-caret-left"/></span>
            </h1>
            {props.content}
        </div>
    )
}

/** Sidebar */
const Sidebar: React.FC<SideBarProps> = (props: SideBarProps) => {

    /** ref to html node */
    const ref = useRef<HTMLDivElement>(null)

    /** @returns tab buttons */
    const getTabItems = () => ref.current.querySelectorAll('ul.sidebar-tabs > li, .sidebar-tabs > ul > li')

    /** @returns tab panes */
    const getPanes = () => ref.current.querySelectorAll('.sidebar-pane')

    /** close sidebar */
    const close = () => {
        const self = ref.current

        const tabItems = getTabItems()

        /** remove old active highlights */
        for (let i = tabItems.length - 1; i >= 0; i--) {
            const child = tabItems[i]
            if (child.classList.contains('active'))
                child.classList.remove('active')
        }

        /** close sidebar */
        if (!self.classList.contains('collapsed'))
            self.classList.add('collapsed')
    }

    /** Set sidebar position after mount */
    useEffect(() => {
        ref.current.classList.add(`sidebar-${props.position}`)
    }, [])

    /** open sidebar */
    const open = (id: string) => {

        const tabItems = getTabItems()
        const panes = getPanes()

        /** hide old active contents and show new content */
        for (let i = panes.length - 1; i >= 0; i--) {
            const child = panes[i]
            if (child.id == id)
                child.classList.add('active')
            else if (child.classList.contains('active'))
                child.classList.remove('active')
        }

        /** remove old active highlights and set new highlight */
        for (let i = tabItems.length - 1; i >= 0; i--) {
            const child = tabItems[i]
            if (child.querySelector('a').hash === `#${id}`)
                child.classList.add('active')
            else if (child.classList.contains('active'))
                child.classList.remove('active')
        }

        /** open sidebar (if necessary) */
        if (ref.current.classList.contains('collapsed')) {
            ref.current.classList.remove('collapsed')
        }
    }

    return(
        <div ref={ref} id={props.id} className="sidebar collapsed">
            <div className="sidebar-tabs">
                <ul role="tablist">
                    {
                        props.tabs.map(tabProps => {
                            return (<Tab id={tabProps.id} open={() => open(tabProps.id)} icon={tabProps.icon} />)
                        })
                    }
                </ul>

                {props.settingsTab &&
                    <ul role="tablist">
                        <Tab id={props.settingsTab.id} open={() => open(props.settingsTab.id)} icon={props.settingsTab.icon} />
                    </ul>
                }
            </div>

            <div className="sidebar-content">

                {
                    props.tabs.map(tabPaneProps => {
                        return(<TabPane id={tabPaneProps.id} content={tabPaneProps.content} headerText={tabPaneProps.headerText} close={close} />)
                    })
                }

            </div>
        </div>
    )
}

export default Sidebar