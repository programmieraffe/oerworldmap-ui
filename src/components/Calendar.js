import React from 'react'
import PropTypes from 'prop-types'

import Link from './Link'

import withI18n from './withI18n'

const Calendar = ({entries, moment, translate}) => (
  <ul className="Calendar">
    {entries.map(month => (
      <li key={month.key}>
        <h1>{moment(month.key_as_string).format('MMMM YYYY')}</h1>
        <ul>
          {month['about.@id'].hits.hits.map(hit => hit._source.about).map(event => (
            <li key={event['@id']}>
              <Link href={event['@id']}>
                <div className="sheet">
                  <div>
                    {moment(event.startDate).format('D')}
                  </div>
                  <div>
                    {moment(event.startDate).format('MMM')}
                  </div>
                </div>
                <span>
                  {translate(event.name)}<br />
                  {moment(event.startDate).format('M') === moment(event.endDate).format('M')
                    ? moment(event.startDate).format('D')
                    : moment(event.endDate).format('D MMM')
                  } - {moment(event.endDate).format('D MMM')}
                  {event.location && event.location.address &&
                    <span>
                      &nbsp;&mdash;&nbsp;
                      {event.location.address.addressLocality &&
                        event.location.address.addressLocality.concat(',')
                      }
                      &nbsp;{event.location.address.addressCountry}
                    </span>
                  }
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </li>
    ))}
  </ul>
)

export default withI18n(Calendar)
