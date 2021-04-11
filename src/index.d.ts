import React from "react";

/** Sidebar position */
export type SidebarPosition = 'left' | 'right'

/** Tab props for user */
export interface ITabProps {
    id: string
    icon?: React.ReactNode
}

/** Private Sidebar Tar props */
export interface TabProps extends ITabProps {
    open: (event: React.MouseEvent<HTMLAnchorElement>) => void
}

/** TabPane props for user */
export interface ITabPaneProps {
    id: string
    headerText: string
    content: React.ReactNode
}

/** Private Sidebar TabPane props */
export interface TabPaneProps extends ITabPaneProps {
    close: () => void
}

/** Common TabPane props for user */
export type PaneProps = ITabProps & ITabPaneProps

/** Sidebar props */
export interface SideBarProps {
    id: string
    tabs: PaneProps[]
    position: SidebarPosition
    settingsTab?: TabProps
}