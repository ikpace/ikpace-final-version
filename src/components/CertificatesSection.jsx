import { Award, Download } from "lucide-react";

const certificates = [
  { title: "CSS Complete Guide", date: "Feb 10, 2026", grade: "A" },
  { title: "JavaScript Essentials", date: "Jan 15, 2026", grade: "A+" },
];

export function CertificatesSection() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow">
      <div className="p-5 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Award className="h-5 w-5 text-orange-500" />
          Certificates
        </h2>
      </div>
      {certificates.length === 0 ? (
        <div className="p-8 text-center text-gray-500 text-sm">
          Complete a course to earn your first certificate!
        </div>
      ) : (
        <div className="divide-y divide-gray-200">
          {certificates.map((c, i) => (
            <div key={i} className="p-4 flex items-center justify-between hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-accent/15 flex items-center justify-center">
                  <Award className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{c.title}</p>
                  <p className="text-xs text-gray-500">Completed {c.date} · Grade: {c.grade}</p>
                </div>
              </div>
              <button className="flex items-center gap-1 text-xs font-medium text-orange-600 hover:underline">
                <Download className="h-3.5 w-3.5" /> Download
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}