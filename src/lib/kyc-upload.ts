import { API_URL, extractApiErrorMessage } from '@/lib/api';

interface UploadResponse {
  success: boolean;
  data: { url: string; key: string };
  error?: { message?: string };
}

export async function uploadKycFile(token: string, file: File): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_URL}/kyc/files/upload`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });

  const body = (await response.json().catch(() => null)) as UploadResponse | null;
  if (!response.ok || !body?.success) {
    throw new Error(extractApiErrorMessage(body) || `Upload failed (${response.status})`);
  }

  return body.data.url;
}
