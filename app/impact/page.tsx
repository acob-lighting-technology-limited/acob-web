import { getProjects } from '@/sanity/lib/client';
import { ImpactMetrics } from '@/components/projects/impact-metrics';
import { ImpactChart } from '@/components/impact/impact-chart';
import { ImpactViewToggle } from '@/components/impact/impact-view-toggle';
import { Container } from '@/components/ui/container';
import { ImpactPasswordGate } from '@/components/impact/impact-password-gate';
import type { Project, ProjectImpactMetrics } from '@/lib/types';

export default async function ImpactPage() {
  // Fetch all projects
  const projects = await getProjects();

  // Calculate total impact metrics
  const totalMetrics = projects.reduce(
    (acc: ProjectImpactMetrics, project: Project) => {
      if (project.impactMetrics) {
        acc.beneficiaries =
          (acc.beneficiaries || 0) + (project.impactMetrics.beneficiaries || 0);
        acc.jobsCreatedDirectly =
          (acc.jobsCreatedDirectly || 0) +
          (project.impactMetrics.jobsCreatedDirectly || 0);
        acc.jobsCreatedIndirectly =
          (acc.jobsCreatedIndirectly || 0) +
          (project.impactMetrics.jobsCreatedIndirectly || 0);
        acc.annualCO2Reduction =
          (acc.annualCO2Reduction || 0) +
          (project.impactMetrics.annualCO2Reduction || 0);
        acc.annualEnergyOutput =
          (acc.annualEnergyOutput || 0) +
          (project.impactMetrics.annualEnergyOutput || 0);
      }
      return acc;
    },
    {
      beneficiaries: 0,
      jobsCreatedDirectly: 0,
      jobsCreatedIndirectly: 0,
      annualCO2Reduction: 0,
      annualEnergyOutput: 0,
    },
  );

  // Count projects with impact metrics
  const projectsWithMetrics = projects.filter(
    (p: Project) => p.impactMetrics,
  ).length;

  return (
    <ImpactPasswordGate>
      <Container className="px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-foreground">
              Total Impact Metrics
            </h1>
            <p className="text-muted-foreground text-lg mb-4">
              Aggregated impact from {projectsWithMetrics} projects across all
              deployments. Each metric represents the sum of individual project
              contributions.
            </p>
            <ImpactViewToggle />
          </div>

          <div id="impact-cards-view">
            <ImpactMetrics metrics={totalMetrics} />
          </div>

          <div id="impact-chart-view" className="hidden">
            <ImpactChart projects={projects} />
          </div>
        </div>
      </Container>
    </ImpactPasswordGate>
  );
}
