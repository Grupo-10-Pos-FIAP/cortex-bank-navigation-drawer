import { navigateToUrl } from "single-spa";

export default function Root(props) {
   return (
    <nav>
      <button onClick={() => navigateToUrl("/")}>Dashboard</button>
      <button onClick={() => navigateToUrl("/transactions")}>Transacoes</button>
      <button onClick={() => navigateToUrl("/bank-statement")}>Extrato</button>
    </nav>
  );
}
