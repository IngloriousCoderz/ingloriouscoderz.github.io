import Layout from '~/layouts/default'

import ExtLink from '~/components/ext-link'

export default () => (
  <Layout
    path="/privacy-policy"
    title="Privacy Policy"
    description="How we treat your personal data."
  >
    <article className="card card-1">
      <h1>Privacy Policy</h1>

      <p>
        Did you really come to this page? Don&apos;t tell me you did it on
        purpose. Are you some GDPR agent or some privacy-obsessed nerd? Chill
        dude/dudette!
      </p>

      <p>
        We respect your privacy. Actually we don&apos;t care at all about your
        personal information. Not on this website at least. It&apos;s about us,
        not you.
      </p>

      <p>
        We just track some anonymous information with{' '}
        <ExtLink to="https://analytics.google.com/analytics/web/">
          Google Analytics
        </ExtLink>
        . This allows us to provide a better service to you folks out there: if
        many visitors come from France then we will try to provide a translation
        in French; if many visitors browse from desktop then we will stop trying
        so hard to make the site mobile-friendly.
      </p>

      <p>
        What really makes the GDPR so upset is cookies. Well don&apos;t worry,
        we aren&apos;t storing any tracking cookies. We use{' '}
        <ExtLink to="https://en.wikipedia.org/wiki/Web_storage">
          web storage
        </ExtLink>{' '}
        so all your info stays on your browser.
      </p>
      <p>
        If you&apos;re a webmaster and you want to know how to do it,{' '}
        <ExtLink to="https://developers.google.com/analytics/devguides/collection/analyticsjs/cookies-user-id#disabling_cookies">
          there you go
        </ExtLink>
        . You&apos;re welcome.
      </p>
    </article>
  </Layout>
)
