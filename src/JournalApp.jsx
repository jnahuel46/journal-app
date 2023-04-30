import React from 'react'
import AppRouter from './router/AppRouter'
import AppTheme from './theme/AppTheme'

const JournalApp = () => {
  return (
    <AppTheme>
      {/* Principal Route sistem of the application */}
      <AppRouter />
    </AppTheme>
  )
}

export default JournalApp
