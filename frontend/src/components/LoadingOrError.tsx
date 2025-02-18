import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { ImSpinner2 } from "react-icons/im";
import { MdOutlineReportGmailerrorred } from "react-icons/md";

interface LoadingOrErrorProps {
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  refetch: (
    options?: RefetchOptions,
  ) => Promise<QueryObserverResult<unknown, Error>>;
  loadingMessage: string;
  errorMessage: string;
}
export default function LoadingOrError({
  isLoading,
  isFetching,
  isError,
  refetch,
  loadingMessage,
  errorMessage,
}: LoadingOrErrorProps) {
  if (isLoading)
    return (
      <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2">
        <ImSpinner2 size="40" className="animate-spin text-violet-700" />
        <span className="text-lg font-semibold text-violet-900">
          {loadingMessage}
        </span>
      </div>
    );
  if (isError)
    return (
      <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
        <MdOutlineReportGmailerrorred className="size-12 text-red-700" />
        <span className="text-lg font-semibold text-red-800">
          {errorMessage}
        </span>
        {isFetching ? (
          <ImSpinner2 size="20" className="mt-2 animate-spin text-blue-700" />
        ) : (
          <button
            onClick={() => refetch()}
            className="cursor-pointer text-lg font-medium text-blue-700"
          >
            Retry?
          </button>
        )}
      </div>
    );
  return null;
}
