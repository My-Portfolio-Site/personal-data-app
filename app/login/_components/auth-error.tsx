"use client"

import { useSearchParams } from "next/navigation"

enum Error {
  Configuration = "Configuration",
  AccessDenied = "AccessDenied",
  Default = "Default",
}

const errorMap = {
  [Error.Configuration]: (
    <span>
      There was a problem when trying to authenticate. Please contact us if this
      error persists. Unique error code:{" "}
      <code className="rounded-sm bg-slate-200 p-1 text-xs">Configuration</code>
    </span>
  ),
  [Error.AccessDenied]: (
    <span>
      You do not have permission to access this resource. Please contact us if you believe this is an error. Unique error code:{" "}
      <code className="rounded-sm bg-slate-200 p-1 text-xs">AccessDenied</code>
    </span>
  ),
  [Error.Default]: (
    <span>
      An unexpected error occurred. Please try again later or contact us if this
      error persists. Unique error code:{" "}
      <code className="rounded-sm bg-slate-200 p-1 text-xs">Default</code>
    </span>
  ),
}

export default function AuthError() {
  const search = useSearchParams()
  const error = search.get("error") as Error
  if (!error) {
    return null
  }
  return (
    <div className="flex flex-col w-full items-center justify-center rounded-lg border my-2 gap-2 p-2">
      {/* <a className="block max-w-sm rounded-lg border p-2 m-2 text-center shadow" > */}
        <h5 className="flex flex-row items-center justify-center text-md font-bold tracking-tight text-gray-900 dark:text-white">
          Something went wrong
        </h5>
        <div className="text-destructive text-sm">
          {errorMap[error]}
        </div>
      {/* </a> */}
    </div>
  )
}