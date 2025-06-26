export default function getDate(): number {
  const now = new Date();
  const today = new Intl.DateTimeFormat("pt-BR", {
    timeZone: "America/Sao_Paulo",
    day: "2-digit"

  }).format(now);

  return +today;

}
