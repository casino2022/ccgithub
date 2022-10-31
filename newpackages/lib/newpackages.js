'use babel';

import NewpackagesView from './newpackages-view';
import { CompositeDisposable } from 'atom';

export default {

  newpackagesView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.newpackagesView = new NewpackagesView(state.newpackagesViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.newpackagesView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'newpackages:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.newpackagesView.destroy();
  },

  serialize() {
    return {
      newpackagesViewState: this.newpackagesView.serialize()
    };
  },

  toggle() {
    console.log('Newpackages was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
