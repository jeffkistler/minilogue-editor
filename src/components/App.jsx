/**
 * The main container component.
 */
/**
 * The main application layout component.
 */

import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  NavLink,
} from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Icon from './Icon.jsx';
import PanelContainer from '../containers/PanelContainer.jsx';
import Library from './Library.jsx';
import Configuration from './Configuration.jsx';
import './App.css';
import panelIcon from '../assets/panel.svg';
import configurationIcon from '../assets/configuration.svg';
import libraryIcon from '../assets/library.svg';

const App = () => (
  <Router baseName={BASENAME}>
    <div id="app">
      <Helmet titleTemplate="%s | Minilogue Editor" />
      <ul className="section-nav">
        <li className="section-nav-item">
          <NavLink to={'/'} activeClassName="active" exact={true}>
            <Icon
              use={panelIcon.id}
              viewBox={panelIcon.viewBox}
              width={20}
              height={20}
            />
            <span>Panel</span>
          </NavLink>
        </li>
        <li className="section-nav-item">
          <NavLink to={'/library'} activeClassName="active">
            <Icon
              use={libraryIcon.id}
              viewBox={libraryIcon.viewBox}
              width={20}
              height={20}
            />
            <span>Library</span>
          </NavLink>
        </li>
        <li className="section-nav-item">
          <NavLink to={'/configuration'} activeClassName="active">
            <Icon
              use={configurationIcon.id}
              viewBox={configurationIcon.viewBox}
              width={20}
              height={20}
            />
            <span>Configuration</span>
          </NavLink>
        </li>
      </ul>
      <Route exact path="/" component={PanelContainer}/>
      <Route path="/library" component={Library}/>
      <Route path="/configuration" component={Configuration}/>
    </div>
  </Router>
);

export default App;
