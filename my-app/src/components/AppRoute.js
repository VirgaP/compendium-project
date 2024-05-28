import React, {useState} from 'react'
import { Redirect, Route } from 'react-router-dom'
import func from '../utils/functions'

import { useAuthState } from '../context'

const AppRoutes = ({ component: Component, path, isPrivate, isExact, ...rest }) => {
  const userDetails = useAuthState()
  
  const[state] = useState({
    pages: {
        uuid: {
            name: page.name,
            slug: func.slugify(page.name),
        }
    },
    slugs: {
        slug: uuid
    }
  })

  return (
    <Route
      path={path}
      slug={state.pages.uuid.slug}
      pageId={state.pages[state.slugs[slug]]}
      render={(props) =>
        isPrivate && !userDetails.token ? (
          <Redirect to={{ pathname: '/login' }} />
        ) : (
          <Component {...props} />
        )
      }
      {...rest}
    />
  )
}

export default AppRoutes
