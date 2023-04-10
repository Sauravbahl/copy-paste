import React, { Component } from 'react';

class NoteConverter extends Component {
  componentDidMount() {
    document.addEventListener('contextmenu', this.handleContextMenu);
  }

  componentWillUnmount() {
    document.removeEventListener('contextmenu', this.handleContextMenu);
  }

  handleContextMenu = async (event) => {
    const selection = window.getSelection().toString();
    if (selection) {
      const note = window.prompt('Convert to note', selection);
      if (note) {
        try {
          await navigator.clipboard.writeText(note);
          const copiedNote = await navigator.clipboard.readText();
          console.log('Copied note: ', copiedNote);
          const pasteTarget = document.querySelector('#paste-target');
          if (pasteTarget) {
            pasteTarget.innerHTML = copiedNote;
          } else {
            console.error('Failed to find paste target');
          }
        } catch (error) {
          console.error('Failed to copy note: ', error);
        }
      }
    }
  }

  render() {
    return (
      <div>
        hello my name is leena. i live in dubai.my age is 22
        <div id="paste-target"></div>
      </div>
    );
  }
}

export default NoteConverter;
