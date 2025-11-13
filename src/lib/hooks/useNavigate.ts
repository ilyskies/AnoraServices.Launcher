import { useRouterContext } from "../router/Router";

export function useNavigate() {
  const { navigate } = useRouterContext();
  return navigate;
}
