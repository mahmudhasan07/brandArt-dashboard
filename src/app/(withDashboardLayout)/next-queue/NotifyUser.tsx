import { useAddNotificationMutation } from "@/Redux/Api/notifyApi";
import ShowToastify from "@/utils/ShowToastify";
import { useState } from "react";
import { ToastContainer } from "react-toastify";

const NotifyUser = (serviceId: any) => {
  const [notifyFn] = useAddNotificationMutation();
  const [formData, setFormData] = useState({
    title: "",
    body: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNotification = async (e: any) => {
    e.preventDefault();

    console.log(serviceId);

    const { data, error } = await notifyFn({
      formData,
      id: serviceId?.serviceId,
    });
    if (error) {
      ShowToastify({ error: "Unsuccessful to send notification" });
      return;
    }
    ShowToastify({ success: "Successfully sent notification" });
  };

  return (
    <form
      onSubmit={handleNotification}
      className="w-80 mx-auto p-4 border rounded"
    >
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-semibold">Body</label>
        <textarea
          name="body"
          value={formData.body}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          rows={4}
          required
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Submit
      </button>

      <ToastContainer></ToastContainer>
    </form>
  );
};

export default NotifyUser;
