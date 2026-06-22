import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { fetchLanding } from "../api/public";
import { useConversation } from "../hooks/useConversation";
import { useSession } from "../hooks/useSession";

export function ChatView() {
  const { businessSlug = "", locationSlug = "" } = useParams();
  const sessionToken = useSession(businessSlug, locationSlug);
  const [draft, setDraft] = useState("");

  const landingQuery = useQuery({
    queryKey: ["landing", businessSlug, locationSlug],
    queryFn: () => fetchLanding(businessSlug, locationSlug),
  });

  const { messages, isLoading, sendMessage, isSending } = useConversation(
    businessSlug,
    locationSlug,
    sessionToken,
  );

  function handleSend(text: string) {
    const trimmed = text.trim();
    if (!trimmed || isSending) return;
    sendMessage(trimmed);
    setDraft("");
  }

  if (landingQuery.isLoading) {
    return (
      <div className="app-shell-placeholder">
        <p className="app-shell-note">Loading...</p>
      </div>
    );
  }

  if (landingQuery.isError || !landingQuery.data) {
    return (
      <div className="app-shell-placeholder">
        <p className="app-shell-eyebrow">AI Host</p>
        <h1>We couldn't find this location</h1>
      </div>
    );
  }

  const landing = landingQuery.data;
  const hasStartedChat = isLoading || messages.length > 0;

  return (
    <div className="chat-view">
      <header className="chat-view-header">
        <p className="app-shell-eyebrow">{landing.business_name}</p>
        <h1>{landing.landing_title ?? landing.location_name}</h1>
        {landing.welcome_message && <p className="chat-view-welcome">{landing.welcome_message}</p>}
      </header>

      {!hasStartedChat && landing.suggested_questions.length > 0 && (
        <div className="chat-view-suggestions">
          {landing.suggested_questions.map((question) => (
            <button
              key={question}
              type="button"
              className="chat-view-suggestion-chip"
              onClick={() => handleSend(question)}
            >
              {question}
            </button>
          ))}
        </div>
      )}

      <div className="chat-view-messages">
        {messages.map((message) => (
          <div key={message.id} className={`chat-view-message chat-view-message-${message.role}`}>
            {message.content}
          </div>
        ))}
        {isSending && (
          <div className="chat-view-message chat-view-message-assistant chat-view-message-pending">
            …
          </div>
        )}
      </div>

      <form
        className="chat-view-form"
        onSubmit={(event) => {
          event.preventDefault();
          handleSend(draft);
        }}
      >
        <input
          className="chat-view-input"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Ask a question..."
        />
        <button type="submit" className="chat-view-send" disabled={isSending}>
          Send
        </button>
      </form>
    </div>
  );
}
