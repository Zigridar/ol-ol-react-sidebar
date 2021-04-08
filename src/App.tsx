import React from 'react'

interface AppProps {
    testContent: React.ReactNode
}

const App: React.FC<AppProps> = (props: AppProps) => {
    return(
        <>
            {props.testContent}
        </>
    )
}

export default App