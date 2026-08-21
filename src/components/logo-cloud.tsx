import { clients } from "@/lib/clients";

export function LogoCloud() {
  if (clients.length === 0) return null;

  return (
    <div className="logo-cloud">
      <p className="eyebrow">Worked with</p>
      <ul className="logo-cloud-row">
        {clients.map((client) => (
          <li key={client.name} className="logo-cloud-item">
            <img src={client.src} alt={client.name} className="logo-cloud-img" />
          </li>
        ))}
      </ul>
    </div>
  );
}
