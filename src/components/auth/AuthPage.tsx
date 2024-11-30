import Header from "./Header"

function AuthPage() {
  return (
    <div>
        <div className="justify-center flex flex-col items-center">
        <div className="text-4xl font-bold">Welcome to the Auth Page</div>
        <div className="text-2xl">This is a protected page</div>
        </div>
    <Header />
    </div>
  )
}

export default AuthPage
