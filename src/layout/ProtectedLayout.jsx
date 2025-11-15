import Header from "../components/Header";

function ProtectedLayout({ children }) {
  return (
    <>
      <Header />
      <main style={{ padding: "20px" }}>
        {children}
      </main>
    </>
  )
}

export default ProtectedLayout;