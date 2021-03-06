import React from 'react'
import PropTypes from 'prop-types'

import withI18n from './withI18n'
import { triggerClick } from '../common'

import '../styles/components/Block.pcss'

class Block extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      collapsed: props.collapsible ? props.collapsed : false,
    }
  }

  render() {

    const { className, title, collapsible, collapsibleType, type, children, translate } = this.props
    const { collapsed } = this.state

    return (
      <div className={`Block ${className} ${collapsible ? 'collapsible' : ''} ${collapsibleType} ${collapsed ? 'collapsed' : ''}`}>
        <div className={`head ${type}`}>
          <h3>
            {title}
          </h3>
          {(collapsible && collapsibleType === 'plus') && (
            <span
              role="button"
              tabIndex="0"
              onKeyDown={triggerClick}
              className="plus"
              onClick={() => this.setState({collapsed: !collapsed})}
            >
              <i aria-hidden="true" className={`fa fa-${collapsed ? 'plus' : 'minus'}`} />
            </span>
          )}
        </div>
        <div className={`main ${type}`}>
          {children}
        </div>
        {(collapsible && collapsibleType === 'show-all') && (
          <div
            role="button"
            tabIndex="0"
            onKeyDown={triggerClick}
            className="show-all"
            onClick={() => this.setState({collapsed: !collapsed})}
          >
            {translate(collapsed ? 'Show all' : 'Show less')}
          </div>
        )}
      </div>
    )
  }

}

Block.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  translate: PropTypes.func.isRequired,
  className: PropTypes.string,
  collapsible: PropTypes.bool,
  collapsibleType: PropTypes.string,
  collapsed: PropTypes.bool,
  type: PropTypes.string
}


Block.defaultProps = {
  className: '',
  collapsible: false,
  collapsibleType: 'plus',
  collapsed: true,
  type: ''
}

export default withI18n(Block)
