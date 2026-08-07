export default function DeleteJobModal({
  open,
  onClose,
  onConfirm,
  loading,
  job,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">

      <div className="w-full max-w-md rounded-2xl bg-[#111827] border border-gray-800 p-8">

        <h2 className="text-2xl font-bold text-red-500">
          Delete Job
        </h2>

        <p className="mt-5 text-gray-300">
          Are you sure you want to permanently delete
        </p>

        <h3 className="mt-3 text-xl font-semibold text-white">
          {job?.title}
        </h3>

        <p className="text-cyan-400">
          {job?.company_name}
        </p>

        <div className="mt-8 flex justify-end gap-4">

          <button
            onClick={onClose}
            disabled={loading}
            className="px-5 py-2 rounded-xl bg-gray-700 hover:bg-gray-600"
          >
            Cancel
          </button>

          <button
            disabled={loading}
            onClick={onConfirm}
            className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-500"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>

        </div>

      </div>

    </div>
  );
}