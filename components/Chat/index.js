import ChatBot from 'react-simple-chatbot'
import { ThemeProvider } from 'styled-components'

const theme = {
  background: 'rgba(40, 44, 52, 0.5)',
  fontFamily: 'Orbitron',
  headerBgColor: 'transparent',
  headerFontColor: '#98c379',
  headerFontSize: '1rem',
  botBubbleColor: 'rgba(33, 37, 43, 0.5)',
  botFontColor: '#98c379',
  userBubbleColor: 'rgba(33, 37, 43, 0.5)',
  userFontColor: '#bbb',
}

const Chat = () => (
  <ThemeProvider theme={theme}>
    <ChatBot
      bubbleStyle={{ fontSize: '1rem' }}
      hideBotAvatar={true}
      hideHeader={true}
      hideUserAvatar={true}
      inputStyle={{
        backgroundColor: 'transparent',
        color: '#bbb',
        borderRadius: 0,
      }}
      placeholder="Ask me anything..."
      style={{ width: '100%', borderRadius: 0 }}
      steps={[
        {
          id: 'knock-knock',
          message: 'Knock knock.',
          trigger: 'who-s-there',
        },
        {
          id: 'who-s-there',
          user: true,
          trigger: 'it-s-me',
        },
        {
          id: 'it-s-me',
          message:
            "Hey it's me, ICBot. You followed the white rabbit and found us. Good for you.",
          trigger: 'ask-me',
        },
        {
          id: 'ask-me',
          message: 'Feel free to ask me anything about Inglorious Coderz.', //, I'll do my best to reply accordingly.",
          trigger: 'question',
        },
        {
          id: 'question',
          user: true,
          trigger: 'response',
        },
        {
          id: 'response',
          message: 'I said you could ask me, not that I would answer :P',
          trigger: 'jokes-aside',
        },
        {
          id: 'jokes-aside',
          message:
            'Jokes aside, one day I will be able to tell you something meaningful, but right now I have no AI attached. So meanwhile, have a look around!',
          end: true,
          // trigger: 'want-to-know-else',
        },
        {
          id: 'want-to-know-else',
          message: 'Want to know anything else?',
          trigger: 'question',
        },
      ]}
    />
  </ThemeProvider>
)

export default Chat
