import React from "react";
import * as constants from "@console/constants";
import { useApiUrl } from "@refinedev/core";
import httpc from "@console/utils/httpc";

export const useSecret: () => {
  toggle: (id: string) => void;
  secret: string;
  error?: Error;
} = () => {
  const [id, setId] = React.useState("");
  const [secret, setSecret] = React.useState("");
  const [error, setError] = React.useState<Error | undefined>();

  const apiUrl = useApiUrl(constants.PROVIDER_SDK);
  React.useEffect(() => {
    if (!id) return;

    httpc
      .get(`${apiUrl}/api/endpoint/${id}/secret`)
      .then((r) => setSecret(r.data.secret_key))
      .catch((err) => setError(err));
  }, [id]);

  const toggle = (id: string) => {
    if (!!secret) {
      setId("");
      setSecret("");
      return;
    }

    setId(id);
  };

  return { toggle, secret, error };
};
