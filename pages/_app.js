import '../styles/globals.css'
import { AuthContext, AuthContextProvider } from '../context/AuthContext'
import { ChatContext, ChatContextProvider } from '../context/ChatContext'
function MyApp({ Component, pageProps }) {
  return (
  <AuthContextProvider>
    <ChatContextProvider>
      <Component {...pageProps} />
    </ChatContextProvider>
  </AuthContextProvider>
  )
}

export default MyApp
