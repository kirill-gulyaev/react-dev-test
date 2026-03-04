import { CallDetails } from "../components/CallDetails";
import { CallsList } from "../components/CallsList";

export const Dashboard = () => {
  return (
    <main className="grid grid-cols-2">
      <CallsList />
      <CallDetails />
    </main>
  );
};
