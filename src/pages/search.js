import React, { useState, useEffect } from 'react'
import Layout from '../components/layout'
import SearchForm from '../components/searchForm'
import SearchResults from '../components/searchResults'

const Search = ({ data, location }) => {
  const [results, setResults] = useState({})
  // URLSearchParams: is a utility built into modern browsers
  // we'll use this to get the keywords query string from our URL
  // (not supported in IE - polyfill -> https://www.npmjs.com/package/url-search-params-polyfill)
  const searchQuery = new URLSearchParams(location.search).get('keywords') || ''

  // useEffect (think of mix of LCMs componentDidMount, componentDidUpdate, componentWillUnmount)
  // you declare the hook by passing in a function to execute when the component is rendered
  // (and re-rendered)
  useEffect(() => {
    // make sure Lunr has loaded
    if (window.__LUNR__) {
      window.__LUNR__.__loaded.then(lunr => {
        // Lunr is loaded here
        const refs = lunr.en.index.search(searchQuery)
        const posts = refs.map(({ ref }) => lunr.en.store[ref])

        // pass posts into React state
        setResults(posts)
        console.log(posts)
      })
    }
    // the useEffect hook also comes with a second parameter
    // which tells it when to call the function (and when to disreguard it)
    // we pass an empty array (for now)
    // which tells component to only render once (when we load the page and never again)
  }, [location.search])

  return (
    <Layout location={location} title={data.site.siteMetadata.title}>
      {/* We need to make sure that when a full page refresh occurs (like user submits form) */}
      {/*   we keep the input's value and the query string in sync */}
      {/*   if we don't do this the value would be wiped on page refresh */}
      {/*   we fix this by passing down the query string that we get from URLSearchParams */}
      {/*   then we use our new "query" prop as the input's value in our our SearchForm component */}
      <SearchForm query={searchQuery} />
      <SearchResults results={results} />
    </Layout>
  )
}

export default Search

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
