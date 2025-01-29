const HomePage = () => {
  return(
    <div className="home-page h-full w-full flex justify-center items-center">
        <div className="flex flex-col items-center justify-center placeholder pt-10">
            <h1 className="text-3xl font-bold text-orange-500">Welcome User!</h1>
            <p className="text-xl text-zinc-800" > Please Log In in order to access the dashboard.</p>
        </div>
    </div>
  );
}

export default HomePage;