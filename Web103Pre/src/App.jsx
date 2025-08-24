import { useEffect, useState } from 'react'
import { useRoutes } from 'react-router-dom'
import ShowCreators from './pages/ShowCreators'
import ViewCreator from './pages/ViewCreator'
import EditCreator from './pages/EditCreator'
import AddCreator from './pages/AddCreator'
import './App.css'
import { supabase } from './client'

function App() {
  const [creators, setCreators] = useState([])

  useEffect(() => {
    async function fetchCreators() {
      const { data, error } = await supabase.from("creators").select("*")
      if (error) {
        console.error("Error fetching creators: ", error)
      } else {
        setCreators(data)
      }
    }
    fetchCreators()
  }, [])

  let routes = useRoutes([
    { path: '/', element: <ShowCreators creators={creators}/>},
    { path: '/creators/:name', element: <ViewCreator />},
    { path: '/creators/:name/edit', element: <EditCreator />},
    { path: '/new', element: <AddCreator />}
  ])

  return (
    <>
      <div className='App'>
        {routes}
      </div>
    </>
  )
}

export default App
