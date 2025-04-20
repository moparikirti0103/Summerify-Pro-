import { Button, Card } from "react-bootstrap";

export default function YouTubeInput({ videoUrl, setVideoUrl, fetchTranscript }) {
  return (
    <Card className="p-4 shadow">
      <input
        type="text"
        className="form-control mb-2"
        placeholder="Paste YouTube video URL"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
      />
      <Button
        variant="primary"
        onClick={() => fetchTranscript?.mutate(videoUrl)} 
        disabled={fetchTranscript?.isPending} 
      >
        {fetchTranscript?.isPending ? "Processing..." : "Submit"}
      </Button>
    </Card>
  );
}
