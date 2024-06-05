"use client"

export const getToken = () => {
  if (typeof window !== 'undefined') {
    const auth = localStorage.getItem('auth');
    if (!auth) return null;

    const { token, user } = JSON.parse(auth);
    const expTime = user.exp;
    const now = new Date().getTime();
    const threeHoursInMillis = 3 * 60 * 60 * 1000;
    if ((expTime - now) > threeHoursInMillis) return null;
    return { token: `Bearer ${token}`, user };
  }
}
