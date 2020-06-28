import classNames from 'classnames'

export default ({ max = 4, children }) => (
  <div
    className={classNames('col-xs-12', {
      'col-sm-6': max >= 2,
      'col-md-4': max >= 3,
      'col-lg-3': max >= 4,
    })}
  >
    {children}
  </div>
)
