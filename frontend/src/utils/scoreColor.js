export default function scoreColor(score) {
  if (score >= 90) return "text-green-400";
  if (score >= 75) return "text-lime-400";
  if (score >= 60) return "text-yellow-400";
  if (score >= 40) return "text-orange-400";
  return "text-red-400";
}