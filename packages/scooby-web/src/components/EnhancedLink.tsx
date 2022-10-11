import { ReactNode } from "react";
import { Link, RelativeRoutingType, To } from "react-router-dom";
import { getProtectedParams } from "../routes/hooks/params";
import { useQueryParams } from "../routes/hooks/useQueryParams";

type Props = {
  to: To;
  relative?: RelativeRoutingType;
  children?: ReactNode;
};

// A version of Link that preserves global parameters
export const EnhancedLink = (props: Props) => {
  const params = useQueryParams<Record<string, any>>();
  const protectedParams = getProtectedParams(params);
  const serializedParams = new URLSearchParams(protectedParams).toString();
  const toEnhanced = `${props.to}?${serializedParams}`;

  return (
    <Link to={toEnhanced} relative={props.relative}>
      {props.children}
    </Link>
  );
};
