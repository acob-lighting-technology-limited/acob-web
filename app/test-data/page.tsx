import { getProjects } from '@/sanity/lib/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Container } from '@/components/ui/container';

export default async function TestDataPage() {
  const projects = await getProjects();

  // Filter to show only Tunga project for debugging
  const tungaProject = projects.find(p =>
    p.title.toLowerCase().includes('tunga')
  );

  return (
    <Container className="py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Test Data - Projects Location & State
        </h1>
        <p className="text-muted-foreground">
          Total Projects: {projects.length}
        </p>
        {tungaProject && (
          <div className="mt-4 p-4 bg-primary/10 border border-primary rounded">
            <h2 className="font-bold mb-2">🔍 Tunga Project Debug Info:</h2>
            <pre className="text-xs overflow-x-auto bg-black/80 text-white p-4 rounded">
              {JSON.stringify(
                {
                  _id: tungaProject._id,
                  title: tungaProject.title,
                  location: tungaProject.location,
                  state: tungaProject.state,
                  slug: tungaProject.slug,
                },
                null,
                2
              )}
            </pre>
          </div>
        )}
      </div>

      <div className="space-y-4">
        {projects.map(project => (
          <Card key={project._id}>
            <CardHeader>
              <CardTitle className="text-lg">{project.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <span className="font-semibold">Location:</span>{' '}
                  <span className="text-muted-foreground">
                    {project.location || '(empty)'}
                  </span>
                </div>
                <div>
                  <span className="font-semibold">State:</span>{' '}
                  <span className="text-muted-foreground">
                    {project.state || '(empty)'}
                  </span>
                </div>
                <div className="pt-2 border-t">
                  <span className="font-semibold">Raw State Value:</span>{' '}
                  <code className="text-xs bg-muted px-2 py-1 rounded">
                    {JSON.stringify(project.state)}
                  </code>
                </div>
                <div>
                  <span className="font-semibold">Raw Location Value:</span>{' '}
                  <code className="text-xs bg-muted px-2 py-1 rounded">
                    {JSON.stringify(project.location)}
                  </code>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {projects.length === 0 && (
        <Card>
          <CardContent className="py-10 text-center text-muted-foreground">
            No projects found
          </CardContent>
        </Card>
      )}
    </Container>
  );
}
