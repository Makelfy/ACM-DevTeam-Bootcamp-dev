export async function sendMail(to, title, content) {
  await fetch("http://localhost:1186/api/internal/mail", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      to,
      from: "no-reply@my-todo-application.com",
      content,
      type: "html",
      title,
    }),
  });
}
