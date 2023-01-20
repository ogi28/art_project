import { useAtom } from "jotai";
import { favoritesAtom, searchHistoryAtom } from "../store";
import { getFavorites, getHistory } from "../lib/userData";
import { useEffect } from "react";

export default function RouteGuard(props) {
  const [favorite, setFavorite] = useAtom(favoritesAtom);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  const PUBLIC_PATHS = ['/login', '/', '/_error', '/register'];

  async function updateAtoms() {
    setFavorite(await getFavorites());
    setSearchHistory(await getHistory());
  }
  useEffect(() => {
    updateAtoms();
  }, []);

  function authCheck(url) {
    const path = url.split('?')[0];
    if (!PUBLIC_PATHS.includes(path)) {
      console.log(`trying to request a secure path: ${path}`);
    }
  }

  return (
    <>
      {props.children}
    </>
  );

}
