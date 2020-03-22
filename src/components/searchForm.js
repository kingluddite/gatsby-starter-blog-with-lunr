import React from 'react'
// supplied to Gatsby from Reach Router
// allows us to programmatically change the URL (without requiring a hard refresh)
import { navigate } from 'gatsby'

const SearchForm = ({ query }) => (
  <form role="search" method="GET">
    <label htmlFor="search-input">
      <h1>Search posts</h1>
    </label>
    <input
      type="search"
      id="search-inut"
      name="keywords"
      onChange={e =>
        navigate(`/search?keywords=${encodeURIComponent(e.target.value)}`)
      }
      value={query}
    />
    <button type="submit">Submit</button>
  </form>
)

export default SearchForm
