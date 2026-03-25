import { useMemo, useState } from 'react';

const quickQuestions = ['Who are you?', 'What projects you built?'];

const faqAnswers = {
  who: "I'm Sanjay, an AI + MERN developer focused on building polished web apps, practical products, and portfolio-worthy user experiences.",
  projects:
    'I built projects like an Electrical Shop Billing System, an AI Student Assistant, and this portfolio website with animations, project detail pages, and interactive sections.',
  skills:
    'My core stack includes HTML, CSS, JavaScript, React, Node.js, Express, MongoDB, and AI-powered workflows.',
  contact:
    'You can use the Contact button in the hero section or submit the Website Request form to start a project.',
  default:
    'Try asking: "Who are you?", "What projects you built?", "What are your skills?", or "How can I contact you?"',
};

function getBotReply(message) {
  const normalized = message.toLowerCase();

  if (normalized.includes('who')) {
    return faqAnswers.who;
  }

  if (normalized.includes('project')) {
    return faqAnswers.projects;
  }

  if (normalized.includes('skill') || normalized.includes('tech')) {
    return faqAnswers.skills;
  }

  if (normalized.includes('contact') || normalized.includes('hire') || normalized.includes('website')) {
    return faqAnswers.contact;
  }

  return faqAnswers.default;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'bot',
      text: 'Hi, I am SanjayBot. Ask me something about this portfolio.',
    },
  ]);

  const promptButtons = useMemo(
    () =>
      quickQuestions.map((question) => (
        <button
          type="button"
          className="chatbot-chip"
          key={question}
          onClick={() => {
            handleSend(question);
          }}
        >
          {question}
        </button>
      )),
    [],
  );

  function handleSend(nextMessage = input) {
    const message = nextMessage.trim();

    if (!message) {
      return;
    }

    const userMessage = {
      id: Date.now(),
      role: 'user',
      text: message,
    };

    const botMessage = {
      id: Date.now() + 1,
      role: 'bot',
      text: getBotReply(message),
    };

    setMessages((current) => [...current, userMessage, botMessage]);
    setInput('');
  }

  function handleSubmit(event) {
    event.preventDefault();
    handleSend();
  }

  return (
    <div className={`chatbot-shell${isOpen ? ' is-open' : ''}`}>
      {isOpen ? (
        <section className="chatbot-panel" aria-label="Portfolio chatbot">
          <div className="chatbot-header">
            <div>
              <p className="chatbot-kicker">AI assistant</p>
              <h2>SanjayBot</h2>
            </div>
            <button type="button" className="icon-button" onClick={() => setIsOpen(false)} aria-label="Close chatbot">
              x
            </button>
          </div>

          <div className="chatbot-prompts">{promptButtons}</div>

          <div className="chatbot-messages">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`chat-bubble ${message.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-bot'}`}
              >
                {message.text}
              </div>
            ))}
          </div>

          <form className="chatbot-form" onSubmit={handleSubmit}>
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask about Sanjay, skills, or projects"
              aria-label="Chat message"
            />
            <button type="submit" className="chatbot-send">
              Send
            </button>
          </form>
        </section>
      ) : null}

      <button type="button" className="chatbot-launcher" onClick={() => setIsOpen((current) => !current)}>
        💬 Chat
      </button>
    </div>
  );
}
