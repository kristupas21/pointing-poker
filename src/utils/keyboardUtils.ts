import { KeyboardEvent as ReactKeyboardEvent } from 'react';

type Evt = KeyboardEvent | ReactKeyboardEvent;

type IsKey = (e: Evt) => boolean;

const isKey = (key: string): IsKey => (e: Evt) => e.key === key;

export const isEscapeKey = isKey('Escape');
