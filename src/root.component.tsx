import { navigateToUrl } from "single-spa";

export default function Root(props) {
   return (
    <nav>
      <button onClick={() => navigateToUrl("/")}>Dashboard</button>
      <button onClick={() => navigateToUrl("/transactions")}>Transações</button>
      <button onClick={() => navigateToUrl("/statement")}>Extrato</button>
    </nav>
  );
}
