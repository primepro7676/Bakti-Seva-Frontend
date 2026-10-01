import { FileText } from "lucide-react";

export default function ContentPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Content Management</h1>
      </div>
      
      <div className="bg-card rounded-xl border border-border overflow-hidden p-12 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4 text-muted-foreground">
          <FileText className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-semibold mb-2">Manage Website Content</h2>
        <p className="text-muted-foreground max-w-md">
          Create, edit, and publish blog posts, about pages, policies, and other editorial content for your website.
        </p>
      </div>
    </div>
  );
}
