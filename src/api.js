/* global Headers */

import fetch from 'isomorphic-fetch'
import promise from 'es6-promise'
import linkHeader from 'http-link-header'

promise.polyfill()

const checkStatus = response => {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(new Error(response.statusText))
  }
}

const toJson = response => {
  return response.json().then(json => {
    if (response.headers.has('Link')) {
      json._links = linkHeader.parse(response.headers.get('Link'))
    }
    json._status = response.statusText
    return json
  })
}

class Api {

  constructor (apiConfig) {
    this.host = apiConfig.host
    this.port = apiConfig.port
  }

  post (url, data, authorization) {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
    if (authorization) {
      headers.append('Authorization', authorization)
    }
    return fetch(`http://${this.host}:${this.port}${url}`, {
      headers,
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      body: JSON.stringify(data)
    }).then(checkStatus)
      .then(toJson)
  }

  get (url, authorization) {
    const headers = new Headers({
      'Accept': 'application/json'
    })
    if (authorization) {
      headers.append('Authorization', authorization)
    }
    return fetch(`http://${this.host}:${this.port}${url}`, {
      headers,
      method: 'GET',
      mode: 'cors',
      credentials: 'include'
    }).then(checkStatus)
      .then(toJson)
  }

  vocab (url) {
    switch(url) {
    case 'https://w3id.org/class/esc/scheme':
      return Promise.resolve({
        data: {
          member: require('./json/esc.json').hasTopConcept.map(entry => {return {about: entry}})
        }
      })
    case 'https://w3id.org/isced/1997/scheme':
      return Promise.resolve({
        data: {
          member: require('./json/isced-1997.json').hasTopConcept.map(entry => {return {about: entry}})
        }
      })
    case 'https://github.com/hbz/oerworldmap/public/json/licenses.json':
      return Promise.resolve({
        data: {
          member: require('./json/licenses.json').hasTopConcept.map(entry => {return {about: entry}})
        }
      })
    case 'https://github.com/hbz/oerworldmap/public/json/sectors.json':
      return Promise.resolve({
        data: {
          member: require('./json/sectors.json').hasTopConcept.map(entry => {return {about: entry}})
        }
      })
    default:
      return Promise.resolve({
        data: {
          member: []
        }
      })
    }
  }

}

export default Api
