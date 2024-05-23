import { PropsWithChildren } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./fallback/ErrorFallback";
import { QueryErrorResetBoundary } from "@tanstack/react-query";

const RootErrorBoundary = ({ children }: PropsWithChildren) => {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary fallbackRender={ErrorFallback} onReset={reset}>
          {children}
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};

export default RootErrorBoundary;
