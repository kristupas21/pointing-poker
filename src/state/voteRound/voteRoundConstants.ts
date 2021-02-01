import { User } from '../../types/global';
import { AvatarId } from '../../components/Avatar';

export const ADD_USER_TO_VOTE_ROUND = '@voteRound/ADD_USER';
export const SET_USER_VOTE_VALUE = '@voteRound/SET_USER_VOTE_VALUE';
export const CLEAR_VOTES = '@voteRound/CLEAR_VOTES';
export const SHOW_VOTES = '@voteRound/SHOW_VOTES';
export const HIDE_VOTES = '@voteRound/HIDE_VOTES';

export const MOCK_USERS: User[] = [
  { id: 'qq', voteValue: '3', name: 'Saulius', role: 'frontend', avatarId: AvatarId.EmojiSad },
  { id: 'qw', voteValue: '5', name: 'Alvydas', role: 'backend', avatarId: AvatarId.EmojiHappy },
  { id: 'q4', voteValue: '1', name: 'Greta', role: 'frontend' },
  { id: 'qr', voteValue: '8', name: 'Alex', role: 'qa' },
  { id: 'qv', voteValue: '8', name: 'Marija', role: 'qa' },
  { id: 'qs', voteValue: '8', name: 'Ona', role: 'backend' },

  { id: 'qsx', voteValue: null, name: 'Joey', role: 'backend' },
  { id: 'q3s', voteValue: null, name: 'Chandler', role: 'backend' },
  { id: 'qrs', voteValue: '?', name: 'Monica', role: 'backend' },
];
