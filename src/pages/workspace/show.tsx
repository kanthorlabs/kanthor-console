import React from "react";
import { Navigate } from "react-router-dom";
import {
  IResourceComponentsProps,
  useShow,
  useNavigation,
} from "@refinedev/core";

const Show: React.FC<IResourceComponentsProps> = () => {
  const { listUrl } = useNavigation();
  const { showId } = useShow();

  const to = `${listUrl("analytics")}?ws_id=${showId}`;
  return <Navigate to={to} />;
};

export default Show;
