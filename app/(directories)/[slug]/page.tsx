export default function DirectoryPage({ params }: { params: { slug: string } }) {
  return (
    <main className="w-screen h-screen bg-white relative">
      <div className="pt-16 pl-8">
        <h1 className="text-4xl font-bold">/{params.slug}</h1>
      </div>
    </main>
  );
}
