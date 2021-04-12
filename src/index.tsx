import React from 'react'
import * as reactDOM from 'react-dom'
import { ReactRouter } from './GlobalFiles/ReactRouter'

const Component: React.FC<{}> = () => <ReactRouter />

reactDOM.render(<Component />, document.getElementById('app'))
