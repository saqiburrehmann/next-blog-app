const SubScriptionTableItem = ({ email, date, id, onDelete }) => {
  const formatDate = (isoString) => {
    const d = new Date(isoString);
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(d);
  };

  const handleDelete = () => {
    onDelete(id);  // Pass the email id to onDelete
  };

  return (
    <tr className="bg-white border-b text-left">
      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
        {email || "No Email"}
      </td>
      <td className="px-6 py-4 hidden sm:block">
        {date ? formatDate(date) : "No Date"}
      </td>
      <td
        className="px-6 py-4 cursor-pointer underline text-red-600"
        onClick={handleDelete}  // Use the new handler here
      >
        Delete
      </td>
    </tr>

    
  );
};
