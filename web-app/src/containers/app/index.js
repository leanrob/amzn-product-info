import React from 'react';
import { Route, Link } from 'react-router-dom'
import Home from '../home'

const App = () => (
  <div className="main">
    <header>
      <Link to="/">Home</Link>
    </header>

    <main>
      <Route exact path="/" component={Home} />
    </main>
    {/*This is how you comment code in JSX*/}
  </div>
);

export default App

/**
 * JSX Introduction
 * --> JSX is simply HTML-like syntax that is returned by a javascript function
 * --> Line 6-21 > this case the JS function is an arrow function.
 * --> Line 23 > This component is then exported for use elsewhere in the app
 * Note: Line 7-20 > Each JSX component MUST have ONE top level div, otherwise it will rage out
 * --> Line 17 > see how to comment out JSX code
 * --> Line 7 > Some elements of HTML syntax need to change and will be converted on render (Such as className) see link [http://www.javascripter.net/faq/reserved.htm]
 * @constructor
 */