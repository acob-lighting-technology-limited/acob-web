import { getProjects } from '@/sanity/lib/client';

export default async function TestSanityPage() {
  try {
    const projects = await getProjects();

    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Sanity Connection Test</h1>
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          ✅ Sanity connection successful!
        </div>
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">
            Projects Found: {projects.length}
          </h2>
          <ul className="list-disc list-inside">
            {projects.map((project: any) => (
              <li key={project._id}>{project.title}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Sanity Connection Test</h1>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          ❌ Sanity connection failed!
        </div>
        <div className="bg-gray-100 p-4 rounded">
          <h2 className="font-semibold mb-2">Error Details:</h2>
          <pre className="text-sm overflow-auto">
            {JSON.stringify(error, null, 2)}
          </pre>
        </div>
      </div>
    );
  }
}
