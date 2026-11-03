const STORAGE_KEY = 'cyberguard_user_state_v1';

const defaultState = {
  xp: 150,
  streak: 3,
  completedModules: ['welcome'],
  unlockedBadges: [],
  quizScore: null,
  userName: 'Defender Student',
  lastActiveDate: new Date().toISOString().split('T')[0]
};

export const getUserState = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return defaultState;
    const parsed = JSON.parse(saved);
    return { ...defaultState, ...parsed };
  } catch (e) {
    return defaultState;
  }
};

export const saveUserState = (state) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Failed to save state:', e);
  }
};

export const addXP = (amount, badgeIdToUnlock = null) => {
  const current = getUserState();
  const newXP = current.xp + amount;
  let newBadges = [...current.unlockedBadges];

  if (badgeIdToUnlock && !newBadges.includes(badgeIdToUnlock)) {
    newBadges.push(badgeIdToUnlock);
  }

  const updated = {
    ...current,
    xp: newXP,
    unlockedBadges: newBadges
  };

  saveUserState(updated);
  return updated;
};

export const resetProgress = () => {
  saveUserState(defaultState);
  return defaultState;
};
