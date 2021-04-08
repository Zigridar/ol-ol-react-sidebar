import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

(window as any).initApp = (testStr: string) => {
    const testContent: React.ReactNode = <div>{testStr}</div>

    ReactDOM.render(
        <App testContent={testContent}/>,
        document.getElementById('root')
    )
}