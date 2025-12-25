/**
 * Renders API Service
 * 
 * API endpoints for personalized render requests (n8n pipeline).
 */

import { apiClient } from './client';

export type RenderStatus = 'pending' | 'processing' | 'completed' | 'failed';

export interface RenderPreviewRequest {
  bookId: string;
  childId: string;
  childPhotoUrl: string;
  dedupeKey: string;
}

export interface RenderJob {
  jobId: string;
  status: RenderStatus;
  bookId: string;
  childId: string;
  previewUrl?: string;
  error?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Request a personalized preview render
 */
export async function requestPreviewRender(
  request: RenderPreviewRequest
): Promise<RenderJob> {
  const response = await apiClient.post<RenderJob>('/v1/renders/previews', request);
  return response.data;
}

/**
 * Get render job status
 */
export async function getRenderJob(jobId: string): Promise<RenderJob> {
  const response = await apiClient.get<RenderJob>(`/v1/renders/${jobId}`);
  return response.data;
}

/**
 * Poll for render completion
 */
export async function pollRenderCompletion(
  jobId: string,
  options: { intervalMs?: number; timeoutMs?: number } = {}
): Promise<RenderJob> {
  const { intervalMs = 2000, timeoutMs = 120000 } = options;
  const startTime = Date.now();

  return new Promise((resolve, reject) => {
    const poll = async () => {
      try {
        const job = await getRenderJob(jobId);

        if (job.status === 'completed' || job.status === 'failed') {
          resolve(job);
          return;
        }

        if (Date.now() - startTime > timeoutMs) {
          reject(new Error('Render polling timeout'));
          return;
        }

        setTimeout(poll, intervalMs);
      } catch (error) {
        reject(error);
      }
    };

    poll();
  });
}

export const rendersApi = {
  requestPreviewRender,
  getRenderJob,
  pollRenderCompletion,
};

export default rendersApi;

