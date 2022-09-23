import styled from 'styled-components'
import { Routes, Route } from 'react-router-dom'
import HvDevelop from './pages/HvDevelop'
import Home from './pages/Home'

const App = () => {
  return (
    <Container>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hv/:id" element={<HvDevelop />} />
      </Routes>
    </Container>
  )
}

const Container = styled.div`
  width:100%;
  min-height:100%;
`

export default App