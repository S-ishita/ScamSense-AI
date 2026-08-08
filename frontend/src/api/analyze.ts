import type {
  AnalyzeRequest,
  AnalyzeResponse,
} from "@/types/analyze";

const API_URL =
  import.meta.env.VITE_API_URL;

export async function analyzeMessage(
  request: AnalyzeRequest
): Promise<AnalyzeResponse> {
  const response = await fetch(`${API_URL}/api/v1/analyze`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error("Failed to analyze message");
  }

  return response.json();
}

export async function analyzeImage(file: File): Promise<AnalyzeResponse> {
  const formData = new FormData();

  formData.append("image", file);

  const response = await fetch(
    `${API_URL}/api/v1/analyze-image`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error("Image analysis failed");
  }

  return response.json();
}

export async function analyzeURL(url: string): Promise<AnalyzeResponse> {
  const response = await fetch(
    `${API_URL}/api/v1/analyze-url`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("URL analysis failed");
  }

  return response.json();
}