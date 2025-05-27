const Steps = (): JSX.Element => {
  return (
    <section className="steps mt-64 min-h-screen  relative z-30">
      <div className="row-1 container flex justify-between items-center">
        <article className="p-5 dark-linear flex items-center w-full max-w-[400px] space-x-8 font-michroma backdrop-blur-sm">
          <h1 className="text-[3.6em]">1.</h1>
          <h4 className="text-3xl">Parcourez le catalogue</h4>
        </article>

        <article className="p-5 dark-linear flex items-center space-x-8 w-full max-w-[400px] font-michroma backdrop-blur-sm">
          <h1 className="text-[3.6em]">2.</h1>
          <h4 className="text-3xl">Examinez en 3D</h4>
        </article>
      </div>

      <div className="row-2 flex justify-center mt-[180px]">
        <article className="p-5 dark-linear flex items-center space-x-8 w-full max-w-[400px]  font-michroma backdrop-blur-sm">
          <h1 className="text-[3.6em]">3.</h1>
          <h4 className="text-3xl">Achetez en un clic !</h4>
        </article>
      </div>
    </section>
  );
};

export default Steps;
