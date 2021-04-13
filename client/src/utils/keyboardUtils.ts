import { KeyboardEvent as ReactKeyboardEvent } from 'react';

type Evt = KeyboardEvent | ReactKeyboardEvent;

type IsKey = (e: Evt) => boolean;

const isKey = (key: string): IsKey => (e: Evt) => e.key === key;

const NUMBER_KEYS = [...Array(10).keys()];

export const ASTERISK_KEY = '*';

export const QUESTION_KEY = '?';

export const ESCAPE_KEY = 'Escape';

export const isEscapeKey = isKey(ESCAPE_KEY);

export const isQuestionKey = isKey(QUESTION_KEY);

export const isAsteriskKey = isKey(ASTERISK_KEY);

export const isNumberKey = (e: Evt) => NUMBER_KEYS.some((n) => e.key === `${n}`);
