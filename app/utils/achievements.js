import {
  achievementIcon,
  achievement2Icon,
  achievement3Icon,
  // eslint-disable-next-line import/no-unresolved
} from 'images';

const achievementsEnum = [
  { id: 1, icon: achievementIcon },
  { id: 2, icon: achievement2Icon },
  { id: 3, icon: achievement3Icon },
];

export const getAchievementsById = (achievementId) => {
  return achievementsEnum.find((x) => x.id === achievementId).icon;
};
