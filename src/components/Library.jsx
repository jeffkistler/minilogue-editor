import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import ActionMenu from './ActionMenu.jsx';
import Icon from './Icon.jsx';
import LibraryContainer from '../containers/LibraryContainer.jsx';
import NewLibraryContainer from '../containers/NewLibraryContainer.jsx';
import LoadLibraryContainer from '../containers/LoadLibraryContainer.jsx';
import SaveLibraryContainer from '../containers/SaveLibraryContainer.jsx';
import AppendLibraryContainer from '../containers/AppendLibraryContainer.jsx';
import { getParameterDisplayName, getParameterDisplayValue } from '../minilogue/display';
import * as programLib from '../minilogue/program';
import './Library.css';
import newIcon from '../assets/new.svg';
import openIcon from '../assets/open.svg';
import saveIcon from '../assets/save.svg';
import addIcon from '../assets/add.svg';


const Library = props => (
  <div className="section-wrapper">
    <Helmet>
      <title>Library</title>
    </Helmet>
    <ActionMenu>
      <NewLibraryContainer title="New Library">
        <Icon
          use={newIcon.id}
          viewBox={newIcon.viewBox}
          title="New Library"
        />
      </NewLibraryContainer>
      <LoadLibraryContainer title="Open Library File">
        <Icon
          use={openIcon.id}
          viewBox={openIcon.viewBox}
          title="Open Library File"
        />
      </LoadLibraryContainer>
      <SaveLibraryContainer title="Save Library File">
        <Icon
          use={saveIcon.id}
          viewBox={saveIcon.viewBox}
          title="Save Library File"
        />
      </SaveLibraryContainer>
      <AppendLibraryContainer title="Add a Program to the Library">
        <Icon
          use={addIcon.id}
          viewBox={addIcon.viewBox}
          title="Add a Program to the Library"
        />
      </AppendLibraryContainer>
    </ActionMenu>
    <div className="library">
      <LibraryContainer
        columns={
          props.parameters.map(parameter => (
            {
              accessor: (program => (getParameterDisplayValue(program, parameter))),
              label: getParameterDisplayName(parameter),
            }
          ))
        }
      />
    </div>
  </div>
);

Library.propTypes = {
  parameters: PropTypes.arrayOf(
    PropTypes.number.isRequired,
  ),
};

Library.defaultProps = {
  parameters: [
    programLib.PROGRAM_NAME,
    programLib.VOICE_MODE,
    programLib.VCO1_WAVE,
    programLib.VCO2_WAVE,
    programLib.SLIDER_ASSIGN,
  ],
};

export default Library;
