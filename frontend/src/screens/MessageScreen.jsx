import MessageCard from "../components/MessageCard";

import ErrorBadge from "../components/ErrorBadge";
import ApiWrapper from "../components/wrappers/ApiWrapper";
import { useGetMessagesQuery } from "../slices/messageApiSlice";
import { useLocation, useSearchParams } from "react-router-dom";
import Pagination from "../components/Pagination";

const MessageScreen = () => {
  const [searchParams] = useSearchParams();

  const page = searchParams.get("page");
  const { pathname } = useLocation();

  const { data, isLoading, error, refetch } = useGetMessagesQuery(page || 1);

  const { data: messages } = data || {};

  return (
    <>
      <ApiWrapper isLoading={isLoading} error={error}>
        {messages && (
          <section className="bg-blue-50 min-h-[100vh]">
            <div className="container m-auto py-24 max-w-6xl">
              <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
                <h1 className="text-3xl font-bold mb-4">Your Messages</h1>

                <div className="space-y-4">
                  {messages.content.length == 0 ? (
                    <ErrorBadge error={"No messages found!"} />
                  ) : (
                    messages.content.map((message) => (
                      <MessageCard
                        key={message._id}
                        data={message}
                        refetch={refetch}
                      />
                    ))
                  )}
                </div>
              </div>
            </div>
            <Pagination
              pathname={pathname}
              totalPages={messages.totalPages}
              page={messages.pageable.pageNumber}
            />
          </section>
        )}
      </ApiWrapper>
    </>
  );
};

export default MessageScreen;
