import React from 'react';

export function parseXML(code: string) {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(code, 'text/xml');
  return xmlDoc;
}

export function getXMLErrors(xmlDoc: Document) {
  const errors = xmlDoc.getElementsByTagName('parsererror');
  if (errors.length > 0) {
    const result: JSX.Element[] = [];
    for (let i = 0; i < errors.length; ++i) {
      result.push(
        <div
          key={i}
          dangerouslySetInnerHTML={{ __html: errors[i].children[1].innerHTML }}
        />
      );
      return result;
    }
  }
  if (xmlDoc.getElementsByTagName('body').length > 1) {
    return 'Nur ein einziges <body> element ist erlaubt.';
  }
}

export function getXMLBody(xmlDoc: Document) {
  const bodys = xmlDoc.getElementsByTagName('body');
  if (bodys.length === 1) {
    return bodys[0];
  }
}
