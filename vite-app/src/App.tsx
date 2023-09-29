import { useState } from 'react'
import Header from "./submodules/Header"
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <body>
				<Header />
				<ul data-testid="review-list">
					
				</ul>
			</body>
    </>
  )
}

export default App;
