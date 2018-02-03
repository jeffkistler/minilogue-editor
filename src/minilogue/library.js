/**
 * Korg Librarian archive file loading and writing.
 */
import JSZip from 'jszip';
import { decodeProgram, encodeProgram } from './program';


const parseInfoFile = (infoFile) => {
  const parser = new DOMParser();
  const dom = parser.parseFromString(infoFile, 'text/xml');

  // Check the format
  const libraryData = dom.firstChild;
  if (libraryData.tagName !== 'KorgMSLibrarian_Data') {
    throw new Error('Invalid root tag in library!');
  }
  const product = libraryData.getElementsByTagName('Product');
  // Check the product
  if ((product.length !== 1) && (product[0].textContent !== 'minilogue')) {
    throw new Error('Not a minilogue library!');
  }

  return libraryData;
};

const parseProgramBinFilenames = (libraryData) => {
  // Get the library contents
  let contents = libraryData.getElementsByTagName('Contents');
  if (contents.length !== 1) {
    throw new Error('Invalid library metadata!');
  }
  [contents] = contents;
  let numPrograms = contents.getAttribute('NumProgramData');
  if (numPrograms === null || numPrograms === '') {
    throw new Error('Invalid library metadata!');
  }
  numPrograms = parseInt(numPrograms, 10);
  const programs = contents.getElementsByTagName('ProgramData');
  if (programs.length !== numPrograms) {
    throw new Error('Invalid library metadata!');
  }

  // Get the program binary filenames
  const filenames = [];

  for (let i = 0; i < numPrograms; i += 1) {
    const program = programs[i];
    let binary = program.getElementsByTagName('ProgramBinary');
    if (binary.length !== 1) {
      throw new Error('Invalid library metadata!');
    }
    [binary] = binary;
    filenames.push(binary.textContent);
  }

  return filenames;
};

const parsePresetFilename = (libraryData) => {
  // Get the library contents
  let contents = libraryData.getElementsByTagName('Contents');
  if (contents.length !== 1) {
    throw new Error('Invalid library metadata!');
  }
  [contents] = contents;
  let presetInfo = contents.getElementsByTagName('PresetInformation');
  if (presetInfo.length && (presetInfo.length !== 1)) {
    throw new Error('Invalid library metadata');
  }
  let fileName;
  if (presetInfo.length) {
    [presetInfo] = presetInfo;
    const fileInfo = presetInfo.getElementsByTagName('File');
    if (fileInfo.length && (fileInfo.length !== 1)) {
      throw new Error('Invalid library metadata!');
    }
    if (fileInfo) {
      fileName = fileInfo[0].textContent;
    }
  }
  return fileName;
};

const parsePresetFile = (presetFileContents) => {
  const parser = new DOMParser();
  const dom = parser.parseFromString(presetFileContents, 'text/xml');
  // Check the format
  const presetData = dom.firstChild;
  if (presetData.tagName !== 'minilogue_Preset') {
    throw new Error('Invalid root tag in preset info!');
  }

  const getSingleTag = (tagName) => {
    const tag = presetData.getElementsByTagName(tagName);
    let value = '';
    if (tag) {
      value = tag[0].textContent;
    }
    return value;
  };

  return {
    name: getSingleTag('Name'),
    author: getSingleTag('Author'),
    version: getSingleTag('Version'),
    date: getSingleTag('Date'),
    prefix: getSingleTag('Prefix'),
    copyright: getSingleTag('Copyright'),
  };
};


/**
 * Load a program library from a library archive.
 * @param {*} file - The library zip file to load the library from.
 * @returns {Promise} Promise object representing the results of parsing the library.
 */
const loadLibrarianFile = file => (
  JSZip.loadAsync(file).then((archive) => {
    const infoFile = archive.file('FileInformation.xml');
    if (infoFile === null) {
      throw new Error('Invalid library!');
    }
    return infoFile.async('string').then((info) => {
      const infoFileDOM = parseInfoFile(info);
      const programFileNames = parseProgramBinFilenames(infoFileDOM);
      const programPromises = Promise.all(programFileNames.map((filename) => {
        const binFile = archive.file(filename);
        if (binFile === null) {
          throw new Error('Invalid library archive!');
        }
        return binFile.async('uint8array');
      }));
      let promises = [programPromises];
      const libraryMetaFilename = parsePresetFilename(infoFileDOM);
      if (libraryMetaFilename) {
        const libraryMetaFile = archive.file(libraryMetaFilename);
        if (libraryMetaFile === null) {
          throw new Error('Invalid library archive!');
        }
        const libraryMetadataPromise = libraryMetaFile.async('string');
        promises = [libraryMetadataPromise, ...promises];
      } else {
        promises = [Promise.resolve(null), ...promises];
      }
      return Promise.all(promises);
    });
  }).then((results) => {
    const [metadataFile, programFiles] = results;
    let library = {};
    if (metadataFile) {
      library = parsePresetFile(metadataFile);
    }
    library.programs = programFiles.map(decodeProgram);
    return library;
  })
);


const serialize = (document) => {
  const xmlDeclaration = '<?xml version="1.0" encoding="UTF-8"?>';
  const serialized = new XMLSerializer().serializeToString(document);
  return `${xmlDeclaration}\n\n${serialized}`;
};

const createPresetInformation = (library) => {
  const doc = document.implementation.createDocument('', null);
  const root = doc.createElement('minilogue_Preset');
  const createAndAppend = (nodeType, text) => {
    const child = doc.createElement(nodeType);
    const textElement = doc.createTextNode(text || '');
    child.appendChild(textElement);
    root.appendChild(child);
  };
  createAndAppend('DataId', library.name);
  createAndAppend('Name', library.name);
  createAndAppend('Author', library.author);
  createAndAppend('Version', library.version);
  createAndAppend('NumOfProg', library.programs.length);
  createAndAppend('Date', library.date);
  createAndAppend('Prefix');
  createAndAppend('Copyright', library.author);
  doc.appendChild(root);
  return serialize(doc);
};

const createFileInformation = (programs, presetData, favorites) => {
  const doc = document.implementation.createDocument('', null);
  const root = doc.createElement('KorgMSLibrarian_Data');
  const productNode = doc.createElement('Product');
  const productText = doc.createTextNode('minilogue');
  productNode.appendChild(productText);
  root.appendChild(productNode);
  const contentsNode = doc.createElement('Contents');
  contentsNode.setAttribute('NumFavoriteData', `${favorites ? 1 : 0}`);
  contentsNode.setAttribute('NumProgramData', `${programs.length}`);
  contentsNode.setAttribute('NumPresetInformation', `${presetData ? 1 : 0}`);
  if (presetData) {
    const presetNode = doc.createElement('PresetInformation');
    const presetFileNode = doc.createElement('File');
    const presetFileNameNode = doc.createTextNode('PresetInformation.xml');
    presetFileNode.appendChild(presetFileNameNode);
    presetNode.appendChild(presetFileNode);
    contentsNode.appendChild(presetNode);
  }
  if (favorites) {
    const favoriteNode = doc.createElement('FavoriteData');
    const favoriteFileNode = doc.createElement('File');
    const favoriteFileNameNode = doc.createTextNode('FavoriteData.fav_data');
    favoriteFileNode.appendChild(favoriteFileNameNode);
    favoriteNode.appendChild(favoriteFileNode);
    contentsNode.appendChild(favoriteNode);
  }
  const createProgramDataNode = (index) => {
    const number = (`000${index}`).slice(-3);
    const programDataNode = doc.createElement('ProgramData');
    const infoNode = doc.createElement('Information');
    const infoText = doc.createTextNode(`Prog_${number}.prog_info`);
    infoNode.appendChild(infoText);
    programDataNode.appendChild(infoNode);
    const binaryNode = doc.createElement('ProgramBinary');
    const binaryText = doc.createTextNode(`Prog_${number}.prog_bin`);
    binaryNode.appendChild(binaryText);
    programDataNode.appendChild(binaryNode);
    contentsNode.appendChild(programDataNode);
  };
  programs.forEach((program, index) => createProgramDataNode(index));
  root.appendChild(contentsNode);
  doc.appendChild(root);
  return serialize(doc);
};

const createProgramInformation = () => {
  const doc = document.implementation.createDocument('', null);
  const infoNode = doc.createElement('minilogue_ProgramInformation');
  const createAndAppend = (nodeType, text) => {
    const child = doc.createElement(nodeType);
    const textElement = doc.createTextNode(text || '');
    child.appendChild(textElement);
    infoNode.appendChild(child);
  };
  createAndAppend('Programmer');
  createAndAppend('Comment');
  doc.appendChild(infoNode);
  return serialize(doc);
};

const createFavoriteData = (favorites) => {
  const doc = document.implementation.createDocument('', null);
  const favoriteNode = doc.createElement('minilogue_Favorite');
  const bankNode = doc.createElement('Bank');
  favorites.forEach((value) => {
    const child = doc.createElement('Data');
    const textElement = doc.createTextNode(value);
    child.appendChild(textElement);
    bankNode.appendChild(child);
  });
  favoriteNode.appendChild(bankNode);
  doc.appendChild(favoriteNode);
  return serialize(doc);
};


/**
 * Create a preset zip archive from a library object.
 * @param {Object} library - The library object to transform.
 * @returns {Promise} A Promise of the generated zip file.
 */
const createPresetFile = (library) => {
  const zip = new JSZip();
  zip.file('FileInformation.xml', createFileInformation(library.programs, library));
  zip.file('PresetInformation.xml', createPresetInformation(library));
  library.programs.forEach((program, index) => {
    const number = (`000${index}`).slice(-3);
    zip.file(`Prog_${number}.prog_bin`, encodeProgram(program));
    zip.file(`Prog_${number}.prog_info`, createProgramInformation(program));
  });
  return zip.generateAsync({ type: 'blob' });
};

/**
 * Create a library zip archive from a library object.
 * @param {Object} library - The library object to transform.
 * @returns {Promise} A Promise of the generated zip file.
 */
const createLibraryFile = (library) => {
  const zip = new JSZip();
  // Generate favorites if not given
  const favorites = library.favorites || Array.from({ length: 8 }, (_, index) => index);
  zip.file('FileInformation.xml', createFileInformation(library.programs, undefined, favorites));
  zip.file('FavoriteData.fav_data', createFavoriteData(favorites));
  library.programs.forEach((program, index) => {
    const number = (`000${index}`).slice(-3);
    zip.file(`Prog_${number}.prog_bin`, encodeProgram(program));
    zip.file(`Prog_${number}.prog_info`, createProgramInformation(program));
  });
  return zip.generateAsync({ type: 'blob' });
};

/**
 * Create a program zip archive from a program object.
 * @param {Object} library - The library object to transform.
 * @returns {Promise} A Promise of the generated zip file.
 */
const createProgramFile = (program) => {
  const zip = new JSZip();
  zip.file('FileInformation.xml', createFileInformation([program]));
  zip.file('Prog_000.prog_bin', encodeProgram(program));
  zip.file('Prog_000.prog_info', createProgramInformation(program));
  return zip.generateAsync({ type: 'blob' });
};

export { loadLibrarianFile, createLibraryFile, createPresetFile, createProgramFile };
