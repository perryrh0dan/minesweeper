import qs from 'query-string';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function useQueryState<S>(
  paramName: string,
  serialize?: ((val: S) => string),
  initialState?: S | (() => S),
): [S, React.Dispatch<React.SetStateAction<S>>] {
  const navigate = useNavigate();
  const { pathname, search } = useLocation();
  const queryParams = useMemo(() => qs.parse(search), [search]);

  const iState = initialState || queryParams[paramName] as any

  const [stateValue, setState] = useState<S>(iState);

  useEffect(() => {
    const serializedValue = serialize ? serialize(stateValue) : stateValue !== null ? String(stateValue) : null;

    // To avoid infinite loops caused by history.replace (which triggers the history object to change)
    // Check to see if our tag is going to change and only update the query param if that is true
    if (queryParams[paramName] !== serializedValue) {
      const updatedQueryParams = {
        ...queryParams,
      };

      if (serializedValue !== null && typeof serializedValue !== 'undefined') {
        updatedQueryParams[paramName] = serializedValue;
      } else {
        delete updatedQueryParams[paramName];
      }

      const newURL = qs.stringifyUrl({
        url: pathname,
        query: updatedQueryParams,
      });

      navigate(newURL, { replace: true });
    }
  }, [stateValue, navigate, paramName, pathname, queryParams, serialize])

  return [stateValue, setState];
};
