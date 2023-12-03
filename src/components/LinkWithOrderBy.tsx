import { Link, LinkProps, useLocation } from 'react-router-dom';
import { useFilterState } from '../hooks/useFilterState';

type Props = LinkProps & React.RefAttributes<HTMLAnchorElement>;
export const LinkWithOrderBy = ({ children, to, ...props }: Props) => {
  const [filterState] = useFilterState()

  return (
    <Link to={`${to}${to.toString().includes('?') ? '&' : '?' }orderBy=${filterState.orderBy}&orderDirection=${filterState.orderDirection}`} {...props}>
      {children}
    </Link>
  );
};