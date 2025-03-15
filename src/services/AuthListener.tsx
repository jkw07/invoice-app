import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useUserStore } from "../store/currentUserStore";
import { paths } from "../utils/paths";

export const AuthListener = () => {
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);

      if (!user) {
        navigate(paths.HOME);
      }
    });

    return () => unsubscribe();
  }, [auth, navigate, setUser]);

  return null;
};
