/**
 * The main application layout component.
 */

import React from 'react';
import { Route, NavLink } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { Helmet } from 'react-helmet';

import history from '../history';
import Icon from './Icon.jsx';
import PanelContainer from '../containers/PanelContainer.jsx';
import Library from './Library.jsx';
import Configuration from './Configuration.jsx';
import './App.css';
import panelIcon from '../assets/panel.svg';
import configurationIcon from '../assets/configuration.svg';
import libraryIcon from '../assets/library.svg';


const App = () => (
  <ConnectedRouter basename={BASENAME} history={history}>
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
      <div id="footer">Made by <a href="https://github.com/jeffkistler/">Jeff Kistler</a></div>
    </div>
  </ConnectedRouter>
);

export default App;
