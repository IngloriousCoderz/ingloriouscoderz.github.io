import ChatBot from 'react-simple-chatbot'
import { ThemeProvider } from 'styled-components'
import { withI18n } from 'react-i18next'

const theme = {
  background: 'rgba(40, 44, 52, 0.5)',
  fontFamily: 'Orbitron',
  headerBgColor: 'transparent',
  headerFontColor: '#98c379',
  headerFontSize: '1rem',
  // botBubbleColor: 'rgba(33, 37, 43, 0.5)',
  botBubbleColor: 'transparent',
  botFontColor: '#98c379',
  // userBubbleColor: 'rgba(33, 37, 43, 0.5)',
  userBubbleColor: 'transparent',
  userFontColor: '#bbb',
}

export default withI18n()(({ t }) => (
  <ThemeProvider theme={theme}>
    <ChatBot
      bubbleStyle={{ fontSize: '1rem', boxShadow: 'none' }}
      hideBotAvatar={true}
      hideHeader={true}
      hideUserAvatar={true}
      inputStyle={{
        backgroundColor: 'transparent',
        color: '#bbb',
        borderRadius: 0,
      }}
      placeholder={t('Ask me anything...')}
      style={{ width: '100%', borderRadius: 0 }}
      steps={[
        {
          id: 'knock-knock',
          message: t('Knock knock.'),
          trigger: 'who-s-there',
        },
        {
          id: 'who-s-there',
          user: true,
          trigger: 'it-s-me',
        },
        {
          id: 'it-s-me',
          message: t(
            "Hey it's me, ICBot. You followed the white rabbit and found us. Good for you."
          ),
          trigger: 'ask-me',
        },
        {
          id: 'ask-me',
          message: t('Feel free to ask me anything about Inglorious Coderz.'), //, I'll do my best to reply accordingly.",
          trigger: 'question',
        },
        {
          id: 'question',
          user: true,
          trigger: 'response',
        },
        {
          id: 'response',
          message: t('I said you could ask, not that I would answer :P'),
          trigger: 'jokes-aside',
        },
        {
          id: 'jokes-aside',
          message: t(
            'Jokes aside, one day I will be able to tell you something meaningful, but right now I have no AI attached. So meanwhile, have a look around!'
          ),
          end: true,
          // trigger: 'want-to-know-else',
        },
        {
          id: 'want-to-know-else',
          message: t('Want to know anything else?'),
          trigger: 'question',
        },
      ]}
    />
  </ThemeProvider>
))
