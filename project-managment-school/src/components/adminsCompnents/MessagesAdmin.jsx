import React, { useEffect } from "react";
import { getMessages } from "../../apiCalls/messageCalls";
import { Spinner } from "@nextui-org/react"; // Assuming you have a spinner component from @nextui-org/react
import { format } from "date-fns";

function MessagesAdmin() {
  const [messages, setMessages] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const fetchMessages = async () => {
    setLoading(true);
    const res = await getMessages();
    if (res) {
      setMessages(res);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">جميع الرسائل</h1>

      {loading ? (
        <div className="flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <div className="space-y-4">
          {messages.length === 0 ? (
            <p className="text-center text-gray-500">لا توجد رسائل</p>
          ) : (
            messages.map((message) => (
              <div
                key={message._id}
                className="p-4 border-b-2 border-gray-300 bg-white rounded shadow-md"
              >
                <p className="text-sm text-gray-500 mb-2">
                  المرسل: {message?.Sender.phone}
                </p>
                <p className="text-lg font-semibold text-gray-700 mb-2">
                  {message?.content}
                </p>
                <p className="text-sm text-gray-400">
                  {format(new Date(message?.createdAt), "dd/MM/yyyy HH:mm")}
                </p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default MessagesAdmin;
