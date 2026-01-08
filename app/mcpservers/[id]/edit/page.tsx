export default async function EditMCPServerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">编辑 MCPServer</h1>
      <p>正在编辑 ID: {id}</p>
      <p>这里将显示编辑表单...</p>
    </div>
  );
}
