import React from 'react';

export function getXMLErrors(code: string) {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(code, 'text/xml');
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
}
