import { useState } from "react";
import { Loader2, Sparkles, Upload, Image as ImageIcon, X } from "lucide-react";

import {
    analyzeMessage,
    analyzeImage,
    analyzeURL,
} from "@/api/analyze";
import type { AnalyzeResponse } from "@/types/analyze";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
} from "@/components/ui/tabs";
import { toast } from "sonner";

interface Props {
    onResult: (result: AnalyzeResponse) => void;
}

export default function AnalyzeForm({ onResult }: Props) {
    const [message, setMessage] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [url, setUrl] = useState("");
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("text");

    async function handleAnalyze() {
        if (!message.trim()) return;

        try {
            setLoading(true);

            const result = await analyzeMessage({
                type: "text",
                content: message,
            });

            onResult(result);
            toast.success("Analysis completed successfully!");
        } catch (err) {
            console.error(err);
            toast.error("Analysis failed. Gemini API may be down or rate-limited. Please try again later.");
        } finally {
            setLoading(false);
        }
    }


    async function handleURLAnalyze() {
        if (!url.trim()) return;

        try {
            setLoading(true);

            const result = await analyzeURL(url.trim());

            onResult(result);
            toast.success("URL analysis completed successfully!");
        } catch (err) {
            console.error(err);
            toast.error("URL analysis failed. Gemini API may be down or rate-limited. Please try again later.");
        } finally {
            setLoading(false);
        }
    }

    async function handleImageAnalyze() {
        if (!image) return;

        try {
            setLoading(true);

            const result = await analyzeImage(image);

            onResult(result);
            toast.success("Image analysis completed successfully!");
        } catch (err) {
            console.error(err);
            toast.error("Image analysis failed. Gemini API may be down or rate-limited. Please try again later.");
        } finally {
            setLoading(false);
        }
    }

    function handleImageSelect(file: File | undefined) {
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            toast.error("Please select an image file");
            return;
        }

        setImage(file);
        setImagePreview(URL.createObjectURL(file));
    }

    function clearImage() {
        setImage(null);
        setImagePreview(null);
    }

    return (
        <div>
            <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
            >
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="text">
                        📝 Text
                    </TabsTrigger>

                    <TabsTrigger value="image">
                        🖼 Image
                    </TabsTrigger>

                    <TabsTrigger value="url">
                        🔗 URL
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="text" className="mt-6">
                    <div>
                        <h2 className="text-2xl font-bold">
                            Analyze a Suspicious Message
                        </h2>

                        <p className="mt-2 text-slate-500">
                            Paste any SMS, email or WhatsApp message and
                            ScamSense will identify phishing attempts,
                            scams and fraud indicators using AI.
                        </p>
                    </div>

                    <Textarea
                        rows={10}
                        placeholder="Paste a suspicious SMS, email or WhatsApp message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="mt-4 resize-none rounded-2xl border-slate-200 bg-slate-50 text-base shadow-inner focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />

                    <div className="flex justify-between text-sm text-slate-500">
                        <span>
                            Supports SMS, Emails and Chat messages
                        </span>

                        <span>
                            {message.length} / 5000
                        </span>
                    </div>

                    <Button
                        onClick={handleAnalyze}
                        disabled={loading || !message.trim()}
                        className="mt-6 h-14 w-full rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-lg font-semibold shadow-lg transition-all duration-300 hover:scale-[1.02] hover:from-blue-700 hover:to-indigo-700"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                AI is analyzing...
                            </>
                        ) : (
                            <>
                                <Sparkles className="mr-2 h-5 w-5" />
                                Analyze with AI
                            </>
                        )}
                    </Button>
                </TabsContent>

                <TabsContent value="image" className="mt-6">
                    <div>
                        <h2 className="text-2xl font-bold">
                            Analyze a Suspicious Image
                        </h2>

                        <p className="mt-2 text-slate-500">
                            Upload a screenshot of an SMS, email, WhatsApp
                            message or any suspicious communication.
                        </p>
                    </div>

                    {!imagePreview ? (
                        <label className="mt-6 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-10 transition-all hover:border-blue-400 hover:bg-blue-50/50">
                            <Upload className="h-10 w-10 text-blue-500" />

                            <p className="mt-4 text-lg font-semibold text-slate-700">
                                Upload an image
                            </p>

                            <p className="mt-1 text-sm text-slate-500">
                                PNG, JPG or WEBP
                            </p>

                            <input
                                type="file"
                                accept="image/png,image/jpeg,image/webp"
                                className="hidden"
                                onChange={(e) =>
                                    handleImageSelect(e.target.files?.[0])
                                }
                            />
                        </label>
                    ) : (
                        <div className="mt-6 relative rounded-2xl border border-slate-200 bg-slate-50 p-4">
                            <button
                                type="button"
                                onClick={clearImage}
                                className="absolute right-3 top-3 z-10 rounded-full bg-white p-2 shadow-md hover:bg-slate-100"
                            >
                                <X className="h-4 w-4" />
                            </button>

                            <img
                                src={imagePreview}
                                alt="Selected screenshot"
                                className="max-h-[400px] w-full rounded-xl object-contain"
                            />

                            <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">
                                <ImageIcon className="h-4 w-4" />
                                {image?.name}
                            </div>
                        </div>
                    )}

                    <Button
                        onClick={handleImageAnalyze}
                        disabled={loading || !image}
                        className="mt-6 h-14 w-full rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-lg font-semibold shadow-lg transition-all duration-300 hover:scale-[1.02] hover:from-blue-700 hover:to-indigo-700"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                AI is analyzing...
                            </>
                        ) : (
                            <>
                                <Sparkles className="mr-2 h-5 w-5" />
                                Analyze Image with AI
                            </>
                        )}
                    </Button>
                </TabsContent>

                <TabsContent value="url" className="mt-6">
                    <div>
                        <h2 className="text-2xl font-bold">
                            Analyze a Suspicious URL
                        </h2>

                        <p className="mt-2 text-slate-500">
                            Paste a suspicious website URL and ScamSense
                            will analyze it for phishing, scams and
                            credential theft indicators.
                        </p>
                    </div>

                    <input
                        type="url"
                        placeholder="https://example.com/login"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="mt-6 h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 text-base shadow-inner outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />

                    <div className="mt-2 text-sm text-slate-500">
                        We analyze the URL without visiting the website.
                    </div>

                    <Button
                        onClick={handleURLAnalyze}
                        disabled={loading || !url.trim()}
                        className="mt-6 h-14 w-full rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-lg font-semibold shadow-lg transition-all duration-300 hover:scale-[1.02] hover:from-blue-700 hover:to-indigo-700"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                AI is analyzing...
                            </>
                        ) : (
                            <>
                                <Sparkles className="mr-2 h-5 w-5" />
                                Analyze URL with AI
                            </>
                        )}
                    </Button>
                </TabsContent>
            </Tabs>
        </div>
    );
}