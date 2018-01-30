/**
 * A component to render a link back to the app with a Minilogue program attached for sharing.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { createLocation } from 'history';
import base32Encode from 'base32-encode';
import urljoin from 'url-join';
import { encodeProgram } from '../minilogue/program';
import { encodeSysexData } from '../minilogue/sysex';
import history from '../history';
import Button from './Button.jsx';
import Icon from './Icon.jsx';
import copyIcon from '../assets/clipboard.svg';

class ProgramLink extends React.Component {
  static propTypes = {
    program: PropTypes.object,
  };

  copyLinkToClipboard = () => {
    this.el.select();
    document.execCommand('copy');
  };

  render() {
    const sysex = encodeSysexData(encodeProgram(this.props.program));
    const encodedProgram = base32Encode(sysex, 'Crockford');
    const location = createLocation(`/?sysex=${encodedProgram}`, null, null, history.location);
    const href = history.createHref(location);
    const current = window.location;
    const url = urljoin(`${current.protocol}//${current.host}`, href);
    return (
      <div style={{ textAlign: 'center' }}>
        <p>Use this link to share your program</p>
        <input
          type="text"
          style={{ width: '100%' }}
          readOnly={true}
          value={url}
          ref={(el) => { this.el = el; }}
        />
        <Button
          title="Copy Link to Clipboard"
          onClick={this.copyLinkToClipboard}>
          <Icon use={copyIcon.id} viewBox={copyIcon.viewBox} height={20} width={20} />
        </Button>
      </div>
    );
  }
}

export default ProgramLink;
