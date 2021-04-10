import React from 'react'
import ReactDOM from 'react-dom'
import './App.css'
import LoraMap from './LoraMap'

(window as any).initApp = (testStr: string) => {
    const testContent: React.ReactNode = <div>{testStr}</div>

    ReactDOM.render(
        <LoraMap />,
        document.getElementById('root')
    )
}

(window as any).initApp()