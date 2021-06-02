/* eslint-disable max-len */
import React from 'react';
import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

/**
 *
 * @param {*} props
 * @return {*}
 */
const TextEditor = (props) => {
  const customConfig = {
    extraPlugins: [CustomUploadAdapterPlugin],
    toolbar: {
      items: [
        'heading',
        '|',
        'bold',
        'italic',
        'link',
        'bulletedList',
        'numberedList',
        '|',
        'blockQuote',
        'insertTable',
        '|',
        'imageUpload',
        'undo',
        'redo',
      ],
    },
    table: {
      contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
    },
  };

  return (
    <CKEditor
      required
      editor={ClassicEditor}
      config={customConfig}
      {...props}
    />
  );
};

/**
 *
 * @param {*} editor
 */
function CustomUploadAdapterPlugin(editor) {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
    return new CustomUploadAdapter(loader);
  };
}

/**
 *
 */
class CustomUploadAdapter {
  /**
   *
   * @param {*} props
   */
  constructor(props) {
    // CKEditor 5's FileLoader instance.
    this.loader = props;
    // URL where to send files.
    this.url = '/api/services/upload-image';
  }

  // Starts the upload process.
  /**
   *
   * @return {Promise}
   */
  upload() {
    return new Promise((resolve, reject) => {
      this._initRequest();
      this._initListeners(resolve, reject);
      this._sendRequest();
    });
  }

  // Aborts the upload process.
  /**
   *
   */
  abort() {
    if (this.xhr) {
      this.xhr.abort();
    }
  }

  // Example implementation using XMLHttpRequest.
  /**
   *
   */
  _initRequest() {
    const xhr = this.xhr = new XMLHttpRequest();
    const token = localStorage.token;

    xhr.open('POST', this.url, true);
    xhr.responseType = 'json';
    xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
    xhr.setRequestHeader('x-auth-token', token);
  }

  // Initializes XMLHttpRequest listeners.
  /**
   *
   * @param {*} resolve
   * @param {*} reject
   */
  _initListeners(resolve, reject) {
    const xhr = this.xhr;
    const loader = this.loader;
    const genericErrorText = 'Couldn\'t upload file:' + ` ${loader.file.name}.`;

    xhr.addEventListener('error', () => reject(genericErrorText));
    xhr.addEventListener('abort', () => reject());
    xhr.addEventListener('load', () => {
      const response = xhr.response;
      if (!response || response.error) {
        return reject(response && response.error ? response.error.message : genericErrorText);
      }

      // If the upload is successful, resolve the upload promise with an object containing
      // at least the "default" URL, pointing to the image on the server.
      resolve({
        default: response.path,
      });
    });

    if (xhr.upload) {
      xhr.upload.addEventListener('progress', (evt) => {
        if (evt.lengthComputable) {
          loader.uploadTotal = evt.total;
          loader.uploaded = evt.loaded;
        }
      });
    }
  }

  // Prepares the data and sends the request.
  /**
   *
   */
  _sendRequest() {
    const data = new FormData();

    this.loader.file.then((result) => {
      data.append('file', result);
      this.xhr.send(data);
    },
    );
  }
}

export default TextEditor;
