"use client"

export const getToken = () => {
  if (typeof window !== 'undefined'){
      const auth = localStorage.getItem('auth');
      if (!auth) return null;
      const { token, user } = JSON.parse(auth);
      const expTime = new Date(user.exp).getHours();
      const now = new Date().getHours()
      if ((expTime - now) < 0) return null;
      return { token: `Bearer ${token}`, user };
  }
}

