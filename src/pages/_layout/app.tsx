import { Outlet } from "react-router-dom";

export function AppLayout() {
  return (
    <>
      {/*Colocar o Header aqui ... */}
      {/* Area logada vai vim nesta parte do código ... */}
      <h1>Area logada aqui</h1>
      <Outlet />
    </>
  )
}
