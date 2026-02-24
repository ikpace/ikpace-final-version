import { Award, Download } from "lucide-react";

function formatDate(isoString) {
  if (!isoString) return "Completed";
  try {
    const date = new Date(isoString);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return "Completed";
  }
}

function downloadCertificateImage(course) {
  const canvas = document.createElement("canvas");
  canvas.width = 1400;
  canvas.height = 900;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // Background
  ctx.fillStyle = "#f5f5f5";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, "#1e3a8a");
  gradient.addColorStop(1, "#fb923c");
  ctx.strokeStyle = gradient;
  ctx.lineWidth = 12;
  ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80);

  // Title
  ctx.fillStyle = "#111827";
  ctx.textAlign = "center";
  ctx.font = "bold 56px system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
  ctx.fillText("Certificate of Completion", canvas.width / 2, 190);

  // Subtitle
  ctx.fillStyle = "#4b5563";
  ctx.font = "24px system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
  ctx.fillText("This is proudly presented to", canvas.width / 2, 260);

  // Student name
  const studentName = localStorage.getItem("ikpace_student_name") || "iKPACE Student";
  ctx.fillStyle = "#111827";
  ctx.font = "bold 48px system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
  ctx.fillText(studentName, canvas.width / 2, 330);

  // Course text
  ctx.fillStyle = "#4b5563";
  ctx.font = "24px system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
  ctx.fillText("for successfully completing the course", canvas.width / 2, 390);

  ctx.fillStyle = "#111827";
  ctx.font = "bold 36px system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
  ctx.fillText(course.title, canvas.width / 2, 445);

  // Date line
  const completedLabel = formatDate(course.completedAt);
  ctx.fillStyle = "#6b7280";
  ctx.font = "22px system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
  ctx.fillText(`Completed on ${completedLabel}`, canvas.width / 2, 500);

  // Footer
  ctx.font = "20px system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
  ctx.fillText("iKPACE Digital Skills Academy", canvas.width / 2, 650);

  // Seal
  ctx.beginPath();
  ctx.arc(canvas.width / 2, 740, 60, 0, Math.PI * 2);
  ctx.fillStyle = "#fb923c";
  ctx.fill();
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 26px system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
  ctx.fillText("CERTIFIED", canvas.width / 2, 748);

  canvas.toBlob((blob) => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${course.title}-certificate.png`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  });
}

export function CertificatesSection({ completedCourses = [] }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow">
      <div className="p-5 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Award className="h-5 w-5 text-orange-500" />
          Certificates
        </h2>
      </div>
      {completedCourses.length === 0 ? (
        <div className="p-8 text-center text-gray-500 text-sm">
          Complete a course to earn your first certificate!
        </div>
      ) : (
        <div className="divide-y divide-gray-200">
          {completedCourses.map((course) => (
            <div
              key={course.id}
              className="p-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-accent/15 flex items-center justify-center">
                  <Award className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{course.title}</p>
                  <p className="text-xs text-gray-500">
                    Completed {formatDate(course.completedAt)} · Grade: A
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => downloadCertificateImage(course)}
                className="flex items-center gap-1 text-xs font-medium text-orange-600 hover:underline"
              >
                <Download className="h-3.5 w-3.5" /> Download
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}