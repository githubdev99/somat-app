export const meta = () => [
  {
    title: "Oops!",
  },
];

export default function Index() {
  return (
    <main className="flex min-h-[100vh] items-center justify-center !p-0">
      <section className="container">
        <h1 className="block text-center text-[140px] font-extrabold leading-[100%] lg:mb-2">
          404
        </h1>
        <h4 className="text-center text-[72px] font-extrabold leading-[120%]">
          Not Found
        </h4>
      </section>
    </main>
  );
}
